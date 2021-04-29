import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-service.service';
import { Reservation } from 'src/app/model/reservation';
import { User } from 'src/app/model/user';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { StepDirective } from 'src/app/service/stepper.directive';
import { StepperService, Step } from 'src/app/service/stepper.service';

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
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {
      this.user = this.authService.getCurrentUser()
      this.dataService.checkVaccinationStatus(this.user.id).subscribe((reservation) => {
        this.isVaccinated = (reservation != null);

        if (!this.isVaccinated) {
          this.initStepperSub();
        } else {
          this.reservation = reservation;
          this.clearStepContainer();
        }
      });
    } else {
      this.initStepperSub();
    }
  }

  initStepperSub() {
    this.stepperSubscription = this.stepperService.currentStepIndex.subscribe((index) => {
      if (index < 5) {
        this.currentStep = this.stepperService.steps[index];
        console.log("Current Step: ", this.currentStep, this.stepHost);
        this.initStep();
        this.isFinished = false;
      } else {
        this.isFinished = true;
        this.clearStepContainer();
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
}
