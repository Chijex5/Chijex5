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
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if(xhr.status === 200) {
            showMessage("Login successful!", "success");
            window.location.href = '/dashboard'; // Redirect to the dashboard upon successful login
        } else {
            showMessage("Invalid username or password. Please try again.", "error");
        }
    };

    xhr.send(JSON.stringify({username: username, password: password})); // Send the username and password as JSON data
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

    authenticate(username, password)

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
  const name = document.getElementById("fullname").value;
  const address = document.getElementById("address").value;
  const level = document.getElementById("levelSelect").value;
  const department = document.getElementById("department").value;
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
  register()
});

function register() {
    document.getElementById('reg1').addEventListener("click", function() {
        var regno = document.getElementById("regno");
        var password = document.getElementById("password1");
        var email = document.getElementById("email");
        var name = document.getElementById("fullname").value;
        var address = document.getElementById("address").value;
        var level = document.getElementById("levelSelect").value;
        var department = document.getElementById("department").value;
        var phone = document.getElementById("phone");

        var email1 = email.value;
        var phone1 = phone.value;
        var regno1 = regno.value;
        var password1 = password.value;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/add_user');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                showMessage("Registration successful!", "success");
            }

            else {
            showMessage('form data is missing', "error");
            }

        }
        
            
        var data = JSON.stringify({
            regno: regno1,
            password: password1,
            email: email1,
            phone: phone1,
            address: address,
            department: department,
            level: level,
            name: name
        });
        alert(data)

        xhr.send(data)
    
    });
}

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
