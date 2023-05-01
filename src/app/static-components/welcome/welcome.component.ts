import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth-service";

@Component({
    selector: 'app-welcome',
    templateUrl: 'welcome.component.html',
    styles: ['welcome.component.css']
})
export class WelcomeComponent implements OnInit {
    userName = "";
    constructor(private authService: AuthService) { 
    }

    ngOnInit() {
        this.userName = this.authService.userName;
    }

}