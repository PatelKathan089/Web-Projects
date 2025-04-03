const toggle_switch = document.querySelector(".toggle-switch");
const light_btn = document.getElementById("btn_light");
const dark_btn = document.getElementById("btn_dark");
const readMore_btn = document.getElementById("read_more");
const close_btn = document.getElementById("close_btn");
const theme = localStorage.getItem("theme");

dark_btn.style.display = "none";

light_btn.addEventListener("click", (e) => {
    light_btn.style.display = "none";
    dark_btn.style.display = "flex";
    dark_btn.style.transform = "translateX(30px)";
    toggle_switch.style.backgroundColor = "#000000";
    document.body.classList.remove("light_mode");
    document.body.classList.add("dark_mode");
    localStorage.setItem("theme", "dark_mode");
});

dark_btn.addEventListener("click", () => {
    dark_btn.style.display = "none";
    light_btn.style.display = "flex";
    light_btn.style.transform = "translateX(0px)";
    toggle_switch.style.backgroundColor = "#ffffff";
    document.body.classList.remove("dark_mode");
    document.body.classList.add("light_mode");
    localStorage.setItem("theme", "light_mode");
});

if (theme === "dark_mode") {
    dark_btn.style.display = "flex";
    light_btn.style.display = "none";
    dark_btn.style.transform = "translateX(30px)";
    toggle_switch.style.backgroundColor = "#000000";
    document.body.classList.remove("light_mode");
    document.body.classList.add("dark_mode");
} else {
    dark_btn.style.display = "none";
    light_btn.style.display = "flex";
    light_btn.style.transform = "translateX(0px)";
    toggle_switch.style.backgroundColor = "#ffffff";
    document.body.classList.remove("dark_mode");
    document.body.classList.add("light_mode");
}

readMore_btn.addEventListener("click", () => {
    document.querySelector(".extra_txt").style.display = "inline";
});

readMore_btn.addEventListener("dblclick", () => {
    document.querySelector(".extra_txt").style.display = "none";
});

