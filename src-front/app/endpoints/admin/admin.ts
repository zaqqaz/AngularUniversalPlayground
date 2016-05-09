import {Component, NgZone, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {Http, URLSearchParams} from '@angular/http';
import {api} from './../../constant';

@Component({
    selector: 'admin',
    template: require('./admin.html'),
})

export default class AdminComponent {
    firstDate = {
        date: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        year: [2016]
    };
    firstDateSelected = {
        date: 1,
        month: 1,
        year: 2016

    };
    secondDate = {
        date: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        year: [2016]
    };
    secondDateSelected = {
        date: 1,
        month: 1,
        year: 2016
    };
    result = [];

    constructor(@Inject(Router)
                private _router:Router,
                @Inject(NgZone)
                private _zone:NgZone,
                @Inject(Http)
                private _http:Http) {
        let currentDay = new Date();
        let lastWeek = new Date();
        lastWeek.setDate(currentDay.getDate() - 7);

        this.firstDateSelected.year = lastWeek.getFullYear();
        this.firstDateSelected.month = lastWeek.getMonth()+1;
        this.firstDateSelected.date = lastWeek.getDate();

        this.secondDateSelected.year = currentDay.getFullYear();
        this.secondDateSelected.month = currentDay.getMonth()+1;
        this.secondDateSelected.date = currentDay.getDate();

        this.show();
    }

    logout() {
        this._zone.run(() => this._router.navigate(['/login']));
    }

    show() {
        let date_from = new Date(this.firstDateSelected.year, this.firstDateSelected.month-1, this.firstDateSelected.date);
        let date_to = new Date(this.secondDateSelected.year, this.secondDateSelected.month-1, this.secondDateSelected.date);
        let search = new URLSearchParams();
        date_to.setHours(23,59,59,999);

        search.set('date_from', date_from.getTime()+'');
        search.set('date_to', date_to.getTime()+'');
        this._http.get(api + '/tests', {search})
            .subscribe(result => {
                this._zone.run(() => {
                    this.result = result.json();
                    this.result.map((one:any) => {
                        one.createdAt = new Date(one.createdAt)
                    });
                });
            });
    }

    download() {
        let date_from = new Date(this.firstDateSelected.year, this.firstDateSelected.month, this.firstDateSelected.date);
        let date_to = new Date(this.secondDateSelected.year, this.secondDateSelected.month, this.secondDateSelected.date);
        window.location.replace(api + '/tests/excel' + "?date_from=" + date_from + ",date_to=" + date_to);
    }
}