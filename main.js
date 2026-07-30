let imageArray;
const contextMenu = document.querySelector("#contextMenu");
const contextMenuBtns = [...contextMenu.querySelectorAll("a")];
const imgWrapper = document.querySelector(".imgWrapper");

if (!location.hash) {
    loadImages();
} else {
    console.log("URL includes hash");

    let imgs = localStorage.getItem("images") || [];
    console.log(imgs);
    if (!Array.isArray(imgs)) {
        imgs = JSON.parse(imgs);
    }
    imgs.push(location.hash.substring(1));
    console.log(imgs);
    localStorage.setItem("images", JSON.stringify(imgs));

    window.open("", "_self").close();
}

function loadImages() {
    console.log("loading...");
    try {
        imageArray = JSON.parse(localStorage.getItem("images"));
        imageArray.forEach((image) => {
            const imageSrc = image;
            const div = document.createElement("div");
            const img = document.createElement("img");
            div.setAttribute("style", `--_img: url(${imageSrc})`);
            img.src = imageSrc;
            imgWrapper.appendChild(div);
            div.appendChild(img);
        });
    } catch (err) {
        console.error(err);
    }
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
            case "visibility":
                document.body.classList.toggle("hidden");
                break;
            case "scrollTop":
                window.scrollTo(0, 0);
                break;
            case "fullscreen":
                if (!document.fullscreenElement) {
                    document.body.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
                document.body;
                break;
            case "fixedView":
                document.body.classList.toggle("fixed");
                break;
            case "horiScroll":
                document.body.classList.toggle("horiScroll");
                break;
            default:
                console.error("Action doesn't exist");
        }
    });
});
function handleMotion(evt) {
    const shakeSensitivity = 3;

    const x = evt.accelerationIncludingGravity.x;
    const y = evt.accelerationIncludingGravity.y;
    const z = evt.accelerationIncludingGravity.z;

    const acceleration = Math.sqrt(x * x + y * y + z * z);

    alert(`Movment: ${acceleration}`);
    if (acceleration > shakeSensitivity) {
        console.log("SHAKE!!!");
        document.body.classList.add("hidden");
    }
}
window.addEventListener("devicemotion", handleMotion);
window.addEventListener("blur", () => {
    document.body.classList.add("hidden");
});
