import { LoginModel } from './../model/login.model';
import { UserModel } from './../model/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  public signIn(loginModel: LoginModel){
    localStorage.setItem('USER_ACCESS' , loginModel.email);
  }

  public logout(){
    localStorage.removeItem('USER_ACCESS');
  }
}
