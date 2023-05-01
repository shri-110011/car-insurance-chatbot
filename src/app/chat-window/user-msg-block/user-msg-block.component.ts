import { Component } from '@angular/core';

@Component({
  selector: 'app-user-msg-block',
  templateUrl: './user-msg-block.component.html',
  styleUrls: ['./user-msg-block.component.css'],
})
export class UserMsgBlockComponent {
  userMsg = '';
  userMsgTime: Date;
  msgTime = '';

  constructor() {}

  //This hook method will be fired after user-msg-block.component's instance is created.
  ngOnInit(): void {
    this.userMsgTime = new Date();
    if (this.userMsgTime.getMinutes() < 10)
      this.msgTime =
        this.userMsgTime.getHours() + ':0' + this.userMsgTime.getMinutes();
    else
      this.msgTime =
        this.userMsgTime.getHours() + ':' + this.userMsgTime.getMinutes();
  }
}
