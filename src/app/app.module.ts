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
    NewBookDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDatepickerModule,
    MatDialogModule,
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
  entryComponents: [NewBookDialogComponent]
})
export class AppModule { }
