import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { RouterModule } from '@angular/router';
import { EmailComponent } from './email/email.component';
import { ChatComponent } from './chat/chat.component';
import { CalenderComponent } from './calender/calender.component';


@NgModule({
  declarations: [
    ApplicationComponent,
    EmailComponent,
    ChatComponent,
    CalenderComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    RouterModule
  ]
})
export class ApplicationModule { }
