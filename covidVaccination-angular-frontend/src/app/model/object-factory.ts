import { Vaccination } from "./vaccination";
import { Reservation } from "./reservation";
import { User } from "./user";

export class ObjectFactory {
  static empty(): Vaccination {
    return new Vaccination(null, new Date(), "", "", 0, 15, 0, 0);
  }

  static vaccinationFromObject(rawVac: any): Vaccination {
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

  static reservationFromObject(rawRes: any): Reservation {
    const user = new User(
        rawRes.user.id,
        rawRes.user.ssn,
        rawRes.user.email,
        rawRes.user.firstName,
        rawRes.user.lastName,
        (rawRes.user.isAdmin == 1) ? true : false,
        (rawRes.user.isVaccinated == 1) ? true : false
      );

    return new Reservation(
      rawRes.id,
      rawRes.user_id,
      rawRes.vaccination_id,
      rawRes.selectedSlot,
      rawRes.vaccinationDate,
      rawRes.selectedSlotLabel,
      user);
  }
}
