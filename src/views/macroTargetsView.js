/**
 * macroTargetsView.js
 *
 * This module contains the logic to manage the macronutrient targets view.
 */

define('macroTargetsView',

['macroModel', 'vent', 'util', 'inputValidator'],

function( model, vent, util, Validator ){

    'use strict';

    var addButton,
        inputs,
        init,
        bindEvents,
        submit,
        getInputData,
        validateData,
        storeData,
        loadPreviousData,
        dbKeys,
        formHasErrors,
        keyPrefix,
        validators = {},
        getById = util.getById;


    /**
     * Initialize the module
     * @return {void}
     */
    init = function(){
        addButton = getById('add-targets');
        dbKeys = ['fat', 'protein', 'carbs'];
        keyPrefix = 'macro-target-';

        inputs = {};
        dbKeys.forEach(function( dbKey ){
            inputs[dbKey] =  getById('target-' + dbKey);
        });

        loadPreviousData();
        bindEvents();
    };


    /**
     * Bind DOM events and setup input validators
     * @return {void}
     */
    bindEvents = function(){
        var key;

        addButton.addEventListener('click', submit, true);
        for ( key in inputs ) {
            var input = inputs[key];
            validators[key] = new Validator(
                input,
                { dom: 'keyup', vent: 'macro-submit' },
                validateData
            );
        }
    };


    /**
     * Process the macro targets form, dispatch events
     * @return {void}
     */
    submit = function(){
        var data,
            timeout = 3000;

        data = getInputData();
        vent.emit('macro-submit');

        if ( !formHasErrors() ) {
            storeData(data);
            vent.emit('macro-targets-loaded');
            vent.emit('show-modal', 'Macronutrient targets updated.', timeout);
        } else {
            vent.emit(
                'show-modal',
                'Error: Make sure all macronutrients are numeric values.',
                timeout,
                true
            );
        }
    };


    /**
     * Determine whether the macro targets form has any errors
     * @return {Boolean}
     */
    formHasErrors = function(){
        var key;

        for ( key in inputs ) {
            if ( inputs[key].parentNode.classList.contains('error') ) {
                return true;
            }
        }

        return false;
    };


    /**
     * Collect data from all the form inputs
     * @return {Object}
     */
    getInputData = function(){
        var key,
            item,
            output = {};

        for ( key in inputs ) {
            item = inputs[key];
            output[key] = item.value;
        }

        return output;
    };


    /**
     * Validation handler for inputs
     * @return {Boolean}
     */
    validateData = function(){
        var value = this.value;

        if ( !value || !util.isNumber(value) ) {
            return false;
        }

        return true;
    };


    /**
     * Store input data in the persistent DB
     * @param {Object} data
     */
    storeData = function( data ){
        var key;

        for ( key in data ) {
            model.set(key, data[key]);
        }

        vent.emit('macros-updated');
    };


    /**
     * Prefill the form inputs with the last known data values
     * @return {void}
     */
    loadPreviousData = function(){
        dbKeys.forEach(function( item ){
            var data = model.get(item);
            if ( data !== null ) {
                inputs[item].value = data;
            }
        });
    };


    init();

});
