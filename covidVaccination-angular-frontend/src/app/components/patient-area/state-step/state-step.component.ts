import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/model/state';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { StepperService } from 'src/app/service/stepper.service';

@Component({
  selector: 'div.app-state-step',
  templateUrl: './state-step.component.html',
  styleUrls: ['./state-step.component.scss']
})
export class StateStepComponent implements OnInit {

  states: State[] = [];

  constructor(private stepperService: StepperService,
    private dataService: DataStorageService) { }

  ngOnInit(): void {
    console.log("State Step!");
    this.dataService.getAllStates().subscribe((states) => {
      this.states = states;
      console.log("=== states: ", this.states);
    })
  }

  next(state: State) {
    this.stepperService.steps[1].data = state;
    this.stepperService.currentStepIndex.next(2);
  }

}
