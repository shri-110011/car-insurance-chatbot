import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment"; 

@Injectable()
export class ChatService {

  private _chatsRetreiveApi = environment.apiURL+"chat/getChat";
  private _chatsPostApi = environment.apiURL+"chat/postChat";
  private _getResponseApi = environment.apiURL+"chat/getResponseForTopicsChosen";

  constructor(private http: HttpClient) { }

  getChats(): Observable<string[]>{
    return this.http.get<string[]>(this._chatsRetreiveApi);
  }

  postChats(chatMsg: string): Observable<string[]>{
    return this.http.post<string[]>(this._chatsPostApi, {"user-msg": chatMsg});
  }

  getResponseForChosenTopic(optionId: string): Observable<string[]> {
    return this.http.post<string[]>(this._getResponseApi, {"need": optionId});
  }
}
