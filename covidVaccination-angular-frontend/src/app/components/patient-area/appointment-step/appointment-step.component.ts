import { Component, OnInit } from '@angular/core';
import { StepperService } from 'src/app/service/stepper.service';

@Component({
  selector: 'div.app-appointment-step',
  templateUrl: './appointment-step.component.html',
  styleUrls: ['./appointment-step.component.scss']
})
export class AppointmentStepComponent implements OnInit {

  constructor(private stepperService: StepperService) { }

  ngOnInit(): void {
    console.log("State Step!");
  }

  next() {
    this.stepperService.currentStepIndex.next(4);
  }


}
