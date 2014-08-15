define('app',

['vent', 'db', 'util', 'template'],

function( vent, db, util, tmpl ){

    'use strict';

    var app = window.app = {};

    app.vent = vent;
    app.db = db;
    app.util = util;
    app.tmpl = tmpl;

    return app;
});
