'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');

/**
 * Render logic for storefront.productBannerStrip component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();
    model.imgUrl = content.image ? content.image.absURL : null;
    model.imgAlt = content.alt;
    var image = model.imgUrl;
    return new Template('experience/components/commerce_assets/customHeroBanner').render(model).text;
};
