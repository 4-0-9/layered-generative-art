/**
 * A generative art layer
 */
export type Layer = {
    /** The trait's name */
    traitName: string,
    /** The base path (**use trailing slash**, e.g. ./assets/eyes/) */
    path: string,
    /** The probability of this trait occouring. Range: 0.0-1.0 (e.g. 0.5 for 50%). **Defaults to 1.0** */
    probability?: number,
    /** The options to randomly pick from. Can optionally contain weights to increase certain options' rarity */
    options: TraitOption[]
};

/**
 * A trait option with an optional weight
 */
export type TraitOption = {
    /** The option's name (e.g: 'Blue') */
    name: string,
    /** The option's file name (e.g.: 'blue_eyes.png') */
    fileName: string,
    /** The option's weight. Defaults to 1 */
    weight?: number
};
