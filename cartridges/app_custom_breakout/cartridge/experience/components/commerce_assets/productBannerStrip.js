// (BeeIt-DEMO)
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
    model.productUrl = URLUtils.url('Product-Show', 'pid', content.product.ID);
    model.productName = content.product.name;

    return new Template('experience/components/customBanner').render(model).text;
};
