import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { LoginComponent } from './Forms/Login/login.component';
import { RegistrationComponent } from './Forms/Registration/registration.component';
import { AboutUsComponent } from './static-components/about-us/about-us.component';
import { ContactsComponent } from './static-components/contacts/contacts.component';
import { HomeComponent } from './static-components/home/home.component';
import { PageNotFound } from './static-components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'chatbot',
    component: ChatWindowComponent
  },
  {
    path: 'about',
    component: AboutUsComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  { 
    path: 'user', 
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFound
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
                                  LoginComponent, 
                                  RegistrationComponent, 
                                  ChatWindowComponent, 
                                  HomeComponent,
                                  ContactsComponent,
                                  AboutUsComponent
                                ];
