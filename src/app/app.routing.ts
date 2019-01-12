import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

const appRoutes: Routes = [
    {
        path: 'register', component: RegisterComponent
    },

    {
        path: '', component: LoginComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'myprofile', component: MyProfileComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);
