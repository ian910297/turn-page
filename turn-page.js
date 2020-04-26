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

    checkImgLoad();
})();