let imageArray = JSON.parse(localStorage.getItem("images"));
console.log(imageArray);

const contextMenu = document.querySelector("#contextMenu");

if (!location.hash) {
    loadImages();
} else {
    let imgs = localStorage.getItem("images") || [];
    if (!Array.isArray(imgs)) {
        imgs = JSON.parse("imgs");
    }
    imgs.push(locattion.hash);
    localStorage.setItem("images", imgs);
}

function loadImages() {
    console.log("loading...");
    try {
        imageArray = JSON.parse(localStorage.getItem("images"));
        imageArray.forEach((image) => {
            const imageSrc = JSON.parse(image);
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
