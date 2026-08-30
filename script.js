/* =========================================================
   LUNA OS
   Main operating system functionality
   ========================================================= */

let highestZ = 200;

/* =========================================================
   APP MANAGEMENT
   ========================================================= */

function openApp(app) {
    const windowElement = document.getElementById("window-" + app);

    if (!windowElement) return;

    windowElement.classList.add("open");

    highestZ++;
    windowElement.style.zIndex = highestZ;

    document.getElementById("startMenu")?.classList.remove("open");
    document.getElementById("notificationPanel")?.classList.remove("open");
}

function closeApp(app) {
    const windowElement = document.getElementById("window-" + app);

    if (!windowElement) return;

    windowElement.classList.remove("open");
    windowElement.classList.remove("maximized");
}

function minimizeApp(app) {
    const windowElement = document.getElementById("window-" + app);

    if (!windowElement) return;

    windowElement.classList.remove("open");
}

function maximizeApp(app) {
    const windowElement = document.getElementById("window-" + app);

    if (!windowElement) return;

    windowElement.classList.toggle("maximized");
}

/* =========================================================
   START MENU
   ========================================================= */

function toggleStartMenu() {
    const menu = document.getElementById("startMenu");

    if (!menu) return;

    menu.classList.toggle("open");

    document
        .getElementById("notificationPanel")
        ?.classList.remove("open");
}

function searchApps() {
    const search = document.getElementById("startSearch");

    if (!search) return;

    const query = search.value.toLowerCase().trim();

    document.querySelectorAll(".start-app").forEach(app => {
        const nameElement = app.querySelector(".start-app-name");

        if (!nameElement) return;

        const name = nameElement.textContent.toLowerCase();

        app.style.display =
            name.includes(query) ? "" : "none";
    });
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function toggleNotifications() {
    const panel = document.getElementById("notificationPanel");

    if (!panel) return;

    panel.classList.toggle("open");

    document
        .getElementById("startMenu")
        ?.classList.remove("open");
}

/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {
    const clock = document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });

    const date = now.toLocaleDateString([], {
        month: "short",
        day: "numeric"
    });

    clock.innerHTML = `${time}<br>${date}`;
}

updateClock();

setInterval(updateClock, 1000);

/* =========================================================
   WALLPAPER SYSTEM
   ========================================================= */

const defaultWallpaper = `
    radial-gradient(
        circle at 72% 32%,
        rgba(63, 104, 150, 0.24),
        transparent 24%
    ),
    radial-gradient(
        circle at 72% 32%,
        #d8e1ea 0%,
        #9caabd 2.5%,
        #526175 8%,
        #202c3e 17%,
        transparent 18%
    ),
    radial-gradient(
        circle at 50% 40%,
        rgba(45, 78, 117, 0.22),
        transparent 42%
    ),
    linear-gradient(
        145deg,
        #02050b 0%,
        #07111f 48%,
        #030711 100%
    )
`;

const savedWallpaper =
    localStorage.getItem("lunaOSWallpaper");

document.body.style.background =
    savedWallpaper || defaultWallpaper;

/* =========================================================
   CHANGE WALLPAPER
   ========================================================= */

function changeWallpaper() {

    const wallpapers = [

        defaultWallpaper,

        `
        radial-gradient(
            circle at 78% 25%,
            #d7e0e8 0%,
            #8c9aac 2.5%,
            #3e4d62 8%,
            #172335 17%,
            transparent 18%
        ),
        radial-gradient(
            circle at 50% 45%,
            rgba(45, 84, 126, .26),
            transparent 45%
        ),
        linear-gradient(
            145deg,
            #02040a,
            #081425,
            #030711
        )
        `,

        `
        radial-gradient(
            circle at 30% 28%,
            rgba(45, 92, 140, .32),
            transparent 24%
        ),
        radial-gradient(
            circle at 72% 70%,
            rgba(24, 53, 86, .30),
            transparent 32%
        ),
        linear-gradient(
            135deg,
            #02050b,
            #091827,
            #030711
        )
        `,

        `
        radial-gradient(
            circle at 65% 42%,
            rgba(72, 112, 153, .30),
            transparent 30%
        ),
        linear-gradient(
            120deg,
            #01040a,
            #0b1728 48%,
            #030711
        )
        `
    ];

    const current =
        document.body.style.background;

    let index = wallpapers.findIndex(
        wallpaper => wallpaper.trim() === current.trim()
    );

    index++;

    if (index >= wallpapers.length) {
        index = 0;
    }

    document.body.style.background =
        wallpapers[index];

    localStorage.setItem(
        "lunaOSWallpaper",
        wallpapers[index]
    );
}

/* =========================================================
   CALCULATOR
   ========================================================= */

let calculatorExpression = "";

function calcInput(value) {

    calculatorExpression += value;

    const display =
        document.getElementById("calculatorDisplay");

    if (display) {
        display.value = calculatorExpression;
    }
}

function calcClear() {

    calculatorExpression = "";

    const display =
        document.getElementById("calculatorDisplay");

    if (display) {
        display.value = "0";
    }
}

function calcResult() {

    const display =
        document.getElementById("calculatorDisplay");

    try {

        if (!calculatorExpression.trim()) {
            return;
        }

        /*
         * This is only a prototype calculator.
         * The expression is restricted to basic
         * calculator characters before evaluation.
         */

        if (!/^[0-9+\-*/().\s]+$/.test(calculatorExpression)) {
            throw new Error("Invalid expression");
        }

        const result = Function(
            `"use strict"; return (${calculatorExpression})`
        )();

        calculatorExpression = String(result);

        if (display) {
            display.value = calculatorExpression;
        }

    } catch {

        calculatorExpression = "";

        if (display) {
            display.value = "Error";
        }
    }
}

/* =========================================================
   LUNA APP
   ========================================================= */

function sendToLuna() {

    const input =
        document.getElementById("lunaInput");

    if (!input) return;

    const message = input.value.trim();

    if (!message) return;

    /*
     * Ollama Cloud will be connected here later.
     */

    alert(
        "Luna AI connection will be added next.\n\n" +
        "You said: " +
        message
    );

    input.value = "";
}

/* =========================================================
   WINDOW DRAGGING
   ========================================================= */

function makeWindowsDraggable() {

    document.querySelectorAll(".window").forEach(windowElement => {

        const header =
            windowElement.querySelector(".window-header");

        if (!header) return;

        let dragging = false;
        let offsetX = 0;
        let offsetY = 0;

        header.addEventListener("mousedown", event => {

            if (
                event.target.closest(".window-controls")
            ) {
                return;
            }

            if (
                windowElement.classList.contains("maximized")
            ) {
                return;
            }

            dragging = true;

            const rect =
                windowElement.getBoundingClientRect();

            offsetX =
                event.clientX - rect.left;

            offsetY =
                event.clientY - rect.top;

            highestZ++;

            windowElement.style.zIndex =
                highestZ;

            windowElement.style.transform =
                "none";
        });

        document.addEventListener("mousemove", event => {

            if (!dragging) return;

            let newLeft =
                event.clientX - offsetX;

            let newTop =
                event.clientY - offsetY;

            const maxLeft =
                window.innerWidth -
                windowElement.offsetWidth -
                10;

            const maxTop =
                window.innerHeight -
                windowElement.offsetHeight -
                90;

            newLeft =
                Math.max(10, Math.min(newLeft, maxLeft));

            newTop =
                Math.max(10, Math.min(newTop, maxTop));

            windowElement.style.left =
                newLeft + "px";

            windowElement.style.top =
                newTop + "px";
        });

        document.addEventListener("mouseup", () => {
            dragging = false;
        });

    });
}

makeWindowsDraggable();

/* =========================================================
   BRING WINDOWS TO FRONT
   ========================================================= */

document.querySelectorAll(".window").forEach(windowElement => {

    windowElement.addEventListener("mousedown", () => {

        highestZ++;

        windowElement.style.zIndex =
            highestZ;
    });

});

/* =========================================================
   CLOSE MENUS WHEN CLICKING DESKTOP
   ========================================================= */

document.addEventListener("click", event => {

    const startMenu =
        document.getElementById("startMenu");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const taskbar =
        document.getElementById("taskbar");

    if (
        startMenu &&
        startMenu.classList.contains("open") &&
        !startMenu.contains(event.target) &&
        !event.target.closest("#taskbar-left")
    ) {
        startMenu.classList.remove("open");
    }

    if (
        notificationPanel &&
        notificationPanel.classList.contains("open") &&
        !notificationPanel.contains(event.target) &&
        !event.target.closest("#taskbar-right")
    ) {
        notificationPanel.classList.remove("open");
    }

});

/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener("keydown", event => {

    /*
     * Windows key / Meta key
     * opens the Luna OS launcher.
     */

    if (event.key === "Meta") {
        toggleStartMenu();
    }

    /*
     * Escape closes menus.
     */

    if (event.key === "Escape") {

        document
            .getElementById("startMenu")
            ?.classList.remove("open");

        document
            .getElementById("notificationPanel")
            ?.classList.remove("open");
    }

});

/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateClock();

    document.body.style.background =
        localStorage.getItem("lunaOSWallpaper")
        || defaultWallpaper;

});
