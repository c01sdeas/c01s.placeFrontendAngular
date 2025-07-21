interface IBaseResponse{
    statusCode: number;
    success: boolean;
    message: string;
    totalRecords: number;
}

interface IUserLoginRequestDto{
    username: string;
    password: string;
}

interface IUserLoginResponseDto extends IBaseResponse{
    data: {
        username: string;
        token: string;
    };
}

interface IUserTokenResponseDto {
    username: string;
    iat: number;
    exp: number;
}

interface ILoggedUserDataRequestDto{
    username: string;
}

interface IUserRolesRequestDto{
    username: string;
}

interface IUserRolesResponseDto extends IBaseResponse{
    data: string[];
}

interface ILoggedUserDataResponseDto extends IBaseResponse{
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

interface IUserSignUpRequestDto{
    username: string;
    password: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userNickname: string;
}

interface IUserSignUpResponseDto extends IBaseResponse{
    data: {
        userEmail: string;
        userFirstName: string;
        userLastName: string;
        userNickname: string;
        username: string;
    }
}

interface IAuthErrorResponseDto extends IBaseResponse{
    data: {
        success: boolean;
        message: string;
    }
}

//password-change
interface IPasswordChangeRequestDto {
    username: string;
    oldUserPassword: string;
    newUserPassword: string;
}

interface IPasswordChangeResponseDto extends IBaseResponse {
    data: boolean;
}


//password-recovery
interface IPasswordRecoveryRequestDto{
    username: string;
    key: string;
    userNewPassword: string;
}

interface IPasswordRecoveryResponseDto extends IBaseResponse{
    data: string;
}

interface IUsernameBaseRequestDto{
    username: string;
}

interface ICheckingUsernameResponseDto extends IBaseResponse{
    data: string;
}

interface ICheckUserRecoveryKeyResponseDto extends IBaseResponse{
    data: boolean;
}

interface IGetNewUserRecoveryKeyRequestDto {
    username: string;
}

interface IGetNewUserRecoveryKeyResponseDto extends IBaseResponse {
    data: string;
}

export type {
    IBaseResponse,
    IAuthErrorResponseDto,
    IUserSignUpResponseDto,
    IUserSignUpRequestDto,
    ILoggedUserDataResponseDto,
    IUserLoginRequestDto,
    IUserLoginResponseDto,
    ILoggedUserDataRequestDto,
    IUserTokenResponseDto,
    IPasswordRecoveryRequestDto,
    IPasswordRecoveryResponseDto,
    IUsernameBaseRequestDto,
    ICheckingUsernameResponseDto,
    ICheckUserRecoveryKeyResponseDto,
    IGetNewUserRecoveryKeyRequestDto,
    IGetNewUserRecoveryKeyResponseDto,
    IPasswordChangeRequestDto,
    IPasswordChangeResponseDto,
    IUserRolesRequestDto,
    IUserRolesResponseDto
}