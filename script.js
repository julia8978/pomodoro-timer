const buttonStart = document.querySelector("#start");
const timeTimer = document.querySelector("#pomodoro-time");
const buttonReset = document.querySelector("#reset");
const buttonPomodoro = document.querySelector("#pomodoro");
const buttonBreak = document.querySelector("#break");

let time;
let timerId;
let active = true;

const pomodoroTime = {
    time: timeTimer.textContent,
    setTimer
}

const breakTime = {
    time: "05:00",
    setTimer
}

if (buttonPomodoro.classList.contains('active')) {
    pomodoroTime.setTimer();
} else {
    breakTime.setTimer();
}

buttonPomodoro.addEventListener("click", () => {
    if (!buttonPomodoro.classList.contains('active')) {
        buttonPomodoro.classList.toggle("active");
        buttonBreak.classList.toggle("active");
        return pomodoroTime.setTimer();
    }
});

buttonBreak.addEventListener("click", () => {
    if (!buttonBreak.classList.contains('active')) {
        buttonPomodoro.classList.toggle("active");
        buttonBreak.classList.toggle("active");
        return breakTime.setTimer();
    }
});

buttonStart.addEventListener("click", startStopTimer);

buttonReset.addEventListener("click", () => {
    if (buttonPomodoro.classList.contains('active')) {
        return pomodoroTime.setTimer();
    }
    if (buttonBreak.classList.contains('active')) {
        return breakTime.setTimer();
    }
});

function startStopTimer() {
    if (active) {
        buttonStart.textContent = "stop";
        timerId = activeTimer();
        active = false;

    } else {
        buttonStart.textContent = "start";
        clearInterval(timerId);
        active = true;
    }
};

function activeTimer() {
    return setInterval(() => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        --time;
        timeTimer.textContent = `${minutes}:${seconds}`;

        if (time <= 0) {
            if (buttonPomodoro.classList.contains('active')) {
                return pomodoroTime.setTimer();
            }
            if (buttonBreak.classList.contains('active')) {
                return breakTime.setTimer();
            }
        }
    }, 50);
}

function setTimer() {
    clearInterval(timerId);
    timeTimer.textContent = this.time;
    const minutes = parseInt(timeTimer.textContent.substring(0, 2));
    const seconds = parseInt(timeTimer.textContent.substring(3, 5));
    time = (minutes * 60) + seconds;
    buttonStart.textContent = "start";
    active = true;
}