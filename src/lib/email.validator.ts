/**
 * Created by Pablo Barrenechea on 12/01/2017.
 */

import {  FormControl } from '@angular/forms';

export class EmailValidator {
  static validate(c:FormControl) {
    console.log("Validating email");
    let EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEXP.test(c.value) ? null : {valid: false}
  }
}

