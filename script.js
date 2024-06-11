let timers = [];
let currentTimer = 0;
let interval;

function generateTimers() {
    const container = document.getElementById('timers-container');
    const timerCount = document.getElementById('timer-count').value;

    container.innerHTML = '';
    timers = [];

    for (let i = 0; i < timerCount; i++) {
        const timerDiv = document.createElement('div');
        timerDiv.className = 'timer';
        
        const label = document.createElement('label');
        label.innerText = `Timer ${i + 1} Text: `;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `timer-text-${i}`;
        
        const timeLabel = document.createElement('label');
        timeLabel.innerText = ` Time (seconds): `;
        
        const timeInput = document.createElement('input');
        timeInput.type = 'number';
        timeInput.id = `timer-duration-${i}`;
        timeInput.min = '1';
        
        timerDiv.appendChild(label);
        timerDiv.appendChild(input);
        timerDiv.appendChild(timeLabel);
        timerDiv.appendChild(timeInput);
        
        container.appendChild(timerDiv);
        
        timers.push({ text: '', duration: 0 });
    }
}

function startTimers() {
    for (let i = 0; i < timers.length; i++) {
        const textInput = document.getElementById(`timer-text-${i}`);
        const durationInput = document.getElementById(`timer-duration-${i}`);
        timers[i].text = textInput.value;
        timers[i].duration = parseInt(durationInput.value);
    }
    currentTimer = 0;
    runTimer();
}

function runTimer() {
    if (currentTimer >= timers.length) {
        document.body.style.backgroundColor = 'white';
        document.getElementById('container').innerHTML += '<h2>All timers completed!</h2>';
        return;
    }

    const timer = timers[currentTimer];
    const timerText = timer.text;
    const timerDuration = timer.duration;
    let elapsedTime = 0;

    clearInterval(interval);
    interval = setInterval(() => {
        elapsedTime++;
        if (elapsedTime > timerDuration) {
            clearInterval(interval);
            currentTimer++;
            runTimer();
        } else {
            updateBackgroundColor(elapsedTime, timerDuration);
            updateDisplay(timerText, timerDuration - elapsedTime);
        }
    }, 1000);

    updateDisplay(timerText, timerDuration);
}

function updateBackgroundColor(elapsedTime, duration) {
    const ratio = elapsedTime / duration;
    if (ratio < 0.5) {
        document.body.className = 'green';
    } else if (ratio < 0.75) {
        document.body.className = 'yellow';
    } else {
        document.body.className = 'red';
    }
}

function updateDisplay(text, remainingTime) {
    document.getElementById('container').innerHTML = `
        <h1>${text}</h1>
        <h2>Time Remaining: ${remainingTime} seconds</h2>
    `;
}
