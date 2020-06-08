import { FrameUpdater } from "./FrameUpdater";
import { IFrameTransitionRequest } from "./FrameTransitionRequest";

export class FrameTransitionManager {
  requests: IFrameTransitionRequest[] = [];
  reoccuringRequests: IFrameTransitionRequest[] = [];
  frameUpdater: FrameUpdater = new FrameUpdater();

  pushRequest(req: IFrameTransitionRequest, repeating?: boolean) {
    repeating ? this.reoccuringRequests.push(req) : this.requests.push(req);
  }

  removeRepeatedRequest(req: IFrameTransitionRequest) {
    for (let i = 0; i < this.reoccuringRequests.length; i++) {
      if (JSON.stringify(this.reoccuringRequests[i]) == JSON.stringify(req)) {
        this.reoccuringRequests.splice(i, 1);
      }
    }
  }

  //Transition to next Frame
  //todo: executing should update the object's x and y coordinates
  executeRequestQ() {
    this.reoccuringRequests.forEach((req) => req.execute());
    this.requests.forEach((req) => req.execute());
    this.requests = []; // flush Q
  }
}
