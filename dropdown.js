function toggleDropdown() {
    const dropdown = document.getElementById("myDropdown");
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}
  
function selectOption(option) {
    const buttonText = document.getElementById("buttonText");
    buttonText.innerHTML = option;
    const sortButton = document.getElementById("sortButton");
    const sortContainer = document.getElementById("sortContainer");
    if (option === "Availability") {
      sortContainer.style.width = "275px";
      sortButton.style.width = "200px";
    } else {
      sortContainer.style.width = "";
      sortButton.style.width = "";
    }
    toggleDropdown();
    sortCards(option);
}

function sortCards(option) {
    const container = document.querySelector(".card-container");
    const cards = Array.from(container.getElementsByClassName("card"));

    let compareFunc;

    if (option === "Price") {
      compareFunc = (a, b) => {
        const priceA = parseFloat(a.querySelector(".card-price").innerText.replace("$", ""));
        const priceB = parseFloat(b.querySelector(".card-price").innerText.replace("$", ""));
        return priceA - priceB;
      };
    } else if (option === "Name") {
      compareFunc = (a, b) => {
        const nameA = a.querySelector(".card-title").innerText;
        const nameB = b.querySelector(".card-title").innerText;
        return nameA.localeCompare(nameB);
      };
    } else if (option === "Availability") {
      compareFunc = (a, b) => {
        const isAvailableA = a.querySelector(".card-banner").innerText === "Available";
        const isAvailableB = b.querySelector(".card-banner").innerText === "Available";
        return (isAvailableA === isAvailableB) ? 0 : isAvailableA ? -1 : 1;
      };
    } else {
      return; 
    }

    const sortedCards = cards.sort(compareFunc);
    sortedCards.forEach((card) => {
        container.appendChild(card);
    });
}
  
  