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
        const nameElement =
            app.querySelector(".start-app-name");

        if (!nameElement) return;

        const name =
            nameElement.textContent.toLowerCase();

        app.style.display =
            name.includes(query) ? "" : "none";
    });
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function toggleNotifications() {
    const panel =
        document.getElementById("notificationPanel");

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
    const clock =
        document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    const time =
        now.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        });

    const date =
        now.toLocaleDateString([], {
            month: "short",
            day: "numeric"
        });

    clock.innerHTML =
        `${time}<br>${date}`;
}

/* =========================================================
   REALISTIC MOON WALLPAPER
   ========================================================= */

const LUNA_WALLPAPER =
    "url('luna-moon-wallpaper.png')";

function applyLunaWallpaper() {

    document.body.style.backgroundImage =
        LUNA_WALLPAPER;

    document.body.style.backgroundSize =
        "cover";

    document.body.style.backgroundPosition =
        "center center";

    document.body.style.backgroundRepeat =
        "no-repeat";

    document.body.style.backgroundAttachment =
        "fixed";
}

function changeWallpaper() {

    applyLunaWallpaper();

    localStorage.setItem(
        "lunaOSWallpaper",
        "luna-moon-wallpaper.png"
    );
}

/* =========================================================
   CALCULATOR
   ========================================================= */

let calculatorExpression = "";

function calcInput(value) {

    calculatorExpression += value;

    const display =
        document.getElementById(
            "calculatorDisplay"
        );

    if (display) {
        display.value =
            calculatorExpression;
    }
}

function calcClear() {

    calculatorExpression = "";

    const display =
        document.getElementById(
            "calculatorDisplay"
        );

    if (display) {
        display.value = "0";
    }
}

function calcResult() {

    const display =
        document.getElementById(
            "calculatorDisplay"
        );

    try {

        if (!calculatorExpression.trim()) {
            return;
        }

        if (
            !/^[0-9+\-*/().\s]+$/.test(
                calculatorExpression
            )
        ) {
            throw new Error(
                "Invalid expression"
            );
        }

        const result =
            Function(
                `"use strict"; return (${calculatorExpression})`
            )();

        calculatorExpression =
            String(result);

        if (display) {
            display.value =
                calculatorExpression;
        }

    } catch {

        calculatorExpression = "";

        if (display) {
            display.value = "Error";
        }
    }
}

/* =========================================================
   LUNA AI
   ========================================================= */

function sendToLuna() {

    const input =
        document.getElementById(
            "lunaInput"
        );

    if (!input) return;

    const message =
        input.value.trim();

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
   POWER MENU
   ========================================================= */

function showPowerMenu() {

    const choice =
        prompt(
            "Luna OS Power\n\n" +
            "Type:\n" +
            "restart\n" +
            "sleep\n" +
            "shutdown"
        );

    if (!choice) return;

    const action =
        choice.toLowerCase().trim();

    if (action === "restart") {
        location.reload();
    }

    if (action === "sleep") {

        document.body.style.transition =
            "filter 0.5s ease";

        document.body.style.filter =
            "brightness(0.12)";

        setTimeout(() => {

            document.body.style.filter =
                "";

        }, 3000);
    }

    if (action === "shutdown") {

        document.body.innerHTML = `
            <div style="
                width:100vw;
                height:100vh;
                display:flex;
                align-items:center;
                justify-content:center;
                background:#02050b;
                color:#dce6ef;
                font-family:Arial,Helvetica,sans-serif;
                font-size:18px;
            ">
                Luna OS is shutting down...
            </div>
        `;
    }
}

/* =========================================================
   WINDOW DRAGGING
   ========================================================= */

function makeWindowsDraggable() {

    document
        .querySelectorAll(".window")
        .forEach(windowElement => {

            const header =
                windowElement.querySelector(
                    ".window-header"
                );

            if (!header) return;

            let dragging = false;
            let offsetX = 0;
            let offsetY = 0;

            header.addEventListener(
                "mousedown",
                event => {

                    if (
                        event.target.closest(
                            ".window-controls"
                        )
                    ) {
                        return;
                    }

                    if (
                        windowElement.classList.contains(
                            "maximized"
                        )
                    ) {
                        return;
                    }

                    dragging = true;

                    const rect =
                        windowElement.getBoundingClientRect();

                    offsetX =
                        event.clientX -
                        rect.left;

                    offsetY =
                        event.clientY -
                        rect.top;

                    highestZ++;

                    windowElement.style.zIndex =
                        highestZ;

                    windowElement.style.transform =
                        "none";
                }
            );

            document.addEventListener(
                "mousemove",
                event => {

                    if (!dragging) return;

                    let newLeft =
                        event.clientX -
                        offsetX;

                    let newTop =
                        event.clientY -
                        offsetY;

                    const maxLeft =
                        window.innerWidth -
                        windowElement.offsetWidth -
                        10;

                    const maxTop =
                        window.innerHeight -
                        windowElement.offsetHeight -
                        90;

                    newLeft =
                        Math.max(
                            10,
                            Math.min(
                                newLeft,
                                maxLeft
                            )
                        );

                    newTop =
                        Math.max(
                            10,
                            Math.min(
                                newTop,
                                maxTop
                            )
                        );

                    windowElement.style.left =
                        newLeft + "px";

                    windowElement.style.top =
                        newTop + "px";
                }
            );

            document.addEventListener(
                "mouseup",
                () => {
                    dragging = false;
                }
            );
        });
}

/* =========================================================
   WINDOW FOCUS
   ========================================================= */

function setupWindowFocus() {

    document
        .querySelectorAll(".window")
        .forEach(windowElement => {

            windowElement.addEventListener(
                "mousedown",
                () => {

                    highestZ++;

                    windowElement.style.zIndex =
                        highestZ;
                }
            );
        });
}

/* =========================================================
   CLOSE MENUS
   ========================================================= */

function setupMenuClosing() {

    document.addEventListener(
        "click",
        event => {

            const startMenu =
                document.getElementById(
                    "startMenu"
                );

            const notificationPanel =
                document.getElementById(
                    "notificationPanel"
                );

            if (
                startMenu &&
                startMenu.classList.contains(
                    "open"
                ) &&
                !startMenu.contains(
                    event.target
                ) &&
                !event.target.closest(
                    "#taskbar-left"
                )
            ) {

                startMenu.classList.remove(
                    "open"
                );
            }

            if (
                notificationPanel &&
                notificationPanel.classList.contains(
                    "open"
                ) &&
                !notificationPanel.contains(
                    event.target
                ) &&
                !event.target.closest(
                    "#taskbar-right"
                )
            ) {

                notificationPanel.classList.remove(
                    "open"
                );
            }
        }
    );
}

/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

function setupKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Meta") {
                toggleStartMenu();
            }

            if (event.key === "Escape") {

                document
                    .getElementById(
                        "startMenu"
                    )
                    ?.classList.remove(
                        "open"
                    );

                document
                    .getElementById(
                        "notificationPanel"
                    )
                    ?.classList.remove(
                        "open"
                    );
            }
        }
    );
}

/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateClock();

        setInterval(
            updateClock,
            1000
        );

        applyLunaWallpaper();

        makeWindowsDraggable();

        setupWindowFocus();

        setupMenuClosing();

        setupKeyboardShortcuts();
    }
);
