interface userThemeData{
    lights: boolean;
}

interface IBaseResponse{
    statusCode: number;
    success: boolean;
    message: string;
}

//old-api-way
// export class updateUserData{
//     userFirstName: string;
//     userLastName: string;
//     userNickname: string;
//     userEmail: string;
// }

//change-nickname
interface IChangeUserNicknameDataRequestModel {
    username: string;
    newUserNickname: string;
}

interface IChangeUserNicknameDataResponseModel extends IBaseResponse {
    data: boolean;
}

//change-firstname
interface IChangeUserFirstNameDataRequestModel {
    username: string;
    newUserFirstName: string;
}

interface IChangeUserFirstNameDataResponseModel extends IBaseResponse {
    data: boolean;
}

//change-lastname
interface IChangeUserLastNameDataRequestModel {
    username: string;
    newUserLastName: string;
}

interface IChangeUserLastNameDataResponseModel extends IBaseResponse {
    data: boolean;
}

//change-email
interface IChangeUserEmailDataRequestModel {
    username: string;
    newUserEmail: string;
}

interface IChangeUserEmailDataResponseModel extends IBaseResponse {
    data: boolean;
}

//change-date-of-birth
interface IChangeUserDateOfBirthDataRequestModel {
    username: string;
    newUserDateOfBirth: Date;
}

interface IChangeUserDateOfBirthDataResponseModel extends IBaseResponse {
    data: boolean;
}

export type {
    userThemeData,
    IChangeUserNicknameDataRequestModel,
    IChangeUserNicknameDataResponseModel,
    IChangeUserFirstNameDataRequestModel,
    IChangeUserFirstNameDataResponseModel,
    IChangeUserLastNameDataRequestModel,
    IChangeUserLastNameDataResponseModel,
    IChangeUserEmailDataRequestModel,
    IChangeUserEmailDataResponseModel,
    IChangeUserDateOfBirthDataRequestModel,
    IChangeUserDateOfBirthDataResponseModel
}