import { IViewEntity } from "./ViewEntity";
import { NamedColor, Pixel } from "./Pixel";

export class FrameUpdater {
  shiftView(view: IViewEntity, xPlus: number, yPlus: number) {
    //todo: not most efficient way, may remove some pixels that don't actually change
    this.removeViewDisplay(view);
    view.x += xPlus;
    view.y += yPlus;
    this.displayView(view);
  }

  removeViewDisplay(view: IViewEntity) {
    setPixels(view.pixels, view.x, view.y, (pixel: string) => {
      return "black"; //todo: background may not be black
    });
  }

  displayView(view: IViewEntity) {
    setPixels(view.pixels, view.x, view.y, (pixel: string) => {
      if (pixel === "_") return "black"; // ignore background
      return view.colorLookup[pixel];
    });
  }
}

function setPixels(
  pixels: string[][],
  initialX: number,
  initialY: number,
  getColor: (pixel: string) => NamedColor
) {
  pixels.forEach((row, y) => {
    row.forEach((pixel, x) => {
      let actualX = x + initialX;
      let actualY = y + initialY;

      let ref = document.getElementById(
        actualX.toString() + "-" + actualY.toString()
      );

      if (ref) ref.style.backgroundColor = getColor(pixel);
    });
  });
}
