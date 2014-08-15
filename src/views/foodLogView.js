/**
 * foodLogView.js
 *
 * This module handles the view logic for the food log.
 */

define('foodLogView',

['foodItemModel', 'vent', 'util', 'template'],

function( model, vent, util, tmpl ){

    'use strict';

    var init,
        bindEvents,
        cacheElements,
        tmplString,
        view,
        deleteDelegate,
        render;


    /**
     * Initialize the module
     * @return {void}
     */
    init = function(){
        cacheElements();
        bindEvents();
    };


    /**
     * Bind custom event handlers
     * @return {void}
     */
    bindEvents = function(){
        vent.on('ready', render);
        model.onChange(render);
        view.addEventListener('click', deleteDelegate, true);
    };


    /**
     * Event delegation to handle deleting items from the log
     * @param {Event} ev
     */
    deleteDelegate = function( ev ){
        var target = ev.target,
            id = target.dataset.id;

        if ( target.classList.contains('close') ) {
            model.del(id);
        }
    };


    /**
     * Cache DOM elements and compile templates
     * @return {void}
     */
    cacheElements = function(){
        tmplString = util.getById('tmpl-log').innerHTML;
        tmpl.parse(tmplString);
        view = util.getByQS('#foodLogBtn-view table.log');
    };


    /**
     * Render the view
     * @return {void}
     */
    render = function(){
        var items = model.getAll(),
            totals = model.getTotals(),
            totalPercents = model.getTotalPercents();

        view.innerHTML = tmpl.render(
            tmplString,
            {
                items: items,
                totals: totals,
                totalPercents: totalPercents
            }
        );
    };


    init();

});
