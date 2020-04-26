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
      console.log(host, "legal");
      isLegal=true;
    } else {
      console.log(host, "illegal");
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