
fetch("https://bugs.verfasor.com/api")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Failed to fetch the Incest API");
    }
    console.log("Fetched correctly");
    return response.json();
  })
  .then(function (bugs) {
    const element = document.querySelector("#query-result");
    let loadedResults = 0;
    for (const bug of bugs) {
      if (loadedResults >= 10) {
        break; }
      CreateSearchResult(bug, element);
      loadedResults++;
    }
  })
  .catch(function (error) {
    console.error(error);
  });


  function CreateSearchResult(bugApiData, parentElement) {
    if (parentElement) {
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

      resultBox.appendChild(commonName);
      resultBox.appendChild(scientificName);
      resultBox.appendChild(bugGuideURL);

      // Apends everything to the parentElement
      parentElement.appendChild(resultBox);
    }
  }
  CreateSearchResult(element);