(() => {
    let imageFromTrigger;
    let breakoutContainer;
    let pinList;
    let pinPoint;
    let deletePinButton;
    let listTitile;
    let id = 0;

    subscribe('sfcc:ready', async (value) => {
        console.log('breakout-readyf', 'sfcc:ready');
        console.log('value-breakout-subscribe:', value);
        console.log('value-breakout-subscribe.value:', value.value);

        if (value) {
        imageFromTrigger = document.createElement('img');
        imageFromTrigger.setAttribute('src', value.value.src);
        breakoutContainer = document.createElement('div');
        breakoutContainer.className = "breakoutContainer";
        breakoutContainer.style.position = 'relative';

        document.body.append(breakoutContainer);
        breakoutContainer.append(imageFromTrigger);
        
        imageFromTrigger.addEventListener('click', handlePinPlacement);
        console.log('imageFromTrigger', imageFromTrigger);

        //create list with delete pin button
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
        console.log('handlePin', handlePinPlacement)

        if (imageFromTrigger) {
            var xCoordinate = event.clientX - imageFromTrigger.getBoundingClientRect().left;
            var yCoordinate = event.clientY - imageFromTrigger.getBoundingClientRect().top;
        console.log('xCoordinate', xCoordinate);
        console.log('yCoordinate', yCoordinate);
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

            console.log(pin.style.left);
            console.log(pin.style.top);


        // creating li with pin coordinates
        pinPoint = document.createElement('li');
        pinPoint.className = "pin-remove";
        pinPoint.dataset.id = id;
        pinPoint.innerText = `X: ${xCoordinate}px, Y: ${yCoordinate}px`
        // pin.addEventListener('click', (event) => handleClick(event));

         // create delete button
         deletePinButton = document.createElement('button');
         deletePinButton.innerText = "Delete pin";
         deletePinButton.dataset.id = id;
         pinPoint.appendChild(deletePinButton);
         console.log("adding pin button")

         pinList.append(pinPoint);
         id++;
         console.log("incremented", id);
         deletePinButton.addEventListener('click', (event) => handlePinRemoval(event));
    
        } else {
            console.error('Image element with ID "imageKR" not found.');
        }
    }

    // function handleClick(event) {
    //     console.log(event.target);
    //     var elementsToRemoveArray = document.querySelectorAll('.pin-remove');
    //     var pinID = event.target.dataset.id;
    //     elementsToRemoveArray.forEach((element) => {
    //     if (element.dataset.id === pinID) {
    //         element.remove();
    //         }});
    //         event.target.remove();
    //       }

    function handlePinRemoval(event) {
        var allElementsToRemove = document.querySelectorAll('.pin-remove');
        var deleteButtonId = event.target.dataset.id;
        allElementsToRemove.forEach((element)=> {
            if(element.dataset.id === deleteButtonId) {
                element.remove();
            }
        })
        // event.target.remove();
        
    };
    

})();
