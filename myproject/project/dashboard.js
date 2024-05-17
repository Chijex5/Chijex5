const profile = {
    name: "john Doe",
    email: "john@example.com",
    phone : "123-456-7890",
    department : "statistics",
    address: "123 Main St, City, Country"
}

document.addEventListener("DOMContentLoaded", function() {
    
    
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
            const userNameElement = document.getElementById("fullName");
            const emailElement = document.getElementById("email");
            const phoneElement = document.getElementById("phone");
            const departmentElement = document.getElementById("department");
            const addressElement = document.getElementById("address");

            const userName = userNameElement.value;
            const useremail = emailElement.value;
            const userphone = phoneElement.value;
            const useraddress = addressElement.value;
            const userdepartment = departmentElement.value;

            profile.name = userName;
            profile.email = useremail;
            profile.phone = userphone
            profile.address = useraddress
            profile.department = userdepartment;
            input.setAttribute("disabled", "true");
        });
        saveProfileBtn.style.display = "none";
        editProfileBtn.style.display = "block";

        showMessage("Profile information saved successfully!", "success");
    }

    editProfileBtn.addEventListener("click", enableProfileEditing);
    saveProfileBtn.addEventListener("click", saveProfile);


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
        setActiveLink(homeButton); 
    }

    function showProfileSection() {
        homeSection.style.display = "none";
        profileSection.style.display = "block";
        recentOrdersSection.style.display = "none";
        findBooksSection.style.display = "none";
        setActiveLink(profileButton); 
    }

    function showRecentOrdersSection() {
        homeSection.style.display = "none";
        profileSection.style.display = "none";
        recentOrdersSection.style.display = "block";
        findBooksSection.style.display = "none";
        setActiveLink(recentOrdersButton); 
    }

    function showFindBooksSection() {
        displayAllBooks();
        displayRecommendedBooks();
        homeSection.style.display = "none";
        profileSection.style.display = "none";
        recentOrdersSection.style.display = "none";
        findBooksSection.style.display = "block";
        setActiveLink(findBooksButton); 
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

    
    showHomeSection();

    

    
    const logoutButton = document.getElementById("logout");

    logoutButton.addEventListener("click", function(event) {
        event.preventDefault(); 

        
        localStorage.removeItem("userToken"); 

        
        window.location.href = "bookshop.html";
    });
});
