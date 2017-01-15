import { Component } from '@angular/core';
import { SportsPage } from "../sports/sports";
import { UsersPage } from '../users/users';
import { ConfigPage } from '../config/config';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  sports: any = SportsPage;
  users: any = UsersPage;
  config: any = ConfigPage;

  constructor() {

  }
}
