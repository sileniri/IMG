let imageArray;
const contextMenu = document.querySelector("#contextMenu");

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
            document.body.appendChild(div);
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
