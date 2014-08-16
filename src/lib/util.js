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
     * Iterates through the object, executing iterator callback on each
     * pass. Callback is passed the element, the index or key, and the parent
     * iterable item.
     * @param  {Object} obj
     * @param  {Function} iterator
     */
    function each( obj, iterator ) {
        var key,
            result;

        for ( key in obj ) {
            result = iterator.call(obj, obj[key], key, obj);
            if ( result === false ) {
                return;
            }
        }
    }


    return {
        isNumber: isNumber,
        getById: document.getElementById.bind(document),
        getByQS: document.querySelector.bind(document),
        getByQSA: document.querySelectorAll.bind(document),
        slice: slice,
        ymd: ymd,
        guid: guid,
        each: each
    };

});
