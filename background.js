// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const legalHost = [
  "comicbus.live"
];

function checkLegalHost(host) {
  var isLegal = false;
  legalHost.forEach(e => {
    if(host.includes(e)) {
      // console.log(host, "legal");
      isLegal=true;
    } else {
      // console.log(host, "illegal");
    }
  });
  return isLegal;
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if(changeInfo.status == "loading" && checkLegalHost(tab.url)) {
    chrome.tabs.executeScript(null, {file: "turn-page.js"}, 
        _ => {
          let e = chrome.runtime.lastError;
          if(e !== undefined){
            // console.log(tabId, _, e);
          }
    });
  }
});

chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
  if (obj) {
    if (obj.method == 'getMethod') {
      console.log("background get content");
      getContent(sendResponse);
    } else if (obj.method == 'othermethod') {

    }
  }
  return true; // remove this line to make the call sync!
});

// chrome.storage.local.clear();
chrome.storage.local.get("turnMethod", (obj)=>{
  console.log(obj);
  if(Object.keys(obj).length === 0) {
    console.log("empty");
    chrome.storage.local.set({"turnMethod": 1});
  } else {
    chrome.storage.local.set({"turn": obj["turnMethod"]+1});
    console.log("valued", obj);
  }
});

//some async method
function getContent(sendResponse) {
    chrome.storage.local.get("turnMethod", function (obj) {
        console.log("background in get content function");
        console.log(obj);
        sendResponse(obj["turnMethod"]);
    });
}