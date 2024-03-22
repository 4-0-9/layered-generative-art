import type { Layer, TraitOption } from ".";

export const LAYERS: Layer[] = [
    {
        trait: 'skin',
        path: './assets/skin/',
        options: [
            { fileName: 'sand.png' },
            { fileName: 'sienna.png' },
            { fileName: 'bole.png' },
            { fileName: 'chocolate.png' }
        ]
    },
    {
        trait: 'nose',
        path: './assets/nose/',
        options: [
            { fileName: 'small.png' },
            { fileName: 'big.png' }
        ]
    },
    {
        trait: 'eyes',
        path: './assets/eyes/',
        options: [
            { fileName: 'blue.png', weight: 27 },
            { fileName: 'green.png', weight: 9 },
            { fileName: 'brown.png', weight: 19 },
            { fileName: 'dark_brown.png', weight: 45 }
        ]
    },
    {
        trait: 'mouth',
        path: './assets/mouth/',
        options: [
            { fileName: 'neutral.png', weight: 8 },
            { fileName: 'happy.png', weight: 4 },
            { fileName: 'smirk.png', weight: 2 },
            { fileName: 'shock.png', weight: 1 }
        ]
    },
    {
        trait: 'detail',
        chance: 0.1,
        path: './assets/detail/',
        options: [
            { fileName: 'halo.png', weight: 1 },
            { fileName: 'red_beanie.png', weight: 25 },
            { fileName: 'green_beanie.png', weight: 25 }
        ]
    }
];

export function weightedChoice(options: TraitOption[]): string {
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

    return options[i].fileName;
}
