// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"e3ZGj":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "576369c9d95aefb8";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"k9FoL":[function(require,module,exports) {
var _functionsJs = require("./functions.js");
var _variablesJs = require("./variables.js");
_variablesJs.tipDOMArray.forEach((button, i)=>{
    /***** Assign Event Listener *****/ button.addEventListener("click", function() {
        /* Enable or disable tip buttons */ _functionsJs.tipButtonToggler(button, i);
        /* Enable reset button */ if (_variablesJs.inputData.tipStateArray.some((el)=>el == 1
        )) _functionsJs.enableResetButton();
        /* Update results (calculate or reset) */ _functionsJs.updateResults();
    });
});
/*** Enabling currency module ***/ _variablesJs.currencyButton.addEventListener("click", function() {
    _functionsJs.enableCurrencyModule();
});
_variablesJs.currencyArray.forEach((currency, i, array)=>{
    currency.addEventListener("input", function() {
        if (array[0].value != array[1].value) _functionsJs.retrieveAPI(array[0].value, array[1].value).then((jsonResponse)=>_functionsJs.renderCurrency(jsonResponse)
        ).then(_functionsJs.calculateResults);
    });
});
/*** Resetting ***/ _variablesJs.resetButton.addEventListener("click", function() {
    _functionsJs.resetAll();
});
_variablesJs.inputsDOMArray.forEach((input, i)=>{
    /***** Assign Event Listener *****/ input.addEventListener("input", function() {
        if (i == 1) _functionsJs.determineCustomTipValue();
        /* Check if provided data are correct */ _functionsJs.inputValidation(input, i);
        /* Enable reset button */ _functionsJs.enableResetButton();
        /* Update results (calculate or reset) */ _functionsJs.updateResults();
    });
});

},{"./functions.js":"bfprH","./variables.js":"abb56"}],"bfprH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tipButtonToggler", ()=>tipButtonToggler
);
parcelHelpers.export(exports, "enableResetButton", ()=>enableResetButton
);
parcelHelpers.export(exports, "determineCustomTipValue", ()=>determineCustomTipValue
);
parcelHelpers.export(exports, "resetAll", ()=>resetAll
);
parcelHelpers.export(exports, "inputValidation", ()=>inputValidation
);
parcelHelpers.export(exports, "updateResults", ()=>updateResults
);
parcelHelpers.export(exports, "calculateResults", ()=>calculateResults
);
parcelHelpers.export(exports, "enableCurrencyModule", ()=>enableCurrencyModule
);
parcelHelpers.export(exports, "retrieveAPI", ()=>retrieveAPI
);
parcelHelpers.export(exports, "renderCurrency", ()=>renderCurrency
);
var _variablesJs = require("./variables.js");
const tipButtonToggler = (button1, i)=>{
    /* If the pressed button is already enabled  (except from "Custom" input) */ if (_variablesJs.inputData.tipStateArray[i] == 1 && i != 5) {
        /* disable it */ button1.classList.remove(_variablesJs.buttonEnabled);
        _variablesJs.inputData.tipStateArray[i] = 0;
        _variablesJs.inputData.inputValidityArray[1] = 0;
        _variablesJs.inputData.tipValue = 0;
    } else if (_variablesJs.inputData.tipStateArray.some((value)=>value == 1
    ) && !(_variablesJs.inputData.tipStateArray[5] == 1 && i == 5)) {
        /* disable it */ _variablesJs.tipDOMArray.forEach((button)=>button.classList.remove(_variablesJs.buttonEnabled)
        );
        /* Clean custom input, but only when button is pressed */ if (i != 5) _variablesJs.inputsDOMArray[1].value = "";
        _variablesJs.inputData.tipValue = 0;
        _variablesJs.inputData.inputValidityArray[1] = 0;
        _variablesJs.inputData.tipStateArray.forEach((element, index, array)=>array[index] = 0
        );
        /* and enable pressed button */ if (i != 5) {
            button1.classList.add(_variablesJs.buttonEnabled);
            _variablesJs.inputData.tipStateArray[i] = 1;
            _variablesJs.inputData.inputValidityArray[1] = 1;
            _variablesJs.inputData.tipValue = _variablesJs.tipDOMArray[i].value;
        }
    } else if (_variablesJs.inputData.tipStateArray.every((value)=>value == 0
    )) /* and enable pressed button */ {
        if (i != 5) {
            button1.classList.add(_variablesJs.buttonEnabled);
            _variablesJs.inputData.tipStateArray[i] = 1;
            _variablesJs.inputData.inputValidityArray[1] = 1;
            _variablesJs.inputData.tipValue = _variablesJs.tipDOMArray[i].value;
        }
    }
};
const enableResetButton = ()=>{
    _variablesJs.resetButton.classList.add(_variablesJs.buttonEnabled);
};
const determineCustomTipValue = ()=>{
    _variablesJs.inputData.tipValue = _variablesJs.inputsDOMArray[1].value;
};
const resetAll = ()=>{
    _variablesJs.inputsDOMArray.forEach((el)=>el.value = ""
    );
    _variablesJs.inputsDOMArray.forEach((el)=>el.classList.remove(_variablesJs.inputWarningOutline)
    );
    _variablesJs.tipDOMArray.forEach((el)=>el.classList.remove(_variablesJs.buttonEnabled)
    );
    _variablesJs.inputData.tipStateArray.forEach((el)=>el = 0
    );
    _variablesJs.inputData.inputValidityArray.forEach((el)=>el = 0
    );
    _variablesJs.inputData.tipValue = 0;
    _variablesJs.inputData.currencyState = 0;
    _variablesJs.inputData.currencyRate = 1;
    _variablesJs.resultTip.innerHTML = "€0";
    _variablesJs.resultTotal.innerHTML = "€0";
    _variablesJs.warningInfoDOMArray.forEach((el)=>el.textContent = ""
    );
    _variablesJs.currencyButton.style.display = "inline-block";
    _variablesJs.currencyModule.style.display = "none";
    _variablesJs.currencyInfo.style.display = "none";
    _variablesJs.resetButton.classList.remove(_variablesJs.buttonEnabled);
};
const inputValidation = (input, i)=>{
    if (input.validity.valid) {
        _variablesJs.warningInfoDOMArray[i].style.display = "none";
        input.classList.remove(_variablesJs.inputWarningOutline);
        _variablesJs.inputData.inputValidityArray[i] = 1;
        if (i == 1) _variablesJs.inputData.tipStateArray[5] = 1;
    } else showError(input, i);
};
const showError = (input, i)=>{
    _variablesJs.inputData.inputValidityArray[i] = 0;
    _variablesJs.warningInfoDOMArray[i].style.display = "inline-block";
    if (input.validity.rangeOverflow) _variablesJs.warningInfoDOMArray[i].textContent = "Too big numbo bro";
    else if (input.validity.rangeUnderflow) {
        _variablesJs.warningInfoDOMArray[i].style.display = "inline-block";
        _variablesJs.warningInfoDOMArray[i].textContent = "No negative numbos bro";
    } else if (input.validity.badInput) _variablesJs.warningInfoDOMArray[i].textContent = "Please only numbos bro";
    else if (input.validity.stepMismatch) _variablesJs.warningInfoDOMArray[i].textContent = "Please type a whole number";
};
const updateResults = ()=>{
    /* If all data are complete, calcualate results */ if (_variablesJs.inputData.areAllValid()) calculateResults();
    else resetResults();
};
const calculateResults = ()=>{
    /** Calculate tip and total, with two decimal numbers **/ /* e.g. tipFactor = 1.25 means 25% tip */ const tipFactor = 1 + _variablesJs.inputData.tipValue / 100;
    const resultTipNotRounded = (_variablesJs.inputsDOMArray[0].value * tipFactor - _variablesJs.inputsDOMArray[0].value) / _variablesJs.inputsDOMArray[2].value * _variablesJs.inputData.currencyRate;
    _variablesJs.resultTip.innerHTML = Math.round(resultTipNotRounded * 100) / 100;
    _variablesJs.resultTotal.innerHTML = Math.round(_variablesJs.inputsDOMArray[0].value * tipFactor / _variablesJs.inputsDOMArray[2].value * 100) / 100 * _variablesJs.inputData.currencyRate;
    /* When data are wrongly calculated /*/ if (_variablesJs.resultTip.innerHTML == "Infinity" || _variablesJs.resultTotal.innerHTML == "Infinity" || _variablesJs.resultTip.innerHTML == "NaN" || _variablesJs.resultTotal.innerHTML == "NaN") {
        _variablesJs.resultTip.innerHTML = "0";
        _variablesJs.resultTotal.innerHTML = "0";
    }
    /* When tip result is too long - compress to thousands (k) millions (M) */ if (_variablesJs.resultTip.innerHTML > 1000000) _variablesJs.resultTip.innerHTML = Math.round(_variablesJs.resultTip.innerHTML / 1000000 * 100) / 100 + "M";
    else if (_variablesJs.resultTip.innerHTML > 10000) _variablesJs.resultTip.innerHTML = Math.round(_variablesJs.resultTip.innerHTML / 1000 * 100) / 100 + "k";
    /* Add currency sign */ console.log(_variablesJs.inputData.currencyState);
    _variablesJs.resultTip.innerHTML = _variablesJs.inputData.currencySymbols[_variablesJs.inputData.currencyState] + _variablesJs.resultTip.innerHTML;
    /* When total result is too long - compress to thousands (k) millions (M) */ if (_variablesJs.resultTotal.innerHTML > 1000000) _variablesJs.resultTotal.innerHTML = Math.round(_variablesJs.resultTotal.innerHTML / 1000000 * 100) / 100 + "M";
    else if (_variablesJs.resultTotal.innerHTML > 10000) _variablesJs.resultTotal.innerHTML = Math.round(_variablesJs.resultTotal.innerHTML / 1000 * 100) / 100 + "k";
    /* Add currency sign */ _variablesJs.resultTotal.innerHTML = _variablesJs.inputData.currencySymbols[_variablesJs.inputData.currencyState] + _variablesJs.resultTotal.innerHTML;
};
const resetResults = ()=>{
    _variablesJs.resultTip.innerHTML = "€0";
    _variablesJs.resultTotal.innerHTML = "€0";
};
const enableCurrencyModule = ()=>{
    _variablesJs.currencyButton.style.display = "none";
    _variablesJs.currencyModule.style.display = "flex";
};
const retrieveAPI = async (currencyBill, currencyUser)=>{
    console.log(currencyBill);
    console.log(currencyUser);
    const apiKey = "8a3dafc6208f3fb608102288354dfcc672db22bf";
    const url = `https://api.getgeoapi.com/v2/currency/convert?api_key=${apiKey}&from=${currencyBill}&to=${currencyUser}&amount=1&format=json`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    }
};
const renderCurrency = (jsonResponse)=>{
    const billCurrency = _variablesJs.currencyArray[0].value;
    const myCurrency = _variablesJs.currencyArray[1].value;
    const rate = Object.values(jsonResponse.rates)[0].rate;
    const date = jsonResponse.updated_date;
    _variablesJs.inputData.currencyRate = rate;
    switch(_variablesJs.currencyUser.value){
        case "EUR":
            _variablesJs.inputData.currencyState = 0;
            break;
        case "PLN":
            _variablesJs.inputData.currencyState = 1;
            break;
        case "USD":
            _variablesJs.inputData.currencyState = 2;
            break;
        case "GBP":
            _variablesJs.inputData.currencyState = 3;
            break;
        case "CHF":
            _variablesJs.inputData.currencyState = 4;
            break;
        case "JPY":
            _variablesJs.inputData.currencyState = 5;
            break;
        case "UAH":
            _variablesJs.inputData.currencyState = 6;
            break;
        case "RUB":
            _variablesJs.inputData.currencyState = 7;
            break;
        case "BTC":
            _variablesJs.inputData.currencyState = 8;
            break;
    }
    console.log(_variablesJs.currencyUser);
    console.log(jsonResponse);
    _variablesJs.currencyInfo.style.display = "inline-block";
    _variablesJs.currencyInfo.innerHTML = `1 ${billCurrency} = ${rate} ${myCurrency} (${date})`;
};

},{"./variables.js":"abb56","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"abb56":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "inputData", ()=>inputData
);
parcelHelpers.export(exports, "inputWarningOutline", ()=>inputWarningOutline
);
parcelHelpers.export(exports, "buttonEnabled", ()=>buttonEnabled
);
parcelHelpers.export(exports, "tipDOMArray", ()=>tipDOMArray
);
parcelHelpers.export(exports, "inputsDOMArray", ()=>inputsDOMArray
);
parcelHelpers.export(exports, "warningInfoDOMArray", ()=>warningInfoDOMArray
);
parcelHelpers.export(exports, "resetButton", ()=>resetButton
);
parcelHelpers.export(exports, "resultTip", ()=>resultTip
);
parcelHelpers.export(exports, "resultTotal", ()=>resultTotal
);
parcelHelpers.export(exports, "currencyInfo", ()=>currencyInfo
);
parcelHelpers.export(exports, "currencyButton", ()=>currencyButton
);
parcelHelpers.export(exports, "currencyModule", ()=>currencyModule
);
parcelHelpers.export(exports, "currencyUser", ()=>currencyUser
);
parcelHelpers.export(exports, "currencyArray", ()=>currencyArray
);
const inputData = {
    /* tipStateArray can take two values: "0" - button/input is disabled, "1" - button/input is enabled */ tipStateArray: [
        0,
        0,
        0,
        0,
        0,
        0
    ],
    tipValue: 0,
    currencyRate: 1,
    currencyState: 0,
    currencySymbols: [
        "€",
        "zł ",
        "$",
        "£",
        "CHF ",
        "¥",
        "₴ ",
        "₽ "
    ],
    /* inputValidityArray can take two values: "0" - input datum is invalid, "1" - input datum is valid,
  elements successively refer to: [bill, tip, number of people] */ inputValidityArray: [
        0,
        0,
        0
    ],
    areAllValid () {
        return this.inputValidityArray.every((el)=>el == 1
        ) ? true : false;
    }
};
const inputWarningOutline = "input--warning";
const buttonEnabled = "button--enabled";
const tipDOMArray = document.querySelectorAll(".button--tipButton");
const inputsDOMArray = [
    document.getElementById("input--bill"),
    document.getElementById("input--tip"),
    document.getElementById("input--people")
];
const warningInfoDOMArray = [
    document.getElementById("warningInfo--bill"),
    document.getElementById("warningInfo--tip"),
    document.getElementById("warningInfo--people")
];
const resetButton = document.getElementById("button--reset");
const resultTip = document.getElementById("results--tip");
const resultTotal = document.getElementById("results--total");
const currencyInfo = document.getElementById("currencyInfo");
const currencyButton = document.getElementById("button--currency");
const currencyModule = document.getElementById("currencyModule");
const currencyBill = document.getElementById("input--currency-bill");
const currencyUser = document.getElementById("input--currency-user");
const currencyArray = [
    currencyBill,
    currencyUser
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["e3ZGj","k9FoL"], "k9FoL", "parcelRequiref673")

//# sourceMappingURL=index.d95aefb8.js.map
