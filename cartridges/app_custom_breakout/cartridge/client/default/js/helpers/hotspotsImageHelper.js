'use strict';
/**
 * 
 * @return {void}
 */
function setImageInIframe() {
    var uploadedImageFromTemplate = document.querySelector('.image_PD');

    if (uploadedImageFromTemplate) {
        var componentSettings = parent.document.querySelector('.component-settings');
        var iframe = componentSettings.querySelector('iframe').contentDocument;

        // class = "image_container" was created in trigger editor, here adding image from template to iframe
        var imgWrapper = iframe.querySelector('.image_container');
        var image = document.createElement('span');
        image.setAttribute('src', uploadedImageFromTemplate.src);
        imgWrapper.append(image);
    }
}

module.exports = {
  setImageInIframe: setImageInIframe
};

