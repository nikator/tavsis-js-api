/** @preserve
 * ViewManager JS - ViewManager for JavaScript
 * Version ${versionID}
 *                           CommitID ${commitID}
 *
 * Copyright (c) 2019 Mantas Bukauskas <ingenium3@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
var ViewManager = (function (global) {
  'use strict';
  var constants = {};

  /**
   * Creates new ViewManager object instance.
   * @name viewManager
   * @class
   * @param container Container which view needs to be managed (DOM element or Id)
   * @returns {viewManager} ViewManager instance
   * @description
   * ```
   * {
   * }
   * ```
   * @constructor
  */
  function viewManager(container) {
      var options = {};

      if (typeof container === 'object') {
        //domNode was passed
      } else {
        container = document.getElementById(container);
      }

      if (!!!container) {
        throw new Error("VM: Failed to get container.");
      }

      var API = {
        __private__: {}
      };

      var ui,
        tl,
        tr,
        cl,
        c,
        cr,
        bl,
        br;

      var initContainers = API.__private__.initContainers = function () {
        ui = document.createElement("DIV");
        container.appendChild(ui);
        ui.className = "vm-ui";

        tl = document.createElement("DIV");
        tl.className = "vm-ui-top-left";
        //tl.innerHTML = "TL";
        ui.appendChild(tl);
        
        tr = document.createElement("DIV");
        tr.className = "vm-ui-top-right";
        //tr.innerHTML = "TR";
        ui.appendChild(tr);

        cl = document.createElement("DIV");
        cl.className = "vm-ui-center-left";
        //cl.innerHTML = "CL";
        ui.appendChild(cl);

        c = document.createElement("DIV");
        c.className = "vm-ui-center";
        //c.innerHTML = "C";
        ui.appendChild(c);

        cr = document.createElement("DIV");
        cr.className = "vm-ui-center-right";
        //cr.innerHTML = "CR";
        ui.appendChild(cr);

        bl = document.createElement("DIV");
        bl.className = "vm-ui-bottom-left";
        //bl.innerHTML = "BL";
        ui.appendChild(bl);

        br = document.createElement("DIV");
        br.className = "vm-ui-bottom-right";
        //br.innerHTML = "BR";
        ui.appendChild(br);
      };

      var getElementByPosition = API.__private__.getElementByPosition = function (position) {
        var el = null;
        switch (position) {
          case "top-left":
            el = tl;
            break;
          case "top-right":
            el = tr;
            break;
          case "center-left":
            el = cl;
            break;
          case "center":
            el = c;
            break;
          case "center-right":
            el = cr;
            break;
          case "bottom-left":
            el = bl;
            break;
          case "bottom-right":
            el = br;
            break;
          default:
            throw new Error("VM: View element was not found with position " + position);
        }
        return el;
      };

      API.__private__.initContainers();
    /**
     * @name add
     * @memberof viewManager#
     * @function
     * @instance
     * @param {Object} managedEl
     * @param {string} position
     * @returns {viewManager}
     */
      API.add = function(managedEl, position) {
        var el = _getElementByPosition(position);
        el.appendChild(managedEl);
        return this;
      };
    /**
     * @name move
     * @memberof viewManager#
     * @function
     * @instance
     * @param {Object} managedEl
     * @param {string} position
     * @returns {viewManager}
     */
      API.move = function(managedEl, position) {
        API.add(managedEl, position);
      };
    /**
     * @name empty
     * @memberof viewManager#
     * @function
     * @instance
     * @param {string} position
     * @returns {Element}
     */
      API.empty = function (position) {
        var el = _getElementByPosition(position);
        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }
        return el;
      };

    return API;
  }
  /**
   * The version of viewManager-js.
   * @name version
   * @type {string}
   * @memberof viewManager#
   */
  viewManager.version = "0.0.1-trunk";

  if (typeof define === 'function' && define.amd) {
      define('ViewManager', function () {
          return viewManager;
      });
  } else if (typeof module !== 'undefined' && module.exports) {
      module.exports = viewManager;
  } else {
      global.ViewManager = viewManager;
  }
  return viewManager;
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this));