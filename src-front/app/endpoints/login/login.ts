import {Component, NgZone, Inject} from '@angular/core';
import {Router} from '@angular/router';
import User from './../../shared/user/user.service';

@Component({
    selector: 'login',
    template: require('./login.html')
})
class LoginComponent {
    constructor(private _user:User,
                private _router: Router,
                private _zone:NgZone) {
        console.log('tut');
    }

    auth(firstName:string, lastName:string) {
        this._user.initUser(firstName, lastName);
        
        if(firstName == 'administrator' && lastName == 'administrator') {
            this._router.navigate(['/admin']);
        } else if(!!this._user.isInitialized()) {
            this._router.navigate(['/test']);
        }
    }
}
export default LoginComponent;