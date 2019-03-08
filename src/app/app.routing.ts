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
import { NotFoundErrorComponent } from './components/not-found-error/not-found-error.component';
import { AuthGuard } from './_guards';
import { AdminGuard } from './_guards/adminauth.guard';
import { FriendsComponent } from './components/friends/friends.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';

const appRoutes: Routes = [
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]
    },
    {
        path: '', component: HomeComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard]
    },
    {
        path: 'mybooks', component: MyBooksComponent, canActivate: [AuthGuard]
    },
    {
        path: 'browse', component: BrowseTicketsComponent, canActivate: [AuthGuard]
    },
    {
        path: 'tickets/:id', component: TicketShowComponent, canActivate: [AuthGuard]
    },
    {
        path: 'dummy', component: DummyComponent, canActivate: [AuthGuard]
    },
    {
        path: 'chat', component: ChatComponent, canActivate: [AuthGuard]
    },
    {
        path: 'privateChat/:id', component: PrivateChatComponent, canActivate: [AuthGuard]
    },
    {
        path: 'banUsers', component: BanUsersComponent, canActivate: [AdminGuard]
    },
    {
        path: 'changePicture', component: ChangeProfilePicComponent, canActivate: [AuthGuard]
    },
    {
        path: 'reportUsers', component: ReportUserComponent, canActivate: [AuthGuard]
    },
    {
        path: 'reports', component: ReportListComponent, canActivate: [AdminGuard]
    },
    {
        path: 'friendRequests', component: FriendRequestsComponent, canActivate: [AuthGuard]
    },
    {
        path: 'changePassword', component: NewPasswordComponent, canActivate: [AuthGuard]
    },
    {
        path: '404error', component: NotFoundErrorComponent
    },
    {
        path: 'friends', component: FriendsComponent, canActivate: [AuthGuard]
    },
    {
        path: 'myOffers', component: MyOffersComponent, canActivate: [AuthGuard]
    },
    {   
        path: '**', redirectTo: '' 
    }
];

export const routing = RouterModule.forRoot(appRoutes);
