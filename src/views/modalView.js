/**
 * modalView.js
 *
 * This module handles the logic for the primary messaging modal that appears
 * at the base of the user's screen. Both success and error messages are pushed
 * to the modal. Show/hide functionality and message content is all driven by
 * event dispatching.
 */

define('modalView', ['util', 'vent'], function( util, vent ){

    'use strict';

    var init,
        bindEvents,
        getById = util.getById,
        closeBtn,
        textElem,
        show,
        close,
        timerRef = null,
        modalHandler,
        view;


    /**
     * Initialize the module
     * @return {void}
     */
    init = function(){
        view = getById('modal-view');
        textElem = view.querySelector('.content');
        closeBtn = view.querySelector('.close');
        bindEvents();
    };


    /**
     * Bind DOM events and custom events
     */
    bindEvents = function(){
        vent.on('show-modal', modalHandler);
        closeBtn.addEventListener('click', close, true);
    };


    /**
     * Close the modal window (slide down)
     * @return {void}
     */
    close = function(){
        view.classList.remove('show');
        view.classList.add('hidden');
    };


    /**
     * Show the modal window (slide up)
     * @return {void}
     */
    show = function(){
        view.classList.remove('hidden');
        view.classList.add('show');
    };


    /**
     * Handler which responds to custom `show-modal` events
     * @param {String}  content - message content
     * @param {Integer}  timeout - milliseconds until dismissal
     * @param {Boolean} isError - is this modal an error modal
     */
    modalHandler = function( content, timeout, isError ){
        view.classList.remove('error');
        if ( typeof isError !== 'undefined' ) {
            view.classList.add('error');
        }

        textElem.innerHTML = content;
        show();

        window.clearTimeout(timerRef);
        if ( typeof timeout !== 'undefined' ) {
            timerRef = window.setTimeout(close, timeout);
        }
    };


    init();

});
