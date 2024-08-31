let lightmode = localStorage.getItem("lightmode")
const themeSwitch = document.getElementById("theme-switch")

const enablelightMode = ()=>{
    document.body.classList.add("lightmode")
    localStorage.setItem("lightmode", "active")
}

const disablelightMode = ()=>{
    document.body.classList.remove("lightmode")
    localStorage.setItem("lightmode", null)
}

if (lightmode === "active") {
    enablelightMode()
}

themeSwitch.addEventListener("click", (e)=>{
    lightmode = localStorage.getItem("lightmode")
    lightmode !== "active" ? enablelightMode() : disablelightMode()
})