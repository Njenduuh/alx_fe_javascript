// Initialize quotes array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
const serverUrl = "https://jsonplaceholder.typicode.com/posts";

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote
function displayRandomQuote() {
  if (quotes.length === 0) {
    alert("No quotes available.");
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById("randomQuote").innerText = quotes[randomIndex].text;
}

// Add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory, synced: false };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    filterQuotes();

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill in both fields!");
  }
}

// Populate category dropdown dynamically
function populateCategories() {
  const categories = ["all", ...new Set(quotes.map((quote) => quote.category))];
  const categoryFilter = document.getElementById("categoryFilter");

  categoryFilter.innerHTML = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");
}

// Filter quotes by category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((quote) => quote.category === selectedCategory);

  const quoteList = document.getElementById("quoteList");
  quoteList.innerHTML = filteredQuotes
    .map((quote) => `<li>${quote.text} (${quote.category})</li>`)
    .join("");
}

// Export quotes to JSON file
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

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      filterQuotes();
      alert("Quotes imported successfully!");
    } catch (error) {
      alert("Invalid JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Fetch quotes from server
async function fetchServerQuotes() {
  try {
    const response = await fetch(serverUrl);
    const serverQuotes = await response.json();
    const transformedQuotes = serverQuotes.map((item) => ({
      text: item.title,
      category: item.body.substring(0, 15),
    }));

    const mergedQuotes = [...transformedQuotes, ...quotes.filter(
      (localQuote) => !transformedQuotes.some(
        (serverQuote) => serverQuote.text === localQuote.text
      )
    )];

    quotes = mergedQuotes;
    saveQuotes();
    populateCategories();
    filterQuotes();
  } catch (error) {
    console.error("Error fetching server quotes:", error);
  }
}

// Sync local quotes to server
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
  } catch (error) {
    console.error("Error syncing local quotes to server:", error);
  }
}

// Periodic syncing
function startSyncing() {
  fetchServerQuotes();
  setInterval(() => {
    fetchServerQuotes();
    syncLocalToServer();
  }, 30000);
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  filterQuotes();
  startSyncing();
  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
});
