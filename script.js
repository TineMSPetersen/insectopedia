// Creates and appends the results (bugApiData) to the parent element
  function CreateSearchResult(bugApiData, parentElement) {
    const resultBox = document.createElement("div");
    resultBox.classList.add("result-box");
      
    // Create the Common Name Heading
    const commonName = document.createElement("h2");
    commonName.textContent = bugApiData.CommonName;

    // Create the Scientific Name Heading
    const scientificName = document.createElement("h3");
    scientificName.textContent = `${bugApiData.Genus} ${bugApiData.Species}`

    // Create the link
    const bugGuideURL = document.createElement("a");
    bugGuideURL.textContent = "More Info";
    bugGuideURL.href = bugApiData.URL;

    // Appends all the elements to the resultbox
    resultBox.appendChild(commonName);
    resultBox.appendChild(scientificName);
    resultBox.appendChild(bugGuideURL);

    // Apends the resultbox (Filled with content now) to the parentElement
    parentElement.appendChild(resultBox);
  }

  document
  .querySelector("#search-form")
  .addEventListener("submit", function (event) {
    // Prevents the form from submitting and reloading the page
    event.preventDefault();

    // Gets the string from the user input
    const searchQuery = document.querySelector("#search-query").value;
    console.log(searchQuery);

    // Fetches the bug API
    fetch("bugs.json")
    .then(function (response) {
      if (!response.ok) {
      throw new Error("Failed to fetch the Insect API");
      }
      console.log("Fetched correctly");
      return response.json();
    })
    .then(function (bugs) {
    for (const bug of bugs) {
      MatchQueryToResult(searchQuery, bug)
    }
    })
    .catch(function (error) {
      console.error(error);
    });

    function MatchQueryToResult(query, bugApiData) {
      if (bugApiData.CommonName.includes(query)) {
        console.log("Works!");
        const element = document.querySelector("#query-result");
        CreateSearchResult(bugApiData, element);
      }
  }})
