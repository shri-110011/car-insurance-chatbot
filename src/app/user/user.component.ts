import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Forms/Login/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userName = "";
  constructor(private loginService: LoginService,
              private router: Router
            ) { 
  }

  ngOnInit() {
      if(!this.loginService.getLoggedInUser().isAdmin){
        this.userName = this.loginService.getLoggedInUser()['userName'];
      }
      else{
        this.router.navigate(['/home']);
      }
      
  }

}