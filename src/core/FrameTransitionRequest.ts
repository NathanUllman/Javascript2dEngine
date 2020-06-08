import { IViewEntity } from "./ViewEntity";
import { FrameUpdater } from "./FrameUpdater";

export interface IFrameTransitionRequest {
  view: IViewEntity;
  execute(): void;
}

export class IFrameTransitionRequest {
  frameUpdater: FrameUpdater = new FrameUpdater();
}

export class InitializeRequest extends IFrameTransitionRequest {
  view: IViewEntity;

  constructor(view: IViewEntity) {
    super();
    this.view = view;
  }

  execute() {
    this.frameUpdater.displayView(this.view);
  }
}

export class SlideViewRequest extends IFrameTransitionRequest {
  view: IViewEntity;
  xPlus: number;
  yPlus: number;

  constructor(view: IViewEntity, xPlus: number, yPlus: number) {
    super();
    this.view = view;
    this.xPlus = xPlus;
    this.yPlus = yPlus;
  }

  execute() {
    this.frameUpdater.shiftView(this.view, this.xPlus, this.yPlus);
  }
}
