const customContextMenu = document.createElement("div");
customContextMenu.className = "context-menu";
customContextMenu.id = "contextMenu";
customContextMenu.style = "position: fixed; z-index: 1000; width: 150px; display: none";

const customContextBtn = document.createElement("button");
customContextBtn.textContent = "IMG Saved";
customContextBtn.style =
    "background-color: #333; color: #fff; border: none; width: 100%; height: 100%; border-radius: 7.5px; cursor: pointer;";

// const customIframe = document.createElement("iframe");
// customIframe.src = "https://sileniri.github.io/IMG/external.html";
// customIframe.style = "width:0;height:0;border:none;position:absolute;";
// customIframe.id = "customIframe";

// document.body.appendChild(customIframe);
document.body.appendChild(customContextMenu);
customContextMenu.appendChild(customContextBtn);

console.log("Connected IMGscript");

//

const contextMenu = document.querySelector("#contextMenu");
const contextBtn = document.querySelector("#contextMenu > button");

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    const {clientX: x, clientY: y} = e;

    contextMenu.style.top = `${y}px`;
    contextMenu.style.left = `${x}px`;

    contextMenu.style.display = "block";

    console.log(e.target.nodeName);

    if (e.target.nodeName === "IMG") {
        contextBtn.setAttribute("disabled", false);

        const data = e.target.src;

        sendData(data);

        console.log(e, data);
    }
});

function sendData(data) {
    // const iframeEl = document.querySelector("#customIframe");

    // iframeEl.contentWindow.postMessage(JSON.stringify(data), "https://sileniri.github.io/IMG");

    window.open(`sileniri.github.io/IMG#${data}`, "_blank");
}

document.addEventListener("click", (e) => {
    if (e.target.offsetParent != contextMenu) {
        contextMenu.style.display = "none";
        contextBtn.setAttribute("disabled", true);
    }
});
