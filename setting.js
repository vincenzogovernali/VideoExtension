window.onload = (event) => {
    document.getElementById("enablePip").addEventListener("click", async function () {
        let tabs = await chrome.tabs.query({active: true, currentWindow: true});
        let tabId = tabs[0].id;
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            function: checkVideo,
            args: [0],
        }).then(() => console.log("Injected PiP function"));
    });

    document.getElementById("stretchVideo").addEventListener("click", async function () {
        let tabs = await chrome.tabs.query({active: true, currentWindow: true});
        let tabId = tabs[0].id;
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            function: checkVideo,
            args: [1]
        }).then(() => console.log("Injected stretch function"));
    });

    document.getElementById("resetStretch").addEventListener("click", async function () {
        let tabs = await chrome.tabs.query({active: true, currentWindow: true});
        let tabId = tabs[0].id;
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            function: checkVideo,
            args: [2]
        }).then(() => console.log("Injected reset stretch function"));
    });


    function checkVideo(value) {
        let videos = document.getElementsByTagName("video");
        console.log(videos);
        for (let i = 0; i < videos.length; i++) {
            if ((videos[i]['innerHTML'] !== undefined && videos[i]['innerHTML'].length > 0 && (videos[i]['innerHTML'].includes("http:") || videos[i]['innerHTML'].includes("https:"))) || (videos[i]['src'] !== undefined && (videos[i]['src'].includes("https:") || videos[i]['src'].includes("http:")))) {
                switch (value) {
                    case 0:
                        videos[i].requestPictureInPicture();
                        break;
                    case 1:
                        videos[i].style.setProperty("object-fit", "fill");
                        break;
                    default:
                        videos[i].style.removeProperty("object-fit");
                        break;
                }
            }
        }
        return true;
    }



}


