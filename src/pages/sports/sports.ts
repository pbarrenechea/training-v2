/**
 * Created by Pablo Barrenechea on 09/01/2017.
 */
import { Component } from '@angular/core';
import {NavController, ActionSheetController, ModalController } from 'ionic-angular';
import {SportsForm} from './sports.form';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  templateUrl: 'sports.html'
})

export class SportsPage {

  sports: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public modal: ModalController,
              public actionSheetCtrl: ActionSheetController, af: AngularFire) {
    this.sports = af.database.list('/sports', {
      query: {
        orderByChild: 'title'
      }
    });
  }

  removeSport(sportId: string){
    this.sports.remove(sportId);
  }

  updateSport(sportId, sportTitle){
    let modal = this.modal.create(SportsForm, { sportId: sportId, action: 'update' });
    modal.present();
  }

  showOptions(sportId, sportTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Que es lo que desea hacer con el deporte "' +  sportTitle +'" ?',
      buttons: [
        {
          text: 'Borrar',
          role: 'destructive',
          handler: () => {
            this.removeSport(sportId);
          }
        },{
          text: 'Actualizar',
          handler: () => {
            this.updateSport(sportId, sportTitle);
          }
        },{
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

  addSport(){
    let modal = this.modal.create(SportsForm, {action: 'create'});
    modal.present();
  }
}
