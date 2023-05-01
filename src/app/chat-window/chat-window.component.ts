import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ChatService } from './chat.service';
import { ChatbotMsgBlockComponent } from './chatbot-msg-block/chatbot-msg-block.component';
import { UserMsgBlockComponent } from './user-msg-block/user-msg-block.component';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chatMsgRef', { read: ViewContainerRef, static: false })
  target: ViewContainerRef;
  @ViewChild('userMsgRef') userMsgRef: ElementRef;

  chatResponse: string[] = [];

  postChatsSub: Subscription;
  getResponseForTopicsChosenSub: Subscription;

  /* This chatResponse array is used to store the chatbot's responses.
    chatResponse = ["<div>Hello user, how can I help you?<div>", "I am Eri a car insurance chatbot.", "I can tell you about car insurance."];

    This chatResponse array is for test purpose.
    chatResponse = ["<div>Hello user, how can I help you?<div>", "I am Eri a car insurance chatbot.", "I can tell you about car insurance."];
    */

  constructor(
    private _chatService: ChatService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private sanitizer: DomSanitizer
  ) {}

  /* onAsk()  calls the postChats() method of ChatService to get the 
  response for the question the user typed in the chat console. */
  onAsk(userMsg: HTMLInputElement) {
    // This will return the userMsg input element's value.
    console.log(userMsg.value);
    this.createUserMsgBlockComponent(userMsg.value);

    this.postChatsSub = this._chatService
      .postChats(userMsg.value)
      .subscribe((data) => {
        this.chatResponse = data;
        console.log(this.chatResponse);
        console.log('Chatbot response received successfully!');
        this.generateChatbotResponse();
      });

    this.userMsgRef.nativeElement.value = '';
  }

  /* In generateChatbotResponse() we loopthrough each of the responses
    in 'chatResponse' property and pass the response to 
    createChatbotMsgBlockComponent(). */
  generateChatbotResponse() {
    this.chatResponse.forEach((response, i) => {
      setTimeout(() => {
        i++;
        // console.log("Response: "+i);
        // console.log(response);
        this.createChatbotMsgBlockComponent(response);
        // this.createChatbotMsgBlockComponent2(response);
      }, 500 * i);
    });
  }

  /* In createUserMsgBlockComponent() we use the 
    ComponentFactoryResolver object to call the resolveComponentFactory() 
    and pass the UserMsgBlockComponent type so as to get a 
    ComponentFactory instance which can create instances of 
    UserMsgBlockComponent.
    
    We then use the ViewContainerRef instance 'target'(to get the reference
    in the DOM where the UserMsgBlockComponent will be loaded and 
    placed) and then we call the createComponent() on it and pass it the 
    ComponentFactory<UserMsgBlockComponent> instance so as to create the
    ComponentRef<UserMsgBlockComponent> instance.

    We then use the 'instance' property of the 
    ComponentRef<UserMsgBlockComponent> to get the properties exposed by 
    the UserMsgBlockComponent.
    */
  createUserMsgBlockComponent(message) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      UserMsgBlockComponent
    );
    const componentRef = this.target.createComponent(factory);
    componentRef.instance.userMsg = message;
  }

  /* In createChatbotMsgBlockComponent() we use the 
    ComponentFactoryResolver object to call the resolveComponentFactory() 
    and pass the ChatbotMsgBlockComponent type so as to get a 
    ComponentFactory instance which can create instances of 
    ChatbotMsgBlockComponent.
    
    We then use the ViewContainerRef instance 'target'(to get the reference
    in the DOM where the ChatbotMsgBlockComponent will be loaded and 
    placed) and then we call the createComponent() on it and pass it the 
    ComponentFactory<ChatbotMsgBlockComponent> instance so as to create the
    ComponentRef<ChatbotMsgBlockComponent> instance.

    We then use the 'instance' property of the 
    ComponentRef<ChatbotMsgBlockComponent> to get the properties exposed by 
    the ChatbotMsgBlockComponent.

    And finally we are using the bypassSecurityTrustHtml() from DomSanitizer
    class to tell Angular to not sanitize the html text that we get in 
    response.
    Otherwise the id attributes from the html text would get removed.
    */
  createChatbotMsgBlockComponent(message) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      ChatbotMsgBlockComponent
    );
    const componentRef = this.target.createComponent(factory);
    componentRef.instance.chatbotMsg =
      this.sanitizer.bypassSecurityTrustHtml(message);
    componentRef.instance.optionWasSelected.subscribe((event) =>
      this.onOptionWasSelected(event)
    );
  }

  /* onOptionWasSelected() calls the getResponseForChosenTopic() method of
    ChatService to get the response for the question corresponding to the 
    bot provided option. We subscribe to the returned observable and once
    the response arrives we call the generateChatbotResponse() to generate
    the chatbot message blocks. */
  onOptionWasSelected(id) {
    // console.log("Inside onOptionWasSelected");
    console.log('Id of the bot provided option: ' + id);
    this.getResponseForTopicsChosenSub = this._chatService
      .getResponseForChosenTopic(id)
      .subscribe((data) => {
        this.chatResponse = data;
        console.log(this.chatResponse);
        // console.log("Chatbot response for selected option received successfully!");
        this.generateChatbotResponse();
      });
  }

  /* One this ChatWindowComponent is loaded and its view has been 
    initialized this ngAfterViewInit() lifecycle method is called. 
    
    Inside ngAfterViewInit() we call the onOptionWasSelected() with
    the 'id' argument as 'intro' after a delay of 1000ms.
    */
  ngAfterViewInit() {
    setTimeout(() => this.onOptionWasSelected('intro'), 1000);
  }

  ngOnDestroy() {
    //Cleaning up the subscriptions
    if (this.postChatsSub) {
      this.postChatsSub.unsubscribe();
    }
    if (this.getResponseForTopicsChosenSub) {
      this.getResponseForTopicsChosenSub.unsubscribe();
    }
  }
}
