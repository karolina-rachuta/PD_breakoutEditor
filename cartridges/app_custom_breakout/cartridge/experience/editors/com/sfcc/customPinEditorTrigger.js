'use strict';

var HashMap = require('dw/util/HashMap');
var Resource = require('dw/web/Resource');
var PageMgr = require('dw/experience/PageMgr');

module.exports.init = function (editor) {
    // Default values properties
    var defaults = {
        buttonBreakout: 'Select',
        titleBreakout: 'Pins',
        placeholder: 'Put yout pin',
        description: 'Description of Custom Pin Editor'
    };

    // Add some localizations
    var localization = Object.keys(defaults).reduce(function (acc, key) {
        acc.put(key, Resource.msg(key, 'experience.editors.com.sfcc.customPinEditorTrigger', defaults[key]));
        return acc;
    }, new HashMap());
    editor.configuration.put('localization', localization);

    // Pass through property `options.config` from the `attribute_definition` to be used in a breakout editor
    var options = new HashMap();
    options.put('config', editor.configuration.options.config);

    // Create a configuration for a custom editor to be displayed in a modal breakout dialog (breakout editor)
    var breakoutEditorConfig = new HashMap();
    breakoutEditorConfig.put('localization', localization);
    breakoutEditorConfig.put('options', options);

    // Add a dependency to the configured breakout editor
    var breakoutEditor = PageMgr.getCustomEditor('com.sfcc.customPinEditorBreakout', breakoutEditorConfig);
    editor.dependencies.put('customPinEditorBreakoutScript', breakoutEditor);
};
