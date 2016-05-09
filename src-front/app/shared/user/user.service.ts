import {Injectable} from '@angular/core';

@Injectable()
export default class User {
    private user = {
        firstName: '',
        lastName: '',
        score: 0
    };

    initUser(firstName, lastName) {
        this.user.firstName = firstName;
        this.user.lastName = lastName;
    }

    isInitialized() {
        return !!(this.user && this.user.firstName && this.user.lastName);
    }

    incScore() {
        this.user.score++;
    }

    getUser() {
        return this.user;
    }
}