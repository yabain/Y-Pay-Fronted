import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebStorage } from 'src/app/shared/storage/web.storage';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';

@Component({
  selector: 'app-regiser',
  templateUrl: './regiser.component.html',
  styleUrls: ['./regiser.component.css']
})
export class RegiserComponent implements OnInit {
  form: FormGroup;
  textDir: String = 'ltr';
  public Toggledata=true;

  public isvalidconfirmpassword: boolean = false;
  public subscription: Subscription;
  public CustomControler: any;

  get f() {
    return this.form.controls;
  }

  constructor(
    private storage: WebStorage,
    private formLog: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    public translationService: TranslationService
    ) {
      //this is to determine the text direction depending on the selected language
      translate.onLangChange.subscribe((event: LangChangeEvent) =>
      {
        this.textDir = event.lang == 'fr'? 'rtl' : 'ltr';
      });

    this.subscription = this.storage.Createaccountvalue.subscribe((data) => {
      this.CustomControler = data;
    });
  }

  ngOnInit() {
    this.storage.Checkuser();
    this.translate.use(this.translationService.getLanguage());
    this.form = this.formLog.group({
      'field_firstName': ['', Validators.required ],
      'field_lastName': ['', Validators.required ],
      'field_password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)])
      ],
      'field_email': ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      'field_profilPicture': ['assets/img/ynkap-user-profil.jpg'],
      'field_country': [''],
      'field_location': [''],
      'field_agree': ['', Validators.required ],
  });
  }

  submit() {
    console.log("User Datas from reg: ", this.form.value)

    this.authService.createAccount(this.form.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  iconLogle(){
    this.Toggledata = !this.Toggledata
  }
}
