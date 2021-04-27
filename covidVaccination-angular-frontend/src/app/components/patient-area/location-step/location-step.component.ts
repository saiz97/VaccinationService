import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { StepperService } from 'src/app/service/stepper.service';
import { Location } from 'src/app/model/location';

@Component({
  selector: 'app-location-step',
  templateUrl: './location-step.component.html',
  styleUrls: ['./location-step.component.scss']
})
export class LocationStepComponent implements OnInit {

  selectedCity: string = "";
  selectedPlace: string = "";
  placesOfSelectedCity: string[] = [];

  cities = new Set<string>();
  places = new Set<{city: string, place: string}>();

  constructor(private stepperService: StepperService,
              private dataService: DataStorageService) { }

  ngOnInit(): void {
    console.log("Location Step!");
    if(this.stepperService.steps[1].data) {
      this.dataService.getLocationsOfState(this.stepperService.steps[1].data.state).subscribe((locs) => {
        if (locs.length > 0 && locs != null && locs != undefined) {
          locs.forEach((loc: Location) => {
            let city = {name: loc.city};
            this.cities.add(loc.city);
            this.places.add({city: loc.city, place: loc.place});
          });
        } else {
          this.stepperService.reset();
        }
      });
    }

  }

  onChangeCity(city: string) {
    console.log("Selected city: ", this.places);
    this.selectedCity = city;
    this.getPlacesOfSelectedCity();
  }

  getPlacesOfSelectedCity() {
    let places = [];
    this.places.forEach((place) => {
      if(place.city == this.selectedCity) {
        places.push(place.place);
      }
    });
    return places;
  }

  next() {
    this.stepperService.steps[2].data = {
      city: this.selectedCity,
      place: this.selectedPlace
    };
    this.stepperService.currentStepIndex.next(3);
  }


}
