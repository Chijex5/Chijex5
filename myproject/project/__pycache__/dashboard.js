let profile = {
    name: "john Doe",
    email: "john@example.com",
    phone : "123-456-7890",
    department : "statistics",
    address: "123 Main St, City, Country"
}

document.addEventListener("DOMContentLoaded", function() {
    // Function to show or hide the cart button based on section
    
    // Event listener for section changes

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

    function updateinfo(){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/get-current-profile');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                profile = data;
                showHomeSection();
            } else {
                console.error('Request failed. Status:', xhr.status);
            }
        };
        
        xhr.onerror = function() {
            console.error('Request failed');
        };
        
        xhr.send();
    
    }
    updateinfo()

    const editProfileBtn = document.getElementById("editProfile");
    const saveProfileBtn = document.getElementById("saveProfile");
    const profileInputs = document.querySelectorAll("#profileForm input, #profileForm textarea, #profileForm select");

    function enableProfileEditing() {
        profileInputs.forEach(input => {
            input.removeAttribute("disabled");
        });
        saveProfileBtn.style.display = "block";
        editProfileBtn.style.display = "none";
    }

    function updateProfile() {
        profileInputs.forEach(input => {
            const userNameElement = document.getElementById("fullName");
            const emailElement = document.getElementById("email");
            const phoneElement = document.getElementById("phone");
            const departmentElement = document.getElementById("department");
            const addressElement = document.getElementById("address");
    
            userNameElement.value = profile.name;
            emailElement.value = profile.email;
            phoneElement.value = profile.phone;
            addressElement.value = profile.address;
            departmentElement.value = profile.department;
        });
    }

    function saveProfile() {
        const userNameElement = document.getElementById("fullName");
        const emailElement = document.getElementById("email");
        const phoneElement = document.getElementById("phone");
        const departmentElement = document.getElementById("department");
        const addressElement = document.getElementById("address");
    
        const userName = userNameElement.value;
        const userEmail = emailElement.value;
        const userPhone = phoneElement.value;
        const userDepartment = departmentElement.value;
        const userAddress = addressElement.value;
    
        const formData = {
            name: userName,
            email: userEmail,
            phone: userPhone,
            department: userDepartment,
            address: userAddress,
            level: userLevel // Add the level field here
        };
    
        fetch('/update_profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Profile updated successfully') {
                profileInputs.forEach(input => {
                    input.setAttribute("disabled", "true");
                });
                saveProfileBtn.style.display = "none";
                editProfileBtn.style.display = "block";
    
                showMessage(data.message, "success");
            } else {
                showMessage(data.message, "error");
            }
        })
        .catch(error => {
            showMessage('An error occurred while updating the profile', 'error');
            console.error('Error:', error);
        });
    }

    editProfileBtn.addEventListener("click", enableProfileEditing);
    saveProfileBtn.addEventListener("click", saveProfile);

    // Get the user's name from the profile section
     // Assuming the user's name is stored in an input field with the id "fullName"
      
    // Update the welcome message with the user's name
    

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
        const welcomeMessageElement = document.getElementById("welcomeMessage");
        welcomeMessageElement.textContent = `Welcome back, ${profile.name}! Ready to explore?`;
        homeSection.style.display = "block";
        profileSection.style.display = "none";
        recentOrdersSection.style.display = "none";
        findBooksSection.style.display = "none";
        setActiveLink(homeButton); // Set active link
    }

    function showProfileSection() {
        updateProfile();
        homeSection.style.display = "none";
        profileSection.style.display = "block";
        recentOrdersSection.style.display = "none";
        findBooksSection.style.display = "none";
        setActiveLink(profileButton); // Set active link
    }

    function showRecentOrdersSection() {
        homeSection.style.display = "none";
        profileSection.style.display = "none";
        recentOrdersSection.style.display = "block";
        findBooksSection.style.display = "none";
        setActiveLink(recentOrdersButton); // Set active link
    }

    function showFindBooksSection() {
        displayAllBooks();
        displayRecommendedBooks();
        homeSection.style.display = "none";
        profileSection.style.display = "none";
        recentOrdersSection.style.display = "none";
        findBooksSection.style.display = "block";
        setActiveLink(findBooksButton); // Set active link
    }

    function setActiveLink(link) {
        const navigationLinks = document.querySelectorAll(".navigation-menu ul li a");
        navigationLinks.forEach(link => {
            link.classList.remove("active");
        });
        link.classList.add("active");
    }

    homeButton.addEventListener("click", showHomeSection);
    profileButton.addEventListener("click", showProfileSection);
    recentOrdersButton.addEventListener("click", showRecentOrdersSection);
    findBooksButton.addEventListener("click", showFindBooksSection);

    // Initially show the home section
    showHomeSection();

    // Find Books form logic

    // Logout button logic
    const logoutButton = document.getElementById("logout");

    logoutButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default anchor behavior

        // Perform logout action, such as clearing session or local storage
        // For example:
        localStorage.removeItem("userToken"); // Assuming you're using localStorage for authentication

        // Redirect the user to the login page
        window.location.href = "/";
    });
});
