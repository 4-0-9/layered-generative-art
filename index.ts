import sharp, { type OverlayOptions } from 'sharp';
import { LAYERS, weightedChoice } from './layers';

const BASE_SHAPE_PATH = './assets/base_shape.png';

export type Trait = 'skin' | 'nose' | 'eyes' | 'mouth' | 'detail';

export type Layer = {
    trait: Trait,
    path: string,
    chance?: number,
    options: TraitOption[]
};

export type TraitOption = {
    fileName: string,
    weight?: number
};

async function generateRandomImage(fileName: string, orderedLayers: Layer[]) {
    const layers: { input: string }[] = [];

    for (const layer of orderedLayers) {
        if (layer.chance && Math.random() > layer.chance) {
            continue;
        }

        const choice = weightedChoice(layer.options);

        layers.push({ input: `${layer.path}${choice}` });
    }

    const image = sharp(BASE_SHAPE_PATH).composite(layers);

    await Bun.write(`./output/${fileName}`, await image.toBuffer());
}

for (let i = 0; i < 100; i++) {
    await generateRandomImage(`characters/${i}.png`, LAYERS);
}

// combine into a single grid image
const characters: OverlayOptions[] = [];
for (let i = 0; i < 100; i++) {
    characters.push({ input: `./output/characters/${i}.png`, left: (i % 10) * 16, top: Math.floor(i / 10.0) * 16 });
}

const grid = sharp({ create: { width: 160, height: 160, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite(characters).png();

await Bun.write('./output/grid.png', await grid.toBuffer());

console.log('Finished generation');
