import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { StepperService } from 'src/app/service/stepper.service';

@Component({
  selector: 'div.app-appointment-step',
  templateUrl: './appointment-step.component.html',
  styleUrls: ['./appointment-step.component.scss']
})
export class AppointmentStepComponent implements OnInit {

  vaccinations;

  constructor(private stepperService: StepperService,
              private dataService: DataStorageService) { }

  ngOnInit(): void {
    console.log("State Step!");
    if (this.stepperService.steps[1].data) {
      this.dataService.getVaccinationsOfState(this.stepperService.steps[1].data.state).subscribe((vaccinations) => {
        this.vaccinations = vaccinations;
        console.log("All Vaccinations: ",vaccinations);
      })
    }
  }

  next() {
    this.stepperService.currentStepIndex.next(4);
  }


}
