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
        this.customerName = '';
        this.street = '';
        this.city = '';
        this.pincode = null;
        this.state = '';
        this.country = null;
        this.phone = null;
        this.email = '';
        this.carModel = '',
        this.licensePlateNo = '',
        this.insurancePlan = '',
        this.insuranceId = null;
        this.claimStatus = null;
    }
}