/**
 * Created by Pablo Barrenechea on 10/01/2017.
 */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {ViewController, NavParams } from "ionic-angular";
import { EmailValidator } from '../../lib/email.validator';

@Component({
  templateUrl: "users.form.html",
  selector: "users-form"
})

export class UsersForm {
  currentAction: string;
  currentKey: string;
  users: FirebaseListObservable<any>;
  usersForm: FormGroup;
  submitAttempt: boolean;
  currentUser: any;
  title: string;
  suscription: any;
  constructor(public formBuilder: FormBuilder,
              public viewCtrl: ViewController,
              params: NavParams,
              af: AngularFire){
    this.currentAction = params.get("action");
    this.currentKey = params.get("userId");
    this.currentUser = {};
    this.users = af.database.list('/users', {
      query: {
        orderByChild: 'name'
      }
    });
    this.usersForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required])],
      email:['', Validators.compose([Validators.required , EmailValidator.validate])],
      doa: ['', Validators.compose([Validators.required])],
    });
    this.currentUser.dob = new Date(1970, 1, 1, 0, 0, 0, 0);
    if( this.currentAction === 'create' ){
      this.title = 'Nuevo Atleta';
    }else{
      this.suscription = af.database.object("/users/" + this.currentKey).subscribe( (item) => {
        this.currentUser = item;
        var dobComponents = this.currentUser.dob.split("-");
        this.currentUser.dob = new Date(dobComponents[0], dobComponents[1] - 1, dobComponents[2]);
        var doaComponents = this.currentUser.doa.split("-");
        this.currentUser.doa = new Date(doaComponents[0], doaComponents[1] - 1, doaComponents[2]);
        this.title = "Editar " + this.currentUser.name + " " + this.currentUser.lastName;
      });
    }
   }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  save(){
    this.submitAttempt = true;
    if(this.usersForm.valid){
      let tmpUser = {
        name: this.usersForm.get('name').value,
        lastName: this.usersForm.get('lastName').value,
        dob: this.usersForm.get('dob').value,
        doa: this.usersForm.get('doa').value,
        email: this.usersForm.get('email').value
      };
      if( this.currentAction === 'create' ){
        this.users.push(tmpUser);
        console.log("Created new  user");
      }else{
        this.suscription.unsubscribe()
        this.users.update(this.currentKey, tmpUser);
      }
      this.viewCtrl.dismiss();
    }
  }
}
