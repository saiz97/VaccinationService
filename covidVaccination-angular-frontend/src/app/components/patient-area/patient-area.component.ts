import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from 'src/app/model/reservation';
import { User } from 'src/app/model/user';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { StepDirective } from 'src/app/service/stepper.directive';
import { StepperService, Step } from 'src/app/service/stepper.service';
import { ModalService } from 'src/app/shared/popup-modal/modal.service';

@Component({
  selector: 'app-patient-area',
  templateUrl: './patient-area.component.html',
  styleUrls: ['./patient-area.component.scss']
})
export class PatientAreaComponent implements OnInit {
  @ViewChild(StepDirective, {static: true}) stepHost: StepDirective;

  isFinished: boolean = false;
  isVaccinated: boolean = false;

  stepperSubscription: Subscription;
  currentStep: Step = null;

  reservation: Reservation = null;

  user: User = null;

  constructor(private stepperService: StepperService,
              private authService: AuthService,
              private dataService: DataStorageService,
              private componentFactoryResolver: ComponentFactoryResolver, private modalService: ModalService) { }

  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {
      this.user = this.authService.getCurrentUser()
      console.log(this.user);
      this.checkVaccinationStatus();
    } else {
      this.initStepperSub();
    }
  }

  checkVaccinationStatus() {
    this.dataService.checkVaccinationStatus(this.user.id).subscribe((reservation) => {
      this.isVaccinated = (reservation != null);

      if (!this.isVaccinated) {
        this.initStepperSub();
      } else {
        this.reservation = reservation;
        this.clearStepContainer();
      }
    });
  }

  initStepperSub() {
    this.stepperSubscription = this.stepperService.currentStepIndex.subscribe((index) => {
      console.log("Incoming Step: ", index);

      if (index < 5) {
        this.currentStep = this.stepperService.steps[index];
        this.initStep();
        this.isFinished = false;
      } else if (index == 6) {
        this.isFinished = true;
        this.isVaccinated = true;
        this.reservation = this.stepperService.steps[6].data;
        this.clearStepContainer();
      } else {
        this.isFinished = true;
        this.clearStepContainer();

        setTimeout(() => {
          this.checkVaccinationStatus();
        }, 3000);
      }
    });
  }

  initStep() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.currentStep.component);

    const viewContainerRef = this.stepHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<any>(componentFactory);
    componentRef.instance.data = this.currentStep.data;
  }

  clearStepContainer() {
    const viewContainerRef = this.stepHost.viewContainerRef;
    viewContainerRef.clear();
  }

  cancelOrder(modalId: string, reservation: Reservation) {
    this.closeModal(modalId);
    this.dataService.removeBookingOfUser(reservation.user_id).subscribe(() => {
      console.log("Reservation wurde erfolgreich storniert.")
      this.stepperService.currentStepIndex.next(1);
      this.checkVaccinationStatus();
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
