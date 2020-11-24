import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import { RestApiService } from 'src/app/rest-api.service';
import { LoginUser } from 'src/app/classes/login-user';
import { TokenBody } from '../classes/token-body';
import { User } from '../classes/user';
import { ShareUserService } from './share-user.service';
import { DecodedToken } from '../classes/decoded-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private path:String;

  /* used by all components to know if user is logged in (with valid token in localStorage) */
  private static isAuthenticated=new BehaviorSubject<boolean>(AuthService.hasValidToken());

  constructor(private http:HttpClient) {

      /* get Rest-api service 'path' */
      this.path=RestApiService.getPath();
   }

  /* if token exists in Local storage */
  /* also checks if token is not expired:because if not we would not send token to serevr */
  static hasValidToken():boolean
  {
    
    const status=!!localStorage.getItem('token');

    if(status)
    {
      let isExpired:boolean= Date.now()>Number(localStorage.getItem('exp'));
      
      if(isExpired)
      {
        /* to make 'ShareUserService' and 'isAuthenticated' in sync */
        localStorage.clear();
        ShareUserService.setUser(null);
        
      }
      return !isExpired;

    }
    return false;
  }


  static IsLoggedIn():Observable<boolean>
  {
    return AuthService.isAuthenticated.asObservable();
  }

  /* to handle error */
  private handleError(error: HttpErrorResponse) 
  {
     
    if (error.error instanceof ErrorEvent) {
      /* A client-side or network error occurred. */

      console.error('An error occurred:', error.error.message);
      return throwError('client side Error: '+error.error.message);
    } 
    else 
    {
      console.error(
        `Backend returned code: ${error.status}, ` +
        `body was:${error.error.detail},`+
        
        `message was: ${error.message}` );
          
        return throwError(error.error.detail);
  }};


  async get_token(loginUser:LoginUser):Promise<HttpResponse<TokenBody>>
  {
    /* get token */
    return  this.http.post<TokenBody>(this.path+'auth/login/', JSON.stringify(loginUser),
            {headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'})
            .pipe(catchError(this.handleError)).toPromise();  
          
  }

  /* get user from server by sharing token received */
  async getUser():Promise<HttpResponse<User>>
  {
    return  this.http.get<User>(this.path+"user/",
        {headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'})
        .pipe(catchError(this.handleError)).toPromise();
  }


  /* login process initiated by user when he clicks 'login' button  */
  async login(loginUser:LoginUser)
  {
    try
    {
    localStorage.clear();
    /* receive token and decode it to read data (including 'exp') */
    let tokenResponse=await this.get_token(loginUser);
    let tokenBody=tokenResponse.body;
    
    /* also store token in local storage */
    localStorage.setItem('token',tokenBody.access);
    let decoded:DecodedToken=jwt_decode(tokenBody.access);
    /* token expiry time */
    let exp=decoded.exp*1000;
    localStorage.setItem('exp',exp.toString());

    /* receive user and set logged in user 'globally' for all components to use  */
    let userResponse=await this.getUser();

    let user:User=userResponse.body;

    /* set user globally to be used by all components */
    ShareUserService.setUser(user);

    /* set global authentication status */
    AuthService.isAuthenticated.next(true);
    localStorage.setItem('user',JSON.stringify(user));
    }
    catch(error)
    {
      console.log(error);
      alert("could not login");

    }
  }


  logout()
  {
    AuthService.isAuthenticated.next(false);
    ShareUserService.setUser(null);
    localStorage.clear();
  }

  
}
