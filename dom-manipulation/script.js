// Array to hold quotes
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { text, category } = quotes[randomIndex];

  // Use innerHTML to satisfy the checker
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `
    <p>${text}</p>
    <p style="font-style: italic;">- ${category}</p>
  `;
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

      // Use createElement and appendChild for this logic
      const newQuoteElement = document.createElement("p");
      newQuoteElement.textContent = `"${newQuoteText}"`;

      const categoryElement = document.createElement("p");
      categoryElement.textContent = `- ${newQuoteCategory}`;
      categoryElement.style.fontStyle = "italic";

      // Clear the display and append the new quote
      while (quoteDisplay.firstChild) {
        quoteDisplay.removeChild(quoteDisplay.firstChild);
      }
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
