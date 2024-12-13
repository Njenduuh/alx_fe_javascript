// Load existing quotes or initialize with defaults
const quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
];

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate the category dropdown dynamically
function populateCategories() {
  const categories = [...new Set(quotes.map((quote) => quote.category))]; // Extract unique categories
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset dropdown

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore the last selected filter
  const lastSelectedFilter = localStorage.getItem("selectedCategory");
  if (lastSelectedFilter) {
    categoryFilter.value = lastSelectedFilter;
    filterQuotes(); // Apply the last selected filter
  }
}

// Filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory); // Persist filter preference

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter((quote) => quote.category === selectedCategory);

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = ""; // Clear existing quotes

  filteredQuotes.forEach(({ text, category }) => {
    const quoteElement = document.createElement("div");
    quoteElement.innerHTML = `
      <p>${text}</p>
      <p style="font-style: italic;">- ${category}</p>
    `;
    quoteDisplay.appendChild(quoteElement);
  });
}

// Function to add a new quote and update categories
function createAddQuoteForm() {
  const addQuoteButton = document.getElementById("addQuoteButton");
  addQuoteButton.addEventListener("click", function () {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      saveQuotes(); // Persist the new quote

      alert("Quote added successfully!");

      // Update the categories dynamically
      populateCategories();

      // Clear input fields
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
    } else {
      alert("Please fill in both fields!");
    }
  });
}

// Export and import functions remain the same
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");

        // Update the categories dynamically
        populateCategories();
        filterQuotes(); // Refresh displayed quotes
      } else {
        alert("Invalid JSON format!");
      }
    } catch (e) {
      alert("Error parsing JSON file!");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Attach event listeners
document.getElementById("newQuote").addEventListener("click", filterQuotes);
document.getElementById("exportQuotes").addEventListener("click", exportToJsonFile);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// Initialize the application
populateCategories();
createAddQuoteForm();
filterQuotes(); // Display quotes based on the default or last selected category
