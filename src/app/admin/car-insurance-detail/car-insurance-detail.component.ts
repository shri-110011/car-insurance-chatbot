import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { AdminHelperService } from "../admin-helper.service";
import { InsuranceDetail } from "../info-structure";

@Component({
    selector: 'app-car-insurance-details',
    templateUrl: 'car-insurance-detail.component.html',
    styleUrls: ['car-insurance-detail.component.css']
})
export class CarInsuranceDetailsComponent implements OnInit, OnDestroy{

    insuranceDetails: InsuranceDetail[];
    totalPolicyHolders = 0;
    getInsuranceDetailSub: Subscription;
    isLoading = true;

    constructor(private adminHelperService: AdminHelperService) { }

    ngOnInit() {
        this.getInsuranceDetailSub = this.adminHelperService.getInsuranceDetail().pipe(
            map((data)=>{
                data.forEach(obj=>{
                  this.totalPolicyHolders += obj['insuranceCount']; 
                })
                return data;
              })
        )     
        .subscribe(res=> {
            console.log(res);
            this.insuranceDetails = res;
            this.isLoading = false
        });
    }

    getChatPercentage(policiesCount) {
        return (policiesCount*100/this.totalPolicyHolders).toFixed(2);
    }

    ngOnDestroy() {
        this.getInsuranceDetailSub.unsubscribe();
    }
}