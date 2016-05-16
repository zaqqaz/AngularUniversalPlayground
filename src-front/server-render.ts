import 'angular2-universal/polyfills';

import 'core-js/es6';
import 'core-js/es7/reflect';
import 'ts-helpers';
import 'zone.js/dist/zone-node.js';
import 'reflect-metadata';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import User from './app/shared/user/user.service';

// Angular 2 Universal
import {
    provide,
    enableProdMode,
    expressEngine,
    REQUEST_URL,
    ORIGIN_URL,
    BASE_URL,
    NODE_ROUTER_PROVIDERS,
    NODE_HTTP_PROVIDERS,
    ExpressEngineConfig
} from 'angular2-universal';

// Application
import {AppComponent as App} from './app/app';

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'), '/.tmp/serve/');

enableProdMode();

// Express View
app.engine('.html', expressEngine);
app.set('views', ROOT);
app.set('view engine', 'html');

app.use(bodyParser.json());

// Serve static files
app.use(express.static(ROOT, {index: false}));
app.use('/', ngApp);

// Server
let listener = app.listen(3000, () => {
    console.log('Listening on: http://localhost:3000');
});

function ngApp(req, res) {
    let baseUrl = '/',
        url = req.originalUrl || '/',
        config:ExpressEngineConfig = {
            directives: [App],
            platformProviders: [
                provide(ORIGIN_URL, {useValue: ''}),
                provide(BASE_URL, {useValue: baseUrl}),
            ],
            providers: [
                provide(REQUEST_URL, {useValue: url}),
                NODE_ROUTER_PROVIDERS,
                NODE_HTTP_PROVIDERS,
                User
            ],
            async: true,
            preboot: {
                appRoot: 'body',
                replay: 'hydrate',
            }
        };

    res.render('index', config);
}

//  API for demos only
app.get('/data.json', (req, res) => {
    setTimeout(()=> {
        res.json({
            data: 'This fake data came from the server. HOW IT WORKS!? '
        })
    }, 1000);
});
