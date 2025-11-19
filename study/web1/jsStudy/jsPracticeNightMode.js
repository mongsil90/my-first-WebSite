const btn = document.querySelector(".btn");
// const link = document.querySelectorAll("a");


function setMode(bg, text, mode) {
    document.body.style.backgroundColor = bg
    document.body.style.color = text
    btn.value = mode
}

function setLinkColor(color) {
    // let i = 0
    // while(i < link.length) {
    //     link[i].style.color = color;
    //     i = i + 1;
    // }
    $('a').css('color', color);
}


const handleBtn = () => {
    if (btn.value === "Night Mode") {
        setMode("black", "white", "Day Mode");
        setLinkColor("powderblue");

    } else if (btn.value === "Day Mode") {
        setMode("white", "black", "Night Mode");
        setLinkColor("blue");
    }
};

btn.addEventListener("click", handleBtn);
