// Code in the client-side JavaScript file for the trigger editor
(()=>{
    let imageContainer = document.createElement('div');
    let currentValue = {};

    subscribe('sfcc:ready', async ({ value, ...rest }) => {
            console.log('subscribe-trigger', subscribe);
            console.log('subscribe-trigger', value);

            //creating DOM elements:
            var triggerEditorContainer = document.createElement('div');
            document.body.appendChild(triggerEditorContainer);
            var triggerInfo = document.createElement('p');
            triggerInfo.innerHTML = "Save uploaded image and open pin editor";
            triggerEditorContainer.appendChild(triggerInfo);
            var openBreakoutEditorButton = document.createElement('button');
            openBreakoutEditorButton.innerHTML = "Open Pin Editor";
            triggerEditorContainer.appendChild(openBreakoutEditorButton);

            openBreakoutEditorButton.addEventListener('click', handleBreakoutOpen);
            imageContainer.className = 'image_container';
            triggerEditorContainer.appendChild(imageContainer);

            currentValue = value ? value : {};
            showCreatedHotspots(currentValue);
        });

        subscribe('sfcc:value', async ({ breakout, ...rest }) => {
            console.log('subscribe-trigger-second', subscribe);
            var applyButtonEl = document.querySelector('.slds-button_brand');
            var { id } = breakout;
            applyButtonEl.addEventListener('click', () => handleBreakoutApply(id));
            console.log('subsribe-second, sfcc:value', subscribe);
        });

    function updatePageDesignerValue(value) {
            console.log('updatePageDesignerValue-trigger', updatePageDesignerValue);
            console.log('updatePageDesignerValue-trigger-value', value);
            emit({
                type: 'sfcc:value',
                payload: value
            });
        }
    function handleBreakoutOpen(value) {
        console.log('handleBreakoutOpen-trigger', handleBreakoutOpen);
        var imgWrapper = document.querySelector('.image_container span');
        console.log('handleBreakoutOpen-imgWrapper', imgWrapper);
        var imageSrc = imgWrapper.getAttribute('src');
        console.log('handleBreakoutOpen-value', value);
        console.log('hanleBreakoutOpen-trigger-imageSrc', imageSrc);

        currentValue.src = imageSrc;
        
        console.log('hanleBreakoutOpen-trigger-currentValue', currentValue);

        updatePageDesignerValue(currentValue);

        emit({
            type: 'sfcc:breakout',
            payload: {
                id: 'customPinEditorBreakoutScript',
                title: 'Pins',
                value: currentValue
            }
        }, handleBreakoutClose);
        console.log('hanleBreakoutOpen-trigger-emit', emit);
        console.log('hanleBreakoutOpen-trigger-emit-value', value);
    }

    function handleBreakoutClose({ type, value }) {
        console.log("handleBreakoutClose-trigger", handleBreakoutClose);
        console.log("handleBreakoutClose-trigger-type", {type});
        console.log("handleBreakoutClose-trigger-value", {value});
        // Now the "value" can be passed back to Page Designer
        if (type === 'sfcc:breakoutApply') {
            handleBreakoutApply(value);
        } else {
            handleBreakoutCancel();
        }
    }

    function handleBreakoutCancel() {
        // left empty in case you want to do more customization on this event
    }

    function handleBreakoutApply(value) {
        console.log("handleBreakoutApply-trigger", handleBreakoutApply);
        console.log("handleBreakoutApply-trigger-value", value);
        // Emit value update to Page Designer host application
        currentValue = Object.assign({}, value);
        updatePageDesignerValue(currentValue);
        showCreatedHotspots(currentValue);
        // why we dont need this?
        // emit({
        //     type: 'sfcc:value',
        //     payload: currentValue
        // });
    }
// number of created pins in Trigger Editor
    function showCreatedHotspots(currentValue) {
        console.log("showCreatedHotspots-trigger", showCreatedHotspots);
        console.log("showCreatedHotspots-trigger-currentValue", currentValue);
        if (currentValue.pins) {
            var numberOfHotSpots = currentValue.pins.length;
            var pinContainerTrigger = document.createElement('div');
            document.body.append(pinContainerTrigger);
            pinContainerTrigger.innerText = `Number of pins: ${numberOfHotSpots}`;
        }
    }

})();
