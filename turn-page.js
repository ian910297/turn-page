(() => {
    function checkImgLoad() {
        console.log("check loading");
        if(document.getElementById("TheImg").complete==true) {
            GetImgPosition();
        } else {
            setTimeout(checkImgLoad, 100);
        }
    }

    function GetImgPosition() {
        document.getElementById("TheImg")
            .addEventListener("click", (e)=>{
                var width = document.getElementById("TheImg").offsetWidth;
                console.log(width, e.offsetX);
                if(e.offsetX < width/2) {
                    document.getElementById("prev").click();
                } else {
                    document.getElementById("next").click();
                }
        });
    }

    chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
        if (obj) {
            if (obj.method == 'getMethod') {
                console.log("turn-page get content");
                // getContent(sendResponse);
            } else if (obj.method == 'othermethod') {
        
            }
        }
        return true; // remove this line to make the call sync!
    });

    // wrapper method 
    function getMethod() {
        callEventPageMethod('getMethod', 'some',  (value) => {
            console.log("turn-page get", value);
            // document.getElementById("test"+value).checked = true;
        });
    }
    
    //generic method
    function callEventPageMethod(method, data, callback) {
        chrome.runtime.sendMessage({ method: method, data: data }, (response) => {
            if(typeof callback === "function") callback(response);
        });
    }

    getMethod();
    checkImgLoad();
})();