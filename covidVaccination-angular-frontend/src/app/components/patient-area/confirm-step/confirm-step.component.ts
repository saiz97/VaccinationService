import { Component, OnInit } from '@angular/core';
import { AuthService, User, Response } from 'src/app/auth/auth-service.service';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { StepperService } from 'src/app/service/stepper.service';

@Component({
  selector: 'app-confirm-step',
  templateUrl: './confirm-step.component.html',
  styleUrls: ['./confirm-step.component.scss']
})
export class ConfirmStepComponent implements OnInit {

  user: User = null;

  constructor(private stepperService: StepperService,
              private dataService: DataStorageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    console.log("Confirm Step!", this.stepperService.steps);
  }
}
