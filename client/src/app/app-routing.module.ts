import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisComponent } from './regis/regis.component';
import { CheckEmailComponent } from './check-email/check-email.component';
import { RegPendingComponent } from './reg-pending/reg-pending.component';

const routes: Routes = [
  { path: '',component: NavbarComponent },
  { path: 'login',component: LoginComponent },
  { path: 'regis',component: RegisComponent },
  { path: 'checkEmail',component: CheckEmailComponent },
  { path: 'activate/:token', component: RegPendingComponent },
  { path: 'add',component: AddComponent },
  { path: 'edit',component: EditComponent },
  { path: 'home',component: HomeComponent },
  { path: 'show',component: ShowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
