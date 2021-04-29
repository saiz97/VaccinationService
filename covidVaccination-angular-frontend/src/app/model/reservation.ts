export interface Reservation {
  id: number,
  user_id: number,
  vaccination_id: number,
  selectedSlot: number,
  vaccinationDate?: string,
  selectedSlotLabel?: string,
}
