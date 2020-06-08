import { IFrameComponent, ComponentBuilder_ViewStage } from "./FrameComponent";
import { FrameTransitionManager } from "./FrameTransitionManager";
import { InitializeRequest } from "./FrameTransitionRequest";
import { PixelGrid } from "./Pixel";

export class FrameDisplay {
  grid: PixelGrid;
  entityList: IFrameComponent[] = [];
  transitionManager: FrameTransitionManager = new FrameTransitionManager();

  constructor(rows: number, columns: number) {
    this.grid = new PixelGrid(rows, columns);
  }

  createFrameComponent() {
    return new ComponentBuilder_ViewStage(this.transitionManager, this);
  }

  addEntity = (component: IFrameComponent) => {
    //used by builder
    this.transitionManager.pushRequest(new InitializeRequest(component.view));
    this.entityList.push(component);
  };

  displayNextFrame = () => {
    this.transitionManager.executeRequestQ(); // transition to next frame
  };
}
