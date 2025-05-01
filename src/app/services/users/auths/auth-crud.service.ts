import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAuthErrorResponseModel, ILoggedUserDataResponseModel, IUserLoginResponseModel, IUserSignUpRequestModel, IUserSignUpResponseModel, IUserLoginRequestModel, ILoggedUserDataRequestModel, IPasswordRecoveryRequestModel, IPasswordRecoveryResponseModel, ICheckingUsernameResponseModel, IUsernameBaseRequestModel, ICheckUserRecoveryKeyResponseModel, IGetNewUserRecoveryKeyRequestModel, IGetNewUserRecoveryKeyResponseModel, IPasswordChangeRequestModel, IPasswordChangeResponseModel } from '../../apps/models/auths/authCrudModel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthCrudService {

  constructor(private httpClient:HttpClient, private router:Router) { }

  returnUrl:string="";

  apiUrl : string = environment.apiUrl + 'auth/'

  _signedInData = new BehaviorSubject<any>(/* başlangıç değeri */ null);
  // data$ = this._signedInData.asObservable(); // Dışarıya sadece Observable olarak sunuyoruz ki dışarıdan doğrudan değiştirilemesin.

  loggedInStatus = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authorization');
  }

  login(userLoginData:IUserLoginRequestModel):Observable<IUserLoginResponseModel>{
    return this.httpClient.post<IUserLoginResponseModel>(this.apiUrl + 'signin', userLoginData, { withCredentials: true });
  }

  userLogout(){
    this.loggedInStatus.next(false);
    
    localStorage.removeItem('authorization');
  }

  // getLoggedUserData(loggedUserRequestData: ILoggedUserDataRequestModel):Observable<ILoggedUserDataResponseModel>{
  //   return this.httpClient.post<ILoggedUserDataResponseModel>(this.apiUrl + 'get-session-user-data', loggedUserRequestData, { withCredentials: true });
  // }

  getLoggedUserData(loggedUserRequestData: ILoggedUserDataRequestModel):Observable<ILoggedUserDataResponseModel>{ 
    const response =  this.httpClient.post<ILoggedUserDataResponseModel>(this.apiUrl + 'get-session-user-data', loggedUserRequestData, { withCredentials: true });
    response.subscribe(response => this._signedInData.next(response));
    return response;
  }


  //signup

  usernameControlForUserSignup(username:string):Observable<IAuthErrorResponseModel>{    
    return this.httpClient.post<IAuthErrorResponseModel>(this.apiUrl+'username-control-for-signup', {username});
  }

  userSignUp(userSignUpData:IUserSignUpRequestModel):Observable<IUserSignUpResponseModel>{
    return this.httpClient.post<IUserSignUpResponseModel>(this.apiUrl+'signup', userSignUpData);
  }

  //edit-auth-data
  checkUsernameForRecovery(usernameDataForRecovery:IUsernameBaseRequestModel):Observable<ICheckingUsernameResponseModel>{
    return this.httpClient.post<ICheckingUsernameResponseModel>(this.apiUrl+'check-username-for-recovery', usernameDataForRecovery);
  }

  passwordChangeService(data:IPasswordChangeRequestModel): Observable<IPasswordChangeResponseModel>{
    return this.httpClient.post<IPasswordChangeResponseModel>(this.apiUrl+'change-user-password-data', data, {withCredentials: true});
  }

  getNewUserRecoveryKey(userDataForNewRecoveryKey:IGetNewUserRecoveryKeyRequestModel):Observable<IGetNewUserRecoveryKeyResponseModel>{
    return this.httpClient.post<IGetNewUserRecoveryKeyResponseModel>(this.apiUrl+'get-new-user-recovery-key', userDataForNewRecoveryKey, { withCredentials: true });
  }

  //password-recovery
  recoverPassword(passwordRecoveryData:IPasswordRecoveryRequestModel):Observable<IPasswordRecoveryResponseModel>{
    return this.httpClient.post<IPasswordRecoveryResponseModel>(this.apiUrl + 'user-password-recovery', passwordRecoveryData);
  }

  checkUserRecoveryKeyForUserPasswordRecovery(usernameDataForCheckingRecoveryKey:IUsernameBaseRequestModel):Observable<ICheckUserRecoveryKeyResponseModel> {
    return this.httpClient.post<ICheckUserRecoveryKeyResponseModel>(this.apiUrl+'check-user-recovery-key-data', usernameDataForCheckingRecoveryKey);
  }

  
  
}
