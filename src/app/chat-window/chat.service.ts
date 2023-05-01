import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment"; 
import { HelperService } from '../shared/helper.service';

@Injectable()
export class ChatService {

  private _chatsPostApi = environment.apiURL+"chat/postChat";
  private _getResponseApi = environment.apiURL+"chat/getResponseForTopicsChosen";

  constructor(private http: HttpClient, private helperService: HelperService) { }

  /* postChats() sends a post request to the 'chat/postChat' api to store the
  question that the user asked the chatbot by typing in the chat console and
  to get its response. 

  Request body: {"user-msg": string, "chatDate": string} 
  Response body: Array of string objects. Each string contains HTML text. */
  postChats(chatMsg: string): Observable<string[]>{
    let chatDateString = this.helperService.getDate();
    return this.http.post<string[]>(this._chatsPostApi, {"user-msg": chatMsg, "chatDate": chatDateString});
  }

  /* getResponseForChosenTopic() sends a post request to the 
  'chat/getResponseForTopicsChosen' api to store the question that the user 
  asked the chatbot by using the bot provided option and to get its response.

  Request body: {"need": string, "chatDate": string}
  Response body: Array of string objects. Each string contains HTML text. */
  getResponseForChosenTopic(optionId: string): Observable<string[]> {
    let chatDateString = this.helperService.getDate();
    return this.http.post<string[]>(this._getResponseApi, {"need": optionId, "chatDate": chatDateString});
  }
}
