import { ModalController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {NavParams } from "ionic-angular";
import {Component} from "@angular/core";

@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.html'
})

export class CalendarPage {
    mode: string = "month";
    events:Array<any> = [];
    currentUserId: string;
    title: string;
    currentDate: Date;
    currentUser: any = {};
    activities: FirebaseListObservable<any>;


    constructor(public modal: ModalController,
                public af: AngularFire, params: NavParams,){
        this.currentUserId = params.get("userId");
        this.currentDate = new Date();
        this.af.database.object("/users/" + this.currentUserId).subscribe( (item) => {
            this.currentUser = item;
            this.activities = this.af.database.list("/activities", {
                query: {
                    startAt: '',
                    endAt: '',
                    'userId': this.currentUserId,
                    orderByChild: 'name'
                }
            });
        });
    }

    titleChanged(newTitle){
        this.title = newTitle;
        console.log("title changed");
    }

    rangeChanged(){
        console.log("Range changed");
    }

    eventSelected(){
        console.log("Event Selected")
    }

}