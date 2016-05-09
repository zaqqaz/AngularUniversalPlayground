import 'core-js/es6';
import 'core-js/es7/reflect';
import 'ts-helpers';
import 'zone.js/dist/zone-node.js';
import 'reflect-metadata';
import { bootstrap } from '@angular/platform-browser-dynamic';
import {enableProdMode, provide, Component, Inject} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';
import {ROUTER_PROVIDERS} from '@angular/router/src/router_providers';
import {HTTP_PROVIDERS} from '@angular/http';
import {router} from './router';
import User from './shared/user/user.service';


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
          <div class="header__logo"><img src="images/logo.png" alt="Логотип"></div>
        </header>
        <router-outlet></router-outlet>
        </div>
    </div>
    `,
})
@Routes(router.config)
class AppComponent {
   constructor(router:Router) {
       console.log('Hello world!');
   }
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    User
]);