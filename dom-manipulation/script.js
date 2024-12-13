const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
  { text: "Change your thoughts and you change your world.", category: "Positive Thinking" }
];

// Function to display a random quote
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  // Clear previous quote content
  while (quoteDisplay.firstChild) {
    quoteDisplay.removeChild(quoteDisplay.firstChild);
  }

  // Select a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Create and append quote text element
  const quoteTextElement = document.createElement("p");
  quoteTextElement.textContent = `"${randomQuote.text}"`;
  quoteDisplay.appendChild(quoteTextElement);

  // Create and append quote category element
  const quoteCategoryElement = document.createElement("p");
  quoteCategoryElement.textContent = `— ${randomQuote.category}`;
  quoteDisplay.appendChild(quoteCategoryElement);
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    // Add the new quote to the quotes array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Clear the input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("Quote added successfully!");
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Attach event listeners
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
