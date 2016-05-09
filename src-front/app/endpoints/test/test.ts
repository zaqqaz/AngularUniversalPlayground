import {Component, NgZone, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, HTTP_PROVIDERS} from '@angular/http';
import User from './../../shared/user/user.service';
import {api} from './../../constant';

@Component({
    selector: 'test',
    template: require('./test.html'),
    viewProviders: [HTTP_PROVIDERS]
})

export default class TestComponent {
    started = false;
    answered = false;
    correctAnswer = false;
    finished = false;
    loaded = false;
    questions = [];
    currentIndex = 0;

    constructor(private _user:User,
                private _router: Router,
                private _zone:NgZone,
                private _http:Http) {
        if(!this._user.isInitialized()) {
            this._router.navigate(['/login']);
        } else {
            this._http.get(api + '/questions')
                .subscribe(result => {
                    this.questions = result.json();
                    this.loaded = true;
                });
        }
    }

    answer(_answer) {
        this.correctAnswer = false;
        this.answered = true;
        if(!!_answer === !!this.questions[this.currentIndex].isTrue) {
            this._user.incScore();
            this.correctAnswer = true;
        }
    }

    next() {
        if(this.currentIndex == (this.questions.length - 1) ) {
            this.finish();
        } else {
            this.answered = false;
            this.currentIndex++;
        }
    }

    finish() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post(api + '/tests',  JSON.stringify(this._user.getUser()),{ headers: headers})
            .subscribe(result => {
                this._zone.run(() => this.finished=true);
            });
    }
}
