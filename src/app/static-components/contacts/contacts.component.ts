import { Component } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-contacts",
    templateUrl: "./contacts.component.html",
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
    contactsImgUrl = environment.apiURL + 'public/images/b.jpg';
}