import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Forms/Login/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  /* In ngOnInit() lifecycle hook we are re-directing the user back to the 
  path '/home' if he/she is an admin. */
  ngOnInit() {
    if (this.loginService.getLoggedInUser().isAdmin) {
      this.router.navigate(['/home']);
    }
  }
}
