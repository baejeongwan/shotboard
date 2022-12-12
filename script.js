const settingOffcanvas = new bootstrap.Offcanvas(document.getElementById("settingOffcanvas"))

//Configure tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

let config = {
    showName: "프로그램 제목 입력",
    scene: 1,
    director: "감독이름 입력",
    studio: "제작사 이름 입력"
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
    let month = today.getMonth() + 1;
    let dateString = today.getFullYear() + "/" +  month + "/" + today.getDate()
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

function eraseAllSet() {
    localStorage.clear()
    location.reload()
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

function showSlate() {
    document.getElementById("slate").classList.remove("d-none")
    document.getElementById("slate").classList.add("slateAppeared")
    setTimeout(() => {
        document.getElementById("slate").classList.remove("slateAppeared")
        document.getElementById("slate").classList.add("d-none")
    }, 2000);
}