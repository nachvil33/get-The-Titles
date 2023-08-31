document.addEventListener('DOMContentLoaded', () => {
    const addBookButton = document.getElementById('addBookButton');
    const bookTitleInput = document.getElementById('bookTitle');
    const bookAuthorInput = document.getElementById('bookAuthor');
    const bookTitlesList = document.getElementById('bookTitles');

    // Retrieve stored books from localStorage or use an empty array
    let books = JSON.parse(localStorage.getItem('books')) || [];

    // Function to save books to localStorage
    function saveBooks() {
        localStorage.setItem('books', JSON.stringify(books));
    }

    // Function to update the book list
    function updateBookList() {
        bookTitlesList.innerHTML = '';
        books.forEach(book => {
            const listItem = document.createElement('li');
            listItem.textContent = `${book.title} by ${book.author}`; // Combine title and author

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.dataset.title = book.title; // Use title as the identifier

            listItem.appendChild(deleteButton);
            bookTitlesList.appendChild(listItem);
        });
    }

    // Populate the book list when the page loads
    updateBookList();

    addBookButton.addEventListener('click', () => {
        const title = bookTitleInput.value.trim();
        const author = bookAuthorInput.value.trim();

        if (title && author) {
            books.push({ title, author });
            saveBooks(); // Save the updated book list to localStorage
            bookTitleInput.value = ''; // Clear the title input
            bookAuthorInput.value = ''; // Clear the author input
            updateBookList(); // Update the book list
        }
    });

    function deleteBook(title) {
        const index = books.findIndex(book => book.title === title);
        if (index !== -1) {
            books.splice(index, 1);
            saveBooks(); // Save the updated book list to localStorage
            updateBookList(); // Update the book list
        }
    }

    bookTitlesList.addEventListener('click', event => {
        if (event.target.classList.contains('delete-button')) {
            const title = event.target.dataset.title;
            deleteBook(title);
        }
    });
});
