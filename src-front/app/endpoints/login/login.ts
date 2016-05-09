import {Component, NgZone, Inject} from '@angular/core';
import {Router} from '@angular/router';
import User from './../../shared/user/user.service';

@Component({
    selector: 'login',
    template: require('./login.html')
})
class LoginComponent {
    constructor(@Inject(User) private _user:User,
                @Inject(Router) private _router: Router,
                @Inject(NgZone) private _zone:NgZone) {
        console.log('tut');
    }

    auth(firstName:string, lastName:string) {
        this._user.initUser(firstName, lastName);
        
        if(firstName == 'administrator' && lastName == 'administrator') {
            this._zone.run(() => this._router.navigate(['Admin']));
        } else if(!!this._user.isInitialized()) {
            this._zone.run(() => this._router.navigate(['Test']));
        }
    }
}
export default LoginComponent;