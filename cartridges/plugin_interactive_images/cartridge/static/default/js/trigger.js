!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}({7:function(e,t,n){n(8)},8:function(e,t){(()=>{let e=document.createElement("div"),t=document.createElement("span"),n={};function o(e){var t="";return e.forEach((e,n)=>{t+=`<span class="hotspot-breakout-marker" data-index="${n+1} - " style="display: block; margin-top: 5px; margin-left: 15px">${e[2]}</span>`}),t}function r(e){if(e.images){let a=document.querySelector(".hotspots-container");a&&a.parentNode.removeChild(a),a=document.createElement("div"),a.className="hotspots-container";for(let c=0;c<e.images.length;c++){var t=e.images[c],n=t.type,r=n.indexOf("Image"),s=r>-1?n.substr(0,r):n;let i=document.createElement("span");i.style.display="block",i.style.padding="2px 5px",i.innerHTML=`<span class="hotspot-header">${s} hotspots:</span> ${t.hotspots.length>0?o(t.hotspots):'<span style="display: block; color: red;">No hotspots created yet</span>'}`,a.appendChild(i)}document.body.appendChild(a)}}function s(e){emit({type:"sfcc:value",payload:e})}function a(e){var t=document.querySelector(".hotspots-display");for(let e=0;e<t.children.length;e++){var o=t.children[e],r=o.getAttribute("type"),a=o.getAttribute("src");if(Object.hasOwnProperty.call(n,"images")&&n.images&&n.images.length>0){var i=n.images.filter((function(e){return e.type===r}));i&&i.length>0?n.images.forEach((function(e){e.type===r&&i[0].src!==a&&(e.hotspots=[],e.src=a)})):n.images.push({src:a,type:r,displayText:o.getAttribute("name"),hotspots:[]})}else{Object.hasOwnProperty.call(n,"images")||(n.images=[]);var l=o.getAttribute("hotspots");try{l=JSON.parse(l)}catch(e){l=[]}n.images.push({src:o.getAttribute("src"),type:o.getAttribute("type"),displayText:o.getAttribute("name"),hotspots:l})}}s(n),emit({type:"sfcc:breakout",payload:{id:"imageHotspotsEditorBreakoutScript",title:"Set up hotspots",value:n}},c)}function c({type:e,value:t}){"sfcc:breakoutApply"===e&&i(t)}function i(e){n=Object.assign({},e),s(n),r(n)}subscribe("sfcc:ready",async({value:o,...s})=>{console.log("value-ready-trigger",o);let c=document.createElement("button");c.setAttribute("class","slds-button slds-button_outline-brand btn btn-secondary mb-3"),c.innerHTML="Create Hotspots",c.onclick=a;let i=document.createElement("div");i.setAttribute("class","alert alert-warning mt-3 text-uppercase text-center"),i.innerHTML="Please save the changes before and after creating hotspots!",t.className="hotspots-display",n=o||{},document.body.appendChild(i),document.body.appendChild(c),document.body.appendChild(t),document.body.appendChild(e),r(n)}),subscribe("sfcc:value",async({breakout:e,...t})=>{const n=document.querySelector(".slds-button_brand"),{id:o}=e;n.addEventListener("click",()=>i(o))})})()}});