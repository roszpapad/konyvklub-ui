import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDatepicker,
  MatDatepickerModule, MatDialogModule,
  MatFormFieldModule, MatIcon, MatIconModule,
  MatInputModule,
  MatTableModule,
  MatNativeDateModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatSelectModule,
  MatCardModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { routing } from './app.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MyDetailsComponent } from './components/my-details/my-details.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MyBooksComponent } from './components/my-books/my-books.component';
import { NewBookDialogComponent } from './components/new-book-dialog/new-book-dialog.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TicketFilterComponent } from './components/ticket-filter/ticket-filter.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { BrowseTicketsComponent } from './components/browse-tickets/browse-tickets.component';
import { TicketShowComponent } from './components/ticket-show/ticket-show.component';
import { OfferComponent } from './components/offer/offer.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { NewOfferDialogComponent } from './components/new-offer-dialog/new-offer-dialog.component';
import { NewTicketDialogComponent } from './components/new-ticket-dialog/new-ticket-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ChatComponent } from './components/chat/chat.component';
import { PrivateChatComponent } from './components/private-chat/private-chat.component';
import { BanUsersComponent } from './components/ban-users/ban-users.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChangeProfilePicComponent } from './components/change-profile-pic/change-profile-pic.component';
import { ReportUserComponent } from './components/report-user/report-user.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { FriendRequestsComponent } from './components/friend-requests/friend-requests.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { NotFoundErrorComponent } from './components/not-found-error/not-found-error.component';
import { FriendsComponent } from './components/friends/friends.component';
import { FriendCardComponent } from './components/friend-card/friend-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    MyProfileComponent,
    MyDetailsComponent,
    ChangePasswordComponent,
    MyBooksComponent,
    NewBookDialogComponent,
    TicketComponent,
    TicketFilterComponent,
    TicketListComponent,
    BrowseTicketsComponent,
    TicketShowComponent,
    OfferComponent,
    DummyComponent,
    NewOfferDialogComponent,
    NewTicketDialogComponent,
    HomeComponent,
    NotificationsComponent,
    NotificationComponent,
    ChatComponent,
    PrivateChatComponent,
    BanUsersComponent,
    ChangeProfilePicComponent,
    ReportUserComponent,
    ReportListComponent,
    FriendRequestsComponent,
    NewPasswordComponent,
    NotFoundErrorComponent,
    FriendsComponent,
    FriendCardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatBadgeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDatepickerModule,
    MatDialogModule,
    ImageCropperModule,
    routing
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewBookDialogComponent,NewOfferDialogComponent,NewTicketDialogComponent]
})
export class AppModule { }
