// Code in the client-side JavaScript file for the breakout  (BeeIt-DEMO)
(function () {
    subscribe('sfcc:ready', function () {
            // Once the breakout editor is ready, the custom code is able to select or
            // Create a value. Any meaningful change to a value/selection needs to be
            // reflected back into the host container via a `sfcc:value` event.
            var template = document.createElement('template');
            template.innerHTML = "<div><p>Yugo</p><p>Mercedes</p><p>BMW</p><p>Seat</p></div>";
            var clone = document.importNode(template.content, true);
            document.body.appendChild(clone);
            var openButtonEl = document.querySelector('p');
            // openButtonEl.addEventListener('click', handleSelect);
            var paragraphs = document.querySelectorAll('p');
            paragraphs.forEach(function(paragraph) {
                paragraph.addEventListener('click', handleSelect);
            });
        });

    function handleSelect({ target }) {

        // The value changed and the breakout editor's host is informed about the
        // value update via a `sfcc:value` event.
        const selectedValue = target.innerText;
        console.log(selectedValue);
        emit({
            type: 'sfcc:value',
            payload: selectedValue ? { value: selectedValue } : null
        });
    }
})();