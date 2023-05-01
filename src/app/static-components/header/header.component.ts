import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth-service';
import { LoginService } from 'src/app/Forms/Login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName = '';
  userLoggedIn = false;
  isAdmin = false;
  loginEventSub: Subscription;
  logoutEventSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService
  ) {}

  /* In the ngOnInit() life cycle hook we subscribe to the 'loggedInEvent' and the 
  'loggedOutEvent' event defined in the LoginService. 
  
  When 'loggedInEvent' and the 'loggedOutEvent' event occurs we appropriately set the
  values for 'userName' and 'isAdmin' properties of this HeaderComponent class so
  as to control the visibility of the menu options in the navigation menu.
  */
  ngOnInit() {
    this.loginEventSub = this.authService.loggedInEvent.subscribe((res) => {
      this.userName = res['userName'];
      this.isAdmin = res['isAdmin'];
      this.userLoggedIn = true;
    });

    this.logoutEventSub = this.authService.loggedOutEvent.subscribe(() => {
      this.authService.setLoggedInStatus(false);
      this.userLoggedIn = false;
      this.router.navigate(['/']);
    });
  }

  onLogout() {
    this.logoutEventSub = this.loginService
      .logout()
      .subscribe((res) => {
        console.log(res);
        if (res.status===204 || res.body["logoutStatus"]) {
          this.authService.loggedOutEvent.emit();
        }
      });
  }

  /* We in ngOnDestroy() unsubscribe for the subscriptions made for the 'loggedInEvent' 
  and the 'loggedOutEvent' events. This is necessary when our HeaderComponent gets 
  removed from the DOM. */
  ngOnDestroy() {
    this.loginEventSub.unsubscribe();
    this.logoutEventSub.unsubscribe();
  }
}
