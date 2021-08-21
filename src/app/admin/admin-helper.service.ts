import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ChatMessage, ChatMessageDetail, InsuranceDetail } from "./info-structure";
import { environment } from "../../environments/environment"; 

@Injectable({
    providedIn: 'root'
})
export class AdminHelperService {

    private _getChatDetailApi = environment.apiURL+"chat/getChatDetail";
    private _getChatApi = environment.apiURL+"chat/getChat";

    private _getInsuranceDetailApi = environment.apiURL+"car-insurance/getInsuranceDetail";

    constructor(private http: HttpClient) { }

    getChatDetail(): Observable<ChatMessageDetail[]> {
        return this.http.post<ChatMessageDetail[]>(this._getChatDetailApi, {});
    }

    getChat(chatCount: number): Observable<ChatMessage[]> {
        // console.log("Inside getChat service");
        return this.http.post<ChatMessage[]>(this._getChatApi, {chatCount: chatCount});
    }

    getInsuranceDetail(): Observable<InsuranceDetail[]> {
        return this.http.post<InsuranceDetail[]>(this._getInsuranceDetailApi, {});
    }
}