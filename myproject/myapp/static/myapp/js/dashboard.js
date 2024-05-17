document.addEventListener("DOMContentLoaded", function() {

    let profile = {
        id : 0,
        name: "John Doe",
        email: "john@example.com",
        phone : "123-456-7890",
        department : "Statistics",
        address: "123 Main St, City, Country",
        level : "100 Level"
    };

    // Create an XHR request
    let xhr = new XMLHttpRequest();

    // Define the endpoint URL
    let url = '/get_items';

    // Open the XHR request
    xhr.open('GET', url, true);

    // Set the request header if needed
    // xhr.setRequestHeader('Content-Type', 'application/json');

    // Define a callback function to handle the response
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Parse the JSON response
            let response = JSON.parse(xhr.responseText);
            
            // Check if 'items' data is present in the response
            if (response.hasOwnProperty('items')) {
                // Update the profile object with the received data
                let items = response.items;
                if (items.length > 0) {
                    // Assuming the first item is being used to update the profile
                    let item = items[0];
                    profile.id = item.id
                    profile.name = item.name;
                    profile.email = item.email;
                    profile.phone = item.phone;
                    profile.department = item.department;
                    profile.address = item.address;
                    profile.level = item.level

                    // Update profile inputs with the updated profile data
                    updateProfileInputs();
                    showHomeSection();
                }
                
                // Display or use the updated profile data as needed
                console.log('Updated profile:', profile);
            } else {
                console.error('Error: No items data in the response');
            }
        } else {
            console.error('Error:', xhr.status, xhr.statusText);
        }
    };

    // Define a callback function to handle errors
    xhr.onerror = function() {
        console.error('Network error occurred');
    };

    // Send the XHR request
    xhr.send();



    // Function to update profile inputs with the updated profile data
    function updateProfileInputs() {
        var userNameElement = document.getElementById("fullName");
        var emailElement = document.getElementById("email");
        var phoneElement = document.getElementById("phone");
        var departmentElement = document.getElementById("department");
        var addressElement = document.getElementById("address");
        var levelelement = document.getElementById("levelSelect")

        userNameElement.value = profile.name;
        emailElement.value = profile.email;
        phoneElement.value = profile.phone;
        addressElement.value = profile.address;
        departmentElement.value = profile.department;
        levelelement.value = profile.level;
    }

    
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

    function updateItem(itemData) {
        // Create an XHR request
        let xhr = new XMLHttpRequest();

        // Define the endpoint URL
        let url = '/update_item';

        // Open the XHR request
        xhr.open('POST', url, true);

        // Set the request header
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Define a callback function to handle the response
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Parse the JSON response
                let response = JSON.parse(xhr.responseText);
                console.log(response.message);
            } else {
                console.error('Error:', xhr.status, xhr.statusText);
            }
        };

        // Define a callback function to handle errors
        xhr.onerror = function() {
            console.error('Network error occurred');
        };

        // Send the XHR request with the updated item data as JSON
        xhr.send(JSON.stringify(itemData));
        alert(JSON.stringify(itemData))
    }
    

    var userNameElement = document.getElementById("fullName");
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phone");
    var departmentElement = document.getElementById("department");
    var addressElement = document.getElementById("address");
    var levelelement = document.getElementById("levelSelect") 

 
    

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

    function saveProfile() {
        let updatedItems = {
            id: profile.id,
            name: userNameElement.value,
            email: emailElement.value,
            phone: phoneElement.value,
            department: departmentElement.value,
            address: addressElement.value,
            level: levelelement.value
        };
        alert(JSON.stringify(updatedItems)); // Convert object to string for alert
        updateItem(updatedItems);
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

    
    

    

    
    const logoutButton = document.getElementById("logout");

    logoutButton.addEventListener("click", function(event) {
        event.preventDefault(); 

        
        localStorage.removeItem("userToken"); 

        
        window.location.href = "/";
    });
});
