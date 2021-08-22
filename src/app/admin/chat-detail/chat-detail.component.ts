import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ChatMessageDetail } from '../info-structure';
import { AdminHelperService } from '../admin-helper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit, OnDestroy {

  totalChats = 0;
  chatDetails: ChatMessageDetail[];

  getChatDetailSub: Subscription;
  isLoading = true;

  constructor(private adminHelperService: AdminHelperService) { }

  ngOnInit(): void {
    this.getChatDetailSub = this.adminHelperService.getChatDetail().pipe(
      map((data)=>{
        data.forEach(obj=>{
          this.totalChats += obj['chatCount']; 
        })
        return data;
      })
    )
    .subscribe(res=> {
      console.log(res);
      this.chatDetails = res;
      this.isLoading = false;
    })
  }

  //Code to convert chat count correspoding to each chat intent into percentage.
  getChatPercentage(chatCount) {
    return (chatCount*100/this.totalChats).toFixed(2);
  }

  ngOnDestroy() {
    this.getChatDetailSub.unsubscribe();
  }

}
