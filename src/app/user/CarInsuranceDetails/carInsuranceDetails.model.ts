export class CarInsuranceDetailsModel {
    aadhaarNo: number;
    customerName: string;
    street: string;
    city: string;
    pincode: number;
    state: string;
    country: string;
    phone: number;
    email: string;
    carModel: string;
    licensePlateNo: string;
    insurancePlan: string;
    insuranceId?: number;
    insuranceAppliedDate?: string;
    insuranceClaimedDate?: string;
    claimStatus?: string;
    
    constructor(){
        this.aadhaarNo = null;
        this.customerName = null;
        this.street = null;
        this.city = null;
        this.pincode = null;
        this.state = null;
        this.country = null;
        this.phone = null;
        this.email =null;
        this.carModel = null,
        this.licensePlateNo = null,
        this.insurancePlan = null,
        this.insuranceId = null;
        this.claimStatus = null;
    }
}