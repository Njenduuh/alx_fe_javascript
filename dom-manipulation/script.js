const serverUrl = "https://jsonplaceholder.typicode.com/posts";
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Fetch quotes from server and merge with local quotes
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(serverUrl);
    const serverQuotes = await response.json();

    // Process server quotes to match the format of local quotes
    const transformedQuotes = serverQuotes.map((item) => ({
      text: item.title,
      category: item.body.substring(0, 15), // Simplified category from body
    }));

    // Merge local and server quotes, avoid duplicates
    quotes = [
      ...transformedQuotes,
      ...quotes.filter(
        (localQuote) =>
          !transformedQuotes.some((serverQuote) => serverQuote.text === localQuote.text)
      ),
    ];

    saveQuotes();
    populateCategories();
    filterQuotes();
    console.log("Quotes fetched and merged successfully from server.");
  } catch (error) {
    console.error("Error fetching quotes from server:", error);
  }
}

// Sync local quotes to server (post new quotes)
async function syncLocalToServer() {
  try {
    const localUnsyncedQuotes = quotes.filter((quote) => !quote.synced);

    for (const quote of localUnsyncedQuotes) {
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: quote.text, body: quote.category }),
      });

      if (response.ok) {
        quote.synced = true;
      }
    }

    saveQuotes();
    console.log("Local quotes synced to server.");
  } catch (error) {
    console.error("Error syncing local quotes to server:", error);
  }
}

// Periodic syncing
function startSyncing() {
  fetchQuotesFromServer(); // Ensure this function is called to fetch data initially
  setInterval(() => {
    fetchQuotesFromServer(); // Periodically fetch quotes
    syncLocalToServer();     // Periodically sync local quotes
  }, 30000); // Every 30 seconds (adjust as needed)
}

// Populate category dropdown from quotes
function populateCategories() {
  const categories = [...new Set(quotes.map((quote) => quote.category))];
  const categoryFilter = document.getElementById("categoryFilter");

  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Filter quotes based on category
function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter").value;
  const quoteDisplay = document.getElementById("quoteDisplay");

  const filteredQuotes =
    categoryFilter === "all"
      ? quotes
      : quotes.filter((quote) => quote.category === categoryFilter);

  quoteDisplay.innerHTML = filteredQuotes
    .map((quote) => `<p>${quote.text} - <em>${quote.category}</em></p>`)
    .join("");
}

// Display a random quote
function displayRandomQuote() {
  if (quotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    alert(`${randomQuote.text} - ${randomQuote.category}`);
  } else {
    alert("No quotes available!");
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  filterQuotes();
  startSyncing();
  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
});
