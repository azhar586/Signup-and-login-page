document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const passwordField = document.getElementById("signupPassword");
    const passwordStrength = document.getElementById("passwordStrength");
    const popup = document.getElementById("popup");
    const togglePasswords = document.querySelectorAll(".toggle-password");

    function showPopup(message, color) {
        popup.textContent = message;
        popup.style.background = color;
        popup.style.display = "block";
        setTimeout(() => popup.style.display = "none", 3000);
    }

    if (passwordField) {
        passwordField.addEventListener("input", () => {
            const strength = checkPasswordStrength(passwordField.value);
            passwordStrength.textContent = "Strength: " + strength;
            passwordStrength.style.color = strength === "Weak" ? "red" : strength === "Medium" ? "orange" : "green";
        });
    }

    function checkPasswordStrength(password) {
        if (password.length < 6) return "Weak";
        if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[@$!%*?&]/)) return "Strong";
        return "Medium";
    }

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const fullName = document.getElementById("fullName").value;
            const email = document.getElementById("signupEmail").value;
            const password = passwordField.value;

            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);

            showPopup("Signup successful! You can now login.", "#4CAF50");
            setTimeout(() => window.location.href = "index.html", 2000);
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            const storedEmail = localStorage.getItem("userEmail");
            const storedPassword = localStorage.getItem("userPassword");

            if (email === storedEmail && password === storedPassword) {
                showPopup("Login successful! Redirecting...", "#4CAF50");
                setTimeout(() => window.location.href = "dashboard.html", 2000);
            } else {
                showPopup("Invalid credentials. Please try again.", "red");
            }
        });
    }
});

