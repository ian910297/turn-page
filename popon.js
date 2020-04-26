(() => {
    // wrapper method 
    function getMethod() {
        callEventPageMethod('getMethod', 'some',  (value) => {
            console.log(value);
            document.getElementById("test"+value).checked = true;
        });
    }
    
    //generic method
    function callEventPageMethod(method, data, callback) {
        chrome.runtime.sendMessage({ method: method, data: data }, (response) => {
            if(typeof callback === "function") callback(response);
        });
    }

    function Init() {
        Array.from(document.getElementsByClassName("turn-method")).forEach((el) => {
            el.checked = false;
        });

        getMethod();
    }

    Init();
})();