interface IBaseResponse{
    statusCode: number;
    success: boolean;
    message: string;
}

interface IUserLoginRequestModel{
    username: string;
    password: string;
}

interface IUserLoginResponseModel extends IBaseResponse{
    data: {
        username: string;
        token: string;
    };
}

interface IUserTokenResponseModel {
    username: string;
    iat: number;
    exp: number;
}

interface ILoggedUserDataRequestModel{
    username: string;
}

interface IUserRolesRequestModel{
    username: string;
}

interface IUserRolesResponseModel extends IBaseResponse{
    data: string[];
}

interface ILoggedUserDataResponseModel extends IBaseResponse{
    data: {
        userAvatar?: string;
        userBackground?: string;
        username: string;
        userFirstName: string;
        userLastName: string;
        userEmail: string;
        userNickname: string;
        userDateOfBirth: Date;
        status: boolean;
    }
}

interface IUserSignUpRequestModel{
    username: string;
    password: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userNickname: string;
}

interface IUserSignUpResponseModel extends IBaseResponse{
    data: {
        userEmail: string;
        userFirstName: string;
        userLastName: string;
        userNickname: string;
        username: string;
    }
}

interface IAuthErrorResponseModel extends IBaseResponse{
    data: {
        success: boolean;
        message: string;
    }
}

//password-change
interface IPasswordChangeRequestModel {
    username: string;
    oldUserPassword: string;
    newUserPassword: string;
}

interface IPasswordChangeResponseModel extends IBaseResponse {
    data: boolean;
}


//password-recovery
interface IPasswordRecoveryRequestModel{
    username: string;
    key: string;
    userNewPassword: string;
}

interface IPasswordRecoveryResponseModel extends IBaseResponse{
    data: string;
}

interface IUsernameBaseRequestModel{
    username: string;
}

interface ICheckingUsernameResponseModel extends IBaseResponse{
    data: string;
}

interface ICheckUserRecoveryKeyResponseModel extends IBaseResponse{
    data: boolean;
}

interface IGetNewUserRecoveryKeyRequestModel {
    username: string;
}

interface IGetNewUserRecoveryKeyResponseModel extends IBaseResponse {
    data: string;
}

export type {
    IBaseResponse,
    IAuthErrorResponseModel,
    IUserSignUpResponseModel,
    IUserSignUpRequestModel,
    ILoggedUserDataResponseModel,
    IUserLoginRequestModel,
    IUserLoginResponseModel,
    ILoggedUserDataRequestModel,
    IUserTokenResponseModel,
    IPasswordRecoveryRequestModel,
    IPasswordRecoveryResponseModel,
    IUsernameBaseRequestModel,
    ICheckingUsernameResponseModel,
    ICheckUserRecoveryKeyResponseModel,
    IGetNewUserRecoveryKeyRequestModel,
    IGetNewUserRecoveryKeyResponseModel,
    IPasswordChangeRequestModel,
    IPasswordChangeResponseModel,
    IUserRolesRequestModel,
    IUserRolesResponseModel
}