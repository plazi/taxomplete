!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("$rdf"),require("fetch")):"function"==typeof define&&define.amd?define(["$rdf","fetch"],e):"object"==typeof exports?exports.Taxomplete=e(require("$rdf"),require("fetch")):t.Taxomplete=e(t.$rdf,t.fetch)}(window,(function(t,e){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";var i=n(1);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=i(n(2)),r=i(n(3)),o=i(n(4)),u=i(n(5)),a=function(){function t(e,n){var i=this;(0,s.default)(this,t),this._sparqlEndpoint=n||new u.default("https://lindas-data.ch/sparql"),this._input=e;var r=e.value,a=[],l=[],c=[],f=this,p=new o.default(e);function h(){if(-1===e.value.toString().indexOf(" "))r=e.value,Promise.all([d(e.value),(i=e.value,s='PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX dwc: <http://rs.tdwg.org/dwc/terms/>\nPREFIX dwcfp: <http://filteredpush.org/ontologies/oa/dwcFP#>\nSELECT DISTINCT ?genus ?species WHERE {\n GRAPH <https://linked.opendata.swiss/graph/plazi> {\n?sub dwc:genus ?genus .\n?sub dwc:species ?species .\n?sub rdf:type dwcfp:TaxonName.\nFILTER REGEX(?species, "^'+i+'","i")\n }\n} ORDER BY UCASE(?species) LIMIT 10',f._sparqlEndpoint.getSparqlResultSet(s).then((function(t){return l=t.results.bindings.map((function(t){return t.genus.value+" "+t.species.value})),!0})))]).then((function(t){a=a.map((function(t){return t+" "})),p.list=a.concat(l)}));else{r=e.value;var t=e.value.toString().substr(e.value.toString().indexOf(" ")+1),n=e.value.toString().substring(0,e.value.toString().indexOf(" "));t.length>0?g(t,n).then((function(t){p.list=c.map((function(t){return n+" "+t}))})):g("",n).then((function(t){p.list=c.map((function(t){return n+" "+t}))}))}var i,s}p.maxItems=15,p.sort=!1,e.onkeyup=function(t){return e.value.length>=2&&"Enter"!==t.key&&e.value!==r&&h(),!0},e.addEventListener("awesomplete-selectcomplete",(function(t){var n=e.value.trim().split(" ").length;1===n&&(h(),p.open()),2===n&&i.lookup()})),p.filter=function(t,e){var n=t.toLowerCase().indexOf(e.toLowerCase());return 0===n||n===t.indexOf(" ")+1};p.item;function d(t){var e='PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX dwc: <http://rs.tdwg.org/dwc/terms/>\nPREFIX dwcfp: <http://filteredpush.org/ontologies/oa/dwcFP#>\nSELECT DISTINCT ?genus WHERE {\n GRAPH <https://linked.opendata.swiss/graph/plazi> {\n?sub dwc:genus ?genus .\n?sub rdf:type dwcfp:TaxonName.\nFILTER REGEX(?genus, "^'+t+'","i")\n }\n} ORDER BY UCASE(?genus) LIMIT 10';return console.log("spe",f._sparqlEndpoint),f._sparqlEndpoint.getSparqlResultSet(e).then((function(t){return a=t.results.bindings.map((function(t){return t.genus.value})),!0}))}function g(t,e){var n='PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX dwc: <http://rs.tdwg.org/dwc/terms/>\nPREFIX dwcfp: <http://filteredpush.org/ontologies/oa/dwcFP#>\nSELECT DISTINCT ?species WHERE {\n GRAPH <https://linked.opendata.swiss/graph/plazi> {\n?sub dwc:genus "'+e+'" .\n?sub dwc:species ?species .\n?sub rdf:type dwcfp:TaxonName.\nFILTER REGEX(?species, "^'+t+'","i")\n }\n} ORDER BY UCASE(?species) LIMIT 10';return f._sparqlEndpoint.getSparqlResultSet(n).then((function(t){return c=t.results.bindings.map((function(t){return t.species.value})),!0}))}p.item=function(t,e){t.toLowerCase().indexOf(e.toLowerCase());var n,i=t.substr(0,t.length-1).indexOf(" ");-1===i?n="<mark>"+t.substring(0,e.length)+"</mark>"+t.substring(e.length):-1===e.indexOf(" ")?n=t.substring(0,i+1)+"<mark>"+t.substring(i+1,i+1+e.length)+"</mark>"+t.substring(i+1+e.length):-1!==e.indexOf(" ")&&(n="<mark>"+t.substring(0,e.length)+"</mark>"+t.substring(e.length));var s=document.createElement("li");return s.setAttribute("aria-selected","false"),s.innerHTML=n,s}}return(0,r.default)(t,[{key:"lookup",value:function(){this.action(this._input.value.toString())}},{key:"action",value:function(t){console.log("Value "+t+" selected, overwrite action(value) method to have something happen.")}}]),t}();e.default=a},function(t,e){t.exports=function(t){return t&&t.__esModule?t:{default:t}}},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}t.exports=function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}},function(t,e,n){!function(){var e=function(t,n){var i=this;e.count=(e.count||0)+1,this.count=e.count,this.isOpened=!1,this.input=s(t),this.input.setAttribute("autocomplete","off"),this.input.setAttribute("aria-expanded","false"),this.input.setAttribute("aria-owns","awesomplete_list_"+this.count),this.input.setAttribute("role","combobox"),this.options=n=n||{},function(t,e,n){for(var i in e){var s=e[i],r=t.input.getAttribute("data-"+i.toLowerCase());"number"==typeof s?t[i]=parseInt(r):!1===s?t[i]=null!==r:s instanceof Function?t[i]=null:t[i]=r,t[i]||0===t[i]||(t[i]=i in n?n[i]:s)}}(this,{minChars:2,maxItems:10,autoFirst:!1,data:e.DATA,filter:e.FILTER_CONTAINS,sort:!1!==n.sort&&e.SORT_BYLENGTH,container:e.CONTAINER,item:e.ITEM,replace:e.REPLACE,tabSelect:!1},n),this.index=-1,this.container=this.container(t),this.ul=s.create("ul",{hidden:"hidden",role:"listbox",id:"awesomplete_list_"+this.count,inside:this.container}),this.status=s.create("span",{className:"visually-hidden",role:"status","aria-live":"assertive","aria-atomic":!0,inside:this.container,textContent:0!=this.minChars?"Type "+this.minChars+" or more characters for results.":"Begin typing for results."}),this._events={input:{input:this.evaluate.bind(this),blur:this.close.bind(this,{reason:"blur"}),keydown:function(t){var e=t.keyCode;i.opened&&(13===e&&i.selected?(t.preventDefault(),i.select(void 0,void 0,t)):9===e&&i.selected&&i.tabSelect?i.select(void 0,void 0,t):27===e?i.close({reason:"esc"}):38!==e&&40!==e||(t.preventDefault(),i[38===e?"previous":"next"]()))}},form:{submit:this.close.bind(this,{reason:"submit"})},ul:{mousedown:function(t){t.preventDefault()},click:function(t){var e=t.target;if(e!==this){for(;e&&!/li/i.test(e.nodeName);)e=e.parentNode;e&&0===t.button&&(t.preventDefault(),i.select(e,t.target,t))}}}},s.bind(this.input,this._events.input),s.bind(this.input.form,this._events.form),s.bind(this.ul,this._events.ul),this.input.hasAttribute("list")?(this.list="#"+this.input.getAttribute("list"),this.input.removeAttribute("list")):this.list=this.input.getAttribute("data-list")||n.list||[],e.all.push(this)};function n(t){var e=Array.isArray(t)?{label:t[0],value:t[1]}:"object"==typeof t&&"label"in t&&"value"in t?t:{label:t,value:t};this.label=e.label||e.value,this.value=e.value}e.prototype={set list(t){if(Array.isArray(t))this._list=t;else if("string"==typeof t&&t.indexOf(",")>-1)this._list=t.split(/\s*,\s*/);else if((t=s(t))&&t.children){var e=[];i.apply(t.children).forEach((function(t){if(!t.disabled){var n=t.textContent.trim(),i=t.value||n,s=t.label||n;""!==i&&e.push({label:s,value:i})}})),this._list=e}document.activeElement===this.input&&this.evaluate()},get selected(){return this.index>-1},get opened(){return this.isOpened},close:function(t){this.opened&&(this.input.setAttribute("aria-expanded","false"),this.ul.setAttribute("hidden",""),this.isOpened=!1,this.index=-1,this.status.setAttribute("hidden",""),s.fire(this.input,"awesomplete-close",t||{}))},open:function(){this.input.setAttribute("aria-expanded","true"),this.ul.removeAttribute("hidden"),this.isOpened=!0,this.status.removeAttribute("hidden"),this.autoFirst&&-1===this.index&&this.goto(0),s.fire(this.input,"awesomplete-open")},destroy:function(){if(s.unbind(this.input,this._events.input),s.unbind(this.input.form,this._events.form),!this.options.container){var t=this.container.parentNode;t.insertBefore(this.input,this.container),t.removeChild(this.container)}this.input.removeAttribute("autocomplete"),this.input.removeAttribute("aria-autocomplete");var n=e.all.indexOf(this);-1!==n&&e.all.splice(n,1)},next:function(){var t=this.ul.children.length;this.goto(this.index<t-1?this.index+1:t?0:-1)},previous:function(){var t=this.ul.children.length,e=this.index-1;this.goto(this.selected&&-1!==e?e:t-1)},goto:function(t){var e=this.ul.children;this.selected&&e[this.index].setAttribute("aria-selected","false"),this.index=t,t>-1&&e.length>0&&(e[t].setAttribute("aria-selected","true"),this.status.textContent=e[t].textContent+", list item "+(t+1)+" of "+e.length,this.input.setAttribute("aria-activedescendant",this.ul.id+"_item_"+this.index),this.ul.scrollTop=e[t].offsetTop-this.ul.clientHeight+e[t].clientHeight,s.fire(this.input,"awesomplete-highlight",{text:this.suggestions[this.index]}))},select:function(t,e,n){if(t?this.index=s.siblingIndex(t):t=this.ul.children[this.index],t){var i=this.suggestions[this.index];s.fire(this.input,"awesomplete-select",{text:i,origin:e||t,originalEvent:n})&&(this.replace(i),this.close({reason:"select"}),s.fire(this.input,"awesomplete-selectcomplete",{text:i,originalEvent:n}))}},evaluate:function(){var t=this,e=this.input.value;e.length>=this.minChars&&this._list&&this._list.length>0?(this.index=-1,this.ul.innerHTML="",this.suggestions=this._list.map((function(i){return new n(t.data(i,e))})).filter((function(n){return t.filter(n,e)})),!1!==this.sort&&(this.suggestions=this.suggestions.sort(this.sort)),this.suggestions=this.suggestions.slice(0,this.maxItems),this.suggestions.forEach((function(n,i){t.ul.appendChild(t.item(n,e,i))})),0===this.ul.children.length?(this.status.textContent="No results found",this.close({reason:"nomatches"})):(this.open(),this.status.textContent=this.ul.children.length+" results found")):(this.close({reason:"nomatches"}),this.status.textContent="No results found")}},e.all=[],e.FILTER_CONTAINS=function(t,e){return RegExp(s.regExpEscape(e.trim()),"i").test(t)},e.FILTER_STARTSWITH=function(t,e){return RegExp("^"+s.regExpEscape(e.trim()),"i").test(t)},e.SORT_BYLENGTH=function(t,e){return t.length!==e.length?t.length-e.length:t<e?-1:1},e.CONTAINER=function(t){return s.create("div",{className:"awesomplete",around:t})},e.ITEM=function(t,e,n){var i=""===e.trim()?t:t.replace(RegExp(s.regExpEscape(e.trim()),"gi"),"<mark>$&</mark>");return s.create("li",{innerHTML:i,role:"option","aria-selected":"false",id:"awesomplete_list_"+this.count+"_item_"+n})},e.REPLACE=function(t){this.input.value=t.value},e.DATA=function(t){return t},Object.defineProperty(n.prototype=Object.create(String.prototype),"length",{get:function(){return this.label.length}}),n.prototype.toString=n.prototype.valueOf=function(){return""+this.label};var i=Array.prototype.slice;function s(t,e){return"string"==typeof t?(e||document).querySelector(t):t||null}function r(t,e){return i.call((e||document).querySelectorAll(t))}function o(){r("input.awesomplete").forEach((function(t){new e(t)}))}s.create=function(t,e){var n=document.createElement(t);for(var i in e){var r=e[i];if("inside"===i)s(r).appendChild(n);else if("around"===i){var o=s(r);o.parentNode.insertBefore(n,o),n.appendChild(o),null!=o.getAttribute("autofocus")&&o.focus()}else i in n?n[i]=r:n.setAttribute(i,r)}return n},s.bind=function(t,e){if(t)for(var n in e){var i=e[n];n.split(/\s+/).forEach((function(e){t.addEventListener(e,i)}))}},s.unbind=function(t,e){if(t)for(var n in e){var i=e[n];n.split(/\s+/).forEach((function(e){t.removeEventListener(e,i)}))}},s.fire=function(t,e,n){var i=document.createEvent("HTMLEvents");for(var s in i.initEvent(e,!0,!0),n)i[s]=n[s];return t.dispatchEvent(i)},s.regExpEscape=function(t){return t.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&")},s.siblingIndex=function(t){for(var e=0;t=t.previousElementSibling;e++);return e},"undefined"!=typeof self&&(self.Awesomplete=e),"undefined"!=typeof Document&&("loading"!==document.readyState?o():document.addEventListener("DOMContentLoaded",o)),e.$=s,e.$$=r,t.exports&&(t.exports=e)}()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n(6)),s=r(n(7));function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var u=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._uri=e}var e,n,r;return e=t,(n=[{key:"getSparqlResultSet",value:function(t){console.log(t);var e=encodeURIComponent(t);return(0,s.default)(this._uri+"?query="+e,{headers:{accept:"application/sparql-results+json"}}).then((function(t){if(t.ok)return t.json();throw t.status}))}},{key:"getSparqlRDF",value:function(t){console.log(t);var e=encodeURIComponent(t);return i.default.rdfFetch(this._uri+"?query="+e,{headers:new Headers({accept:"text/turtle"})}).then((function(t){if(t.ok)return t.graph();throw t.status}))}}])&&o(e.prototype,n),r&&o(e,r),t}();e.default=u,t.exports=e.default},function(e,n){e.exports=t},function(t,n){t.exports=e}]).default}));
//# sourceMappingURL=taxomplete.js.map