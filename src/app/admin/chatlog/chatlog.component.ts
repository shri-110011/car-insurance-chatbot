import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminHelperService } from '../admin-helper.service';
import { ChatMessage } from '../info-structure';

@Component({
  selector: 'app-chatlog',
  templateUrl: './chatlog.component.html',
  styleUrls: ['./chatlog.component.css'],
})
export class ChatlogComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chatCount') chatCount: ElementRef;
  chats: ChatMessage[];

  getChatSub: Subscription;
  isLoading = true;

  constructor(private adminHelperService: AdminHelperService) {}

  ngOnInit(): void {
    // Here we are initializing the 'chats' property to an empty array.
    this.chats = [];
  }

  /* Code to get the chat details using the getChat() method of 
  AdminHelperService after the view for this ChatlogComponent has been 
  initialized. 
  Note: We have placed this code to get chat details inside ngAfterViewInit
  because we are accessing a reference to the ChatlogComponent's template 
  element over here. */
  ngAfterViewInit() {
    this.getChatSub = this.adminHelperService
      .getChat(+this.chatCount.nativeElement.value)
      .subscribe((res) => {
        console.log(res);
        this.chats = res;
        this.isLoading = false;
      });
  }

  /* Code to get the chat details when the user clicks on the 'Get Chats' 
  button. */
  onGetChats() {
    console.log(typeof +this.chatCount.nativeElement.value);
    this.getChatSub = this.adminHelperService
      .getChat(+this.chatCount.nativeElement.value)
      .subscribe((res) => {
        console.log(res);
        this.chats = res;
      });
  }

  /* getChatDate() converts the ISO-8601 UTC time to local time and
  then strip the date in order to format it. 
  
  ISO-8601 UTC time: 2023-04-22T05:28:56.000Z

  new Date('2023-04-22T05:28:56.000Z') returns:
  Sat Apr 22 2023 10:58:56 GMT+0530 (India Standard Time)

  Formatted date from getChatDate():
  Sat Apr 22 2023 10:58:56 GMT+0530 */
  getChatDate(utcDate) {
    return new Date(utcDate).toString().slice(0, 33);
  }

  ngOnDestroy() {
    this.getChatSub.unsubscribe();
  }
}
