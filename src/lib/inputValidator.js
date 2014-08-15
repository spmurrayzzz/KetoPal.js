/**
 * inputValidator.js
 *
 * This OO module defines the Validator object which when provided with a DOM
 * element (input), events object, and validator function, will handle all error styling
 * for the supplied input.
 */

define('inputValidator', ['vent'], function( vent ){

    'use strict';


    /**
     * Validator constructor function
     * @param {HTMLElement} elem     - text input element
     * @param {Object} events        - ex: { dom: 'keyup', vent: 'submit' }
     * @param {Function} validatorFunc - function which tests input validity
     */
    function Validator( elem, events, validatorFunc ){
        this.elem = elem;
        this.func = validatorFunc;
        this.parent = elem.parentNode;

        if ( typeof events.dom !== 'undefined' ) {
            this.events = events.dom.split(' ');
            this.bindDOMEvents();
        }

        if ( typeof events.vent !== 'undefined' ) {
            this.ventEvents = events.vent;
            this.bindVentEvents();
        }
    }


    var proto = Validator.prototype;


    /**
     * Attach the validator handler to all appropriate DOM events
     * @return {self}
     */
    proto.bindDOMEvents = function(){
        var handler = this.handler.bind(this),
            elem = this.elem;

        this.events.forEach(function( ev ){
            elem.addEventListener(ev, handler, true);
        }.bind(this));

        return this;
    };


    /**
     * Bind the validator handler to custom events
     * @return {self}
     */
    proto.bindVentEvents = function(){
        vent.on(this.ventEvents, this.handler.bind(this));
    };


    /**
     * Parent handler which invokes the user-supplied validator
     * @param  {DOMEvent} ev
     * @return {self}
     */
    proto.handler = function( ev ){
        if ( this.func.call(this.elem, ev) ) {
            this.styleForError(false);
        } else {
            this.styleForError(true);
        }
        return this;
    };


    /**
     * Style the input element for errors based on bool param
     * @param {Boolean} isError
     */
    proto.styleForError = function( isError ){
        if ( typeof isError !== 'boolean' ){
            return false;
        }

        if ( isError ) {
            this.parent.classList.add('error');
        } else {
            this.parent.classList.remove('error');
        }

        return this;
    };


    return Validator;

});
