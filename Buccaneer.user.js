// ==UserScript==
// @name         Buccaneer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Assist you to bulk download books from The Internet Archive (1 image file per page)
// @author       You
// @match        https://archive.org/details/*
// @grant        none
// @updateURL    https://github.com/isra00/buccaneer/raw/main/Buccaneer.user.js
// ==/UserScript==

(function() {
    'use strict';

    window.Buccaneer = {

        init: function() {
            var floatingButton = document.createElement("div");
            floatingButton.setAttribute("style", "position: absolute;top: 0;right: 0;background: rgba(255,255,255,.8);z-index: 999;padding: 1em 2em 2em;border-radius: 1em;");
            floatingButton.innerHTML = '<p style="margin: 0 0 1em;">Zoom level (less is bigger): <input type="number" id="bucScale" value="0" size="1"></p><a href="javascript:void(0)" onclick="window.Buccaneer.perform()" style="text-decoration: none;font-size: 20px;border-radius: .3em;background: #9b1111;color: white;padding: .5em 1em;box-shadow: 1px 1px 5px #444;text-shadow: 1px 1px 1px black;">Buccaneer this!</a>';
            document.getElementsByTagName("body")[0].appendChild(floatingButton);
        },

        perform: function() {
            this.stealCode();
            window.buccaneer();
        },

        stealCode: function() {

            var injected = `
    var scale = document.getElementById("bucScale").value;
    document.getElementsByTagName("body")[0].innerHTML = "";
    response.data.brOptions.data.forEach(function (jsonImgGroup) {
      jsonImgGroup.forEach(function (jsonImg) {
        var img = document.createElement("img");
        img.setAttribute("src", jsonImg.uri + "&scale=" + scale + "&rotate=0");
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
