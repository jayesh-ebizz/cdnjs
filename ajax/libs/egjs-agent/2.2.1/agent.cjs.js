/*
Copyright (c) 2015 NAVER Corp.
name: @egjs/agent
license: MIT
author: NAVER Corp.
repository: git+https://github.com/naver/agent.git
version: 2.2.1
*/
'use strict';

function some(arr, callback) {
  var length = arr.length;

  for (var i = 0; i < length; ++i) {
    if (callback(arr[i], i)) {
      return true;
    }
  }

  return false;
}
function find(arr, callback) {
  var length = arr.length;

  for (var i = 0; i < length; ++i) {
    if (callback(arr[i], i)) {
      return arr[i];
    }
  }

  return null;
}
function getUserAgent(agent) {
  var userAgent = agent;

  if (typeof userAgent === "undefined") {
    if (typeof navigator === "undefined" || !navigator) {
      return "";
    }

    userAgent = navigator.userAgent || "";
  }

  return userAgent.toLowerCase();
}
function execRegExp(pattern, text) {
  try {
    return new RegExp(pattern, "g").exec(text);
  } catch (e) {
    return null;
  }
}
function hasUserAgentData() {
  if (typeof navigator === "undefined" || !navigator || !navigator.userAgentData) {
    return false;
  }

  var userAgentData = navigator.userAgentData;
  var brands = userAgentData.brands || userAgentData.uaList;
  return !!(brands && brands.length);
}
function findVersion(versionTest, userAgent) {
  var result = execRegExp("(" + versionTest + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", userAgent);
  return result ? result[3] : "";
}
function convertVersion(text) {
  return text.replace(/_/g, ".");
}
function findPreset(presets, userAgent) {
  var userPreset = null;
  var version = "-1";
  some(presets, function (preset) {
    var result = execRegExp("(" + preset.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", userAgent);

    if (!result || preset.brand) {
      return false;
    }

    userPreset = preset;
    version = result[3] || "-1";

    if (preset.versionAlias) {
      version = preset.versionAlias;
    } else if (preset.versionTest) {
      version = findVersion(preset.versionTest.toLowerCase(), userAgent) || version;
    }

    version = convertVersion(version);
    return true;
  });
  return {
    preset: userPreset,
    version: version
  };
}
function findBrand(brands, preset) {
  return find(brands, function (_a) {
    var brand = _a.brand;
    return execRegExp("" + preset.test, brand.toLowerCase());
  });
}

var BROWSER_PRESETS = [{
  test: "phantomjs",
  id: "phantomjs"
}, {
  test: "whale",
  id: "whale"
}, {
  test: "edgios|edge|edg",
  id: "edge"
}, {
  test: "msie|trident|windows phone",
  id: "ie",
  versionTest: "iemobile|msie|rv"
}, {
  test: "miuibrowser",
  id: "miui browser"
}, {
  test: "samsungbrowser",
  id: "samsung internet"
}, {
  test: "samsung",
  id: "samsung internet",
  versionTest: "version"
}, {
  test: "chrome|crios",
  id: "chrome"
}, {
  test: "firefox|fxios",
  id: "firefox"
}, {
  test: "android",
  id: "android browser",
  versionTest: "version"
}, {
  test: "safari|iphone|ipad|ipod",
  id: "safari",
  versionTest: "version"
}]; // chromium's engine(blink) is based on applewebkit 537.36.

var CHROMIUM_PRESETS = [{
  test: "(?=.*applewebkit/(53[0-7]|5[0-2]|[0-4]))(?=.*\\schrome)",
  id: "chrome"
}, {
  test: "chromium",
  id: "chrome"
}, {
  test: "whale",
  id: "chrome",
  brand: true
}];
var WEBKIT_PRESETS = [{
  test: "applewebkit",
  id: "webkit"
}];
var WEBVIEW_PRESETS = [{
  test: "(?=(iphone|ipad))(?!(.*version))",
  id: "webview"
}, {
  test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
  id: "webview"
}, {
  // test webview
  test: "webview",
  id: "webview"
}];
var OS_PRESETS = [{
  test: "windows phone",
  id: "windows phone"
}, {
  test: "windows 2000",
  id: "window",
  versionAlias: "5.0"
}, {
  test: "windows nt",
  id: "window"
}, {
  test: "iphone|ipad|ipod",
  id: "ios",
  versionTest: "iphone os|cpu os"
}, {
  test: "mac os x",
  id: "mac"
}, {
  test: "android",
  id: "android"
}, {
  test: "tizen",
  id: "tizen"
}, {
  test: "webos|web0s",
  id: "webos"
}];

function parseUserAgentData(osData) {
  var userAgentData = navigator.userAgentData;
  var brands = (userAgentData.uaList || userAgentData.brands).slice();
  var isMobile = userAgentData.mobile || false;
  var firstBrand = brands[0];
  var browser = {
    name: firstBrand.brand,
    version: firstBrand.version,
    majorVersion: -1,
    webkit: false,
    webview: some(WEBVIEW_PRESETS, function (preset) {
      return findBrand(brands, preset);
    }),
    chromium: some(CHROMIUM_PRESETS, function (preset) {
      return findBrand(brands, preset);
    })
  };
  var os = {
    name: "unknown",
    version: "-1",
    majorVersion: -1
  };
  browser.webkit = !browser.chromium && some(WEBKIT_PRESETS, function (preset) {
    return findBrand(brands, preset);
  });

  if (osData) {
    var platform_1 = osData.platform.toLowerCase();
    var result = find(OS_PRESETS, function (preset) {
      return new RegExp("" + preset.test, "g").exec(platform_1);
    });
    os.name = result ? result.id : platform_1;
    os.version = osData.platformVersion;
  }

  some(BROWSER_PRESETS, function (preset) {
    var result = findBrand(brands, preset);

    if (!result) {
      return false;
    }

    browser.name = preset.id;
    browser.version = osData ? osData.uaFullVersion : result.version;
    return true;
  });

  if (navigator.platform === "Linux armv8l") {
    os.name = "android";
  } else if (browser.webkit) {
    os.name = isMobile ? "ios" : "mac";
  }

  if (os.name === "ios" && browser.webview) {
    browser.version = "-1";
  }

  os.version = convertVersion(os.version);
  browser.version = convertVersion(browser.version);
  os.majorVersion = parseInt(os.version, 10);
  browser.majorVersion = parseInt(browser.version, 10);
  return {
    browser: browser,
    os: os,
    isMobile: isMobile,
    isHints: true
  };
}

function parseUserAgent(userAgent) {
  var nextAgent = getUserAgent(userAgent);
  var isMobile = !!/mobi/g.exec(nextAgent);
  var browser = {
    name: "unknown",
    version: "-1",
    majorVersion: -1,
    webview: !!findPreset(WEBVIEW_PRESETS, nextAgent).preset,
    chromium: !!findPreset(CHROMIUM_PRESETS, nextAgent).preset,
    webkit: false
  };
  var os = {
    name: "unknown",
    version: "-1",
    majorVersion: -1
  };

  var _a = findPreset(BROWSER_PRESETS, nextAgent),
      browserPreset = _a.preset,
      browserVersion = _a.version;

  var _b = findPreset(OS_PRESETS, nextAgent),
      osPreset = _b.preset,
      osVersion = _b.version;

  browser.webkit = !browser.chromium && !!findPreset(WEBKIT_PRESETS, nextAgent).preset;

  if (osPreset) {
    os.name = osPreset.id;
    os.version = osVersion;
    os.majorVersion = parseInt(osVersion, 10);
  }

  if (browserPreset) {
    browser.name = browserPreset.id;
    browser.version = browserVersion;

    if (browser.webview && os.name === "ios" && browser.name !== "safari") {
      browser.webview = false;
    }
  }

  browser.majorVersion = parseInt(browser.version, 10);
  return {
    browser: browser,
    os: os,
    isMobile: isMobile,
    isHints: false
  };
}

/**
 * @namespace eg.agent
 */

/**
* Extracts accuate browser and operating system information from the user agent string or client hints.
* @ko 유저 에이전트 문자열 또는 client hints에서 정확한 브라우저와 운영체제 정보를 추출한다.
* @function eg.agent#getAccurateAgent
* @param - Callback function to get the accuate agent <ko>정확한 에이전트를 가져오기 위한 callback 함수</ko>
* @return - get the accuate agent promise. If Promise are not supported, null is returned. <ko> 정확한 에이전트 promise를 가져온다. Promise를 지원 하지 않는 경우, null을 반환한다. </ko>
* @example
import { getAccurateAgent } from "@egjs/agent";
// eg.agent.getAccurateAgent()
getAccurateAgent().then(agent => {
   const { os, browser, isMobile } = agent;
});
getAccurateAgent(agent => {
    const { os, browser, isMobile } = agent;
});
*/

function getAccurateAgent(callback) {
  if (hasUserAgentData()) {
    return navigator.userAgentData.getHighEntropyValues(["architecture", "model", "platform", "platformVersion", "uaFullVersion"]).then(function (info) {
      var agentInfo = parseUserAgentData(info);
      callback && callback(agentInfo);
      return agentInfo;
    });
  }

  callback && callback(agent());

  if (typeof Promise === "undefined" || !Promise) {
    return null;
  }

  return Promise.resolve(agent());
}
/**
 * Extracts browser and operating system information from the user agent string.
 * @ko 유저 에이전트 문자열에서 브라우저와 운영체제 정보를 추출한다.
 * @function eg.agent#agent
 * @param - user agent string to parse <ko>파싱할 유저에이전트 문자열</ko>
 * @return - agent Info <ko> 에이전트 정보 </ko>
 * @example
import agent from "@egjs/agent";
// eg.agent();
const { os, browser, isMobile } = agent();
 */

function agent(userAgent) {
  if (typeof userAgent === "undefined" && hasUserAgentData()) {
    return parseUserAgentData();
  } else {
    return parseUserAgent(userAgent);
  }
}

var modules = {
    __proto__: null,
    getAccurateAgent: getAccurateAgent,
    'default': agent
};

for (var name in modules) {
  agent[name] = modules[name];
}

module.exports = agent;
//# sourceMappingURL=agent.cjs.js.map
