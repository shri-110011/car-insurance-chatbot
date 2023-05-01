import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ChatMessage,
  ChatMessageDetail,
  InsuranceDetail,
} from './info-structure';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminHelperService {
  private _getChatDetailApi = environment.apiURL + 'chat/getChatDetails';
  private _getChatApi = environment.apiURL + 'chat/getUserChats';

  private _getInsuranceDetailApi =
    environment.apiURL + 'car-insurance/getCarInsuranceDetails';

  constructor(private http: HttpClient) {}

  /* getChatDetail() send get request to the 'chat/getChatDetails' api
    in order to get the chat statistics.
    Response body: Array of objects of type ChatMessageDetail
    */
  getChatDetail(): Observable<ChatMessageDetail[]> {
    return this.http.get<ChatMessageDetail[]>(this._getChatDetailApi, {});
  }

  /* getChat() send post request to the 'chat/getUserChats' api
    in order to get the chats. 
    Request body: {chatCount: number}
    Response body: Array of objects of type ChatMessage */
  getChat(chatCount: number): Observable<ChatMessage[]> {
    return this.http.post<ChatMessage[]>(this._getChatApi, {
      chatCount: chatCount,
    });
  }

  /* getInsuranceDetail() send get request to the 
    'car-insurance/getCarInsuranceDetails' api in order to get the insurance 
    statistics.
    Response body: Array of objects of type InsuranceDetail
    */
  getInsuranceDetail(): Observable<InsuranceDetail[]> {
    return this.http.get<InsuranceDetail[]>(this._getInsuranceDetailApi);
  }
}
