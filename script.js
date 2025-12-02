const spinnerDigits = document.getElementById("spinnerDigits");
const resultDigits = document.getElementById("resultDigits");
const spinBtn = document.getElementById("spinBtn");

function createDigitBoxes(container, count) {
    container.innerHTML = "";
    for (let i = 0; i < count; i++) {
        const box = document.createElement("div");
        box.className = "digit-box";
        box.textContent = "-";
        container.appendChild(box);
    }
}

createDigitBoxes(spinnerDigits, 6);
createDigitBoxes(resultDigits, 6);

function spin() {
    const digits = spinnerDigits.children;
    const result = [];

    spinBtn.disabled = true;
    spinBtn.textContent = "Spinning...";

    for (let i = 0; i < digits.length; i++) {
        let box = digits[i];
        let count = 0;

        const interval = setInterval(() => {
            box.textContent = Math.floor(Math.random() * 10);
            count++;
            if (count > 20 + i * 10) {
                clearInterval(interval);
                const finalDigit = Math.floor(Math.random() * 10);
                box.textContent = finalDigit;
                result[i] = finalDigit;

                if (i === digits.length - 1) {
                    showResult(result);
                }
            }
        }, 80);
    }
}

function showResult(res) {
    for (let i = 0; i < 6; i++) {
        resultDigits.children[i].textContent = res[i];
    }
    spinBtn.disabled = false;
    spinBtn.textContent = "🎰 Spin Now";
}

spinBtn.addEventListener("click", spin);
