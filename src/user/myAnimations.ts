import { AnimationBase } from "../core/AnimationEntity";
import { FrameTransitionManager } from "../core/FrameTransitionManager";
import { SlideViewRequest } from "../core/FrameTransitionRequest";

export class MoveableByArrowKeysAnimation extends AnimationBase {
  isMoving: boolean = false;

  subscriptionToEvents = (frameManager: FrameTransitionManager) => {
    document.addEventListener("keydown", (e) =>
      this.onKeyDownHandler(e, frameManager)
    );
    document.addEventListener("keyup", (e) =>
      this.onKeyUpHandler(e, frameManager)
    );
    // be able to add to "idle" movements
  };

  onKeyUpHandler(e: KeyboardEvent, frameManager: FrameTransitionManager) {
    //todo: holding key causes lag, need to handle keyup also

    this.isMoving = false;
    switch (e.key) {
      case "ArrowUp":
        frameManager.removeRepeatedRequest(
          new SlideViewRequest(this.view, 0, -1)
        );
        break;
      case "ArrowDown":
        frameManager.removeRepeatedRequest(
          new SlideViewRequest(this.view, 0, 1)
        );
        break;
      case "ArrowRight":
        frameManager.removeRepeatedRequest(
          new SlideViewRequest(this.view, 1, 0)
        );
        break;
      case "ArrowLeft":
        frameManager.removeRepeatedRequest(
          new SlideViewRequest(this.view, -1, 0)
        );
        break;
      default:
        this.isMoving = true;
    }
  }

  onKeyDownHandler(e: KeyboardEvent, frameManager: FrameTransitionManager) {
    //todo: holding key causes lag, need to handle keyup also
    if (this.isMoving) return;
    switch (e.key) {
      case "ArrowUp":
        frameManager.pushRequest(new SlideViewRequest(this.view, 0, -1), true);
        break;
      case "ArrowDown":
        frameManager.pushRequest(new SlideViewRequest(this.view, 0, 1), true);
        break;
      case "ArrowRight":
        frameManager.pushRequest(new SlideViewRequest(this.view, 1, 0), true);
        break;
      case "ArrowLeft":
        frameManager.pushRequest(new SlideViewRequest(this.view, -1, 0), true);
        break;
      default:
        this.isMoving = false;
        return;
    }
    this.isMoving = true;
  }
}
