import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminHelperService } from '../admin-helper.service';
import { ChatMessage } from '../info-structure';

@Component({
  selector: 'app-chatlog',
  templateUrl: './chatlog.component.html',
  styleUrls: ['./chatlog.component.css']
})
export class ChatlogComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('chatCount') chatCount: ElementRef;
  chats: ChatMessage[];
  
  getChatSub: Subscription;

  constructor(private adminHelperService: AdminHelperService) { }

  ngOnInit(): void {
    // Here we are initializing the chats to an empty array.
    this.chats = [];
  }

  //Code to get the chat details once the admin clicks the chatlog button 
  ngAfterViewInit() {
    this.getChatSub = this.adminHelperService.getChat(+this.chatCount.nativeElement.value).subscribe(res=> {
      console.log(res);
      this.chats = res;
    })
  }
  onGetChats() {
    console.log(typeof +this.chatCount.nativeElement.value);
    this.getChatSub = this.adminHelperService.getChat(+this.chatCount.nativeElement.value).subscribe(res=> {
      console.log(res);
      this.chats = res;
    })
  }

  getChatDate(utcDate) {
    return new Date(utcDate).toString().slice(0, 33);
  }

  ngOnDestroy() {
    this.getChatSub.unsubscribe();
  }
}
