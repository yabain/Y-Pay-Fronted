import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegiserComponent } from './regiser.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegiserComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
