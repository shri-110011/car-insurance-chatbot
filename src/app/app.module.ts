import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';

import { UserMsgBlockComponent } from './chat-window/user-msg-block/user-msg-block.component';
import { ChatbotMsgBlockComponent } from './chat-window/chatbot-msg-block/chatbot-msg-block.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from './chat-window/chat.service';
import { HeaderComponent } from './static-components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './Forms/Login/login.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth-service';
import { AppMatchFields } from './shared/matchFields.directive';
import { FooterComponent } from './static-components/footer/footer.component';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    UserMsgBlockComponent,
    ChatbotMsgBlockComponent,
    routingComponents,
    HeaderComponent,
    FooterComponent,
    AppMatchFields
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ChatService, 
              LoginService, 
              AuthGuard, 
              AuthService
              // {provide: LocationStrategy, useClass: HashLocationStrategy}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
