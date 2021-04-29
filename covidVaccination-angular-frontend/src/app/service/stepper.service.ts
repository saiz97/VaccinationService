import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AppointmentStepComponent } from '../components/patient-area/appointment-step/appointment-step.component';
import { ConfirmStepComponent } from '../components/patient-area/confirm-step/confirm-step.component';
import { LocationStepComponent } from '../components/patient-area/location-step/location-step.component';
import { StateStepComponent } from '../components/patient-area/state-step/state-step.component';

export interface Step {
  component: Type<any>;
  visited: boolean;
  data?: any;
}

@Injectable()
export class StepperService {
  steps: {[key: number]: Step} = {
     1: { component: StateStepComponent, visited: false },
     2: { component: LocationStepComponent, visited: false },
     3: { component: AppointmentStepComponent, visited: false },
     4: { component: ConfirmStepComponent, visited: false },
     5: { component: null, visited: false }
  };

  currentStepIndex = new BehaviorSubject<number>(1);

  constructor() {
    this.currentStepIndex.subscribe( (index) => {
      this.steps[index].visited = true;
    });
  }

  reset() {
    // this.steps.forEach((step) => step.visited = false);
    // this.currentStep.next({ component: StateStepComponent, visited: true });
  }
}
