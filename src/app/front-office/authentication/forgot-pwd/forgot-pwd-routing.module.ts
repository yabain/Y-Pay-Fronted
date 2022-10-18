import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPwdComponent } from './Forgot-pwd.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPwdComponent
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPwdRoutingModule { }
