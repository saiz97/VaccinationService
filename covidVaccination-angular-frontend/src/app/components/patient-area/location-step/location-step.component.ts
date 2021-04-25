import { Component, OnInit } from '@angular/core';
import { StepperService } from 'src/app/service/stepper.service';

@Component({
  selector: 'app-location-step',
  templateUrl: './location-step.component.html',
  styleUrls: ['./location-step.component.scss']
})
export class LocationStepComponent implements OnInit {

  constructor(private stepperService: StepperService) { }

  ngOnInit(): void {
    console.log("Location Step!");
  }

  next() {
    this.stepperService.currentStepIndex.next(3);
  }


}
