/**
 * mainView.js
 *
 * This module handles the view logic for the tab menu and any globally shared
 * elements across the subviews.
 */

define('mainView',

['macroModel', 'vent', 'util', 'template', 'db'],

function( macroModel, vent, util, tmpl, db ){

    'use strict';

    var init,
        bindEvents,
        macroTargets,
        cacheElements,
        macroFooter,
        tmplString,
        btnElements,
        btnHandler,
        currentlyShown,
        renderFooter;


    /**
     * Initialize the module
     * @return {void}
     */
    init = function(){
        var lastShown = db.get('last-shown-view') || 'targetsBtn';

        macroTargets = macroModel.getAll();
        tmplString = util.getById('tmpl-targets').textContent;
        tmpl.parse(tmplString);
        btnElements = {
            targetsBtn: { elem: null, view: null },
            addItemBtn: { elem: null, view: null },
            foodLogBtn: { elem: null, view: null }
        };

        currentlyShown = util.getById(lastShown + '-view');
        currentlyShown.style.display = 'block';

        cacheElements();
        bindEvents();
        renderFooter();
    };


    /**
     * Bind DOM events and custom event disptches
     * @return {void}
     */
    bindEvents = function(){
        macroModel.onChange(function(){
            macroTargets = macroModel.getAll();
            renderFooter();
        });

        util.each(btnElements, function( btn, key ){
            btn = btnElements[key].elem;
            btn.addEventListener('click', btnHandler, true);
        });
    };


    /**
     * Event handler for menu button click events
     * @param {Event} ev
     * @return {void}
     */
    btnHandler = function( ev ){
        currentlyShown.style.display = 'none';
        currentlyShown = btnElements[ev.srcElement.id].view;
        currentlyShown.style.display = 'block';
        db.set('last-shown-view', ev.srcElement.id);
    };


    /**
     * Cache all relevant DOM elements
     * @return {void}
     */
    cacheElements = function(){
        macroFooter = util.getById('macro-footer');
        util.each(btnElements, function( obj, key ){
            obj.elem = util.getById(key);
            obj.view = util.getById(key + '-view');
        });
    };


    /**
     * Render the macronutrients sticky footer
     * @return {void}
     */
    renderFooter = function(){
        macroFooter.innerHTML = tmpl.render(tmplString, macroTargets);
    };


    init();

});
