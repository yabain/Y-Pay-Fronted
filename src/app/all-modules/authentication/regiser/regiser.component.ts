import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebStorage } from 'src/app/core/storage/web.storage';

@Component({
  selector: 'app-regiser',
  templateUrl: './regiser.component.html',
  styleUrls: ['./regiser.component.css']
})
export class RegiserComponent implements OnInit {

  public isvalidconfirmpassword: boolean = false;
  public subscription: Subscription;
  public CustomControler: any;

  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebStorage) {
    this.subscription = this.storage.Createaccountvalue.subscribe((data) => {
      this.CustomControler = data;
    });
  }

  ngOnInit() {}

  submit() {
    if (this.form.value.password != this.form.value.confirmPassword) {
      this.isvalidconfirmpassword = true;
    } else {
      this.isvalidconfirmpassword = false;
      this.storage.Createaccount(this.form.value);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
