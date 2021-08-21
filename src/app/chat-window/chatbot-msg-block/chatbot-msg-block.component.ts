import { Component, ElementRef, EventEmitter, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";

@Component({
    selector: "app-chatbot-msg-block",
    templateUrl: "./chatbot-msg-block.component.html",
    styleUrls: ["./chatbot-msg-block.component.css"],
    //This will make the #options and .topics styles move to global scope.
    encapsulation: ViewEncapsulation.ShadowDom
})
export class ChatbotMsgBlockComponent {

    @ViewChild('chatbotMsgBlock') chatbotMsgBlock: ElementRef;

    chatbotMsg: SafeHtml;
    chatbotMsgTime: Date;
    msgTime = "";

    @Output() optionWasSelected = new EventEmitter<string>();

    constructor() { }
    //This hook method will be fired after chatbot-msg-block.component's instance is created.
    ngOnInit(): void {
        this.chatbotMsgTime = new Date();
        if(this.chatbotMsgTime.getMinutes()<10)
            this.msgTime = this.chatbotMsgTime.getHours()+":0"+this.chatbotMsgTime.getMinutes();
        else
            this.msgTime = this.chatbotMsgTime.getHours()+":"+this.chatbotMsgTime.getMinutes();
    }

    ngAfterViewInit() {
        // console.log("Inside ngAfterViewInit()");
        //This code will make sure that the latest chatbot message is scrolled automatically into view.
        this.chatbotMsgBlock.nativeElement.scrollIntoView();
        
    }

    onOptionSelected(event) {
        // console.log("Inside onOptionSelected");
        //console.log(event.target.className);
        if(event.target.className === 'topics')
            this.optionWasSelected.emit(event.target.id);
    }


}