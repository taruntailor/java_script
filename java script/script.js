document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    // Clear previous messages
    message.innerHTML = '';

    // Password validation rules
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        message.innerHTML += '<p class="error">Password must be at least 8 characters long.</p>';
    }
    if (!hasUpperCase) {
        message.innerHTML += '<p class="error">Password must contain at least one uppercase letter.</p>';
    }
    if (!hasLowerCase) {
        message.innerHTML += '<p class="error">Password must contain at least one lowercase letter.</p>';
    }
    if (!hasNumbers) {
        message.innerHTML += '<p class="error">Password must contain at least one number.</p>';
    }
    if (!hasSpecialChars) {
        message.innerHTML += '<p class="error">Password must contain at least one special character.</p>';
    }

    if (password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) {
        message.innerHTML = '<p class="success">Password is valid!</p>';
    }
});
