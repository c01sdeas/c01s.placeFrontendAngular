import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { IBaseResponse, ILoggedUserDataRequestModel } from '../apps/models/auths/authCrudModel';
import { IChangeUserDateOfBirthDataRequestModel, IChangeUserDateOfBirthDataResponseModel, IChangeUserEmailDataRequestModel, IChangeUserEmailDataResponseModel, IChangeUserFirstNameDataRequestModel, IChangeUserFirstNameDataResponseModel, IChangeUserLastNameDataRequestModel, IChangeUserLastNameDataResponseModel, IChangeUserNicknameDataRequestModel, IChangeUserNicknameDataResponseModel } from '../apps/models/users/userCrudModel';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  constructor(private httpClient:HttpClient) { }

  apiUrl : string = environment.apiUrl + 'user/'

  getUserThemeData(userThemeRequestData : ILoggedUserDataRequestModel):Observable<boolean>{
    return this.httpClient.post<boolean>(this.apiUrl + 'get-theme-data', userThemeRequestData, { withCredentials: true });
  }

  changeUserTheme(userThemeRequestData:ILoggedUserDataRequestModel):Observable<IBaseResponse>{
    return this.httpClient.post<IBaseResponse>(this.apiUrl + 'change-theme-data', userThemeRequestData, { withCredentials: true });
  }

  //old-api-way
  // updateUserProfile(updateUserData:updateUserData):Observable<any>{
  //   return this.httpClient.post(this.apiUrl + 'update-user-profile', updateUserData, { responseType: 'text' });
  // }

  changeUserNicknameData(data:IChangeUserNicknameDataRequestModel):Observable<IChangeUserNicknameDataResponseModel>{
    return this.httpClient.post<IChangeUserNicknameDataResponseModel>(this.apiUrl + 'change-user-nickname-data', data, {withCredentials: true});
  }

  changeUserFirstNameData(data:IChangeUserFirstNameDataRequestModel):Observable<IChangeUserFirstNameDataResponseModel>{
    return this.httpClient.post<IChangeUserFirstNameDataResponseModel>(this.apiUrl + 'change-user-firstname-data', data, {withCredentials: true});
  }

  changeUserLastNameData(data:IChangeUserLastNameDataRequestModel):Observable<IChangeUserLastNameDataResponseModel>{
    return this.httpClient.post<IChangeUserLastNameDataResponseModel>(this.apiUrl + 'change-user-lastname-data', data, {withCredentials: true});
  }

  changeUserEmailData(data:IChangeUserEmailDataRequestModel):Observable<IChangeUserEmailDataResponseModel>{
    return this.httpClient.post<IChangeUserEmailDataResponseModel>(this.apiUrl + 'change-user-email-data', data, {withCredentials: true});
  }

  changeUserDateOfBirthData(data:IChangeUserDateOfBirthDataRequestModel):Observable<IChangeUserDateOfBirthDataResponseModel>{
    return this.httpClient.post<IChangeUserDateOfBirthDataResponseModel>(this.apiUrl+'change-user-date-of-birth-data', data, {withCredentials:true});
  }

}
