import { Component, OnInit } from '@angular/core';
import { StepperService, Step } from 'src/app/service/stepper.service';

@Component({
  selector: 'app-stepper-navigation',
  templateUrl: './stepper-navigation.component.html',
  styleUrls: ['./stepper-navigation.component.scss']
})
export class StepperNavigationComponent implements OnInit {

  currentStep: number = 0;

  constructor(public stepperService: StepperService) { }

  ngOnInit(): void {
    this.stepperService.currentStepIndex.subscribe((index) => {
      this.currentStep = index;
    });
  }

}
