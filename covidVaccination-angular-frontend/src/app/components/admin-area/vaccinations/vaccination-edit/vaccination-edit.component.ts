import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/model/reservation';
import { Vaccination } from 'src/app/model/vaccination';
import { ObjectFactory } from 'src/app/model/object-factory';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-vaccination-edit',
  templateUrl: './vaccination-edit.component.html',
  styleUrls: ['./vaccination-edit.component.scss']
})
export class VaccinationEditComponent implements OnInit {

  editForm: FormGroup;

  vaccination: Vaccination = ObjectFactory.empty();
  reservations: Reservation[] = [];

  cities: Map<string, string> = new Map();
  places: Map<string, string> = new Map();

  stateName: string = "";
  locations;
  filteredCities;
  filteredPlaces;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataStorageService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const vacId = this.route.snapshot.params['id'];
    this.initForm();

    this.dataService.getVaccinationById(vacId).subscribe((vaccination) => {
      this.vaccination = ObjectFactory.vaccinationFromObject(vaccination);

      this.initForm();
      this.editForm.controls['date'].setValue(this.vaccination.date);

      this.dataService.getAllLocations().subscribe((locations) => {
        this.locations = locations;
        locations.forEach((loc) => {
          if (this.vaccination.vaccination_location_id === loc.id) this.stateName = loc.stateName;
          this.cities.set(loc.city, loc.stateName);
          this.places.set(loc.place, loc.city);
        });

        this.filteredCities = new Map([...this.cities].filter(([k, v]) => v == this.stateName));
        this.filteredPlaces = new Map([...this.places].filter(([k, v]) => v == [...this.filteredCities].reverse()[0][0]));
        this.editForm.controls['place'].setValue([...this.filteredPlaces][0][0]);
      });
    })

    this.dataService.getReservationsByVaccination(vacId).subscribe((reservations) => {
      reservations.forEach((reservation) => {
        this.reservations.push(ObjectFactory.reservationFromObject(reservation));
      });
      console.log("== ", this.reservations);
    })
  }

  initForm() {
    let placeFC = this.formBuilder.control({disabled: !this.filteredPlaces}, Validators.required);
    this.editForm = this.formBuilder.group({
      place: placeFC,
      date: ["", Validators.required],
      attendees: [this.vaccination.totalAttendeesPerSlot, [Validators.required, Validators.min(0)]]
    });
  }

  onStateChange(state) {
    this.filteredCities = new Map([...this.cities].filter(([k, v]) => v == state));
    this.filteredPlaces = new Map([...this.places].filter(([k, v]) => v == [...this.filteredCities].reverse()[0][0]));
    this.editForm.controls['place'].setValue([...this.filteredPlaces][0][0]);
  }

  onCityChange(city) {
    this.filteredPlaces = new Map([...this.places].filter(([k, v]) => v == city));
    this.editForm.controls['place'].setValue([...this.filteredPlaces][0][0]);
  }

  vaccinatePerson(user: User) {
    this.dataService.updateUserVaccinationStatus(user.ssn, !user.isVaccinated).subscribe(() => {
      this.reservations.find((res) => res.user_id == user.id).user.isVaccinated = !user.isVaccinated;
    });
  }

  saveVaccination() {
    let update = {
      id: this.vaccination.id,
      date: this.editForm.controls['date'].value,
      totalAttendeesPerSlot: this.editForm.controls['attendees'].value,
      vaccination_location_id: this.locations.find((loc) => loc.place === this.editForm.controls['place'].value).id,
    };

    if (confirm("Änderungen wirklich speichern?\nDies würde aktuelle Informationen zu diesem Termin überschreiben."))
    this.dataService.updateVaccination(update).subscribe(() => {
      alert("Änderungen wurden gespeichert.");
    });
  }
}
