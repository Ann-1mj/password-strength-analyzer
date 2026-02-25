const input = document.getElementById("passwordInput");

input.addEventListener("input", analyzePassword);

function analyzePassword() {
    const password = input.value;

    let charsetSize = 0;

    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[^A-Za-z0-9]/.test(password)) charsetSize += 32;

    let entropy = 0;

    if (password.length > 0 && charsetSize > 0) {
        entropy = password.length * Math.log2(charsetSize);
    }

    let strength = "";

    if (entropy < 28) strength = "Very Weak ❌";
    else if (entropy < 36) strength = "Weak ⚠️";
    else if (entropy < 60) strength = "Moderate 🟡";
    else if (entropy < 80) strength = "Strong 🟢";
    else strength = "Very Strong 🔐";

    const guessesPerSecond = 1e9;
    const totalGuesses = Math.pow(2, entropy);
    const seconds = totalGuesses / guessesPerSecond;

    document.getElementById("strengthText").innerText =
        "Strength: " + strength;

    document.getElementById("entropyText").innerText =
        "Estimated Entropy: " + entropy.toFixed(2) + " bits";

    document.getElementById("crackTimeText").innerText =
        "Estimated brute-force crack time (at 1B guesses/sec): " +
        formatTime(seconds);

    let percentage = Math.min((entropy / 100) * 100, 100);
let fill = document.getElementById("strengthFill");
fill.style.width = percentage + "%";

if (entropy < 36) fill.style.backgroundColor = "#ef4444";
else if (entropy < 60) fill.style.backgroundColor = "#facc15";
else fill.style.backgroundColor = "#22c55e";
}

function formatTime(seconds) {
    if (seconds < 60) return seconds.toFixed(2) + " seconds";
    if (seconds < 3600) return (seconds / 60).toFixed(2) + " minutes";
    if (seconds < 86400) return (seconds / 3600).toFixed(2) + " hours";
    if (seconds < 31536000) return (seconds / 86400).toFixed(2) + " days";
    return (seconds / 31536000).toFixed(2) + " years";
}