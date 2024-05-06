document.addEventListener("DOMContentLoaded", function() {
    // Profile section logic
    
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

    const editProfileBtn = document.getElementById("editProfile");
    const saveProfileBtn = document.getElementById("saveProfile");
    const profileInputs = document.querySelectorAll("#profileForm input, #profileForm textarea");
  
    function enableProfileEditing() {
        profileInputs.forEach(input => {
            input.removeAttribute("disabled");
        });
        saveProfileBtn.style.display = "block";
        editProfileBtn.style.display = "none";
    }
  
    function saveProfile() {
        profileInputs.forEach(input => {
            input.setAttribute("disabled", "true");
        });
        saveProfileBtn.style.display = "none";
        editProfileBtn.style.display = "block";
  
        showMessage("Profile information saved successfully!", "success");
    }
  
    editProfileBtn.addEventListener("click", enableProfileEditing);
    saveProfileBtn.addEventListener("click", saveProfile);

    // Get the user's name from the profile section
    const userNameElement = document.getElementById("fullName");
    const userName = userNameElement.value; // Assuming the user's name is stored in an input field with the id "fullName"
      
    // Update the welcome message with the user's name
    const welcomeMessageElement = document.getElementById("welcomeMessage");
    welcomeMessageElement.textContent = `Welcome back, ${userName}! Ready to explore?`;

    // Navigation logic
    const homeButton = document.getElementById("homeButton");
    const profileButton = document.getElementById("profileButton");
    const recentOrdersButton = document.getElementById("recentOrdersButton");
    const findBooksButton = document.getElementById("findBooksButton");
  
    const homeSection = document.getElementById("homeSection");
    const profileSection = document.getElementById("profileSection");
    const recentOrdersSection = document.getElementById("recentOrdersSection");
    const findBooksSection = document.getElementById("findBooksSection");
  
    function showHomeSection() {
        homeSection.style.display = "block";
        profileSection.style.display = "none";
        recentOrdersSection.style.display = "none";
        findBooksSection.style.display = "none";
    }
  
    function showProfileSection() {
        homeSection.style.display = "none";
        profileSection.style.display = "block";
        recentOrdersSection.style.display = "none";
        findBooksSection.style.display = "none";
    }
  
    function showRecentOrdersSection() {
        homeSection.style.display = "none";
        profileSection.style.display = "none";
        recentOrdersSection.style.display = "block";
        findBooksSection.style.display = "none";
    }
  
    function showFindBooksSection() {
        homeSection.style.display = "none";
        profileSection.style.display = "none";
        recentOrdersSection.style.display = "none";
        findBooksSection.style.display = "block";
    }
  
    homeButton.addEventListener("click", showHomeSection);
    profileButton.addEventListener("click", showProfileSection);
    recentOrdersButton.addEventListener("click", showRecentOrdersSection);
    findBooksButton.addEventListener("click", showFindBooksSection);
  
    // Initially show the home section
    showHomeSection();
  
    // Find Books form logic
    const findBooksForm = document.getElementById("findBooksForm");
    const searchQueryInput = document.getElementById("searchQuery");
    const searchResultsDiv = document.getElementById("searchResults");
  
    findBooksForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const searchQuery = searchQueryInput.value.trim();
        // Perform book search based on searchQuery
        // Dummy example: Display search results
        searchResultsDiv.innerHTML = `<p>Search results for: <strong>${searchQuery}</strong></p>
                                      <ul>
                                        <li>Book 1</li>
                                        <li>Book 2</li>
                                        <li>Book 3</li>
                                      </ul>`;
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logout");
    
    logoutButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        
        // Perform logout action, such as clearing session or local storage
        // For example:
        localStorage.removeItem("userToken"); // Assuming you're using localStorage for authentication
        
        // Redirect the user to the login page
        window.location.href = "bookshop.html";
    });
});