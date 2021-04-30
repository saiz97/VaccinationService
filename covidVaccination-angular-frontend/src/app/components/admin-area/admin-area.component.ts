import { Component, OnInit } from '@angular/core';
import { Vaccination } from 'src/app/model/vaccination';
import { DataStorageService } from 'src/app/service/data-storage.service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.scss']
})
export class AdminAreaComponent implements OnInit {

  states: Set<string> = new Set<string>();
  cities: Map<string, string> = new Map();
  places: Map<string, string> = new Map();

  filteredCities;
  filteredPlaces;

  vaccinations: Vaccination[] = [];

  constructor(private dataService: DataStorageService) { }

  ngOnInit(): void {
    this.dataService.getAllLocations().subscribe((locations) => {
      console.log("Locations: ", locations);
      locations.forEach((loc) => {
        this.states.add(loc.stateName);
        this.cities.set(loc.city, loc.stateName);
        this.places.set(loc.place, loc.city);
      });

      this.filteredCities = new Map([...this.cities].filter(([k, v]) => v == [...this.states][0]));
      this.filteredPlaces = new Map([...this.places].filter(([k, v]) => v == [...this.filteredCities].reverse()[0][0]));
    });

    this.dataService.getAllVaccinations().subscribe((vaccinations) => {
      this.vaccinations = vaccinations;
    });
  }

  onStateChange(state) {
    this.filteredCities = new Map([...this.cities].filter(([k, v]) => v == state));
    this.filteredPlaces = new Map([...this.places].filter(([k, v]) => v == [...this.filteredCities].reverse()[0][0]));
  }

  onCityChange(city) {
    this.filteredPlaces = new Map([...this.places].filter(([k, v]) => v == city));
  }

  onDelete(vacId: number) {
    if(confirm("Impftermin wirklich löschen?")) {
      this.dataService.deleteVaccination(vacId).subscribe((res) => {
        this.vaccinations = this.vaccinations.filter(function( vac ) {
          return vac.id !== vacId;
        });
      });
    }
  }

  onSetFilter() {

  }
}
