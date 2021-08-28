import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth-service";

@Directive({
    selector: '[navbarCollapse]'
})
export class NavbarCollapseDirective {

    navbarToggleEvent:Subscription;
    
    constructor(private el: ElementRef, private authService: AuthService) { 
        let htmlEl: HTMLElement = el.nativeElement as HTMLElement;
        console.log(htmlEl);
        console.log(el);
    }

    @HostBinding('class.in') isIn = false;

    @HostListener('document:click', ['$event']) navbarCollapseToggle(event: Event) {
        console.log("Inside navbarCollapse.directive.ts navbarCollapseToggle");
        console.log(event.target["className"]);
        if(event.target["className"]==="navbar-toggle" || event.target["className"]==="icon-bar") {
            console.log("Inside navbarCollapse.directive.ts if");
            this.isIn = !this.isIn;
        }
        else {
            console.log("Inside navbarCollapse.directive.ts else");
            if(window.innerWidth<920){
                this.isIn = this.el.nativeElement.contains(event.target)?!this.isIn:false;
            }
        }
        console.log("isIn:"+this.isIn);
    }
}