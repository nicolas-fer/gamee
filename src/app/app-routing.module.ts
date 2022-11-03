import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard  } from './services/auth-guard.service';
import { SiteLayoutComponent } from './shared/layout/site-layout/site-layout.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { TeamComponent } from './views/team/team.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: TeamComponent, canActivate: [AuthGuard]  },
      { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
    ]
  },

  { path: 'login', component: LoginComponent },

  { path: '**', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
