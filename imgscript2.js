console.log("Connected IMGscript");

let imageElem = document.querySelector("img#image");

if (imageElem) {
    // contextBtn.setAttribute("disabled", false);

    let data = imageElem.src;

    // if (data.includes(".jpg")) {
    //     data = data.replaceAll("wimg.", "");
    //     data = data.replaceAll("thumbnail", "sample");
    //     data = data.replaceAll("/samples", "//samples");
    // } else {
    //     data = data.replaceAll("/thumbnails", "//images");
    //     data = data.replaceAll("thumbnail", "");
    // }
    // data = data.replaceAll("preview.", "i.");

    sendData(data);

    console.log(e, data);
}

function sendData(data) {
    // const iframeEl = document.querySelector("#customIframe");

    // iframeEl.contentWindow.postMessage(JSON.stringify(data), "https://sileniri.github.io/IMG");

    window.open(`https://sileniri.github.io/IMG#${data}`, "_blank");
}
