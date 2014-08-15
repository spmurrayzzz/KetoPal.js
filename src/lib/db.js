/**
 * db.js
 *
 * This module contains basic logic for retrieving and storing arbitrary
 * string data. Presently this is just a terse wrapper around the
 * localStorage API, but in the future this could be swapped out for another
 * interface. 
 */

define('db', function(){

    'use strict';

    var get,
        set,
        del,
        ls = window.localStorage;


    get = function( key ){
        return ls.getItem(key);
    };


    set = function( key, val ){
        return ls.setItem(key, val);
    };


    del = function( key ){
        return ls.removeItem(key);
    };


    return {
        get: get,
        set: set,
        del: del
    };

});
