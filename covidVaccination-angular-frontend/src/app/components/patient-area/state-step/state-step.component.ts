import { Component, OnInit } from '@angular/core';
import { StepperService } from 'src/app/service/stepper.service';

@Component({
  selector: 'div.app-state-step',
  templateUrl: './state-step.component.html',
  styleUrls: ['./state-step.component.scss']
})
export class StateStepComponent implements OnInit {

  constructor(private stepperService: StepperService) { }

  ngOnInit(): void {
    console.log("State Step!");
  }

  next() {
    this.stepperService.currentStepIndex.next(2);
  }

}
