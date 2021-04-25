import { Component, OnInit } from '@angular/core';
import { StepperService } from 'src/app/service/stepper.service';

@Component({
  selector: 'app-confirm-step',
  templateUrl: './confirm-step.component.html',
  styleUrls: ['./confirm-step.component.scss']
})
export class ConfirmStepComponent implements OnInit {

  constructor(private stepperService: StepperService) { }

  ngOnInit(): void {
    console.log("Confirm Step!");
  }

}
