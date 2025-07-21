import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthCrudService } from '../../../services/users/auths/auth-crud.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { Router, RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { minAgeValidator } from '../../../../../src/app/validators/signup-validators/signup-form-validator';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    DialogModule,
    DatePickerModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  constructor (private authCrudService:AuthCrudService, private formBuilder:FormBuilder, private messageService:MessageService, private router:Router) {}

  ngOnInit(): void {
    this.signUpFormData = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      userFirstName: ['', [Validators.required]],
      userLastName: ['', [Validators.required]],
      userNickname: ['', [Validators.required, Validators.minLength(3)]],
      userEmail: ['', [Validators.required, Validators.email, Validators.pattern('.+@.+\\..+')]],//Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      password: ['', [Validators.required, Validators.minLength(7)]],
      userDateOfBirth: ['', [Validators.required, minAgeValidator(16)]],
      // userPasswordAgain: ['', [Validators.required, Validators.min(7)]],f
    });
  }

  signUpFormData! : FormGroup;

  nextToOtherData(){
    this.usernameValidControl = true;
  }

  checkBeforeSignUp(){
    if (this.usernameUnavailableControl === false && this.usernameValidControl) {
      this.signUp();
    } else if(this.signUpFormData.get('username')!.value.length >= 3 && this.signUpFormData.get('username')!.value.length != 0  && this.usernameUnavailableControl === false && this.usernameUnavailableControlBeingChecked === false) {
      this.nextToOtherData();
    }
  }

  signUpFormDataErrorControl : boolean = false;
  signUpProcessBeingSuccessful : boolean = false;
  signUpButtonSpam : boolean = false;
  signUp(){
    this.signUpButtonSpam = true;
    setTimeout(() => {
      this.signUpButtonSpam = false;
    }, 3000);
    if (this.signUpFormData.untouched || this.signUpFormData.invalid) {
      this.signUpFormDataErrorControl = true;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please check the fields.' });
    } else {
      
      this.authCrudService.usernameControlForUserSignup(this.signUpFormData.get('username')!.value).subscribe({
        next: response => {
          if (response.success) {
            this.usernameUnavailableControl = false;

            if (this.usernameUnavailableControl !== undefined && this.usernameUnavailableControl === false) {
              this.authCrudService.userSignUp(this.signUpFormData.value).subscribe(
                {
                  next: response => {
                    this.registrationResponse = response.message;
                    this.showAfterRegistrationDialog();
                  },
                  error: response => {
                    if (response.error.errors.length>0) {
                      response.error.errors.forEach((element: { message: any; }) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: element.message });
                      });
                    }
                  }
                }
              );
            } else
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'username is no longer available.' });
          } else {
            this.usernameUnavailableControl = true;

            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'username is no longer available.' });
          }
        },
        error: response => {
          this.usernameUnavailableControl = true;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'username is no longer available.' });
        }
      });

      this.signUpFormDataErrorControl = false;

      
      
    }
  }

  registrationResponse : string = "";

  afterRegistrationDialogVisible : boolean = false;
  showAfterRegistrationDialog(){
    this.afterRegistrationDialogVisible = true;
  }
  hideAfterRegistrationDialog(){
    this.afterRegistrationDialogVisible = false;
  }

  usernameValidControl : boolean = false;
  usernameUnavailableControl : boolean | undefined;
  usernameUnavailableControlBeingChecked : boolean = false;
  selectValidUsername(){
    
    if (!this.signUpFormData.get('username')!.invalid) {
      this.usernameUnavailableControlBeingChecked = true;
      this.usernameUnavailableControl = undefined;
      setTimeout(() => {
        this.usernameUnavailableControlBeingChecked = false;
        this.authCrudService.usernameControlForUserSignup(this.signUpFormData.get('username')!.value).subscribe({
          next: response => {
            if (response.success) {
              this.usernameUnavailableControl = false;
            }
          },
          error: () => {
            this.usernameUnavailableControl = true;
          }
        });
      }, 1000);
    } else {
      this.usernameUnavailableControl = undefined;
    }
    
  }

  // messages : WritableSignal<Message[]> = signal<Message[]>([]);

}
