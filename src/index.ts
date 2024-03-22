import sharp, { type OverlayOptions } from 'sharp';
import { type Layer, type TraitOption } from './layers';

/** Generates a random image from a base shape and a set of layers
 * @param baseShapePath - The path to the base shape of the image. This image determines the resolution of the image. (set this to a transparent image if you don't want a base shape)
 * @param orderedLayers - The layers to choose from in ascending order
 * @returns A buffer containing the newly generated image
 */
export async function generateRandomImage(baseShapePath: string, orderedLayers: Layer[]): Promise<GenerativeArtOutput> {
    const layers: OverlayOptions[] = [];
    const choices: Record<string, string> = {};

    for (const layer of orderedLayers) {
        if (layer.probability && Math.random() > layer.probability) {
            continue;
        }

        const choice = weightedChoice(layer.options);

        layers.push({ input: `${layer.path}${choice.fileName}` });
        choices[layer.traitName] = choice.name;
    }

    const image = sharp(baseShapePath).composite(layers);

    const buffer = await image.toBuffer();
    return { buffer: buffer, choices };
}


// https://stackoverflow.com/questions/43566019/how-to-choose-a-weighted-random-array-element-in-javascript
function weightedChoice(options: TraitOption[]): TraitOption {
    let i;

    let weights: number[] = [options[0].weight ?? 1];

    for (i = 1; i < options.length; i++) {
        weights[i] = (options[i].weight ?? 1) + weights[i - 1];
    }

    const random = Math.random() * weights[weights.length - 1];

    for (i = 0; i < weights.length; i++) {
        if (weights[i] > random) {
            break;
        }
    }

    return options[i];
}

/**
 * A piece of randomly generated art
 */
export type GenerativeArtOutput = {
    /** The buffer containing the image */
    buffer: Buffer,
    /** An object mapping traits to the choices' names. If a layer was not used due the probability field it will **not** be present in this object */
    choices: Record<string, string>,
};
