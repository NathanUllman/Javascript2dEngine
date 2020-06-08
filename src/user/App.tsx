import React from "react";
import { FrameDisplay } from "../core/FrameDisplay";
import { Pixel, PixelRow } from "../core/Pixel";
import { Circle } from "./myViews";
import { MoveableByArrowKeysAnimation } from "./myAnimations";

let xByx = 100;
let size = 5;
let startX = 500;
let startY = 100;

let grid = new FrameDisplay(xByx, xByx);

class App extends React.Component<{}, {}> {
  componentDidMount() {
    // for (let i = 0; i < 10; i++) {
    //   for (let j = 0; j < 10; j++) {
    //     grid
    //       .createFrameComponent()
    //       .withView(new Circle(i * 7, j * 7))
    //       .useAnimation(new MoveableByArrowKeysAnimation())
    //       .buildAndAdd();
    //   }
    // }

    grid
      .createFrameComponent()
      .withView(new Circle(5, 5))
      .useAnimation(new MoveableByArrowKeysAnimation())
      .buildAndAdd();

    setInterval(grid.displayNextFrame, 1);
  }

  //todo: move this to core
  render() {
    let gridDisplay = grid.grid.rows.map((row: PixelRow, y: number) => {
      return row.columns.map((pixel: Pixel, x: number) => {
        return (
          <div
            id={x.toString() + "-" + y.toString()}
            style={{
              position: "fixed",
              width: size,
              height: size,
              backgroundColor: pixel.color,
              left: startX + size * x,
              top: startY + size * y,
            }}
          ></div>
        );
      });
    });

    return <div>{gridDisplay}</div>;
  }
}

export default App;
