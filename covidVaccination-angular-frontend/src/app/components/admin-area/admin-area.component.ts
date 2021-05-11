import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Vaccination } from 'src/app/model/vaccination';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { ModalService } from 'src/app/shared/popup-modal/modal.service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.scss']
})
export class AdminAreaComponent implements OnInit {

  labelStateFilter: string = "Bundesland auswählen...";
  labelCityFilter: string = "Stadt auswählen...";
  labelPlaceFilter: string = "Austragungsort auswählen...";

  filterForm: FormGroup;

  states: Set<string> = new Set<string>();
  cities: Map<string, string> = new Map();
  places: Map<string, string> = new Map();

  vaccinations: Vaccination[] = [];
  shownVaccinations: Vaccination[] = [];

  vaccinationIdOnDelete: number = null;

  constructor(private dataService: DataStorageService, private formBuilder: FormBuilder, private modalService: ModalService) { }

  ngOnInit(): void {
    this.dataService.getAllLocations().subscribe((locations) => {
      console.log("Locations: ", locations);
      locations.forEach((loc) => {
        this.states.add(loc.stateName);
        this.cities.set(loc.city, loc.stateName);
        this.places.set(loc.place, loc.city);
      });
    });

    this.dataService.getAllVaccinations().subscribe((vaccinations) => {
      this.shownVaccinations = (this.vaccinations = vaccinations);
    });

    this.initForm();
  }

  initForm() {
    this.filterForm = this.formBuilder.group({
      state: this.labelStateFilter,
      city: this.labelCityFilter,
      place: this.labelPlaceFilter,
      date: ''
    })
  }

  isInPast(vacDate) {
    return ((new Date()).setHours(0,0,0,0) <= (new Date(vacDate)).setHours(0,0,0,0));
  }

  onDelete(modalId: string) {
    this.dataService.deleteVaccination(this.vaccinationIdOnDelete).subscribe((res) => {
      this.vaccinations = this.vaccinations.filter((vac) => {
        return vac.id !== this.vaccinationIdOnDelete;
      });
      this.shownVaccinations = this.vaccinations;
      this.closeModal(modalId);
    });
  }

  openModal(id: string, vacId: number) {
    this.modalService.open(id);
    this.vaccinationIdOnDelete = vacId;
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.vaccinationIdOnDelete = null;
  }

  onSetFilter() {
    const date = this.filterForm.controls['date'].value;
    const state = this.filterForm.controls['state'].value;
    const city = this.filterForm.controls['city'].value;
    const place = this.filterForm.controls['place'].value;

    if (date != '') {
      this.shownVaccinations = this.shownVaccinations.filter((vac) =>  date === vac.date);
    }
    if (state != this.labelStateFilter) {
      this.shownVaccinations = this.shownVaccinations.filter((vac) =>  vac.state == state);
    }
    if (city != this.labelCityFilter) {
      this.shownVaccinations = this.shownVaccinations.filter((vac) =>  vac.city == city);
    }
    if (place != this.labelPlaceFilter) {
      this.shownVaccinations = this.shownVaccinations.filter((vac) =>  vac.place == place);
    }
  }

  showAllCurrent(target) {
    if (!target.classList.contains('checked')) {
      target.classList.add('checked');
      this.shownVaccinations = this.shownVaccinations.filter((vac) => this.isInPast(vac.date));
    } else {
      target.classList.remove('checked');
      this.onResetFilter();
    }
  }

  onResetFilter() {
    this.shownVaccinations = this.vaccinations;
  }
}
