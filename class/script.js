document.getElementById('loginBtn').addEventListener('click', function() {
    var enteredUsername = document.getElementById('username').value;
    var enteredPassword = document.getElementById('password').value;
    var message = document.getElementById('message');
    var passwordField = document.getElementById('password');

    if (enteredUsername === 'embroconnect3@gmail.com' && enteredPassword === 'password') {
        message.innerText = 'Login successful!';
        window.location.href = 'http://127.0.0.1:5000'; 
    } else {
        message.innerText = 'Incorrect username or password.';
        passwordField.value = ''; // Reset password field
    }

    // Hide the message after 3 seconds
    setTimeout(function() {
        message.innerText = ''; // Empty the message text
    }, 3000); // 3000 milliseconds = 3 seconds
});

const gridContainer = document.getElementById('grid');

