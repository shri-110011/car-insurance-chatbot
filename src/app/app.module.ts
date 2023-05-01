import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';

import { UserMsgBlockComponent } from './chat-window/user-msg-block/user-msg-block.component';
import { ChatbotMsgBlockComponent } from './chat-window/chatbot-msg-block/chatbot-msg-block.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ChatService } from './chat-window/chat.service';
import { HeaderComponent } from './static-components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './Forms/Login/login.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth-service';
import { FooterComponent } from './static-components/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptorService } from './auth-interceptor.service';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    UserMsgBlockComponent,
    ChatbotMsgBlockComponent,
    routingComponents,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [ChatService, 
              LoginService, 
              AuthGuard, 
              AuthService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptorService,
                multi: true,
              }
              // {provide: LocationStrategy, useClass: HashLocationStrategy}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
