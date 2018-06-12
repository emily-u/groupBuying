import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisComponent } from './regis/regis.component';
import { CheckEmailComponent } from './check-email/check-email.component';
import { RegPendingComponent } from './reg-pending/reg-pending.component';
import { UserdataComponent } from './userdata/userdata.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddComponent,
    ShowComponent,
    EditComponent,
    NavbarComponent,
    LoginComponent,
    RegisComponent,
    CheckEmailComponent,
    RegPendingComponent,
    UserdataComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
