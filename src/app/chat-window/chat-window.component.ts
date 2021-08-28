import { Component, 
         ViewChild,
         ComponentFactoryResolver,
         ViewContainerRef,
         ElementRef,
         AfterViewInit,
         OnDestroy
        } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { ChatService } from "./chat.service";
import { ChatbotMsgBlockComponent } from "./chatbot-msg-block/chatbot-msg-block.component";
import { UserMsgBlockComponent } from "./user-msg-block/user-msg-block.component";


@Component({
    selector: "app-chat-window",
    templateUrl: "./chat-window.component.html",
    styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements AfterViewInit, OnDestroy{

    @ViewChild("chatMsgRef", { read: ViewContainerRef, static: false }) target: ViewContainerRef;
    @ViewChild("userMsgRef") userMsgRef: ElementRef;

    chatResponse:string[] = [];

    postChatsSub: Subscription;
    getResponseForTopicsChosenSub: Subscription;

    //This chatResponse array is used to store the chatbot's responses.
    // chatResponse = ["<div>Hello user, how can I help you?<div>", "I am Eri a car insurance chatbot.", "I can tell you about car insurance."];

    //This chatResponse array is for test purpose.
    //chatResponse = ["<div>Hello user, how can I help you?<div>", "I am Eri a car insurance chatbot.", "I can tell you about car insurance."];


    constructor(private _chatService: ChatService, 
                private componentFactoryResolver: ComponentFactoryResolver,
                private sanitizer: DomSanitizer
    ) { }

    onAsk(userMsg: HTMLInputElement){
         //This will return the userMsg input element.
        //console.log(userMsg);
        
        //This will return the userMsg input element's value.
        console.log(userMsg.value);
        this.createUserMsgBlockComponent(userMsg.value);
        
        //This will return the latest 10 chats from the database.
        //this._chatService.getChats().subscribe(data => {this.chatData = data; console.log(this.chatData)});
        
        //This will post the user chat message to the database and get back the correct reponse.
        this.postChatsSub = this._chatService.postChats(userMsg.value).subscribe(data => {
            this.chatResponse = data; 
            console.log(this.chatResponse);
            console.log("Chatbot response received successfully!");
            this.generateChatbotResponse();
        });

        this.userMsgRef.nativeElement.value = "";
        
        //Testing the chatbot-msg-block component here with dummy message.
        //this.createChatbotMsgBlockComponent("<b>Welcome user how can I help you.</b>");
        
    }

    generateChatbotResponse() {
        this.chatResponse.forEach((response,i) => {
            setTimeout(()=>{
                i++;
                // console.log("Response: "+i);
                // console.log(response);
                this.createChatbotMsgBlockComponent(response);
                // this.createChatbotMsgBlockComponent2(response);
            }, 500*i);
        });
       
    }

    createUserMsgBlockComponent(message) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(
            UserMsgBlockComponent
        );
        const componentRef = this.target.createComponent(factory);
        componentRef.instance.userMsg = message;
    }

    createChatbotMsgBlockComponent(message) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(
            ChatbotMsgBlockComponent
        );
        const componentRef = this.target.createComponent(factory);
        componentRef.instance.chatbotMsg = this.sanitizer.bypassSecurityTrustHtml(message);
        componentRef.instance.optionWasSelected.subscribe(event=>this.onOptionWasSelected(event));
    }

    onOptionWasSelected(id){
        // console.log("Inside onOptionWasSelected");
        console.log("Id of the bot provided option: "+ id);
        this.getResponseForTopicsChosenSub = this._chatService.getResponseForChosenTopic(id).subscribe(data =>{
            this.chatResponse = data; 
            console.log(this.chatResponse);
            // console.log("Chatbot response for selected option received successfully!");
            this.generateChatbotResponse();
        });
    }

    ngAfterViewInit(){
        setTimeout(()=>this.onOptionWasSelected("intro"), 1000);
    }

    ngOnDestroy() {
        //Cleaning up the subscriptions
        if(this.postChatsSub) {
            this.postChatsSub.unsubscribe();
        }
        if(this.getResponseForTopicsChosenSub) {
            this.getResponseForTopicsChosenSub.unsubscribe();
        }
    }

}