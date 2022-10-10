import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebStorage {
  public Loginvalue = new BehaviorSubject<any>(0);
  public Createaccountvalue = new BehaviorSubject<any>(0);
  public Forgotpasswordvalue = new BehaviorSubject<any>(0);
  constructor(private router: Router) {}

  /**
   * Create account Function call from Registerpage
   * @param uservalue from user form value
   */
  public Createaccount(uservalue: any): void {
    let Rawdata:any = localStorage.getItem('Loginusers');
    let Pdata: any = [];
    Pdata = JSON.parse(Rawdata);
    const Eresult: any = Pdata.find(({ email }:any) => email === uservalue.email);
      if (Eresult) {
        this.Createaccountvalue.next('Cet email est déjà uutilisé');
      } else {
        Pdata.push(uservalue);
        const jsonData = JSON.stringify(Pdata);
        localStorage.setItem('Loginusers', jsonData);
        this.Login(uservalue);
      }
  }

  /**
   * Login Functionality call from Login
   * @param uservalue from login page
   */
  public Login(uservalue: any): void {
    let returndata={message:'',status:''}
    let data: any = [
      {
        email: uservalue.email,
        password: uservalue.password,
      },
    ];
    // let data:any = localStorage.getItem('Loginusers');
    // let Pdata: [] = JSON.parse(data);
    let Pdata: [] = data;
    const Eresult: any = Pdata.find(({ email }) => email === uservalue.email);
    if (Eresult) {
      if (Eresult.password === uservalue.password) {
        this.Createtoken(uservalue);
        this.Loginvalue.next('Login success');
        // this.router.navigate(['/index']);
        this.Loginvalue.next(0);

        // Simulation des données venant du serveur
        let dataRecieved = [
          {
            email: uservalue.email,
            password: '***********',
          },
        ];
        const jsonData = JSON.stringify(dataRecieved);
        localStorage.setItem('Loginusers', jsonData);

      } else {
        returndata.message='Mot de passe incorrect'
        returndata.status='password'
        this.Loginvalue.next(returndata);
      }
    } else {
      returndata.message='Email non invalide'
      returndata.status='email'
      this.Loginvalue.next(returndata);
    }
  }

  /**
   * Create Token function for authendication
   * @param uservalue recived from login function
   */
  public Createtoken(uservalue:any) {
    var result = 'ABCDEFGHI' + uservalue.email + 'ghijklmnopqrs' + 'z01234567';
    localStorage.setItem('LoginData', result);
  }

  /**
   * Two Storage are used
   */
  public Deleteuser() {
    localStorage.removeItem('Loginusers');
    localStorage.removeItem('LoginData');
  }

  /**
   * called from Login page init statement
   */
  public Checkuser(): void {
    let users = localStorage.getItem('Loginusers');
    if (users != null) {
      this.router.navigate(['/index']);
    } 
    // else if (users === null) {
    //   let password = [
    //     {
    //       email: 'admin@dreamguys.in',
    //       password: '123456',
    //     },
    //   ];
    //   const jsonData = JSON.stringify(password);
    //   localStorage.setItem('Loginusers', jsonData);
    // }
  }

  /**
   * Forgot password function
   * @param uservalue email object recived from Forgot password
   */
  public Forgotpassword(uservalue:any): void {
    let Rawdata:any = localStorage.getItem('Loginusers');
    let Pdata: any = [];
    Pdata = JSON.parse(Rawdata);
    const Eresult = Pdata.find(({ email }:any) => email === uservalue.email);
    if (Eresult) {
      this.Forgotpasswordvalue.next(Eresult);
    } else {
      this.Forgotpasswordvalue.next('Email non valid');
    }
  }
}
