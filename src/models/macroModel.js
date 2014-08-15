/**
 * macroModel.js
 *
 * This module contains the API for retrieving and storing data for the user's
 * macronutrient targets.
 *
 */

define('macroModel', ['db'], function( db ) {

    'use strict';

    var init,
        get,
        set,
        del,
        getAll,
        keys,
        keyPrefix;


    /**
     * Initalize the module
     * @return {void}
     */
    init = function(){
        keyPrefix = 'macro-target-';
        keys = ['fat', 'protein', 'carbs'];
    };


    /**
     * Get a macro value by a given key
     * @param  {String} key - fat|protein|carbs
     * @return {String}
     */
    get = function( key ){
        return db.get(keyPrefix + key) || 0;
    };


    /**
     * Set a macro value by a given key
     * @param {String} key - fat|protein|carbs
     * @param {String} val
     */
    set = function( key, val ){
        return db.set(keyPrefix + key, val);
    };


    /**
     * Remove a macro value by a given key
     * @param  {String} key - fat|protein|carbs
     * @return {void}
     */
    del = function( key ){
        return db.del(keyPrefix + key);
    };


    /**
     * Get all macro values in a single object
     * @return {Object}
     */
    getAll = function(){
        var output = {};

        keys.forEach(function( key ){
            output[key] = get(key);
        });

        return output;
    };


    init();

    return {
        get: get,
        set: set,
        del: del,
        getAll: getAll
    };

});
