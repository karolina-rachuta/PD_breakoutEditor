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
        currentValue = Object.assign({}, value.value);
        
        console.log('currentValue-subscribe-breakout', currentValue);
        console.log('value-breakout-subscribe:', subscribe);
        console.log('value-breakout-subscribe-value.value:', value.value);

        if (value) {
        imageFromTrigger = document.createElement('img');
        imageFromTrigger.setAttribute('src', currentValue.src);
       

        breakoutContainer = document.createElement('div');
        breakoutContainer.className = "breakoutContainer";
        breakoutContainer.style.position = 'relative';

        document.body.append(breakoutContainer);
        breakoutContainer.append(imageFromTrigger);
        
        imageFromTrigger.addEventListener('click', handlePinPlacement);
        console.log('imageFromTrigger', imageFromTrigger);

        //creating the list
        listTitile = document.createElement('h2');
        listTitile.innerText = "List with pins and coordinates:"
        pinList = document.createElement('ul');
        
        breakoutContainer.append(listTitile);
        breakoutContainer.append(pinList);
    
        } else {
         console.error('Image element with ID "imageKR" not found.');
        }
        });



        function handlePinPlacement(event) {
        console.log('handlePin-breakout', handlePinPlacement);

        if (imageFromTrigger) {
            var xCoordinate = event.clientX - imageFromTrigger.getBoundingClientRect().left;
            var yCoordinate = event.clientY - imageFromTrigger.getBoundingClientRect().top;
        
            console.log('xCoordinate', xCoordinate);
            console.log('yCoordinate', yCoordinate);

            var pin = document.createElement('div');
            pin.className = 'pin pin-remove';
            pin.dataset.id = id;
            //to wszystko w classe i css
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

            console.log("newPinSettings-breakout", newPinSettings);

            //updating currentValue
            if (!currentValue.pins) {
            currentValue.pins = [];
            } else {
                currentValue.pins.push(newPinSettings);
                console.log("currentValue-breakout", currentValue);
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
         console.log("adding pin button")

         pinList.append(pinPoint);
         id++;

         deletePinButton.addEventListener('click', (event) => handlePinRemoval(event));
         submitHotpsotSelections()
         console.log('currentValue-add pin', currentValue);
        } else {
            console.error('Image element with ID "imageKR" not found.');
        }
    }

    function handlePinRemoval(event) {
        console.log("handlePinRemoval",handlePinRemoval);
        console.log("handlePinRemoval-event", event);
        var allElementsToRemove = document.querySelectorAll('.pin-remove');
        var deleteButtonId = event.target.dataset.id;
        allElementsToRemove.forEach((element)=> {
            if(element.dataset.id === deleteButtonId) {
                element.remove();
            }
        currentValue.pins = currentValue.pins.filter((newPinSettings) => newPinSettings.id !== deleteButtonId);
        submitHotpsotSelections();
        console.log('handlePinRemoval-currentValue', currentValue);
        })
        
    };

    function submitHotpsotSelections() {
        console.log('submitHotpsotSelections-breakout', submitHotpsotSelections);
        emit({
            type: 'sfcc:value',
            payload: currentValue
        });
        console.log('emit-currentValue-breakout', currentValue);
    }

})();
