// Function to generate a random RGB value
function generateRandomRGB() {
    return "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
}

// Set the current score and lives
let score = 0;
let lives = 3;
let correctColor; // Define correctColor variable outside the function

// Function to end the game
function endGame() {
    if (score < 0) {
        score = 0; // Prevent score from going into negative numbers
    }
    document.getElementById("result").textContent = "Game over! Your Final score: " + score;
    document.getElementById("options").innerHTML = "";
    document.getElementById("restart").style.display = "block";
}

// Generate and display color options
function generateColorOptions() {
    // Clear previous color options
    document.getElementById("options").innerHTML = "";

    // Select random color
    correctColor = generateRandomRGB(); // Assign correctColor within the function
    document.getElementById("rgb").textContent = "RGB Color Guessing Game: " + correctColor; // Update main heading with RGB value

    // Generate color options
    const options = [];
    options.push(correctColor);
    for (let i = 1; i < 3; i++) {
        let randomColor = generateRandomRGB();
        while (options.includes(randomColor)) {
            randomColor = generateRandomRGB();
        }
        options.push(randomColor);
    }

    // Shuffle color options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    // Display color options
    options.forEach(function(color) {
        let option = document.createElement("div");
        option.classList.add("option");
        option.style.backgroundColor = color;
        option.addEventListener("click", function() {
            if (this.style.backgroundColor === correctColor) {
                score++;
                document.getElementById("score-value").textContent = score;
                document.getElementById("result").textContent = "Correct!";
                this.classList.add("correct"); // Add correct class to the selected option
                setTimeout(() => {
                    generateColorOptions(); // Generate new color options after correct guess
                }, 1000);
            } else {
                lives--;
                if (lives === 0) {
                    endGame();
                } else {
                    document.getElementById("result").textContent = "Incorrect! Lives left: " + lives;
                    this.classList.add("incorrect"); // Add incorrect class to the selected option
                }
            }
        });
        document.getElementById("options").appendChild(option);
    });
}

// Restart button
document.getElementById("restart").addEventListener("click", function() {
    score = 0;
    lives = 3;
    document.getElementById("score-value").textContent = score;
    document.getElementById("result").textContent = "";
    generateColorOptions();
});

// Generate initial color options
generateColorOptions();
