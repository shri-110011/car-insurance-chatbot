import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { AppMatchFields } from "./matchFields.directive";
import { NavbarCollapseDirective } from "./navbarCollapse.directive";

@NgModule({
    declarations: [
        AppMatchFields,
        LoadingSpinnerComponent,
        NavbarCollapseDirective
    ],
    imports: [CommonModule],
    exports: [
        AppMatchFields,
        LoadingSpinnerComponent,
        NavbarCollapseDirective
    ]
})
export class SharedModule {

}