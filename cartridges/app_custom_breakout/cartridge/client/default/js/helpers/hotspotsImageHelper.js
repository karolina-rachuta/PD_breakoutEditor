
'use strict';
/**
 * 
 * @return {void}
 */
function setImageInIframe() {
    var uploadedImageFromTemplate = document.querySelector('.imageKR');
    console.log(uploadedImageFromTemplate);

    if (uploadedImageFromTemplate) {
        var componentSettings = parent.document.querySelector('.component-settings');
        var iframe = componentSettings.querySelector('iframe').contentDocument;
        var imgWrapper = iframe.querySelector('.image_container'); //create this class in trigger, image frm template to iframe
        var image = document.createElement('span');
        image.setAttribute('src', uploadedImageFromTemplate.src);
        imgWrapper.append(image);
        console.log('currentImagePassedToEditor:', image);
    }
}

module.exports = {
  setImageInIframe: setImageInIframe
};

