document.addEventListener("DOMContentLoaded", function() {
  const registerLink = document.querySelector(".register-link1");
  const loginSection = document.querySelector("#login1");
  const text2 = document.querySelector(".footer-bar");
  const text3 = document.querySelector(".container");

  registerLink.addEventListener("click", function(event) {
      event.preventDefault();
      if (loginSection.style.display === "none") {
          loginSection.style.display = "flex";
          text2.style.display = "none";
          text3.style.display = "none";
      } else {
          loginSection.style.display = "none";
      }
  });
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
  messageBox.style.display = "block";
  setTimeout(function() {
      messageBox.style.display = "none";
  }, 3000);
}

function authenticate(username, password) {
  const validUsername = "user";
  const validPassword = "password";

  if (username === validUsername && password === validPassword) {
      return true;
  } else {
      return false;
  }
}

const passwordInput = document.getElementById('password')
const showPasswordCheckbox = document.getElementById('showPasswordCheckbox')

showPasswordCheckbox.addEventListener('change', function() {
  if (this.checked) {
      passwordInput.type = 'text'
  } else{
      passwordInput.type = 'password'
  }
})

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (authenticate(username, password)) {
      showMessage("Authentication successful!", "success");
      window.location.href = "dashboard.html";
  } else {
      showMessage("Authentication failed. Please check your credentials.", "error");
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const registerLink = document.querySelector(".register-link");
  const registerSection = document.querySelector("#register");
  const loginSection = document.querySelector("#login1");
  const text = document.querySelector(".container");
  const text2 = document.querySelector(".footer-bar");

  registerLink.addEventListener("click", function(event) {
      event.preventDefault();
      registerSection.style.display = "flex";
      loginSection.style.display = "none";
      text.style.display = "none";
      text2.style.display = "none";
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
      event.preventDefault();
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
  const satisfiedCount = document.getElementById("satisfiedCount");
  const trustedCount = document.getElementById("trustedCount");
  const activeHoursCount = document.getElementById("activeHoursCount");

  const targetSatisfied = 50;
  const targetTrusted = 58;
  const targetActiveHours = 24;

  animateCounting(satisfiedCount, targetSatisfied);
  animateCounting(trustedCount, targetTrusted);
  animateCounting(activeHoursCount, targetActiveHours);
});

function animateCounting(element, target) {
  let count = 0;
  const animationDuration = 2000;
  const interval = 20;

  const increment = target / (animationDuration / interval);

  const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
          count = target;
          clearInterval(timer);
      }
      element.textContent = Math.floor(count);
  }, interval);
}

const textContainer = document.querySelector(".text-container");
const textArray = [
  "Prepare for your academic adventure!",
  "Access your learning resources by signing in.",
  "Start exploring and expanding your knowledge!"
];

let index = 0;

function typeText(text, container) {
  let textIndex = 0;
  const typingInterval = setInterval(function() {
      container.textContent += text[textIndex];
      textIndex++;
      if (text[textIndex - 1] === "\n") {
          container.innerHTML += "<br><br>";
      }
      if (textIndex === text.length) {
          clearInterval(typingInterval);
          setTimeout(function() {
              container.textContent = "";
              if (index === textArray.length - 1) {
                  index = 0;
              } else {
                  index++;
              }
              typeText(textArray[index], container);
          }, 3000);
      }
  }, 100);
}
typeText(textArray[index], textContainer);
