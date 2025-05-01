import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { AuthCrudService } from '../../../services/users/auths/auth-crud.service';
import { IGetNewUserRecoveryKeyRequestModel, IGetNewUserRecoveryKeyResponseModel, ILoggedUserDataRequestModel, ILoggedUserDataResponseModel, IPasswordChangeRequestModel, IUserLoginResponseModel, IUserTokenResponseModel } from '../../../../../src/app/services/apps/models/auths/authCrudModel';
import { FileUploadModule } from 'primeng/fileupload';
import { jwtDecode } from 'jwt-decode';
import { DialogModule } from 'primeng/dialog';
import { UserCrudService } from '../../../services/users/user-crud.service';
import { MessageService } from 'primeng/api';
import { IChangeUserDateOfBirthDataRequestModel, IChangeUserEmailDataRequestModel, IChangeUserFirstNameDataRequestModel, IChangeUserLastNameDataRequestModel, IChangeUserNicknameDataRequestModel } from '../../../../../src/app/services/apps/models/users/userCrudModel';
import { FieldsetModule } from 'primeng/fieldset';
import { CalendarModule } from 'primeng/calendar';
import { minAgeValidator } from '../../../../../src/app/validators/signup-validators/signup-form-validator';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    DialogModule,
    FieldsetModule,
    DatePickerModule,
    CardModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  constructor (private authCrudService:AuthCrudService, private formBuilder:FormBuilder, private userCrudService:UserCrudService, private messageService:MessageService) {}

  ngOnInit(): void {
    this.getLoggedUserData();

    this.changeUserDateOfBirthDataFormGroup = this.formBuilder.group({
      newUserDateOfBirth: ['', [Validators.required, minAgeValidator(16)]],
    });

    this.changeUserEmailDataFormGroup = this.formBuilder.group({
      newUserEmail: ['', [Validators.required, Validators.email, Validators.pattern('.+@.+\\..+')]],
    });

    this.changeUserLastNameDataFormGroup = this.formBuilder.group({
      newUserLastName: ['', [Validators.required]],
    });

    this.changeUserFirstNameDataFormGroup = this.formBuilder.group({
      newUserFirstName: ['', [Validators.required]],
    });

    this.changeUserNicknameDataFormGroup = this.formBuilder.group({
      newUserNickname: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.changeUserPasswordDataFormGroup = this.formBuilder.group({
      oldUserPassword: ['', [Validators.required]],
      newUserPassword: ['', [Validators.required]],
      newUserPasswordAgain: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  decodedToken : IUserTokenResponseModel = {} as IUserTokenResponseModel;
  loggedUserData : ILoggedUserDataResponseModel[] = [];
  getLoggedUserData() {
    const loggedUserRequestData: ILoggedUserDataRequestModel = {} as ILoggedUserDataRequestModel;
    this.decodedToken = jwtDecode(localStorage.getItem('authorization')!);
    loggedUserRequestData.username = this.decodedToken.username;
    this.authCrudService.getLoggedUserData(loggedUserRequestData).subscribe(response => {
      this.loggedUserData = [];
      response.data.userDateOfBirth = new Date(response.data.userDateOfBirth);
      this.loggedUserData.push(response);
      this.changeUserNicknameDataFormGroup.get('newUserNickname')!.setValue(this.loggedUserData[0].data.userNickname);
      this.changeUserFirstNameDataFormGroup.get('newUserFirstName')!.setValue(this.loggedUserData[0].data.userFirstName);
      this.changeUserLastNameDataFormGroup.get('newUserLastName')!.setValue(this.loggedUserData[0].data.userLastName);
      this.changeUserEmailDataFormGroup.get('newUserEmail')!.setValue(this.loggedUserData[0].data.userEmail);
      this.changeUserDateOfBirthDataFormGroup.get('newUserDateOfBirth')!.setValue(this.loggedUserData[0].data.userDateOfBirth);

      console.log(response);
      

      this.clearChangeProfileDataSpamControls();
    });
  }

  

  selectedUserDataForUpdate : string = '';
  selectUserDataForUpdate(userData:string){
    this.selectedUserDataForUpdate = userData;
    console.log(userData);
  }
  unSelectUserDataForUpdate(){
    this.selectedUserDataForUpdate = '';
    this.changeUserNicknameDataFormGroup.get('newUserNickname')!.setValue(this.loggedUserData[0].data.userNickname);
    this.changeUserFirstNameDataFormGroup.get('newUserFirstName')!.setValue(this.loggedUserData[0].data.userFirstName);
    this.changeUserLastNameDataFormGroup.get('newUserLastName')!.setValue(this.loggedUserData[0].data.userLastName);
    this.changeUserEmailDataFormGroup.get('newUserEmail')!.setValue(this.loggedUserData[0].data.userEmail);
    this.changeUserDateOfBirthDataFormGroup.get('newUserDateOfBirth')!.setValue(this.loggedUserData[0].data.userDateOfBirth);
  }

  

  editUserProfileDataDialogVisible : boolean = false;
  //use-for-edit-profile-button
  showEditUserProfileDataDialog(){
    this.editUserProfileDataDialogVisible = true;
  }
  hideEditUserProfileDataDialog(){
    this.editUserProfileDataDialogVisible = false;
  }

  newRecoveryKeyDialogVisible:boolean = false;
  showNewRecoveryKeyDialog(){
    this.newRecoveryKeyDialogVisible = true;
  }
  hideNewRecoveryKeyDialog(){
    this.newRecoveryKeyDialogVisible = false;
  }

  getNewUserRecoveryKeySpamControl : boolean = false;
  newRecoveryKeyResponseData : IGetNewUserRecoveryKeyResponseModel = {} as IGetNewUserRecoveryKeyResponseModel;
  getNewUserRecoveryKey(){
    this.getNewUserRecoveryKeySpamControl = true;
    setTimeout(() => {
      this.getNewUserRecoveryKeySpamControl = false;
    }, 5000);
    const userDataForNewRecoveryKey : IGetNewUserRecoveryKeyRequestModel = {} as IGetNewUserRecoveryKeyRequestModel;
    userDataForNewRecoveryKey.username = this.decodedToken.username;
    this.authCrudService.getNewUserRecoveryKey(userDataForNewRecoveryKey).subscribe({
      next: response => {
        this.newRecoveryKeyResponseData = response;
        this.showNewRecoveryKeyDialog();
      }
    });
  }

  //change-profile-data
  clearChangeProfileDataSpamControls(){
    this.selectedUserDataForUpdate = '';
    this.changeUserNicknameDataButtonSpamControl = false;
    this.changeUserNicknameDataFormGroup.get('newUserNickname')!.enable(); 

    this.changeUserFirstNameDataButtonSpamControl = false;
    this.changeUserFirstNameDataFormGroup.get('newUserFirstName')!.enable();
    
    this.changeUserLastNameDataButtonSpamControl = false;
    this.changeUserLastNameDataFormGroup.get('newUserLastName')!.enable();

    this.changeUserEmailDataButtonSpamControl = false;
    this.changeUserEmailDataFormGroup.get('newUserEmail')!.enable();

    this.changeUserDateOfBirthDataButtonSpamControl = false;
    this.changeUserDateOfBirthDataFormGroup.get('newUserDateOfBirth')!.enable();

    this.changeUserPasswordDataDialogVisible = false;

  }
  //change-user-nickname
  changeUserNicknameDataFormGroup!:FormGroup;
  changeUserNicknameDataButtonSpamControl : boolean = false;
  changeUserNicknameData(){
    this.changeUserNicknameDataButtonSpamControl = true;
    setTimeout(() => {
      this.changeUserNicknameDataButtonSpamControl = false;
    }, 5000);
    const data : IChangeUserNicknameDataRequestModel = {} as IChangeUserNicknameDataRequestModel;
    data.username = this.loggedUserData[0].data.username;
    data.newUserNickname = this.changeUserNicknameDataFormGroup.get('newUserNickname')!.value;
    if (this.changeUserNicknameDataFormGroup.valid) {
      if (data.newUserNickname === this.selectedUserDataForUpdate) {
        this.messageService.add({severity: 'info', summary: 'Info', detail: 'Ok.'});
        this.selectedUserDataForUpdate = '';
        this.changeUserNicknameDataButtonSpamControl = false;
      } else {
        this.changeUserNicknameDataFormGroup.get('newUserNickname')!.disable();
        this.userCrudService.changeUserNicknameData(data).subscribe({
          next: response => {
            if (response.success) {
              this.getLoggedUserData();
              this.messageService.add({severity: 'success', summary: 'Success', detail: response.message});
              
            }
          },
          error: err => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err});
          }
        });
      }
      
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Nickname must be at least 3 characters.'});
    }
  }

  //change-user-first-name
  changeUserFirstNameDataFormGroup!:FormGroup;
  changeUserFirstNameDataButtonSpamControl : boolean = false;
  changeUserFirstNameData(){
    this.changeUserFirstNameDataButtonSpamControl = true;
    setTimeout(() => {
      this.changeUserFirstNameDataButtonSpamControl = false;
    }, 5000);
    const data : IChangeUserFirstNameDataRequestModel = {} as IChangeUserFirstNameDataRequestModel;
    data.username = this.loggedUserData[0].data.username;
    data.newUserFirstName = this.changeUserFirstNameDataFormGroup.get('newUserFirstName')!.value;
    if (this.changeUserFirstNameDataFormGroup.valid) {
      if (this.selectedUserDataForUpdate === data.newUserFirstName) {
        this.messageService.add({severity: 'info', summary: 'Info', detail: 'Ok.'});
        this.selectedUserDataForUpdate = '';
        this.changeUserFirstNameDataButtonSpamControl = false;
      } else {
        this.changeUserFirstNameDataFormGroup.get('newUserFirstName')!.disable();
        this.userCrudService.changeUserFirstNameData(data).subscribe({
          next: response => {
            if (response.success) {
              this.getLoggedUserData();
              this.messageService.add({severity: 'success', summary: 'Success', detail: response.message});
            }
          },
          error: err => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.message});
          }
        });
      }
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'First name required.'});
    }
  }

  //change-user-last-name
  changeUserLastNameDataFormGroup!:FormGroup;
  changeUserLastNameDataButtonSpamControl : boolean = false;
  changeUserLastNameData(){
    this.changeUserLastNameDataButtonSpamControl = true;
    setTimeout(() => {
      this.changeUserLastNameDataButtonSpamControl = false;
    }, 5000);
    const data : IChangeUserLastNameDataRequestModel = {} as IChangeUserLastNameDataRequestModel;
    data.username = this.loggedUserData[0].data.username;
    data.newUserLastName = this.changeUserLastNameDataFormGroup.get('newUserLastName')!.value;
    if (this.changeUserLastNameDataFormGroup.valid) {
      if (this.selectedUserDataForUpdate === data.newUserLastName) {
        this.messageService.add({severity: 'info', summary: 'Info', detail: 'Ok.'});
        this.selectedUserDataForUpdate = '';
        this.changeUserLastNameDataButtonSpamControl = false;
      } else {
        this.changeUserLastNameDataFormGroup.get('newUserLastName')!.disable();
        this.userCrudService.changeUserLastNameData(data).subscribe({
          next: response => {
            if (response.success) {              
              this.getLoggedUserData();
              this.messageService.add({severity: 'success', summary: 'Success', detail: response.message});
            }
          },
          error: err => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.message});
          }
        });
      }
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Last name required.'});
    }
  }

  //change-user-e-mail
  changeUserEmailDataFormGroup!:FormGroup;
  changeUserEmailDataButtonSpamControl : boolean = false;
  changeUserEmailData(){
    this.changeUserEmailDataButtonSpamControl = true;
    setTimeout(() => {
      this.changeUserEmailDataButtonSpamControl = false;
    }, 5000);
    const data : IChangeUserEmailDataRequestModel = {} as IChangeUserEmailDataRequestModel;
    data.username = this.loggedUserData[0].data.username;
    data.newUserEmail = this.changeUserEmailDataFormGroup.get('newUserEmail')!.value;
    if (this.changeUserEmailDataFormGroup.valid) {
      if (this.selectedUserDataForUpdate === data.newUserEmail) {
        this.messageService.add({severity: 'info', summary: 'Info', detail: 'Ok.'});
        this.selectedUserDataForUpdate = '';
        this.changeUserEmailDataButtonSpamControl = false;
      } else {
        this.changeUserEmailDataFormGroup.get('newUserEmail')!.disable();
        this.userCrudService.changeUserEmailData(data).subscribe({
          next: response => {
            if (response.success) {              
              this.getLoggedUserData();
              this.messageService.add({severity: 'success', summary: 'Success', detail: response.message});
            }
          },
          error: err => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.message});
          }
        });
      }
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'E-mail required.'});
    }
  }

  //change-user-date-of-birth
  changeUserDateOfBirthDataFormGroup!:FormGroup;
  changeUserDateOfBirthDataButtonSpamControl : boolean = false;
  changeUserDateOfBirthData(){
    this.changeUserDateOfBirthDataButtonSpamControl = true;
    setTimeout(() => {
      this.changeUserDateOfBirthDataButtonSpamControl = false;
    }, 5000);
    const data : IChangeUserDateOfBirthDataRequestModel = {} as IChangeUserDateOfBirthDataRequestModel;
    data.username = this.loggedUserData[0].data.username;
    data.newUserDateOfBirth = this.changeUserDateOfBirthDataFormGroup.get('newUserDateOfBirth')!.value;
    if (this.changeUserDateOfBirthDataFormGroup.valid) {
      if (this.selectedUserDataForUpdate === data.newUserDateOfBirth.toString()) {
        this.messageService.add({severity: 'info', summary: 'Info', detail: 'Ok.'});
        this.selectedUserDataForUpdate = '';
        this.changeUserDateOfBirthDataButtonSpamControl = false;
      } else {
        this.changeUserDateOfBirthDataFormGroup.get('newUserDateOfBirth')!.disable();
        this.userCrudService.changeUserDateOfBirthData(data).subscribe({
          next: response => {
            if (response.success) {              
              this.getLoggedUserData();
              this.messageService.add({severity: 'success', summary: 'Success', detail: response.message});
            }
          },
          error: err => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.message});
          }
        });
      }
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Date of birt required.'});
    }
  }

  //change-user-password
  changeUserPasswordDataDialogVisible:boolean=false;
  showChangeUserPasswordDataDialog(){
    this.changeUserPasswordDataDialogVisible = true;
  }
  hideChangeUserPasswordDataDialog(){
    this.changeUserPasswordDataDialogVisible = false;
  }
  
  changeUserPasswordDataFormGroup!:FormGroup;
  changeUserPasswordDataButtonSpamControl : boolean = false;
  userPasswordsDifferentControl : boolean = false;
  changeUserPasswordData(){
    this.changeUserPasswordDataButtonSpamControl = true;
    setTimeout(() => {
      this.changeUserPasswordDataButtonSpamControl = false;
    }, 5000);
    const data : IPasswordChangeRequestModel = {} as IPasswordChangeRequestModel;
    data.username = this.loggedUserData[0].data.username;
    data.oldUserPassword = this.changeUserPasswordDataFormGroup.get('oldUserPassword')!.value;
    data.newUserPassword = this.changeUserPasswordDataFormGroup.get('newUserPassword')!.value;

    if (this.changeUserPasswordDataFormGroup.valid) {

      if (this.changeUserPasswordDataFormGroup.get('newUserPassword')!.value !==  this.changeUserPasswordDataFormGroup.get('newUserPasswordAgain')!.value) {
        this.userPasswordsDifferentControl = true;
      } else {
        this.userPasswordsDifferentControl = false;
        console.log('şifre değişti');
        
        this.authCrudService.passwordChangeService(data).subscribe({
          next: response => {
            if (response.success) {              
              this.getLoggedUserData();
              this.messageService.add({severity: 'success', summary: 'Success', detail: response.message});
            }
          },
          error: _ => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'err.error.message'});
          }
        });
      }
      
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please check fields.'});
    }
  }


}
