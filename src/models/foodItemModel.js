/**
 * foodItemModel.js
 *
 * This module contains the API for retrieving and storing data in the
 * current day's food log.
 *
 */

define('foodItemModel', ['db', 'util', 'vent'], function( db, util, vent ) {

    'use strict';

    var init,
        add,
        set,
        del,
        getAll,
        keys,
        getTotals,
        getTotalPercents,
        onChange,
        emitChanged,
        sanitize,
        keyPrefix;


    /**
     * Intialize the foodItemModel module
     * @return {void}
     */
    init = function(){
        keyPrefix = function() {
            return 'food-items-' + util.ymd();
        };
        keys = ['fat', 'protein', 'carbs'];
    };


    /**
     * Adds a food item to the food log
     * @param {Object} item - object containing fat, protein, carbs
     */
    add = function( item ){
        var items = getAll();

        if ( items === null ) {
            items = [];
        }

        item.id = util.guid();
        items.push(sanitize(item));
        db.set(keyPrefix(), JSON.stringify(items));
        emitChanged();
    };


    /**
     * Delete an item from the log by id
     * @param  {String} id - globally unique id
     * @return {void}
     */
    del = function( id ){
        var items = getAll();

        items = items.filter(function( obj ) {
            return obj.id !== id;
        });
        db.set(keyPrefix(), JSON.stringify(items));
        emitChanged();
    };


    /**
     * Get all items from the food log
     * @return {Object}
     */
    getAll = function(){
        return JSON.parse(db.get(keyPrefix()));
    };


    /**
     * Get macronutrient totals from the food log
     * @return {Object}
     */
    getTotals = function(){
        var items = getAll() || [],
            keys = ['fat', 'protein', 'carbs'],
            output = {
                fat: 0,
                protein: 0,
                carbs: 0
            };

        keys.forEach(function( key ){
            output[key] = items.reduce(function( memo, obj ){
                return memo + parseInt(obj[key]);
            }, 0);
        });

        return output;
    };


    /**
     * Get macronutrient total percentages from the food log
     * @return {Object}
     */
    getTotalPercents = function(){
        var totals = getTotals(),
            sumTotal = 0,
            keys = ['fat', 'protein', 'carbs'],
            output = {
                fat: 0,
                protein: 0,
                carbs: 0
            };

        keys.forEach(function( key ){
            sumTotal += totals[key];
        });

        if ( sumTotal === 0 ) {
            return output;
        }

        keys.forEach(function( key ){
            output[key] = parseInt((totals[key]/sumTotal)*100);
        });

        return output;
    };


    /**
     * Remove the `new-food-` string from object keys
     * @param  {Object} obj
     * @return {Object}
     */
    sanitize = function( obj ){
        var key,
            output = {};

        for ( key in obj ) {
            output[key.replace(/new-food-/, '')] = obj[key];
        }

        return output;
    };


    /**
     * Attach `cb` handler to model:change events
     * @param {Function} cb
     * @return {void}
     */
    onChange = function( cb ){
        vent.on('food-item-model-changed', cb);
    };


    /**
     * Fire the model:change event
     * @return {void}
     */
    emitChanged = vent.emit.bind(vent, 'food-item-model-changed');


    init();

    return {
        add: add,
        set: set,
        del: del,
        getAll: getAll,
        getTotals: getTotals,
        getTotalPercents: getTotalPercents,
        onChange: onChange
    };

});
