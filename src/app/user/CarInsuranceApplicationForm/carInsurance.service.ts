import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarInsuranceApplicationFormModel } from './carInsuranceApplicationForm.model';
import { CarInsuranceDetailsModel } from '../CarInsuranceDetails/carInsuranceDetails.model';
import { environment } from '../../../environments/environment';
import { HelperService } from 'src/app/shared/helper.service';

@Injectable()
export class CarInsuranceService {
  insuranceDetails: CarInsuranceApplicationFormModel;
  insuranceTakenOn: string;
  /* isInsuranceApplied property is used to decide whether to display the 
    carInsuranceSuccessPageComponent or not. */
  isInsuranceApplied: boolean;

  private _carInsuranceApplyApi = environment.apiURL + 'car-insurance/apply';
  private _carInsuranceDetailsApi =
    environment.apiURL + 'car-insurance/details';
  private _carInsuranceClaimApi = environment.apiURL + 'car-insurance/claim';

  constructor(private http: HttpClient, private helperService: HelperService) {}

  /* applyCarInsurance() method calls the 'car-insurance/apply' api to apply for 
    the car insurance. 
    Request body requires an object of type: CarInsuranceApplicationFormModel
    Response body: {statusCode:number, message: string, errorCode?: string, 
      insuranceId?: number}
    
    For success case:
    Response: {statusCode: 200, message: "Car insurance application processed 
    successfully!", insuranceId: number_generated_from_db}

    For duplicate license plate number case:
    Response: {statusCode: 400, message: 'License Plate Number 
    {provided_license_plate_number} already exists!', errorCode: 'DUP_LIC_PLATE_NO'}
    
    For provided email id in the form mismatch case:
    Response: {statusCode: 400, message: 'Provided email didn't match the account 
    email id!', errorCode: 'EMAIL_ID_MISMATCH'}
    */
  applyCarInsurance(
    insuranceDetails: CarInsuranceApplicationFormModel
  ): Observable<HttpResponse<object>> {
    insuranceDetails.insuranceAppliedDate = this.insuranceTakenOn;
    return this.http.post<object>(
      this._carInsuranceApplyApi,
      insuranceDetails,
      {observe: "response"}
    );
  }

  /* getCarInsuranceDetails() method calls the 'car-insurance/details' api to get
    details of all the applied car insurances from a particular account id. */
  getCarInsuranceDetails(): Observable<CarInsuranceDetailsModel[]> {
    return this.http.get<CarInsuranceDetailsModel[]>(
      this._carInsuranceDetailsApi
    );
  }

  /* claimCarInsurance() method calls the 'car-insurance/claim' api to claim car 
    insurance.
    Request body: {claimData: {insuranceId: string, claimDate: string}}
    Case 1: When car insurance claim process occurrs successfully.
    Response body:
    {
        "statusCode": 200,
        "message": "Car insurance claimed successfully!",
        "insuranceId": "1000001"
    }

    Case 2: When invalid car insurance id is provided.
    Response body:
    {
      "error": {
          "statusCode": 400,
          "message": "Invalid insurance id!",
          "insuranceId": "1000001"
      }
    }

    Case 3: When user tries to claim a car insurance linked to another account.
    Response body:
    {
      "error": {
          "statusCode": 403,
          "message": "Provided insurance id is not linked to your account!",
          "insuranceId": "1000001"
      }
    }

    Case 4: When user provides an insurance id which has already been claimed.
    Response body:
    {
      "error": {
          "statusCode": 400,
          "message": "Insurance has already been claimed!",
          "insuranceId": "1000001"
      }
    }
    */
  claimCarInsurance(claimData): Observable<any> {
    claimData['claimDate'] = this.helperService.getDate();
    return this.http.post<any>(this._carInsuranceClaimApi, {
      claimData: claimData,
    }, {observe: "response"});
  }
}
