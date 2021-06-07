import { UserFilterModel } from './../model/user-filter.model';
import { LoginModel } from './../model/login.model';
import { UserModel  } from './../model/user.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  public login(loginModel: LoginModel): Observable<UserModel>{
    let headers= new HttpHeaders();
    headers = headers.set('email' , loginModel.email);
    headers = headers.set('password' , loginModel.password);
    headers = headers.set('Content-Type', 'application/json');

    return this.httpclient.get<UserModel>('http://localhost:8080/user' ,{headers: headers});
  }

  public getUsers(): Observable<UserModel>{
    return this.httpclient.get<UserModel>('http://localhost:8080/user/listAll');
  }

  public postUser(userModel: UserModel): Observable<UserModel>{
    return this.httpclient.post<UserModel>('http://localhost:8080/user' , JSON.stringify(userModel), this.httpOptions);
  }

  public putUser(userModel: UserModel): Observable<UserModel>{
    return this.httpclient.put<UserModel>('http://localhost:8080/user' , JSON.stringify(userModel), this.httpOptions);
  }

  public postFilter(userFilterModel: UserFilterModel): Observable<UserFilterModel>{
    return this.httpclient.post<UserFilterModel>('http://localhost:8080/user/listByFilter' , JSON.stringify(userFilterModel), this.httpOptions);
  }


}

