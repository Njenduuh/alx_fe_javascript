// Array to hold quotes
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { text, category } = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");

  // Clear previous content
  while (quoteDisplay.firstChild) {
    quoteDisplay.removeChild(quoteDisplay.firstChild);
  }

  // Create new elements for the quote
  const quoteText = document.createElement("p");
  quoteText.textContent = text;

  const quoteCategory = document.createElement("p");
  quoteCategory.textContent = `- ${category}`;
  quoteCategory.style.fontStyle = "italic";

  // Append the new elements
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Function to create and set up the add quote form
function createAddQuoteForm() {
  const addQuoteButton = document.getElementById("addQuoteButton");
  addQuoteButton.addEventListener("click", function () {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newQuoteText && newQuoteCategory) {
      // Add the new quote to the array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });

      // Update the DOM with the new quote
      const quoteDisplay = document.getElementById("quoteDisplay");

      // Create new elements for the added quote
      const newQuoteElement = document.createElement("p");
      newQuoteElement.textContent = `"${newQuoteText}"`;

      const categoryElement = document.createElement("p");
      categoryElement.textContent = `- ${newQuoteCategory}`;
      categoryElement.style.fontStyle = "italic";

      // Append the new elements
      quoteDisplay.appendChild(newQuoteElement);
      quoteDisplay.appendChild(categoryElement);

      alert("Quote added successfully!");
      
      // Clear input fields
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
    } else {
      alert("Please fill in both fields!");
    }
  });
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Initialize the form setup
createAddQuoteForm();
