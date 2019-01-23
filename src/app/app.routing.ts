import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MyBooksComponent } from './components/my-books/my-books.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TicketFilterComponent } from './components/ticket-filter/ticket-filter.component';
import { BrowseTicketsComponent } from './components/browse-tickets/browse-tickets.component';
import { TicketShowComponent } from './components/ticket-show/ticket-show.component';
import { DummyComponent } from './components/dummy/dummy.component';

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
    },
    {
        path: 'mybooks', component: MyBooksComponent
    },
    {
        path: 'ticket', component: TicketComponent
    },
    {
        path: 'filter', component: TicketFilterComponent
    },
    {
        path: 'browse', component: BrowseTicketsComponent
    },
    {
        path: 'tickets/:id', component: TicketShowComponent
    },
    {
        path: 'dummy', component: DummyComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);
