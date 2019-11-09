// flow-typed signature: 8e4575fde40f8dd1625f08e46d5d6144
// flow-typed version: c6154227d1/shortid_v2.2.x/flow_>=v0.104.x

declare module 'shortid' {
  declare type ShortIdModule = {|
    (): string,
    generate(): string,
    seed(seed: number): ShortIdModule,
    worker(workerId: number): ShortIdModule,
    characters(characters: string): string,
    decode(id: string): {
      version: number,
      worker: number,
      ...
    },
    isValid(id: mixed): boolean,
  |};
  declare module.exports: ShortIdModule;
};
