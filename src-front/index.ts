import 'core-js/es6';
import 'core-js/es7/reflect';
import 'ts-helpers';
import 'zone.js/dist/zone-node.js';
import 'reflect-metadata';

import {bootstrap, enableProdMode,  BROWSER_ROUTER_PROVIDERS, BROWSER_HTTP_PROVIDERS} from 'angular2-universal';
import {AppComponent} from './app/app';

bootstrap(AppComponent, [
    ...BROWSER_ROUTER_PROVIDERS,
    ...BROWSER_HTTP_PROVIDERS,
]);