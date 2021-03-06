import { Time } from "@angular/common";

export class Vaccination {
  constructor(
    public id: number,
    public date: Date,
    public fromTime: string,
    public toTime: string,
    public availableSlots: number,
    public slotSizeInMinutes: number,
    public totalAttendeesPerSlot: number,
    public vaccination_location_id: number,
    public reservationSlots?: Map<string, number>,
    public state_id?: number,
    public city?: string,
    public zipCode?: number,
    public place?: string,
    public state?: string) {}

}
