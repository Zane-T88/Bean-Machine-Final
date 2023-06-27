// We wait until all HTML document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded", function() {
    // Select search input and button elements
    const searchInput = document.querySelector('input[type="text"]');
    const searchButton = searchInput ? searchInput.nextElementSibling : null;
    const resetButton = document.querySelector('#reset-button');

    if(searchButton) {
        // Add click event listener to the search button
        searchButton.addEventListener('click', function(event) {
            event.preventDefault(); // prevent form submission

            // Save input value in localStorage
            localStorage.setItem('searchQuery', searchInput.value);

            // Navigate to selection page
            window.location.href = "selection.html";
        });
    }

    if(resetButton) {
        // Add click event listener to the reset button
        resetButton.addEventListener('click', function() {
            // Reset the stored search query and refresh the page
            localStorage.removeItem('searchQuery');
            location.reload();
        });
    }

    // Get saved query from localStorage
    const searchQuery = localStorage.getItem('searchQuery');

    // If there's a query saved, filter the results
    if (searchQuery) {
        const cards = document.querySelectorAll('.card');
        let cardsFound = false;
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent;
            if (title.toLowerCase().includes(searchQuery.toLowerCase())) {
                cardsFound = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (!cardsFound) {
            const noResultsDiv = document.querySelector('#no-results');
            noResultsDiv.textContent = 'No results found';
            noResultsDiv.style.height = '300px';
        }
    }
});
