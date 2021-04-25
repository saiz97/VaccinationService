import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StepDirective } from 'src/app/service/stepper.directive';
import { StepperService, Step } from 'src/app/service/stepper.service';

@Component({
  selector: 'app-patient-area',
  templateUrl: './patient-area.component.html',
  styleUrls: ['./patient-area.component.scss']
})
export class PatientAreaComponent implements OnInit {
  @ViewChild(StepDirective, {static: true}) stepHost: StepDirective;

  stepperSubscription: Subscription;
  currentStep: Step = null;

  constructor(private stepperService: StepperService,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.stepperSubscription = this.stepperService.currentStepIndex.subscribe((index) => {
      this.currentStep = this.stepperService.steps[index];
      console.log("Current Step: ", this.currentStep);
      this.initStep();
    });
  }

  initStep() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.currentStep.component);

    const viewContainerRef = this.stepHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<any>(componentFactory);
    componentRef.instance.data = this.currentStep.data;
  }

}
