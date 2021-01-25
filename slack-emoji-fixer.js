// ==UserScript==
// @name         Slack emoji fixer
// @namespace    https://github.com/kirkeby/greasy-scripts/
// @version      0.1
// @description  Use native, pretty emojis on Slack for greater sanity
// @match        https://*.slack.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */

(function() {
    'use strict';
    function tamperer(mutations) {
        for(var e of document.querySelectorAll('.c-emoji img, img.c-emoji')) {
            // match both encoded and unencoded, because Slack somehow route half their emoji images
            // through their external-images-URL-thing :rolleyes:
            var m = e.src.match(/(%2F|\/)([0-9a-f]{4,6})\.png$/);
            if(m !== null) {
                var i = parseInt(m[2], 16);
                var s = String.fromCodePoint(i);
                
                var n = document.createElement('span');
                n.classList = e.classList;
                n.innerText = s;
                // can't really grok an easier way to get the solo emoji messages to be the right size
                // without this :/
                if(e.src.match('-large')) {
                    n.style.fontSize = "28px";
                } else {
                    n.style.fontSize = "1.1em";
                }
                
                e.replaceWith(n);
            }
        }
    };
    var observer = new window.MutationObserver(tamperer);
    observer.observe(document.documentElement, {subtree: true, attributes: true});
})();
