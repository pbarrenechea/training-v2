/**
 * Created by Pablo Barrenechea on 10/01/2017.
 */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {ViewController, NavParams } from "ionic-angular";

@Component({
  templateUrl: 'sports.form.html'
})

export class SportsForm {

  sportsForm: FormGroup;
  submitAttempt: boolean;
  sports: FirebaseListObservable<any>;
  currentAction: string;
  currentKey: string;
  title: string;
  currentSport: any;
  constructor(public formBuilder: FormBuilder,
              public viewCtrl: ViewController,
              params: NavParams,
              af: AngularFire){
    this.currentAction = params.get("action");
    this.currentKey = params.get("sportId");
    this.sports = af.database.list('/sports', {
      query: {
        orderByChild: 'title'
      }
    });
    this.sportsForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required])]
    });

    if( this.currentAction === 'create' ){
      this.title = 'Nuevo Deporte';
    }else{
      let form = this.sportsForm;
      af.database.object("/sports/" + this.currentKey).subscribe( (item) => {
        this.currentSport = item;
        this.title = "Editar " + this.currentSport.title;
        form.get('title').setValue(this.currentSport.title);
      });
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  save(){
    this.submitAttempt = true;
    if(this.sportsForm.valid){
      if( this.currentAction === 'create' ){
        this.sports.push({
          title: this.sportsForm.get('title').value
        });
        console.log("Created new  item");
      }else{
        this.sports.update(this.currentKey, {
          title: this.sportsForm.get('title').value
        });
      }
      this.viewCtrl.dismiss();
    }
  }
}
