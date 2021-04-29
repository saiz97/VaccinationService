import { Component, OnInit } from '@angular/core';
import { AuthService, Response } from 'src/app/auth/auth-service.service';
import { User } from 'src/app/model/user';
import { Vaccination } from 'src/app/model/vaccination';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { StepperService } from 'src/app/service/stepper.service';

@Component({
  selector: 'app-confirm-step',
  templateUrl: './confirm-step.component.html',
  styleUrls: ['./confirm-step.component.scss']
})
export class ConfirmStepComponent implements OnInit {

  user: User = null;
  vaccination: Vaccination = null;
  selectedTimeSlot: string = "";
  selectedSlotIndex: number;
  isVaccinated: boolean = true;

  constructor(private stepperService: StepperService,
              private dataService: DataStorageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    console.log("Confirm Step!", this.stepperService.steps);

    if (this.authService.isLoggedIn()) {
      this.user = this.authService.getCurrentUser();
      if (this.user) {
        this.dataService.checkVaccinationStatus(this.user.id).subscribe((reservation) => {
          this.isVaccinated = (reservation != null);
        })
      }
    }

    const steps = this.stepperService.steps;
    if (steps[3].data) {
      this.vaccination = steps[3].data.vaccination;
      this.selectedTimeSlot = steps[3].data.selectedSlot;
      this.selectedSlotIndex = steps[3].data.selectedSlotIndex;
    }
  }

  onUserEmit(user) {
    this.user = user;
    this.dataService.checkVaccinationStatus(this.user.id).subscribe((reservation) => {
      this.isVaccinated = (reservation != null);
    })
  }

  confirmBooking() {
    if(confirm("Buchung wirklich abschließen?")) {
      this.dataService.saveBookingOfUser(this.user.id, this.vaccination.id, this.selectedSlotIndex).subscribe((res) => {
        if (res) {
          this.stepperService.currentStepIndex.next(5);
        } else {
          // error
        }
      })
    }
  }
}
