import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { AuthCrudService } from '../../../services/users/auths/auth-crud.service';
import { InputTextModule } from 'primeng/inputtext';
import { UserCrudService } from '../../../services/users/user-crud.service';
import { IUsernameBaseRequestModel } from '../../../../../src/app/services/apps/models/auths/authCrudModel';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    DialogModule
  ],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss'
})
export class PasswordRecoveryComponent implements OnInit {
  constructor (private formBuilder:FormBuilder, private router:Router, private authCrudService:AuthCrudService, private userCrudService:UserCrudService, private messageService:MessageService) {}

  ngOnInit(): void {
    this.userPasswordRecoveryFormData = this.formBuilder.group({
      username: ['', Validators.required],
      key: ['', Validators.required],
      userNewPassword: ['', [Validators.required, Validators.minLength(7)]],
      userNewPasswordAgain: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  userPasswordRecoveryFormData! : FormGroup;

  goToSignInPage(){
    this.router.navigateByUrl('/auth/login');
  }

  userPasswordRecoveryResponse : string = "";
  userPasswordRecoveryResponseDialogVisible : boolean = false;
  recoverPassword(){
    this.authCrudService.recoverPassword(this.userPasswordRecoveryFormData.value).subscribe({
      next: response => {
        if (response.success) {
          this.userPasswordRecoveryResponse = response.data;
          this.userPasswordRecoveryResponseDialogVisible = true;
        }
      },
      error: err => {
        console.log(err.error);
      },
    });
  }

  usernameChecked!: boolean;
  passwordsDoNotMatch : boolean = false;
  usernameNextButtonSpamControl : boolean = false;
  usernameControlForUserPasswordRecovery(){
    this.usernameNextButtonSpamControl = true;
    setTimeout(() => {
      this.usernameNextButtonSpamControl = false;
    }, 3000);
      // this.authCrudService.usernameControlForUserSignup(this.userPasswordRecoveryFormData.get('username').value).subscribe({
      //   next: response => {
          
      //   }, error: err => {
      //     this.usernameChecked = true;
      //   }
      // });
      //write-again
      if (this.usernameChecked && !this.recoveryKeyChecked && this.userPasswordRecoveryFormData.get('username')!.valid && this.userPasswordRecoveryFormData.get('key')!.valid){
        this.checkUserRecoveryKeyForUserPasswordRecovery();
      }
      
      else if(this.usernameChecked && this.recoveryKeyChecked && this.userPasswordRecoveryFormData.get('userNewPasswordAgain')!.value.trim() !== this.userPasswordRecoveryFormData.get('userNewPassword')!.value.trim()) this.passwordsDoNotMatch = true;

      else if(this.usernameChecked && this.recoveryKeyChecked && this.userPasswordRecoveryFormData.get('userNewPasswordAgain')!.value.trim() === this.userPasswordRecoveryFormData.get('userNewPassword')!.value.trim() && this.userPasswordRecoveryFormData.valid) { 
        this.recoverPassword();
        this.passwordsDoNotMatch = false;
      }

      else {
        const usernameDataForRecovery : IUsernameBaseRequestModel = {} as IUsernameBaseRequestModel;
        usernameDataForRecovery.username = this.userPasswordRecoveryFormData.get('username')!.value;
        if (this.userPasswordRecoveryFormData.get('username')!.valid) {
          this.authCrudService.checkUsernameForRecovery(usernameDataForRecovery).subscribe({
            next: response => {
              if (response.success) {
                this.usernameChecked = true;
                this.messageService.add({severity: 'info', summary: 'Info', detail: 'Account found.'});
              }
            },
            error: err => {
              console.log(err);
              this.usernameChecked = false;
              if (this.usernameChecked === false) {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Account not found.'});
                this.userPasswordRecoveryFormData.get('username')!.setValue('');
              }
            }
          });
        }
      }
  }

  recoveryKeyChecked! : boolean;
  checkUserRecoveryKeyForUserPasswordRecovery(){
    // const userDataForCheckingRecoveryKey : IPasswordRecoveryRequestModel = {} as IPasswordRecoveryRequestModel;
    // userDataForCheckingRecoveryKey.username = this.userPasswordRecoveryFormData.get('username').value;
    // userDataForCheckingRecoveryKey.key = this.userPasswordRecoveryFormData.get('userRecoveryKey').value;
    this.authCrudService.checkUserRecoveryKeyForUserPasswordRecovery(this.userPasswordRecoveryFormData.value).subscribe({
      next: response => {
        console.log(response);
        if (response.success) {
          this.recoveryKeyChecked = true;
          this.messageService.add({severity: 'info', summary: 'Info', detail: 'Key is correct! Please select new password.'});
          
        }
      }, error: err => {
        console.log(err);
        this.recoveryKeyChecked = false;
        if (this.recoveryKeyChecked === false) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Key is wrong!'});
        }
      },
    });
  }
}
