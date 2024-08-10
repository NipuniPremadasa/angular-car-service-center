export interface OwnerDetails {
  name: string;
  contactNumber: string;
  email: string;
  address: string;
}

export interface CarDetails {
  carId: number;
  make: string;
  model: string;
  year: number;
  VIN: string;
  ownerDetails: OwnerDetails;
}
