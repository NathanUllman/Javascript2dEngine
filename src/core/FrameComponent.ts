import { IViewEntity } from "./ViewEntity";
import { FrameTransitionManager } from "./FrameTransitionManager";
import { IAnimationHandler } from "./AnimationEntity";
import { FrameDisplay } from "./FrameDisplay";

export class ComponentBuilder_ViewStage {
  displayAccessor: FrameTransitionManager;
  frame: FrameDisplay;
  constructor(displayAccessor: FrameTransitionManager, frame: FrameDisplay) {
    this.displayAccessor = displayAccessor;
    this.frame = frame;
  }
  withView(view: IViewEntity) {
    return new ComponentBuilder_AnimationsStage(
      view,
      this.displayAccessor,
      this.frame
    );
  }
}

// for typescript classes
export interface IFrameComponent {
  view: IViewEntity;
  animationsCollection: IAnimationHandler[];
}

class ComponentBuilder_AnimationsStage {
  view: IViewEntity;
  animationsCollection: IAnimationHandler[] = [];
  displayAccessor: FrameTransitionManager;
  frame: FrameDisplay;

  constructor(
    view: IViewEntity,
    displayAccessor: FrameTransitionManager,
    frame: FrameDisplay
  ) {
    this.displayAccessor = displayAccessor;
    this.view = view;
    this.frame = frame;
  }

  useAnimation(animation: IAnimationHandler) {
    animation.initializeView(this.view);
    animation.subscriptionToEvents(this.displayAccessor);
    this.animationsCollection.push(animation);
    return this;
  }

  buildAndAdd() {
    this.frame.addEntity(
      new FrameComponent(this.view, this.animationsCollection)
    );
  }
}

class FrameComponent implements IFrameComponent {
  view: IViewEntity;
  animationsCollection: IAnimationHandler[] = [];

  constructor(view: IViewEntity, animations: IAnimationHandler[]) {
    this.view = view;
    this.animationsCollection = animations;
  }

  // addAnimation(animation: IAnimationHandler) {
  //   if (!this.displayAccessor) {
  //     console.log("accessor not added");
  //     return;
  //   }
  //   animation.initializeView(this.view);
  //   animation.subscriptionToEvents(this.displayAccessor);
  //   this.animationsCollection.push(animation);
  // }
}
