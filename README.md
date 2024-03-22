# layered-generative-art
An easy-to-use library to generate random images from a set of layers.

## Installation
NPM:
```console
$ npm install layered-generative-art
```
Bun:
```console
$ bun add layered-generative-art
```

## Example
```ts
// import generate function
import { generateRandomImage } from 'layered-generative-art';
import { writeFileSync } from 'node:fs';

// ...

// generate a random character from a fixed base shape, randomly choose between brown or
// blue eyes (blue eyes are 5 times as rare) and an optional hat at a 25% probability
const result: GenerativeArtOutput = generateRandomImage('./assets/base_shape.png', [
    {
        traitName: 'Eyes',
        path: './assets/eyes/',
        options: [
            {
                name: 'Blue',
                // this path will be combined with the layer's path (in this case => './assets/eyes/blue_eyes.png')
                path: 'blue_eyes.png',
                weight: 1
            },
            {
                name: 'Brown',
                path: 'brown.png',
                // Brown eyes now have 5 times the probability of blue eyes
                weight: 5
            }
        ]
    },
    {
        traitName: 'Hat',
        path: './assets/hats/',
        // Set the probability of a hat occouring to 25%
        probability: 0.25,
        options: [
            {
                name: 'Red Beanie',
                path: 'red_beanie.png',
            },
            {
                name: 'Green Cap',
                path: 'green_cap.png',
            }
        ]
    },
]);

// write the newly generated character to a file
writeFileSync('./output/my_character.png', result.buffer);

// log the choices that were taken by the generator
console.log(result.choices);
```

## Features
- optional layers based on a probability
- weighted layer options to create rare trait options

## Contributing
Feel free to open pull requests

## License
MIT
