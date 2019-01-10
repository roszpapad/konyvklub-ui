import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [
    {
        path: 'register', component: RegisterComponent
    },

    {
        path: '', component: RegisterComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);
