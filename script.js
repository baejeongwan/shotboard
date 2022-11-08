const settingOffcanvas = new bootstrap.Offcanvas(document.getElementById("settingOffcanvas"))

let config = {
    showName: "드라이아이스 편",
    scene: 1,
    director: "배정완",
    studio: "과학만 영상만"
};

let tempConf = {
    takeNum: 1
}

init()

function init() {
    if (localStorage.length != 0 && localStorage.getItem("config") != null) {
        //Used
        config = JSON.parse(localStorage.getItem("config"))
    }

    applyConfig()

    let today = new Date()
    let dateString = today.getFullYear() + "/" + today.getMonth() + "/" + today.getDate()
    document.getElementById("dateDisplay").innerText = dateString
}

function showOffcanvas() {
    settingOffcanvas.show()
}

document.getElementById("settingOffcanvas").addEventListener("show.bs.offcanvas", e => {
    document.getElementById("setCog").classList.add("d-none")
    loadConfig()
})

document.getElementById("settingOffcanvas").addEventListener("hide.bs.offcanvas", e => {
    document.getElementById("setCog").classList.remove("d-none")
})

function loadConfig() {
    document.getElementById("sceneNumInput").value = config.scene
    document.getElementById("directorNameInput").value = config.director
    document.getElementById("showNameInput").value = config.showName
    document.getElementById("studioNameInput").value = config.studio
    document.getElementById("takeNumInput").value = tempConf.takeNum
}

function saveConfig() {
    config.scene = parseInt(document.getElementById("sceneNumInput").value)
    config.director = document.getElementById("directorNameInput").value
    config.showName = document.getElementById("showNameInput").value
    config.studio = document.getElementById("studioNameInput").value
    tempConf.takeNum = parseInt(document.getElementById("takeNumInput").value)
    applyConfig()
    settingOffcanvas.hide()
    try {
        localStorage.setItem("config", JSON.stringify(config))
    } catch (e) {
        console.error(e)
    }
}

function nextTake() {
    document.getElementById("takeNumInput").value = parseInt(document.getElementById("takeNumInput").value) + 1
}

function prevTake() {
    document.getElementById("takeNumInput").value = parseInt(document.getElementById("takeNumInput").value) - 1
}

function nextScene() {
    document.getElementById("sceneNumInput").value = parseInt(document.getElementById("sceneNumInput").value) + 1
}

function prevScene() {
    document.getElementById("sceneNumInput").value = parseInt(document.getElementById("sceneNumInput").value) - 1
}

function applyConfig() {
    document.getElementById("takeNumDisplay").innerText = "Take #" + tempConf.takeNum
    document.getElementById("showNameDisplay").innerHTML = config.showName
    document.getElementById("sceneDisplay").innerHTML = "Scene #" + config.scene
    document.getElementById("directorDisplay").innerHTML = config.director
    document.getElementById("studioDisplay").innerHTML = config.studio
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/shotboard/sw.js")
    })
}