import {bootstrap, enableProdMode} from 'angular2-universal';
import {provide, Component, Inject} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteConfig, Router} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';
import {router} from './router';


//if ('production' === ENV) {
//    enableProdMode();
//} else {
//    // Development
//    Error.stackTraceLimit = Infinity;
//    require('zone.js/dist/long-stack-trace-zone');
//}

@Component({
    selector: 'body',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <div class="wrapper">
      <div class="content">
        <header class="header">
          <h1 class="header__title brown-block">Политика поведения в социальных сетях </h1>
          <!--<div class="header__logo"><img src="images/logo.png" alt="Логотип"></div>-->
        </header>
        <router-outlet></router-outlet>
        </div>
    </div>
    `,
})
@RouteConfig(router.config)
export class AppComponent {
   constructor(public router:Router) {
       console.log('Hello world!');
   }
}