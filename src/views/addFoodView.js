/**
 * addFoodView.js
 *
 * This modules contains the view logic for the add food form.
 */

define('addFoodView',

['util', 'foodItemModel', 'vent', 'inputValidator'],

function( util, model, vent, Validator ){

    'use strict';

    var init,
        cacheElements,
        bindEvents,
        submit,
        inputs,
        getInputData,
        validateData,
        storeData,
        formHasErrors,
        validators,
        elem,
        btn;


    /**
     * Initalize module
     * @return {void}
     */
    init = function(){
        validators = [];
        cacheElements();
        bindEvents();
    };


    /**
     * Cache DOM elements
     * @return {void}
     */
    cacheElements = function(){
        elem = util.getById('addItemBtn-view');
        btn = util.getByQS('.add-food-btn');
        inputs = util.slice(util.getByQSA('.new-food-item'));
    };


    /**
     * Bind DOM event handlers
     * @return {void}
     */
    bindEvents = function(){
        btn.addEventListener('click', submit, true);
        inputs.forEach(function( input ){
            validators.push(new Validator(
                input,
                {
                    dom: 'keyup',
                    vent: 'new-food-submit'
                },
                validateData
            ));
        });
    };


    /**
     * Process the add food form. Store data on success and handle message
     * event dispatching.
     * @return {void}
     */
    submit = function(){
        var data = getInputData(),
            timeout = 3000;

        vent.emit('new-food-submit');

        if ( !formHasErrors() ) {
            storeData(data);
            vent.emit(
                'show-modal',
                data['new-food-name'] + ' added successfully.',
                timeout
            );
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
        var hasErrors = false;

        inputs.forEach(function( input ){
            if ( input.parentNode.classList.contains('error') ) {
                hasErrors = true;
            }
        });

        return hasErrors;
    };


    /**
     * Collect the values from the text inputs in the form.
     * @return {Object}
     */
    getInputData = function(){
        var output = {};

        inputs.forEach(function( item ){
            output[item.name] = item.value;
        });

        return output;
    };


    /**
     * Validation handler for inputs
     * @return {Boolean}
     */
    validateData = function(){
        var isValid = true,
            regEx = /name/;

        if ( this.value === '' ) {
            isValid = false;
        }

        if ( !regEx.test(this.name) && !util.isNumber(this.value) ) {
            isValid = false;
        }

        return isValid;
    };


    /**
     * Adds a new item to the db
     * @param {Object} data
     * @return {void}
     */
    storeData = function( data ){
        model.add(data);
        vent.emit('new-food-added');
    };


    init();

});
