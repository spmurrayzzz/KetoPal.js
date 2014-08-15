/**
 * foodItemModel.js
 *
 * This module contains the API for retrieving and storing data in the
 * current day's food log.
 *
 */

define('foodItemModel', ['db', 'util'], function( db, util ) {

    'use strict';

    var init,
        add,
        set,
        del,
        getAll,
        keys,
        getTotals,
        getTotalPercents,
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
    };


    /**
     * Delete an item from the log by id
     * @param  {String} id - globally unique id
     * @return {void}
     */
    del = function( id ){
        var items = getAll();

        items = util.map(items, function( obj ) {
            return obj.id !== id;
        });
        db.set(keyPrefix(), JSON.stringify(items));
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
        var items = getAll(),
            keys = ['fat', 'protein', 'carbs'],
            output = {
                fat: 0,
                protein: 0,
                carbs: 0
            };

        keys.forEach(function( key ){
            output[key] = util.reduce(items || [], function( memo, obj ){
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


    init();

    return {
        add: add,
        set: set,
        del: del,
        getAll: getAll,
        getTotals: getTotals,
        getTotalPercents: getTotalPercents
    };

});
