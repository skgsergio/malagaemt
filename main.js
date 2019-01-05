'use strict';

const console = require('console');

const request = require('request');
const express = require('express');
const morgan = require('morgan');
const apicache = require('apicache');

const config = {
    bind: process.env.BIND || '127.0.0.1',
    port: process.env.PORT || 8080,
    dataurl: 'https://datosabiertos.malaga.eu/recursos/transporte/EMT/EMTlineasUbicaciones/lineasyubicaciones.geojson'
};

const app = express();

apicache.options({
    headers: { 'cache-control': 'no-cache' },
    statusCodes: {
        include: [200]
    }
});

app.use(morgan('common'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/data.geojson', apicache.middleware('1 minute'), (req, res) => {
    request({ url: config.dataurl })
        .on('error', (err) => {
            res.send(500, { error: err });
        })
        .pipe(res);
});

app.listen(config.port, config.bind, () => console.log(`Server running on http://${config.bind}:${config.port}...`));
