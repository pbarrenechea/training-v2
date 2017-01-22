import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {SportsForm} from '../pages/sports/sports.form';
import {UsersForm} from '../pages/users/users.form';
import { SportsPage } from '../pages/sports/sports';
import { UsersPage } from '../pages/users/users';
import { ConfigPage } from '../pages/config/config';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireModule } from 'angularfire2';
import { NgCalendarModule  } from 'ionic2-calendar';
import {CalendarPage} from '../pages/calendar/calendar';

export const firebaseConfig = {
  apiKey: "AIzaSyDg1QnNxTZ9JoKdSI67C4Su2PCKsvQ0t_U",
  authDomain: "friendlychat-b0007.firebaseapp.com",
  databaseURL: "https://friendlychat-b0007.firebaseio.com",
  storageBucket: "friendlychat-b0007.appspot.com",
  messagingSenderId: "606093717116"
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SportsPage,
    SportsForm,
    UsersForm,
    UsersPage,
    ConfigPage,
    CalendarPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    NgCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    SportsPage,
    UsersPage,
    ConfigPage,
    CalendarPage,
    SportsForm,
    UsersForm
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
