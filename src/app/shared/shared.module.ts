import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { AppMatchFields } from "./matchFields.directive";

@NgModule({
    declarations: [
        AppMatchFields,
        LoadingSpinnerComponent
    ],
    imports: [CommonModule],
    exports: [
        AppMatchFields,
        LoadingSpinnerComponent
    ]
})
export class SharedModule {

}