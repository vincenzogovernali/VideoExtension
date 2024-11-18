window.onload = (event) => {
    document.getElementById("enablePip").addEventListener("click", async function () {
        let tabs = await chrome.tabs.query({active: true, currentWindow: true});
        let tabId = tabs[0].id;
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            function: () => {
                let videos = document.getElementsByTagName("video");
                for (let i = 0; i < videos.length; i++) {
                    if( videos[i]['innerHTML'] !== undefined && videos[i]['innerHTML'].length > 0 && (videos[i]['innerHTML'].includes("http:") || videos[i]['innerHTML'].includes("https:"))) {
                        videos[i].requestPictureInPicture();
                    }
                }
            }
        }).then(() => console.log("Injected PiP function"));
    });

    document.getElementById("stretchVideo").addEventListener("click", async function () {
        let tabs = await chrome.tabs.query({active: true, currentWindow: true});
        let tabId = tabs[0].id;
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            function:  () => {
                let videos = document.getElementsByTagName("video");
                for (let i = 0; i < videos.length; i++) {
                    if( videos[i]['innerHTML'] !== undefined && videos[i]['innerHTML'].length > 0 && (videos[i]['innerHTML'].includes("http:") || videos[i]['innerHTML'].includes("https:"))) {
                        videos[i].style.setProperty("object-fit", "fill");
                    }
                }
            }
        }).then(() => console.log("Injected stretch function"));
    });

    document.getElementById("resetStretch").addEventListener("click", async function () {
        let tabs = await chrome.tabs.query({active: true, currentWindow: true});
        let tabId = tabs[0].id;
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            function:  () => {
                let videos = document.getElementsByTagName("video");
                for (let i = 0; i < videos.length; i++) {
                    if( videos[i]['innerHTML'] !== undefined && videos[i]['innerHTML'].length > 0 && (videos[i]['innerHTML'].includes("http:") || videos[i]['innerHTML'].includes("https:"))) {
                        videos[i].style.removeProperty("object-fit");
                    }
                }
            }
        }).then(() => console.log("Injected reset stretch function"));
    });



}


