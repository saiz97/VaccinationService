import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user';
import { Vaccination } from 'src/app/model/vaccination';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { StepperService } from 'src/app/service/stepper.service';
import { ModalService } from 'src/app/shared/popup-modal/modal.service';

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
              private authService: AuthService,
              private modalService: ModalService) { }

  ngOnInit(): void {
    console.log("Confirm Step!", this.stepperService.steps);

    if (this.authService.isLoggedIn()) {
      this.user = this.authService.getCurrentUser();
      if (this.user) {
        this.dataService.checkVaccinationStatus(this.user.id).subscribe((reservation) => {
          this.isVaccinated = (reservation != null);

          if(this.isVaccinated) {
            setTimeout(() => {
              this.stepperService.currentStepIndex.next(6);
            }, 3000)
          }
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

      if(this.isVaccinated) {
        this.stepperService.steps[6].data = reservation;
        setTimeout(() => {
          this.stepperService.currentStepIndex.next(6);
        }, 3000)
      }
    })
  }

  confirmBooking(modalId: string) {
    this.closeModal(modalId);
    this.dataService.saveBookingOfUser(this.user.id, this.vaccination.id, this.selectedSlotIndex).subscribe((res) => {
      this.stepperService.currentStepIndex.next(5);
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
