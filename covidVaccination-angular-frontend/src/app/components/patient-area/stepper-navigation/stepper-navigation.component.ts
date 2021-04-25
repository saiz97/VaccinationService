import { Component, OnInit } from '@angular/core';
import { StepperService, Step } from 'src/app/service/stepper.service';

@Component({
  selector: 'app-stepper-navigation',
  templateUrl: './stepper-navigation.component.html',
  styleUrls: ['./stepper-navigation.component.scss']
})
export class StepperNavigationComponent implements OnInit {
  steps: {[key: number]: boolean} = {
    1: false,
    2: false,
    3: false,
    4: false
  };

  constructor(private stepperService: StepperService) { }

  ngOnInit(): void {
    this.stepperService.currentStepIndex.subscribe((index) => {
      this.steps[index] = true;
    });
  }

}
