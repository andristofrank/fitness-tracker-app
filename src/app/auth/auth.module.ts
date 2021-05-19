import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
    declarations: [
      SignupComponent,
      LoginComponent,
    ],
    imports: [
      MaterialModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule
    ]
  })
  export class AuthModule {}
  