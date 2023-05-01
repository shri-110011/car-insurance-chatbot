export class CarInsuranceApplicationFormModel {
  aadhaarNo: number;
  customerName: string;
  address: {
    street: string;
    city: string;
    pincode: number;
    state: string;
    country: string;
  };
  phone: number;
  email: string;
  carModel: string;
  licensePlateNo: string;
  insurancePlan: string;
  insuranceId?: number;
  insuranceAppliedDate?: string;
  insuranceClaimedDate?: string;
  claimStatus?: string;

  constructor() {
    this.aadhaarNo = null;
    this.customerName = null;
    this.address = {
      street: null,
      city: null,
      pincode: null,
      state: null,
      country: null,
    };
    this.phone = null;
    this.email = null;
    (this.carModel = null),
      (this.licensePlateNo = null),
      (this.insurancePlan = null),
      (this.insuranceId = null);
    this.claimStatus = null;
  }
}
