import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAuthErrorResponseDto, ILoggedUserDataResponseDto, IUserLoginResponseDto, IUserSignUpRequestDto, IUserSignUpResponseDto, IUserLoginRequestDto, ILoggedUserDataRequestDto, IPasswordRecoveryRequestDto, IPasswordRecoveryResponseDto, ICheckingUsernameResponseDto, IUsernameBaseRequestDto, ICheckUserRecoveryKeyResponseDto, IGetNewUserRecoveryKeyRequestDto, IGetNewUserRecoveryKeyResponseDto, IPasswordChangeRequestDto, IPasswordChangeResponseDto } from '../../../models/auths/authCrudModel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthCrudService {

  constructor(private httpClient:HttpClient) { }

  returnUrl:string="";

  apiUrl : string = environment.apiUrl + 'auth/'

  _signedInData = new BehaviorSubject<any>(/* başlangıç değeri */ null);
  // data$ = this._signedInData.asObservable(); // Dışarıya sadece Observable olarak sunuyoruz ki dışarıdan doğrudan değiştirilemesin.

  loggedInStatus = new BehaviorSubject<boolean>(this.hasToken());
  signedInData$ = this._signedInData.asObservable();

  isLoggedIn(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authorization');
  }

  login(userLoginData:IUserLoginRequestDto):Observable<IUserLoginResponseDto>{
    return this.httpClient.post<IUserLoginResponseDto>(this.apiUrl + 'signin', userLoginData, { withCredentials: true });
  }

  userLogout():Observable<{message:string}>{
    this.loggedInStatus.next(false);
    
    localStorage.removeItem('authorization');

    return this.httpClient.post<{message:string}>(this.apiUrl+'signout', {}, {withCredentials: true});
  }

  // getLoggedUserData(loggedUserRequestData: ILoggedUserDataRequestDto):Observable<ILoggedUserDataResponseDto>{
  //   return this.httpClient.post<ILoggedUserDataResponseDto>(this.apiUrl + 'get-session-user-data', loggedUserRequestData, { withCredentials: true });
  // }

  getLoggedUserData(loggedUserRequestData: ILoggedUserDataRequestDto):Observable<ILoggedUserDataResponseDto>{ 
    const response =  this.httpClient.post<ILoggedUserDataResponseDto>(this.apiUrl + 'get-session-user-data', loggedUserRequestData, { withCredentials: true });
    response.subscribe(response => this._signedInData.next(response));
    return response;
  }


  //signup

  usernameControlForUserSignup(username:string):Observable<IAuthErrorResponseDto>{    
    return this.httpClient.post<IAuthErrorResponseDto>(this.apiUrl+'username-control-for-signup', {username});
  }

  userSignUp(userSignUpData:IUserSignUpRequestDto):Observable<IUserSignUpResponseDto>{
    return this.httpClient.post<IUserSignUpResponseDto>(this.apiUrl+'signup', userSignUpData);
  }

  //edit-auth-data
  checkUsernameForRecovery(usernameDataForRecovery:IUsernameBaseRequestDto):Observable<ICheckingUsernameResponseDto>{
    return this.httpClient.post<ICheckingUsernameResponseDto>(this.apiUrl+'check-username-for-recovery', usernameDataForRecovery);
  }

  passwordChangeService(data:IPasswordChangeRequestDto): Observable<IPasswordChangeResponseDto>{
    return this.httpClient.post<IPasswordChangeResponseDto>(this.apiUrl+'change-user-password-data', data, {withCredentials: true});
  }

  getNewUserRecoveryKey(userDataForNewRecoveryKey:IGetNewUserRecoveryKeyRequestDto):Observable<IGetNewUserRecoveryKeyResponseDto>{
    return this.httpClient.post<IGetNewUserRecoveryKeyResponseDto>(this.apiUrl+'get-new-user-recovery-key', userDataForNewRecoveryKey, { withCredentials: true });
  }

  //password-recovery
  recoverPassword(passwordRecoveryData:IPasswordRecoveryRequestDto):Observable<IPasswordRecoveryResponseDto>{
    return this.httpClient.post<IPasswordRecoveryResponseDto>(this.apiUrl + 'user-password-recovery', passwordRecoveryData);
  }

  checkUserRecoveryKeyForUserPasswordRecovery(usernameDataForCheckingRecoveryKey:IUsernameBaseRequestDto):Observable<ICheckUserRecoveryKeyResponseDto> {
    return this.httpClient.post<ICheckUserRecoveryKeyResponseDto>(this.apiUrl+'check-user-recovery-key-data', usernameDataForCheckingRecoveryKey);
  }

  
  
}
