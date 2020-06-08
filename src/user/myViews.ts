import { IViewEntity } from "../core/ViewEntity";
import { NamedColor } from "../core/Pixel";

export class Circle implements IViewEntity {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  x: number;
  y: number;
  colorLookup: { [key: string]: NamedColor } = {
    1: "red",
    0: "green",
  };
  pixels: string[][] = [
    ["_", "1", "1", "_"],
    ["1", "0", "0", "1"],
    ["1", "1", "1", "1"],
    ["1", "1", "1", "1"],
    ["_", "1", "1", "_"],
  ];
}
