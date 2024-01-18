(() => {
    let imageFromTrigger;
    let pinContainer;
    let breakoutContainer;

    subscribe('sfcc:ready', async (value) => {
        console.log('breakout-readyf', 'sfcc:ready');
        console.log('value-breakout-subscribe:', value);
        console.log('value-breakout-subscribe.value:', value.value);


        if (value) {
        imageFromTrigger = document.createElement('img');
        imageFromTrigger.setAttribute('src', value.value.src);
        breakoutContainer = document.createElement('div');
        document.body.append(breakoutContainer);
        breakoutContainer.append(imageFromTrigger);
        breakoutContainer.className = "breakoutContainer";
        breakoutContainer.style.position = 'relative'
        imageFromTrigger.addEventListener('click', handlePinPlacement);
        console.log('imageFromTrigger', imageFromTrigger);
        } else {
         console.error('Image element with ID "imageKR" not found.');
        }
        });


    function handlePinPlacement(event) {
    console.log('handlePin', handlePinPlacement)

        if (imageFromTrigger) {
            var xCoordinate = event.clientX - imageFromTrigger.getBoundingClientRect().left;
            var yCoordinate = event.clientY - imageFromTrigger.getBoundingClientRect().top;
        console.log('xCoordinate', xCoordinate);
        console.log('yCoordinate', yCoordinate);
            var pin = document.createElement('div');
            pin.className = 'pin pin-remove';
            pin.style.backgroundColor = 'red';
            pin.style.width = '8px';
            pin.style.height = '8px';
            pin.style.position = 'absolute';
            pin.style.left = xCoordinate + 'px';
            pin.style.top = yCoordinate + 'px';
            
           breakoutContainer.append(pin);
        
        console.log(pin.style.left);
        console.log(pin.style.top);
        console.log('pin', pin);
 
        } else {
            console.error('Image element with ID "imageKR" not found.');
        }
    }
})();
