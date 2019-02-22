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
import { HomeComponent } from './components/home/home.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ChatComponent } from './components/chat/chat.component';
import { PrivateChatComponent } from './components/private-chat/private-chat.component';
import { BanUsersComponent } from './components/ban-users/ban-users.component';
import { ChangeProfilePicComponent } from './components/change-profile-pic/change-profile-pic.component';
import { ReportUserComponent } from './components/report-user/report-user.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { FriendRequestsComponent } from './components/friend-requests/friend-requests.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';

const appRoutes: Routes = [
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'notifications', component: NotificationsComponent
    },
    {
        path: '', component: HomeComponent
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
    },
    {
        path: 'chat', component: ChatComponent
    },
    {
        path: 'privateChat/:id', component: PrivateChatComponent
    },
    {
        path: 'banUsers', component: BanUsersComponent
    },
    {
        path: 'changePicture', component: ChangeProfilePicComponent
    },
    {
        path: 'reportUsers', component: ReportUserComponent
    },
    {
        path: 'reports', component: ReportListComponent
    },
    {
        path: 'friendRequests', component: FriendRequestsComponent
    },
    {
        path: 'changePassword', component: NewPasswordComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);
