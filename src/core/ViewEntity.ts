import { NamedColor } from "./Pixel";

export interface IViewEntity {
  colorLookup: { [key: string]: NamedColor };
  pixels: string[][];
  x: number;
  y: number;
}

export class EmptyView implements IViewEntity {
  colorLookup: { [key: string]: NamedColor } = {};
  pixels: string[][] = [];
  x: number = -1;
  y: number = -1;
}
