// ==UserScript==
// @name         Buccaneer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://archive.org/details/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.Buccaneer = {

        init: function() {
            var floatingButton = document.createElement("div");
            floatingButton.setAttribute("style", "position: absolute;top: 0;right: 0;background: rgba(255,255,255,.3);z-index: 999;padding: 2em;border-radius: 1em;");
            floatingButton.innerHTML = '<a href="javascript:void(0)" onclick="window.Buccaneer.perform()" style="text-decoration: none;font-size: 20px;border-radius: .3em;background: #9b1111;color: white;padding: .5em 1em;box-shadow: 1px 1px 5px #444;text-shadow: 1px 1px 1px black;">Buccaneer this!</a>';
            document.getElementsByTagName("body")[0].appendChild(floatingButton);
        },

        perform: function() {
            this.stealCode();
            window.buccaneer();
        },

        stealCode: function() {

            var injected = `
    document.getElementsByTagName("body")[0].innerHTML = "";
    response.data.brOptions.data.forEach(function (jsonImgGroup) {
      jsonImgGroup.forEach(function (jsonImg) {
        var img = document.createElement("img");
        img.setAttribute("src", jsonImg.uri + "&scale=2&rotate=0");
        document.getElementsByTagName("body")[0].appendChild(img);
      });
    });
`;

            var script = document.getElementsByTagName("script")[41];
            var newScriptCode = (script.firstChild.textContent
                     .replace("var params_options", injected + "\nvar params_options")
                     .replace("$(function() {", "window.buccaneer = (function() {"));
            //console.log(newScriptCode);
            //alert(newScriptCode);
            eval(newScriptCode);
        }
    };

    window.Buccaneer.init();

})();
