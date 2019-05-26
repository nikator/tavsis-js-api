(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  /** @preserve
   * ViewManager JS - ViewManager for JavaScript
   * Version 0.0.6
   *                           CommitID 429e8af950
   *
   * Copyright (c) 2019 Mantas Bukauskas <ingenium3@gmail.com>
   *
   * Licensed under the MIT License
   *
   */
  var ViewManager = function (global) {
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

      if (typeof container === 'object') ; else {
        container = document.getElementById(container);
      }

      if (!!!container) {
        throw new Error("VM: Failed to get container.");
      }

      var API = {
        __private__: {}
      };
      var ui, tl, tr, cl, c, cr, bl, br;

      var initContainers = API.__private__.initContainers = function () {
        ui = document.createElement("DIV");
        container.appendChild(ui);
        ui.className = "vm-ui";
        tl = document.createElement("DIV");
        tl.className = "vm-ui-top-left"; //tl.innerHTML = "TL";

        ui.appendChild(tl);
        tr = document.createElement("DIV");
        tr.className = "vm-ui-top-right"; //tr.innerHTML = "TR";

        ui.appendChild(tr);
        cl = document.createElement("DIV");
        cl.className = "vm-ui-center-left"; //cl.innerHTML = "CL";

        ui.appendChild(cl);
        c = document.createElement("DIV");
        c.className = "vm-ui-center"; //c.innerHTML = "C";

        ui.appendChild(c);
        cr = document.createElement("DIV");
        cr.className = "vm-ui-center-right"; //cr.innerHTML = "CR";

        ui.appendChild(cr);
        bl = document.createElement("DIV");
        bl.className = "vm-ui-bottom-left"; //bl.innerHTML = "BL";

        ui.appendChild(bl);
        br = document.createElement("DIV");
        br.className = "vm-ui-bottom-right"; //br.innerHTML = "BR";

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

      initContainers();
      /**
       * @name add
       * @memberof viewManager#
       * @function
       * @instance
       * @param {Object} managedEl
       * @param {string} position
       * @returns {viewManager}
       */

      API.add = function (managedEl, position) {
        var el = getElementByPosition(position);
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


      API.move = function (managedEl, position) {
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
        var el = getElementByPosition(position);

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


    viewManager.version = "0.0.6 2019-05-26T02:32:23.979Z:hnit-baltic\mbukauskas";

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
  }(typeof self !== "undefined" && self || typeof window !== "undefined" && window || window);

  function styleInject(css, ref) {
    if (ref === void 0) { ref = {}; }
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".vm-ui {\r\n\tposition: absolute;\r\n\ttop: 15px;\r\n\tleft: 15px;\r\n\tright: 15px;\r\n\tbottom: 30px;\r\n\tbox-sizing: border-box;\r\n\tpointer-events: none;\r\n\toverflow: hidden;\r\n}\r\n.vm-ui-top-left {\r\n\talign-items: flex-start;\r\n\tflex-flow: column;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tposition: absolute;\r\n\tdisplay: flex;\r\n}\r\n.vm-ui-top-right {\r\n\talign-items: flex-end;\r\n\tflex-flow: column;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tposition: absolute;\r\n\tdisplay: flex;\r\n}\r\n\r\n.vm-ui-center-left {\r\n  margin: 0;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 0;\r\n  transform: translate(0, -50%);\r\n}\r\n\r\n.vm-ui-center {\r\n  margin: 0;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n}\r\n\r\n.vm-ui-center-right {\r\n  margin: 0;\r\n  position: absolute;\r\n  top: 50%;\r\n  right: 0;\r\n  transform: translate(0, -50%);\r\n}\r\n\r\n.vm-ui-bottom-left {\r\n\talign-items: flex-start;\r\n\tflex-flow: column;\r\n\tbottom: 0;\r\n\tleft: 0;\r\n\tposition: absolute;\r\n\tdisplay: flex;\r\n}\r\n.vm-ui-bottom-right {\r\n\talign-items: flex-start;\r\n\tflex-flow: column;\r\n\tbottom: 0;\r\n\tright: 0;\r\n\tposition: absolute;\r\n\tdisplay: flex;\r\n}";
  styleInject(css);

}));

try {
module.exports = viewmanager;
}
catch (e) {}
