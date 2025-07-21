import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthCrudService } from '../../../services/users/auths/auth-crud.service';
import { Router, RouterModule } from '@angular/router';
import { IUserLoginResponseDto } from '../../../models/auths/authCrudModel';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { AppConfigurator } from '../../../layout/component/app.configurator';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
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
    CardModule,
    RouterModule
    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  valCheck: string[] = ['remember'];

  password!: string;

  constructor(private authCrudService:AuthCrudService, private router:Router, private formBuilder: FormBuilder, private location:Location, private messageService:MessageService) { }

  ngOnInit(){
    if(localStorage.getItem('authorization')) this.router.navigate(['/']);

    this.userLoginFormData = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  userLoginFormData!: FormGroup;
  
  userLoginResponse : IUserLoginResponseDto | undefined;
  signInButtonSpam : boolean = false;
  login(){
    this.signInButtonSpam = true;
    setTimeout(() => {
      this.signInButtonSpam = false;
    }, 3000);
    this.authCrudService.login(this.userLoginFormData.value).subscribe({

      next: response => {
        
        this.userLoginResponse = response;
        
        if (response.data) {
          localStorage.setItem('authorization', response.data.token);
          this.authCrudService.loggedInStatus.next(true);
        }
        if(localStorage.getItem('authorization')) {
          if (this.authCrudService.returnUrl.length>0)
            this.router.navigateByUrl(this.authCrudService.returnUrl);
          else
            this.router.navigate(['/']);

          this.authCrudService.returnUrl = "";
        }

        this.messageService.add({ severity: 'success', summary: 'Welcome!', detail: 'Signed in as '+response.data.username+'.' });
        
      }, error: err => {    
            
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        
      }
      
    });
  }

  returnUrl : string = "";
  continueWithoutLoggingIn(){
    if (this.authCrudService.returnUrl.length > 0) {
      this.returnUrl = this.authCrudService.returnUrl;
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.router.navigateByUrl('/');
    }
  }


}
