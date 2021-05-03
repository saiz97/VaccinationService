import { User } from "./user";

export class Reservation {
  constructor(
    public id: number,
    public user_id: number,
    public vaccination_id: number,
    public selectedSlot: number,
    public vaccinationDate?: string,
    public selectedSlotLabel?: string,
    public user?: User){};
}
