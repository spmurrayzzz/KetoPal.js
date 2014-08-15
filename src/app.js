/**
 * app.js
 *
 * This module is somewhat superfluous at the moment, its only being used to
 * expose certain interfaces for debugging purposes. Perhaps it will evolve down
 * the road to a more useful construct.
 */

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
