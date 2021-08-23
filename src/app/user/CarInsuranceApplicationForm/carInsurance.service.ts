import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CarInsuranceApplicationFormModel } from "./carInsuranceApplicationForm.model";
import { CarInsuranceDetailsModel } from "../CarInsuranceDetails/carInsuranceDetails.model";
import { environment } from "../../../environments/environment"; 

@Injectable()
export class CarInsuranceService {

    insuranceDetails: CarInsuranceApplicationFormModel;
    insuranceTakenOn: string;
    // isInsuranceApplied property is used to decide whether to display the 
    // carInsuranceSuccessPageComponent or not.
    isInsuranceApplied: boolean;
    
    private _carInsuranceApplyApi = environment.apiURL+"car-insurance/apply";
    private _carInsuranceDetailsApi = environment.apiURL+"car-insurance/details";
    private _carInsuranceClaimApi = environment.apiURL+"car-insurance/claim";
    
    constructor(private http: HttpClient) { }

    applyCarInsurance(insuranceDetails:CarInsuranceApplicationFormModel): Observable<[]>{
        insuranceDetails.insuranceAppliedDate = this.insuranceTakenOn;
        return this.http.post<[]>(this._carInsuranceApplyApi, insuranceDetails);
    }

    getCarInsuranceDetails(): Observable<CarInsuranceDetailsModel[]> {
        return this.http.get<CarInsuranceDetailsModel[]>(this._carInsuranceDetailsApi);
    }

    claimCarInsurance(claimData): Observable<{string: string}> {
        claimData["claimDate"] = this.getDate();
        return this.http.post<{string: string}>(this._carInsuranceClaimApi, {claimData: claimData});
    }

    getDate() {
        var x = new Date();
        var year = x.getFullYear();
        var month = x.getMonth()<10? 0+""+(x.getMonth()+1): (x.getMonth()+1);
        var date = x.getDate()<10? 0+""+x.getDate(): x.getDate();
        var time = x.toLocaleTimeString();
        if(time.includes("PM")) {
            if(parseInt(time.split(":")[0])!=12) {
                time=(parseInt(time.charAt(0))+12)+time.substring(1, time.indexOf('PM')-1);
            }
            else {
                time.substring(0, time.indexOf('PM')-1)
            }
        }
        else if(time.includes("AM")) {
            if(parseInt(time.split(":")[0])!=12) {
                time=time.substring(0, time.indexOf('AM')-1);
            }
            else {
                time="00"+time.substring(2, time.indexOf('AM')-1);
            }
        }
        return year+"-"+month+"-"+date+" "+time;
    }
    
}