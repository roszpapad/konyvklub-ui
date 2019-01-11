import { FormGroup } from '@angular/forms';

export class PasswordValidator {

    static MatchPassword(fg: FormGroup) {
       let password = fg.get('password').value; 
       let confirmPassword = fg.get('passwordAgain').value;
        if(password != confirmPassword) {
            fg.get('passwordAgain').setErrors( {MatchPassword: true} );
        } else {
            return null;
        }
    }
}