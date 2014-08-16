/**
 * macroModel.js
 *
 * This module contains the API for retrieving and storing data for the user's
 * macronutrient targets.
 *
 */

define('macroModel', ['db', 'vent'], function( db, vent ) {

    'use strict';

    var init,
        get,
        set,
        del,
        getAll,
        keys,
        onChange,
        emitChanged,
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
        var result = db.set(keyPrefix + key, val);
        emitChanged();
        return result;
    };


    /**
     * Remove a macro value by a given key
     * @param  {String} key - fat|protein|carbs
     * @return {void}
     */
    del = function( key ){
        var result = db.del(keyPrefix + key);
        emitChanged();
        return result;
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


    /**
     * Attach `cb` handler to model:change events
     * @param {Function} cb
     * @return {void}
     */
    onChange = function( cb ){
        vent.on('macro-model-changed', cb);
    };


    /**
     * Fire the model:change event
     * @return {void}
     */
    emitChanged = vent.emit.bind(vent, 'macro-model-changed');


    init();

    return {
        get: get,
        set: set,
        del: del,
        getAll: getAll,
        onChange: onChange
    };

});
