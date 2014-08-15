/**
 * eventEmitter.js
 *
 * This module is a little ridiculous, but the idea is to be able to couple
 * any generic DOM events to the internal `vent` emitter (presently
 * just DOMContentLoaded)/
 */

define('eventEmitter', ['vent'], function( vent ){

    'use strict';

    document.addEventListener("DOMContentLoaded", function( event ) {
        vent.emit('ready', event);
    });

});
