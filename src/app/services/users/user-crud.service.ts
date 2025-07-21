import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { IBaseResponse, ILoggedUserDataRequestDto, IUserRolesRequestDto, IUserRolesResponseDto } from '../../models/auths/authCrudModel';
import { IChangeUserDateOfBirthDataRequestDto, IChangeUserDateOfBirthDataResponseDto, IChangeUserEmailDataRequestDto, IChangeUserEmailDataResponseDto, IChangeUserFirstNameDataRequestDto, IChangeUserFirstNameDataResponseDto, IChangeUserLastNameDataRequestDto, IChangeUserLastNameDataResponseDto, IChangeUserNicknameDataRequestDto, IChangeUserNicknameDataResponseDto } from '../../models/users/userCrudModel';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  constructor(private httpClient:HttpClient) { }

  apiUrl : string = environment.apiUrl + 'user/';

  getUserThemeData(userThemeRequestData : ILoggedUserDataRequestDto):Observable<boolean>{
    return this.httpClient.post<boolean>(this.apiUrl + 'get-user-theme-data', userThemeRequestData, { withCredentials: true });
  }

  changeUserTheme(userThemeRequestData:ILoggedUserDataRequestDto):Observable<IBaseResponse>{
    return this.httpClient.post<IBaseResponse>(this.apiUrl + 'change-user-theme-data', userThemeRequestData, { withCredentials: true });
  }

  getUserRolesData(userRolesRequestData:IUserRolesRequestDto):Observable<IUserRolesResponseDto>{
    return this.httpClient.post<IUserRolesResponseDto>(this.apiUrl + 'get-user-roles-data', userRolesRequestData, { withCredentials: true });
  }

  //old-api-way
  // updateUserProfile(updateUserData:updateUserData):Observable<any>{
  //   return this.httpClient.post(this.apiUrl + 'update-user-profile', updateUserData, { responseType: 'text' });
  // }

  changeUserNicknameData(data:IChangeUserNicknameDataRequestDto):Observable<IChangeUserNicknameDataResponseDto>{
    return this.httpClient.post<IChangeUserNicknameDataResponseDto>(this.apiUrl + 'change-user-nickname-data', data, {withCredentials: true});
  }

  changeUserFirstNameData(data:IChangeUserFirstNameDataRequestDto):Observable<IChangeUserFirstNameDataResponseDto>{
    return this.httpClient.post<IChangeUserFirstNameDataResponseDto>(this.apiUrl + 'change-user-firstname-data', data, {withCredentials: true});
  }

  changeUserLastNameData(data:IChangeUserLastNameDataRequestDto):Observable<IChangeUserLastNameDataResponseDto>{
    return this.httpClient.post<IChangeUserLastNameDataResponseDto>(this.apiUrl + 'change-user-lastname-data', data, {withCredentials: true});
  }

  changeUserEmailData(data:IChangeUserEmailDataRequestDto):Observable<IChangeUserEmailDataResponseDto>{
    return this.httpClient.post<IChangeUserEmailDataResponseDto>(this.apiUrl + 'change-user-email-data', data, {withCredentials: true});
  }

  changeUserDateOfBirthData(data:IChangeUserDateOfBirthDataRequestDto):Observable<IChangeUserDateOfBirthDataResponseDto>{
    return this.httpClient.post<IChangeUserDateOfBirthDataResponseDto>(this.apiUrl+'change-user-date-of-birth-data', data, {withCredentials:true});
  }

}
