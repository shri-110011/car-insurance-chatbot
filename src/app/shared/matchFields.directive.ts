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
        const controlToCompare = control.parent.get(this.appMatchFields);
        // console.log('#');
        if(control.value === '' || control.value === controlToCompare.value)
            return null;
        else
            return {'notEqual': true};
    }
}