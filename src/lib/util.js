/**
 * util.js
 *
 * This module exposes some utility methods used by multiple modules.
 */

define('util', function(){

    'use strict';


    /**
     * Determines whether `n` is a valid number
     * @param {Any} n
     * @return {Boolean}
     */
    function isNumber( n ) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }


    /**
     * Returns a sliced version of an array or array-like object
     * @param  {Array-like} arr
     * @param  {Integer} n   offset
     * @return {Array}
     */
    function slice( arr, n ) {
        return Array.prototype.slice.call(arr, n);
    }


    /**
     * Returns the current date in YYYYMMDD format
     * @return {String}
     */
    function ymd(){
        var date = new Date();
        return date.toISOString().slice(0,10).replace(/-/g,"");
    }


    /**
     * Generates a globally unique id
     * @return {String}
     */
    function guid () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }


    /**
     * Returns an array of values by mapping `arr` values through the provided
     * iterator (`cb`)
     *
     * @param  {Array}   arr
     * @param  {Function} cb
     * @return {Array}
     */
    function map( arr, cb ){
        var output = [];

        arr.forEach(function( obj ){
            if ( cb(obj ) ) {
                output.push(obj);
            }
        });

        return output;
    }


    /**
     * Reduces `arr` to a single value by providing an initial state (memo) and
     * subsequently transforming that value via `iterator` function
     * @param  {Array} arr
     * @param  {Function} iterator
     * @param  {String|Integer} memo
     * @return {String|Integer}
     */
    function reduce( arr, iterator, memo ) {
        var retain = memo;

        arr.forEach(function( obj ){
            retain += iterator(memo, obj);
        });

        return retain;
    }


    return {
        isNumber: isNumber,
        getById: document.getElementById.bind(document),
        getByQS: document.querySelector.bind(document),
        getByQSA: document.querySelectorAll.bind(document),
        slice: slice,
        ymd: ymd,
        guid: guid,
        map: map,
        reduce: reduce
    };

});
