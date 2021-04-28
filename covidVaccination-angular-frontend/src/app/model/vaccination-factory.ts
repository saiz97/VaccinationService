import { Vaccination } from "./vaccination";
import { Time } from "@angular/common";

export class VaccinationFactory {
  static empty(): Vaccination {
    return new Vaccination(null, new Date(), {hours: 0, minutes: 0} as Time, {hours: 0, minutes: 0} as Time, 0, 15, 0, 0, new Map<string, number>());
  }

  static fromObject(rawVac: any): Vaccination {
    return new Vaccination(
      rawVac.id,
      rawVac.date,
      rawVac.fromTime,
      rawVac.toTime,
      rawVac.availableSlots,
      rawVac.slotSizeInMinutes,
      rawVac.totalAttendeesPerSlot,
      rawVac.vaccination_location_id,
      new Map(Object.entries(rawVac.reservationSlots)),
      rawVac.state_id,
      rawVac.city,
      rawVac.zipCode,
      rawVac.place,
      rawVac.state
    );
  }
}
