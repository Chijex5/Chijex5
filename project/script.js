document.addEventListener("DOMContentLoaded", function() {
    const registerLink = document.querySelector(".register-link1");
    const loginSection = document.querySelector("#login1");
    const text = document.querySelector(".homepage");
    const text2 = document.querySelector(".homepage2");

    registerLink.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent default anchor behavior

      // Toggle the display of the login section
      if (loginSection.style.display === "none") {
        loginSection.style.display = "flex";
        text.style.display = "none";
        text2.style.display = "none";
      } else {
        loginSection.style.display = "none";
      }
    });
  });

  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("toggle-password");

  togglePassword.addEventListener("click", function() {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.classList.toggle("bx-show");
    togglePassword.classList.toggle("bx-hide");
  });
  const passwordInput1 = document.getElementById("password1");
  const togglePassword1 = document.getElementById("toggle-password1");

  togglePassword1.addEventListener("click", function() {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput1.setAttribute("type", type);
    togglePassword1.classList.toggle("bx-show");
    togglePassword1.classList.toggle("bx-hide");
  });
  function showMessage(message, type) {
    const messageBox = document.createElement("div");
    messageBox.textContent = message;
    messageBox.className = "message-box";
    if (type === "error") {
      messageBox.classList.add("error");
    }
    const container = document.getElementById("message-container");
    container.appendChild(messageBox);
    // Show the message box immediately
    messageBox.style.display = "block";
    setTimeout(function() {
      // Hide the message box after 3 seconds
      messageBox.style.display = "none";
    }, 3000);
  }
  // Function to authenticate the user
  function authenticate(username, password) {
    // You can replace this with your actual authentication logic
    // For demonstration purposes, let's use a hardcoded username and password
    const validUsername = "user";
    const validPassword = "password";
    
    // Check if the provided username and password match the valid credentials
    if (username === validUsername && password === validPassword) {
      return true; // Authentication successful
      
    } else {
      return false; // Authentication failed
    }
  }

  // Function to handle form submission
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the values of the username and password fields
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Authenticate the user
    if (authenticate(username, password)) {
      showMessage("Authentication successful!", "success");
      window.location.href = "dashboard.html";  // Show success message
      
    } else {
      showMessage("Authentication failed. Please check your credentials.", "error"); // Show error message
    }
  });
  document.addEventListener("DOMContentLoaded", function() {
    const registerLink = document.querySelector(".register-link");
    const registerSection = document.querySelector("#register");
    const loginSection = document.querySelector("#login1");
    const text = document.querySelector(".homepage");
    const text2 = document.querySelector(".homepage2");


    registerLink.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    // Show the register section and hide the login section
    registerSection.style.display = "flex";
    loginSection.style.display = "none";
    text.style.display = "none";
    text2.style.display = "none";
    // Show the first step of the registration form
    
    });

    
    const steps = document.querySelectorAll(".step");
    let currentStep = 0;

    function showSteps(n) {
    steps.forEach((step, index) => {
        if (index === n) {
        step.style.display = "block";
        } else {
        step.style.display = "none";
        }
    });
    }

    showSteps(currentStep);

    const nextButtons = document.querySelectorAll(".next-step");
const prevButtons = document.querySelectorAll(".prev-step");
const regno = document.getElementById("regno");
const password = document.getElementById("password1");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

nextButtons.forEach(button => {
    button.addEventListener("click", () => {
        event.preventDefault();
    if (currentStep === 0) {
        const regno1 = regno.value;
        const password1 = password.value;
        if (regno1.length < 11) {
        showMessage("Registration number must be at least 11 characters.", "error");
        return;
        }

        if (password1.length < 8) {
        showMessage("Password must be at least 8 characters.", "error");
        return;
        }
    } else if (currentStep === 1) {
        const email1 = email.value;
        const phone1 = phone.value;
        if (!isValidEmail(email1)) {
        showMessage("Please enter a valid email address.", "error");
        return;
        }

        if (phone1.length !== 11) {
        showMessage("Phone number must be 11 characters.", "error");
        return;
        }
    }
    else{
        showMessage("Registration Succesful", "success")
    }
    currentStep++;
    showSteps(currentStep);
    });
});

function isValidEmail(email1) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email1);
}

prevButtons.forEach(button => {
    button.addEventListener("click", () => {
    currentStep--;
    showSteps(currentStep);
    });
});

});

  document.addEventListener("DOMContentLoaded", function() {
    const registerLink = document.querySelector(".register-link2");
    const loginSection = document.querySelector("#forgot");
    const text = document.querySelector(".login");
    registerLink.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default anchor behavior
  
        // Toggle the display of the login section
        if (loginSection.style.display === "none") {
          loginSection.style.display = "flex";
          text.style.display = "none";
        } else {
            loginSection.style.display = "none";
          }
        });
      });

      document.getElementById("forgot-form").addEventListener("submit", function(event) {
        const regno = document.getElementById("regno3")
        event.preventDefault();
        if (regno.value === "2022/246814") {
            showMessage("Reset link sent to embroconnect3@gmail.com", "success")
        }
        else{
            showMessage("Registration number not found ", "error")
        }
    });

    document.addEventListener("DOMContentLoaded", function() {
        // Get the elements to animate
        const satisfiedCount = document.getElementById("satisfiedCount");
        const trustedCount = document.getElementById("trustedCount");
        const activeHoursCount = document.getElementById("activeHoursCount");
      
        // Define the target numbers
        const targetSatisfied = 50;
        const targetTrusted = 56;
        const targetActiveHours = 24;
      
        // Call the counting function for each number
        animateCounting(satisfiedCount, targetSatisfied);
        animateCounting(trustedCount, targetTrusted);
        animateCounting(activeHoursCount, targetActiveHours);
      });
      
      // Function to animate counting effect
      function animateCounting(element, target) {
        let count = 0;
        const animationDuration = 2000; // Adjust as needed
        const interval = 20; // Interval between each count
      
        const increment = target / (animationDuration / interval); // Calculate increment based on duration
      
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            count = target;
            clearInterval(timer); // Stop the interval when target is reached
          }
          element.textContent = Math.floor(count); // Update the element with the current count
        }, interval);
      }

    