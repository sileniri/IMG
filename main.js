let imageArray;
const contextMenu = document.querySelector("#contextMenu");
const contextMenuBtns = [...contextMenu.querySelectorAll("a")];
const imgWrapper = document.querySelector(".imgWrapper");
let scrollOffset = document.documentElement.scrollTop || document.body.scrollTop;

let visiblePopup = false;

if (!location.hash) {
    loadImages();
} else {
    console.log("URL includes hash");

    let imgs = localStorage.getItem("images") || [];
    console.log(imgs);
    if (!Array.isArray(imgs)) {
        imgs = JSON.parse(imgs);
    }
    if (!imgs.includes(location.hash)) {
        imgs.push(location.hash.substring(1));
    }
    console.log(imgs);
    localStorage.setItem("images", JSON.stringify(imgs));

    window.open("", "_self").close();
}

function moveImg(from, to) {
    const element = imageArray[from];
    imageArray.splice(from, 1);
    imageArray.splice(to, 0, element);
    localStorage.setItem("images", JSON.stringify(imageArray));
    loadImages();
}
function delImg(index) {
    visiblePopup = true;
    if (window.confirm("Do you want to remove this image?")) {
        const element = imageArray[index];
        imageArray.splice(index, 1);
        localStorage.setItem("images", JSON.stringify(imageArray));
        loadImages();
    }
    setTimeout(() => {
        visiblePopup = false;
    }, 100);
}

window.addEventListener("scroll", (e) => {
    const threshold = 200;
    const newScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (newScroll < scrollOffset + threshold && newScroll > scrollOffset - threshold) {
        scrollOffset = newScroll;
    } else {
        window.scrollTo(0, scrollOffset);
    }
    console.log(newScroll, scrollOffset);
});

function loadImages() {
    console.log("loading...");
    try {
        imageArray = JSON.parse(localStorage.getItem("images"));

        imgWrapper.innerHTML = "";
        imageArray.forEach((image) => {
            const imageSrc = image;
            const div = document.createElement("div");
            const img = document.createElement("img");
            const controlsWrapper = document.createElement("div");
            const controls = document.createElement("div");
            const upBtn = document.createElement("button");
            const pinBtn = document.createElement("button");
            const delBtn = document.createElement("button");
            const downBtn = document.createElement("button");

            div.setAttribute("style", `--_img: url(${imageSrc})`);
            img.src = imageSrc;
            controlsWrapper.className = "controls-wrapper";
            controls.className = "controls";
            upBtn.className = "up-btn";
            upBtn.textContent = "arrow_upward";
            pinBtn.className = "pin-btn";
            pinBtn.textContent = "keep";
            delBtn.className = "del-btn";
            delBtn.textContent = "delete";
            downBtn.className = "down-btn";
            downBtn.textContent = "arrow_downward";

            imgWrapper.appendChild(div);
            div.appendChild(controlsWrapper);
            controlsWrapper.appendChild(controls);
            controls.appendChild(upBtn);
            controls.appendChild(pinBtn);
            controls.appendChild(delBtn);
            controls.appendChild(downBtn);
            div.appendChild(img);

            upBtn.addEventListener("click", (e) => {
                const fromIndex = imageArray.indexOf(imageSrc);
                const toIndex = fromIndex - 1 > 0 ? fromIndex - 1 : 0;
                moveImg(fromIndex, toIndex);
            });
            pinBtn.addEventListener("click", (e) => {
                const fromIndex = imageArray.indexOf(imageSrc);
                const toIndex = 0;
                moveImg(fromIndex, toIndex);
            });
            delBtn.addEventListener("click", (e) => {
                const index = imageArray.indexOf(imageSrc);
                delImg(index);
            });
            downBtn.addEventListener("click", (e) => {
                const fromIndex = imageArray.indexOf(imageSrc);
                const toIndex = fromIndex + 1 < imageArray.length ? fromIndex + 1 : imageArray.length;
                moveImg(fromIndex, toIndex);
            });
        });
    } catch (err) {
        console.error(err);
    }
    console.log("Succesfully loaded images");

    // console.log("scrollTo:", 0, ",", scrollOffset);

    // window.scrollTo(0, scrollOffset);
}

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    const {clientX: x, clientY: y} = e;

    contextMenu.style.top = `${y}px`;
    contextMenu.style.left = `${x}px`;

    contextMenu.classList.add("visible");
});

document.addEventListener("click", (e) => {
    if (e.target.offsetParent != contextMenu) {
        contextMenu.classList.remove("visible");
    }
});

contextMenuBtns.forEach((btn) => {
    console.log(btn.dataset.action);
    btn.addEventListener("click", (e) => {
        switch (btn.dataset.action) {
            case "reload":
                loadImages();
                break;
            case "visibility":
                document.body.classList.toggle("hidden");
                sessionStorage.setItem("hidden", document.body.classList.contains("hidden"));
                break;
            case "scrollTop":
                scrollOffset = 0;
                window.scrollTo(0, 0);
                break;
            case "fullscreen":
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
                document.body;
                break;
            case "fixedView":
                document.body.classList.toggle("fixed");
                break;
            // case "horiScroll":
            //     document.body.classList.toggle("horiScroll");
            //     break;
            case "reset":
                localStorage.removeItem("images");
                loadImages();
                break;
            default:
                console.error("Action doesn't exist, or hasn't been implemented yet");
        }
        // console.log(0, scrollOffset);
    });
});
function handleMotion(evt) {
    const shakeSensitivity = 15;

    const x = evt.accelerationIncludingGravity.x;
    const y = evt.accelerationIncludingGravity.y;
    const z = evt.accelerationIncludingGravity.z;

    const acceleration = Math.sqrt(x * x + y * y + z * z);

    if (acceleration > shakeSensitivity) {
        console.log("SHAKE!!!");
        document.body.classList.add("hidden");
    }
}
window.addEventListener("devicemotion", handleMotion);
window.addEventListener("blur", () => {
    console.log(visiblePopup);

    if (!visiblePopup) {
        document.body.classList.add("hidden");
    }
});
// window.addEventListener("focus", () => {
//     loadImages();
//     const hidden = sessionStorage.getItem("hidden");
//     hidden === "false" ? document.body.classList.remove("hidden") : document.body.classList.add("hidden");
// });
