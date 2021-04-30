import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccination } from 'src/app/model/vaccination';
import { VaccinationFactory } from 'src/app/model/vaccination-factory';
import { DataStorageService } from 'src/app/service/data-storage.service';

/*
"date": "2021.04.23",
    "fromTime": "10:00:00",
    "toTime": "18:00:00",
    "availableSlots": 32,
    "totalAttendeesPerSlot": 5,
    "vaccination_location_id": 1
 */
@Component({
  selector: 'app-vaccination-add',
  templateUrl: './vaccination-add.component.html',
  styleUrls: ['./vaccination-add.component.scss']
})
export class VaccinationAddComponent implements OnInit {

  addForm: FormGroup;
  vaccination: Vaccination = VaccinationFactory.empty();
  errors: { [key: string]: string } = {};

  locations;
  states: Set<string> = new Set<string>();
  cities: Map<string, string> = new Map();
  places: Map<string, string> = new Map();

  filteredCities;
  filteredPlaces;
  isDemoOpen: boolean = false;

  amountOfTimeSlots: number = 0;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataStorageService) { }

  ngOnInit(): void {

    this.dataService.getAllLocations().subscribe((locations) => {
      console.log("Locations: ", locations);
      this.locations = locations;
      locations.forEach((loc) => {
        this.states.add(loc.stateName);
        this.cities.set(loc.city, loc.stateName);
        this.places.set(loc.place, loc.city);
      });

      this.filteredCities = new Map([...this.cities].filter(([k, v]) => v == [...this.states][0]));
      this.filteredPlaces = new Map([...this.places].filter(([k, v]) => v == [...this.filteredCities].reverse()[0][0]));
      this.addForm.controls['place'].setValue([...this.filteredPlaces][0][0]);
    });

    this.addForm = this.formBuilder.group({
      place: [Validators.required],
      date: ['', Validators.required],
      fromTime: ['10:00', Validators.required],
      toTime: ['18:00', Validators.required],
      slotSize: [15, [Validators.required, Validators.min(1), Validators.max(60)]],
      attendees: [5, [Validators.required, Validators.min(0)]]
    });
  }

  onStateChange(state) {
    this.filteredCities = new Map([...this.cities].filter(([k, v]) => v == state));
    this.filteredPlaces = new Map([...this.places].filter(([k, v]) => v == [...this.filteredCities].reverse()[0][0]));
    this.addForm.controls['place'].setValue([...this.filteredPlaces][0][0]);
  }

  onCityChange(city) {
    this.filteredPlaces = new Map([...this.places].filter(([k, v]) => v == city));
    this.addForm.controls['place'].setValue([...this.filteredPlaces][0][0]);
  }

  getAmountOfSlots() {
    let from = this.addForm.controls['fromTime'].value.split(":");
    from = new Date(1970, 0, 1, from[0], from[1], 0);
    let to = this.addForm.controls['toTime'].value.split(":");
    to = new Date(1970, 0, 1, to[0], to[1], 0);

    let diff = (to - from) / 60000;
    const size = this.addForm.controls['slotSize'].value;

    return this.amountOfTimeSlots = Math.ceil(diff / size);
  }

  getTimeSlotDemo() {
    const slots = [];
    let from: Date = this.addForm.controls['fromTime'].value.split(":");
    from = new Date(1970, 0, 1, from[0], from[1], 0);
    let to = this.addForm.controls['toTime'].value.split(":");
    to = new Date(1970, 0, 1, to[0], to[1], 0);

    for (let i = 0; i < this.amountOfTimeSlots; i++) {
      let slot = this.formatTime(from.getHours()) + ":" + this.formatTime(from.getMinutes());
      from = this.addMinutes(from, this.addForm.controls['slotSize'].value);
      slot += " - " + this.formatTime(from.getHours()) + ":" + this.formatTime(from.getMinutes());
      slots.push(slot);
    }

    return slots;
  }

  formatTime(time) {
    return time.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
  }

  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
  }

  saveVaccination() {
    this.vaccination.date = new Date(this.addForm.controls['date'].value);
    this.vaccination.fromTime = this.addForm.controls['fromTime'].value + ":00";
    this.vaccination.toTime = this.addForm.controls['toTime'].value + ":00";
    this.vaccination.slotSizeInMinutes = this.addForm.controls['slotSize'].value;
    this.vaccination.totalAttendeesPerSlot = this.addForm.controls['attendees'].value;
    this.vaccination.availableSlots = this.amountOfTimeSlots;

    let loc = this.locations.filter((loc) => (loc.place === this.addForm.controls['place'].value));
    this.vaccination.vaccination_location_id = (loc.length > 0) ? loc[0].id : null;

    this.dataService.createVaccination(this.vaccination).subscribe((res) => {
      console.log("CREATED!", res);
    })
  }
}
