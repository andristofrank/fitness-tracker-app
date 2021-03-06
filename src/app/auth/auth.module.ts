import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
    declarations: [
      SignupComponent,
      LoginComponent,
    ],
    imports: [
      ReactiveFormsModule,
      AngularFireAuthModule,
      SharedModule,
      AuthRoutingModule
    ]
  })
  export class AuthModule {}
