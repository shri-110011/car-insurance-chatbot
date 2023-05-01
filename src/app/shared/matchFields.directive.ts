import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
    selector: '[appMatchFields]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: AppMatchFields,
        multi: true
    }]
})
export class AppMatchFields implements Validator {
    @Input() appMatchFields: string;
    validate(control: AbstractControl): {[key: string]: any} | null {
        /* Here we get a reference to the parent of this element which has 
        this 'appMatchFields' directive and then we look for the element that
        has the formControlName as this.appMatchFields and store the reference 
        of that in controlToCompare. 

        this.appMatchFields is 'password' because this is the formControlName
        for the pasword input field.
        
        So controlToCompare is the refrence to the password input field.*/
        const controlToCompare = control.parent.get(this.appMatchFields);
        if(control.value === '' || control.value === controlToCompare.value)
            return null;
        else
            return {'notEqual': true};
    }
}