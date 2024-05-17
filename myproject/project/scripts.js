const books = [
    { code: 'STA112', title: 'Probability II', department: 'Statistics', price: 2000, available: true, level: "100" },
    { code: 'STA111', title: 'Introduction to Probability', department: 'Statistics', price: 2500, available: true, level: "100" },
    { code: 'STA132', title: 'Inference II', department: 'Statistics', price: 3000, available: false, level: "100" },
    { code: 'STA131', title: 'Introduction to Inference', department: 'Statistics', price: 2200, available: true, level: "100" },
    { code: 'STA172', title: 'Statistical Computing', department: 'Statistics', price: 2800, available: true, level: "100" },
    { code: 'MTH122', title: 'Circle Geometry', department: 'Mathematics', price: 1800, available: true, level: "100" },
    { code: 'MTH111', title: 'Integrated Mathematics', department: 'Mathematics', price: 1500, available: false, level: "100" },
    { code: 'MTH131', title: 'Integration and Depreciation', department: 'Mathematics', price: 2000, available: true, level: "100" },
    { code: 'BIO151', title: 'Introduction to Biology', department: 'Micro Biology', price: 3000, available: true, level: "100" },
    { code: 'CHM122', title: 'Organic Chemistry II', department: 'Pure and Industrial Chemistry', price: 3500, available: true, level: "100" },
    { code: 'CHM132', title: 'Inorganic Chemistry II', department: 'Pure and Industrial Chemistry', price: 4000, available: false, level: "100" },
    { code: 'CHM171', title: 'Introduction to Organic Chemistry', department: 'Pure and Industrial Chemistry', price: 3200, available: true, level: "100" },
    { code: 'CHM101', title: 'Introduction to Inorganic Chemistry', department: 'Pure and Industrial Chemistry', price: 2800, available: true, level: "100" },
    { code: 'ENG101', title: 'Introduction to Engineering', department: 'Engineering', price: 2500, available: true, level: "100" },
    { code: 'GSP102', title: 'Lexis and Structure', department: 'General Studies', price: 1500, available: true, level: "100" },
    { code: 'GSP111', title: 'Use of Library', department: 'General Studies', price: 1000, available: false, level: "100" },
    { code: 'GSP101', title: 'Use of English', department: 'General Studies', price: 1200, available: true, level: "100" },
    { code: 'ENG102', title: 'Introduction to Engineering II', department: 'Engineering', price: 3000, available: true, level: "100" },
    { code: 'GLG142', title: 'Earth History', department: 'Geology', price: 2000, available: true, level: "100" },
    { code: 'COS101', title: 'Introduction to Computer Sciences', department: 'Computer Sciences', price: 2500, available: true, level: "100" },
    { code: 'PHY121', title: 'Physics for Engineering', department: 'Engineering', price: 2500, available: true, level: "100" },
];

const cart = {};

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

function displayCartContents() {
    const cartContentsDiv = document.getElementById('cart-contents');
    cartContentsDiv.innerHTML = '';

    let totalPrice = 0;

    const nonZeroCart = {};

    for (const [bookCode, amount] of Object.entries(cart)) {
        if (amount > 0) {
            nonZeroCart[bookCode] = amount;
        }
    }

    if (Object.keys(nonZeroCart).length === 0) {
        cartContentsDiv.innerHTML = "<p>Your Cart is Empty</p>";
    } else {
        for (const [bookCode, amount] of Object.entries(nonZeroCart)) {
            const book = books.find(book => book.code === bookCode);
            if (book) {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                const itemPrice = book.price * amount;
                totalPrice += itemPrice;
                cartItem.innerHTML = `
                    <li>${book.code}, Price: ₦${book.price}, ${book.available ? 'Available' : 'Not Available'}, Quantity: ${amount}
                    <p><span> &nbsp; &nbsp; &nbsp;Item Total: ₦${itemPrice}</span></p></li>
                `;
                cartContentsDiv.appendChild(cartItem);
            }
        }

        const totalPriceElement = document.createElement('p');
        totalPriceElement.textContent = `Total Price: ₦${totalPrice}`;
        cartContentsDiv.appendChild(totalPriceElement);
    }

    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'block';

    const closeButton = document.querySelector('.close');

    closeButton.addEventListener('click', () => {
        const cartModal = document.getElementById('cart-modal');
        cartModal.style.display = 'none';
    });
}

function updateCartButton() {
    let totalItems = 0;
    for (const amount of Object.values(cart)) {
        totalItems += amount;
    }
    cartButton.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart ${totalItems}`;
}

const cartButton = document.getElementById('cart-button');
updateCartButton();

cartButton.addEventListener('click', () => {
    displayCartContents();
});

function attachAddToCartEventListeners(booksContainer) {
    const addToCartButtons = booksContainer.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        const bookCode = button.dataset.code;
        const quantityContainer = button.parentNode.querySelector('.quantity-container');
        const decrementBtn = quantityContainer.querySelector('.decrement-btn');
        const incrementBtn = quantityContainer.querySelector('.increment-btn');
        const quantityDisplay = quantityContainer.querySelector('.quantity-display');

        quantityContainer.style.display = 'none';

        if (!cart[bookCode]) {
            cart[bookCode] = 0;
            quantityDisplay.textContent = cart[bookCode];
        } else {
            quantityDisplay.textContent = cart[bookCode];
        }

        button.addEventListener('click', () => {
            quantityContainer.style.display = quantityContainer.style.display === 'none' ? 'block' : 'none';
        });

        decrementBtn.addEventListener('click', () => {
            if (cart[bookCode] > 0) {
                cart[bookCode]--;
                quantityDisplay.textContent = cart[bookCode];
                updateCartButton();
            }
        });

        incrementBtn.addEventListener('click', () => {
            cart[bookCode]++;
            quantityDisplay.textContent = cart[bookCode];
            updateCartButton();
        });
    });
}

function displayAllBooks() {
    const booksContainer = document.querySelector('.books-container');
    booksContainer.innerHTML = '';

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        const availabilityColor = book.available ? 'green' : 'red';
        bookDiv.innerHTML = `
            <h4>${book.code} - ${book.title}</h4>
            Price: ₦${book.price}
            <p style="color: ${availabilityColor};">${book.available ? 'Available' : 'Not Available'}</p>
            <div class="quantity-container">
                <button class="decrement-btn">-</button>
                <span class="quantity-display">0</span>
                <button class="increment-btn">+</button>
            </div>
            <button class="add-to-cart-btn" data-code="${book.code}">Add to Cart</button>
        `;
        booksContainer.appendChild(bookDiv);
    });
    attachAddToCartEventListeners(booksContainer);
}

function displayRecommendedBooks() {
    const departmentElement = document.getElementById("department");
    const department = departmentElement.value;
    const recommendedBooks = books.filter(book => book.department == department || book.department === "General Studies");
    const recommendedBooksContainer = document.querySelector('.recommended-books-container');
    recommendedBooksContainer.innerHTML = '';

    recommendedBooks.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        
        const availabilityColor = book.available ? 'green' : 'red';
        bookDiv.innerHTML = `
            <h4>${book.code} - ${book.title}</h4>
            Price: ₦${book.price}
            <p style="color: ${availabilityColor};">${book.available ? 'Available' : 'Not Available'}</p>
            <div class="quantity-container">
                <button class="decrement-btn">-</button>
                <span class="quantity-display">0</span>
                <button class="increment-btn">+</button>
            </div>
            <button class="add-to-cart-btn" data-code="${book.code}">Add to Cart</button>
        `;
        recommendedBooksContainer.appendChild(bookDiv);
    });
    attachAddToCartEventListeners(recommendedBooksContainer);
}

const findBooksForm = document.getElementById("findBooksForm");

findBooksForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const searchQueryInput = document.getElementById("searchQuery");
    const searchQuery = searchQueryInput.value.trim();
    if (searchQuery === '') {
        showMessage("Please enter a subject code", "error");
        return;
    }
    const searchResults = searchBooks(searchQuery);
    displaySearchResults(searchResults);
});

function searchBooks(query) {
    const results = books.filter(book => book.code.toLowerCase().includes(query.toLowerCase()));
    return results;
}

function displaySearchResults(results) {
    const resultSection = document.querySelector('.result-section');
    const searchResultsDiv = document.querySelector(".result-container");
    resultSection.style.display = 'block';
    if (results.length === 0) {
        searchResultsDiv.innerHTML = "<p>No results found.</p>";
    } else {
        searchResultsDiv.innerHTML = ''; 
        results.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            const availabilityColor = book.available ? 'green' : 'red';
            bookDiv.innerHTML = `
                <h4>${book.code} - ${book.title}</h4>
                Price: ₦${book.price}
                <p style="color: ${availabilityColor};">${book.available ? 'Available' : 'Not Available'}</p>
                <div class="quantity-container">
                    <button class="decrement-btn">-</button>
                    <span class="quantity-display">0</span>
                    <button class="increment-btn">+</button>
                </div>
                <button class="add-to-cart-btn" data-code="${book.code}">Add to Cart</button>
            `;
            searchResultsDiv.appendChild(bookDiv);
        });
        attachAddToCartEventListeners(searchResultsDiv);
    }
} 
