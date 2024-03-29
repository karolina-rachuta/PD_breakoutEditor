'use strict';
var URLUtils = require('dw/web/URLUtils');

module.exports.init = function (editor) {
    var optionsConfig = editor.configuration.options.config;
    var optionsInit = [
        '+',
        'x'
    ];

    // Init editor configuration
    editor.configuration.options.put('init', optionsInit);

    // Provide `baseUrl` to the static assets/content
    editor.configuration.put('baseUrl', URLUtils.staticURL('/experience/editors/com/sfcc/').https().toString());
};
