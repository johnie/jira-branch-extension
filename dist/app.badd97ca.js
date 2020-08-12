// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
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
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
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
          typeof parcelRequire === 'function' && parcelRequire;
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
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"17ec3582418644a0d0b7bfc5bded4c32":[function(require,module,exports) {
var global = arguments[3];
var __PARCEL_BUNDLE_ID = "7e0d569139876fd9aae86aa0af41bb42";
var __PARCEL_HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
/* global __PARCEL_BUNDLE_ID, __PARCEL_HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = location.hostname;
  var port = location.port ? ':' + location.port : '';
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + port + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === __PARCEL_HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
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
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, asset.depsByBundle[__PARCEL_BUNDLE_ID]];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"0090a200a466c06bb0de1aea9bbf420e":[function(require,module,exports) {
const config = require('./lib/config.js');

const utils = require('./lib/utils.js');

const api = require('./lib/api.js');

const branchType = ['Feature', 'Bugfix', 'Hotfix', 'Release', 'None'];
const branchTypeData = branchType.map(name => {
  const val = name.toLowerCase();
  return {
    name,
    value: val !== 'none' ? `${val}/` : ''
  };
});

const radioHtml = ({
  name,
  value
}) => `
<option value="${value}">${name}</option>
`;

const branchTypeHtml = branchTypeData.map(data => radioHtml(data)).join('');

const issueDataMapper = data => {
  return {
    issue: data.key,
    title: data.fields.summary
  };
};

document.addEventListener('DOMContentLoaded', function () {
  const SELECT_BRANCH_TYPE = document.querySelector('#branchType');
  const ISSUE_TITLE_INPUT = document.querySelector('#issueTitle');
  const COPY = document.querySelector('#copy');
  const PREVIEW = document.querySelector('#preview');
  SELECT_BRANCH_TYPE.innerHTML = branchTypeHtml;
  let titleS;
  let issuuuuu;
  api.fetchIssueData().then(res => res.json()).then(data => {
    const res = issueDataMapper(data);
    const title = utils.slugify(res.title);
    const issue = res.issue;
    issuuuuu = issue;
    const branchName = `${issue}-${title}`;
    titleS = branchName;
    ISSUE_TITLE_INPUT.value = branchName;
    const finalName = `${SELECT_BRANCH_TYPE.value}${branchName}`;
    PREVIEW.innerHTML = finalName;
    COPY.addEventListener('click', function () {
      utils.copyToClipboard(finalName);
    });
  });
  const form = document.querySelector('form');
  SELECT_BRANCH_TYPE.addEventListener('change', function (e) {
    PREVIEW.innerHTML = utils.setFullBranchName({
      type: e.target.value,
      issue: issuuuuu,
      title: titleS
    });
  });
});
},{"./lib/config.js":"d5f17758982073f5df1494a468b4798c","./lib/utils.js":"dc91849d7925ad5e017401f7815fb167","./lib/api.js":"0462204ba9d20fe52c0880968791a2d0"}],"d5f17758982073f5df1494a468b4798c":[function(require,module,exports) {
const IS_DEV = undefined === 'development';
const API_URL = IS_DEV ? 'http://localhost:3000/' : 'https://jira.mrgreen.zone/';
module.exports = {
  IS_DEV,
  API_URL
};
},{}],"dc91849d7925ad5e017401f7815fb167":[function(require,module,exports) {
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

function slugify(string) {
  const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;';
  const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');
  return string.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
  .replace(/&/g, '-and-') // Replace & with 'and'
  .replace(/[^\w\-]+/g, '') // Remove all non-word characters
  .replace(/\-\-+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, ''); // Trim - from end of text
}

const getIssueFromUrl = url => url.substring(url.lastIndexOf('/') + 1);

const setBranchName = (issue, branch) => `${issue}-${slugify(branch)}`;

const setFullBranchName = ({
  type,
  issue,
  title
}) => `${type}${setBranchName(issue, title)}`;

module.exports = {
  slugify,
  getIssueFromUrl,
  copyToClipboard,
  setBranchName,
  setFullBranchName
};
},{}],"0462204ba9d20fe52c0880968791a2d0":[function(require,module,exports) {
const config = require('./config.js');

const chrome = require('./chrome.js');

const fetchIssueData = () => new Promise((resolve, reject) => {
  chrome.getIssueKey().then(key => {
    fetch(`${config.API_URL}rest/api/latest/issue/${key}?fields=summary`).then(res => resolve(res)).catch(err => reject('fetch', err));
  }).catch(error => reject('chrome', error));
});

module.exports = {
  fetchIssueData
};
},{"./config.js":"d5f17758982073f5df1494a468b4798c","./chrome.js":"2eb042504ff3789bd77af759351baa41"}],"2eb042504ff3789bd77af759351baa41":[function(require,module,exports) {
const config = require('./config');

const utils = require('./utils');

const getIssueKey = () => new Promise((resolve, reject) => {
  if (chrome.tabs && chrome.tabs.query) {
    chrome.tabs.query({
      active: true
    }, function (tabs) {
      const [tab] = tabs;
      const issue = utils.getIssueFromUrl(tab.url);
      resolve(issue);
    });
  } else if (config.IS_DEV) {
    resolve('PRGG-888');
  } else {
    reject(false);
  }
});

module.exports = {
  getIssueKey
};
},{"./config":"d5f17758982073f5df1494a468b4798c","./utils":"dc91849d7925ad5e017401f7815fb167"}]},{},["17ec3582418644a0d0b7bfc5bded4c32","0090a200a466c06bb0de1aea9bbf420e"], null)

//# sourceMappingURL=app.badd97ca.js.map
