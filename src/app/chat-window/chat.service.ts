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
    let chatDateString = this.getDate();
    return this.http.post<string[]>(this._chatsPostApi, {"user-msg": chatMsg, "chatDate": chatDateString});
  }

  getResponseForChosenTopic(optionId: string): Observable<string[]> {
    let chatDateString = this.getDate();
    return this.http.post<string[]>(this._getResponseApi, {"need": optionId, "chatDate": chatDateString});
  }

  getDate() {
    var x = new Date();
    var year = x.getFullYear();
    var month = x.getMonth()<10? 0+""+(x.getMonth()+1): (x.getMonth()+1);
    var date = x.getDate()<10? 0+""+x.getDate(): x.getDate();
    var time = x.toLocaleTimeString();
    if(time.includes("PM")) {
      if(parseInt(time.split(":")[0])!=12) {
          time=(parseInt(time.charAt(0))+12)+time.substring(1, time.indexOf('PM')-1);
      }
      else {
          time.substring(0, time.indexOf('PM')-1)
      }
    }
    else if(time.includes("AM")) {
        if(parseInt(time.split(":")[0])!=12) {
            time=time.substring(0, time.indexOf('AM')-1);
        }
        else {
            time="00"+time.substring(2, time.indexOf('AM')-1);
        }
    }
    return year+"-"+month+"-"+date+" "+time;
}
}
