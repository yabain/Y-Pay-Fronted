import { Injectable, ɵConsole } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api/api.service';
import { User } from '../../entities/user';
import { UserService } from '../user/user.service';
import { async } from '@angular/core/testing';
import { WebStorage } from '../../storage/web.storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static currentUser: User = new User();

  userData: User;
  isLoggedIn = false;
  authStatus: boolean;
  params: any;
  registResult = false;


  constructor(
    // private firebaseAuth: AngularFireAuth,
    private router: Router,
    private api: ApiService,
    private toastr: ToastrService,
    private user: UserService,
    private webStorage: WebStorage
  ) {

    // this.registResult = false;
    // this.loginResult = false;

  }


  /*
   *  Get local user profile data.
   */
  getLocalStorageUser() {
    this.userData = JSON.parse(localStorage.getItem('user-data') ? localStorage.getItem('user-data') : null);
    if (this.userData) {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  /*
   * resetPassword is used to reset your password.
   */
  resetPassword() {
    this.toastr.success('Email Sent');
    this.router.navigate(['/login']);
  }

  /*
   * logOut function is used to sign out .
   */
  logOut() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.toastr.success('Votre session a été déconnecté!');
    this.router.navigate(["/login-form"]);
  }



  /**
   *  Create an account
   *
   */
  createAccount(user: User): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Content-Type': 'application/json',
        // 'X-CSRF-Token': '97dKe-0-qukVOMY1YNBhsZ-POfPUArpL11YLfRJFD94',
        // 'Accept': 'application/json'
      };

      const params = {
        'firstname': user.field_firstName,
        'lastname': user.field_lastName,
        'password': user.field_password,
        'email': user.field_email,
        'profilePicture': user.field_profilPicture,
        'country': user.field_country,
        'location': user.field_location,
      };

      this.api.post('user/auth/register', params, headers)
        .subscribe((response: any) => {
          if (response) {
            if (response.resultCode === 201) {
              this.registResult = true;
              this.router.navigate(['login']);
              this.toastr.success("Votre compte a été crée. Vous allez recevoir un email de confrirmation.");
              resolve(response);
              return;
            }
            reject(response);
            return 0;
          }
        }, (error: any) => {
          if (error && error.statusCode == 400) {
            this.registResult = false;
            this.toastr.error("Cet email est déjà utilisé");
            // console.log('Error message: ', error.message);
            reject(error);
          } else if (error && error.statusCode == 500) {
            this.registResult = false;
            this.toastr.error("Erreur serveur");
            // console.log('Error message: ', error.message);
            reject(error);
          }
          else {
            this.registResult = false;
            this.toastr.error('Unknow error: ', error.message);
            // console.log('Error message: ', error.message);
            reject(error);
          }
        });
    });

  }

  getAuthStatus(authStatus) {
    if (authStatus == 'true') {
      this.authStatus = true;
    } else {
      this.authStatus = false;
    }

  }

  // Login into your account
  authLogin(userIdentifiants: User): Promise<any> {
    let email = userIdentifiants.field_email;
    let password = userIdentifiants.field_password;

    const param = {
      'email': email,
      'password': password,
    };
    const header = {
      'Content-Type': 'application/json',
      // 'Accept': 'application/json'
    };

    return new Promise((resolve, reject) => {
      this.api.post('user/auth/login', param, header)
        .subscribe(response => {
          if (response.statusCode === 502) {
            this.toastr.success('Identifiants incorrect! Veuillez vérifiez vos informations.');
          }
           
          this.webStorage.Login(userIdentifiants);
          this.api.setAccessToken(response.data.access_token);
          console.log('User infos: ', response.data.user);
          this.user.setUserInformations(response.data.user)
          this.router.navigate(['index']);
          this.toastr.success('Bienvenue parmi nous!');
          resolve(response);
        }, error => {
          if (error && error.statusCode === 502) {
            this.toastr.error('Identifiants incorrect! Veuillez vérifiez vos informations.');
          } else if (error && error.statusCode == 500) {
            this.registResult = false;
            this.toastr.error("Erreur serveur");
            reject(error);
          } else {
            this.toastr.error('Erreur inconnue. Contactez un administrateur.');
            reject(error);

          }

        });
    });
  }


  /**
   *  Get the user informations
   */

  authUserInformations(): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };


      this.api.get('requester/profil', headers)
        .subscribe((reponse: any) => {
          if (reponse) {
            resolve(reponse);
            this.user.setUserInformations(reponse);
          }

        }, (error: any) => {

          if (error) {
            this.toastr.success(error.message);
            reject(error);
          }
        });

      // this.api.get('requester/profil', headers)
      // .subscribe((reponse: any) => {
      //   if (reponse) {
      //     resolve(reponse);
      //     this.user.setUserInformations(reponse);
      //   }

      // }, (error: any) => {

      //   if (error) {
      //     this.toastr.success(error.message);
      //     reject(error);
      //   }
      // });

    });



  }
}
