import { Component, OnInit } from '@angular/core';
import { Vaccination } from 'src/app/model/vaccination';
import { VaccinationFactory } from 'src/app/model/vaccination-factory';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { StepperService } from 'src/app/service/stepper.service';

@Component({
  selector: 'div.app-appointment-step',
  templateUrl: './appointment-step.component.html',
  styleUrls: ['./appointment-step.component.scss']
})
export class AppointmentStepComponent implements OnInit {

  vaccinations: Vaccination[] = [];

  constructor(private stepperService: StepperService,
              private dataService: DataStorageService) { }

  ngOnInit(): void {
    console.log("State Step!");
    if (this.stepperService.steps[1].data
      && this.stepperService.steps[2].data.city
      && this.stepperService.steps[2].data.place) {

      this.dataService.getVaccinationsOfState(this.stepperService.steps[1].data.state).subscribe((vaccinations) => {
        vaccinations.forEach(vac => {
          if (vac.city == this.stepperService.steps[2].data.city
              && vac.place == this.stepperService.steps[2].data.place) {
            this.vaccinations.push(VaccinationFactory.fromObject(vac));
          }
        });
        console.log("All Vaccinations: ", this.vaccinations);
      })
    }
  }

  isValidSelect(btn) {
    console.log("==== ", btn);
    return true;
  }

  next(vac: Vaccination) {
    const select = (<HTMLSelectElement>document.querySelector("#select_" + vac.id));
    const selectedIndex = select.selectedIndex;
    const selectedSlot = select.options[select.selectedIndex].text;

    this.stepperService.steps[3].data = {
      vaccination: vac,
      selectedSlotIndex: selectedIndex,
      selectedSlot: selectedSlot
    };

    this.stepperService.currentStepIndex.next(4);
  }

}
