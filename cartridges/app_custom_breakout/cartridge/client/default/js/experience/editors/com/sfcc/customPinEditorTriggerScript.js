// Code in the client-side JavaScript file for the trigger editor
(()=>{
    let imageContainer = document.createElement('div');
    let currentValue = {};

    subscribe('sfcc:ready', function (value) {
            console.log('subscribe-trigger', subscribe);
            console.log('subscribe-trigger', document);
            console.log('subscribe-trigger', value);

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
            const applyButtonEl = document.querySelector('.slds-button_brand');
            const { id } = breakout;
            applyButtonEl.addEventListener('click', () => handleBreakoutApply(id));
            console.log('subsribe, sfcc:value', subscribe);
        });

    function updatePageDesignerValue(value) {
            console.log('updatePageDesignerValue-trigger', value);
            emit({
                type: 'sfcc:value',
                payload: value
            });
        }
    function handleBreakoutOpen(value) {
        var imgWrapper = document.querySelector('.image_container span');
        console.log('handleBreakoutOpen-imgWrapper', imgWrapper);
        var imageSrc = imgWrapper.getAttribute('src');
        console.log('handleBreakoutOpen-value', value);
        console.log('hanleBreakoutOpen-trigger-imageSrc', imageSrc);

        currentValue = {
            src: imageSrc
        }
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
    }

    function handleBreakoutClose({ type, value }) {
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
        if (currentValue.pins) {
            var numberOfHotSpots = currentValue.pins.length;
            var pinContainerTrigger = document.createElement('div');
            document.body.append(pinContainerTrigger);
            pinContainerTrigger.innerText = `Number of pins: ${numberOfHotSpots}`;
        }
    }

})();
