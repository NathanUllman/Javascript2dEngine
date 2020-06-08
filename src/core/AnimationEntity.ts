import { IViewEntity, EmptyView } from "./ViewEntity";
import { FrameTransitionManager } from "./FrameTransitionManager";
import { SlideViewRequest } from "./FrameTransitionRequest";

export interface IAnimationHandler {
  view: IViewEntity;
  subscriptionToEvents(frameManager: FrameTransitionManager): void;
  initializeView(view: IViewEntity): void;
}

export class AnimationBase implements IAnimationHandler {
  view: IViewEntity = new EmptyView();
  subscriptionToEvents(frameManager: FrameTransitionManager) {}

  initializeView(view: IViewEntity) {
    this.view = view;
  }
}
