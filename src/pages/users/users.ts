import { Component } from '@angular/core';
import {ActionSheetController, ModalController, NavController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {UsersForm} from "./users.form";
import {CalendarPage} from "./../calendar/calendar";

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {

  users: FirebaseListObservable<any>;

  constructor(public actionSheetCtrl: ActionSheetController,
              public modal: ModalController, public nav: NavController,
              af: AngularFire
    ) {
    this.users = af.database.list('/users', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  showOptions(userId, userName) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Que es lo que desea hacer con el atleta "' +  userName +'" ?',
      buttons: [
        {
          text: 'Borrar',
          role: 'destructive',
          handler: () => {
            this.removeUser(userId);
          }
        },{
          text: 'Actualizar',
          handler: () => {
            this.updateUser(userId);
          }
        },
        {
          text: 'Cargar actividades',
          handler: () => {
            this.nav.push(CalendarPage, {userId: userId});
          }
        },
        {
          text: 'Cargar tests de velocidad',
          handler: () => { true}
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  updateUser(userId){
    let modal = this.modal.create(UsersForm, { userId: userId, action: 'update' });
    modal.present();
  }

  removeUser(userId: string){
    this.users.remove(userId);
  }

  addUser(){
    let modal = this.modal.create(UsersForm, {action: 'create'});
    modal.present();
  }
}
