'use strict';

import console from 'console';
import fetch from 'node-fetch';
import express from 'express';
import morgan from 'morgan';
import apicache from 'apicache';

import app_pkg from './package.json' assert { type: 'json' };

const config = {
    bind: process.env.BIND || '127.0.0.1',
    port: process.env.PORT || 8080,
    dataurl: 'https://datosabiertos.malaga.eu/recursos/transporte/EMT/EMTlineasUbicaciones/lineasyubicaciones.geojson'
};

const {pathname: viewsdir} = new URL('./views/', import.meta.url)

const app = express();

apicache.options({
    headers: { 'cache-control': 'no-cache' },
    statusCodes: {
        include: [200]
    }
});

app.use(morgan('common'));

app.get('/', (req, res) => {
    res.sendFile(viewsdir + 'index.html');
});

app.get('/data.geojson', apicache.middleware('1 minute'), (req, res) => {
    fetch(config.dataurl, { headers: { 'User-Agent': `${app_pkg.name}/${app_pkg.version}` } })
        .then(response => {
            response.body.pipe(res);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: "Failed fetching remote data." });
        });
});

app.listen(config.port, config.bind, () => console.log(`Server running on http://${config.bind}:${config.port}...`));
