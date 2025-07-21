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
interface IChangeUserNicknameDataRequestDto {
    username: string;
    newUserNickname: string;
}

interface IChangeUserNicknameDataResponseDto extends IBaseResponse {
    data: boolean;
}

//change-firstname
interface IChangeUserFirstNameDataRequestDto {
    username: string;
    newUserFirstName: string;
}

interface IChangeUserFirstNameDataResponseDto extends IBaseResponse {
    data: boolean;
}

//change-lastname
interface IChangeUserLastNameDataRequestDto {
    username: string;
    newUserLastName: string;
}

interface IChangeUserLastNameDataResponseDto extends IBaseResponse {
    data: boolean;
}

//change-email
interface IChangeUserEmailDataRequestDto {
    username: string;
    newUserEmail: string;
}

interface IChangeUserEmailDataResponseDto extends IBaseResponse {
    data: boolean;
}

//change-date-of-birth
interface IChangeUserDateOfBirthDataRequestDto {
    username: string;
    newUserDateOfBirth: Date;
}

interface IChangeUserDateOfBirthDataResponseDto extends IBaseResponse {
    data: boolean;
}

export type {
    userThemeData,
    IChangeUserNicknameDataRequestDto,
    IChangeUserNicknameDataResponseDto,
    IChangeUserFirstNameDataRequestDto,
    IChangeUserFirstNameDataResponseDto,
    IChangeUserLastNameDataRequestDto,
    IChangeUserLastNameDataResponseDto,
    IChangeUserEmailDataRequestDto,
    IChangeUserEmailDataResponseDto,
    IChangeUserDateOfBirthDataRequestDto,
    IChangeUserDateOfBirthDataResponseDto
}