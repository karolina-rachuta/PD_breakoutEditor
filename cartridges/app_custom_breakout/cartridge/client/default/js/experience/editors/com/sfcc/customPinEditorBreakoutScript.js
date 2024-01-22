// Code in the client-side JavaScript file for the breakout  (PD-bonus task)
(() => {
    let imageFromTrigger;
    let breakoutContainer;
    let pinList;
    let pinPoint;
    let deletePinButton;
    let listTitile;
    let id = 0;
    var currentValue = {};
    var newPinSettings;

    
    subscribe('sfcc:ready', async (value) => {
        // Once the breakout editor is ready, the custom code is able to select or
            // Create a value. Any meaningful change to a value/selection needs to be
            // reflected back into the host container via a `sfcc:value` event.
        currentValue = Object.assign({}, value.value);
        if (value) {
        imageFromTrigger = document.createElement('img');
        imageFromTrigger.setAttribute('src', currentValue.src);

        breakoutContainer = document.createElement('div');
        breakoutContainer.className = "breakoutContainer";
        breakoutContainer.style.position = 'relative';

        document.body.append(breakoutContainer);
        breakoutContainer.append(imageFromTrigger);
        
        imageFromTrigger.addEventListener('click', handlePinPlacement);

        listTitile = document.createElement('h2');
        listTitile.innerText = "List with pins and coordinates:"
        pinList = document.createElement('ul');
        
        breakoutContainer.append(listTitile);
        breakoutContainer.append(pinList);
    
        } else {
         console.error('Image element with class "image_PD" not found.');
        }
    });



    function handlePinPlacement(event) {
        if (imageFromTrigger) {
            var xCoordinate = event.clientX - imageFromTrigger.getBoundingClientRect().left;
            var yCoordinate = event.clientY - imageFromTrigger.getBoundingClientRect().top;

            var pin = document.createElement('div');
            pin.className = 'pin pin-remove';
            pin.dataset.id = id;
            pin.style.backgroundColor = 'red';
            pin.style.width = '8px';
            pin.style.height = '8px';
            pin.style.position = 'absolute';
            pin.style.left = xCoordinate + 'px';
            pin.style.top = yCoordinate + 'px';
            breakoutContainer.append(pin);

            newPinSettings = {
                xCoordinate: xCoordinate,
                yCoordinate: yCoordinate,
                id: pin.dataset.id
            }

            //updating currentValue
            if (!currentValue.pins) {
            currentValue.pins = [];
            } else {
                currentValue.pins.push(newPinSettings);
            }

            // creating li with pin coordinates
            pinPoint = document.createElement('li');
            pinPoint.className = "pin-remove";
            pinPoint.dataset.id = id;
            pinPoint.innerText = `X: ${xCoordinate}px, Y: ${yCoordinate}px`
        
            // create delete button
            deletePinButton = document.createElement('button');
            deletePinButton.innerText = "Delete pin";
            deletePinButton.dataset.id = id;
            pinPoint.appendChild(deletePinButton);

            pinList.append(pinPoint);
            id++;

            deletePinButton.addEventListener('click', (event) => handlePinRemoval(event));
            submitHotspotSelections()

        } else {
            console.error('Image element with class "image_PD" not found.');
        }
    }

    function handlePinRemoval(event) {
        var allElementsToRemove = document.querySelectorAll('.pin-remove');
        var deleteButtonId = event.target.dataset.id;
        allElementsToRemove.forEach((element)=> {
            if(element.dataset.id === deleteButtonId) {
                element.remove();
            }
        currentValue.pins = currentValue.pins.filter((newPinSettings) => newPinSettings.id !== deleteButtonId);
        submitHotspotSelections();
        })
    };

    function submitHotspotSelections() {
        emit({
            type: 'sfcc:value',
            payload: currentValue
        });
    }

})();
