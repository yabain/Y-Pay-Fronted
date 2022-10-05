import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application.component';
import { CalenderComponent } from './calender/calender.component';
import { ChatComponent } from './chat/chat.component';
import { EmailComponent } from './email/email.component';

const routes: Routes = [
  {path:'',component:ApplicationComponent,
  children: [
    { path: "chat", component: ChatComponent },
    { path: "calender", component: CalenderComponent},
    { path: "email", component: EmailComponent},
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
