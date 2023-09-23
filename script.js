// Creates and appends the results (bugApiData) to the parent element
  function CreateSearchResult(bugApiData, thumbnail, parentElement) {
    const resultBox = document.createElement("div");
    resultBox.classList.add("result-box");
      
    // Create the Common Name Heading
    const commonName = document.createElement("h2");
    commonName.textContent = bugApiData.CommonName;

    // Create the Scientific Name Heading
    const scientificName = document.createElement("h3");
    scientificName.textContent = `${bugApiData.Genus} ${bugApiData.Species}`;

    const image = document.createElement("img");
    image.classList.add("img");
    image.src = thumbnail;

    // Create the link
    const bugGuideURL = document.createElement("a");
    bugGuideURL.textContent = "More Info";
    bugGuideURL.href = bugApiData.URL;

    // Appends all the elements to the resultbox
    resultBox.appendChild(commonName);
    resultBox.appendChild(scientificName);
    resultBox.appendChild(image);
    resultBox.appendChild(bugGuideURL);

    // Apends the resultbox (Filled with content now) to the parentElement
    parentElement.appendChild(resultBox);
  }

  document
  .querySelector("#search-form")
  .addEventListener("submit", function (event) {
    // Prevents the form from submitting and reloading the page
    event.preventDefault();
    
    // Clears search result before appending new items
    const parentElement = document.querySelector("#query-result");
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
    
    // Gets the string from the user input
    const searchQuery = document.querySelector("#search-query").value.toLowerCase().split(' ');
    console.log(searchQuery);

    // Fetches the bug API
    fetch("https://bugs.verfasor.com/api")
    .then(function (response) {
      if (!response.ok) {
      throw new Error("Failed to fetch the Insect API");
      }
      console.log("Fetched correctly");
      return response.json();
    })
    .then(function (bugs) {
    for (const bug of bugs) {
      MatchQueryToResult(searchQuery, bug);
    }
    })
    .catch(function (error) {
      console.error(error);
    });



    function MatchQueryToResult(query, bugApiData) {
      // SPlits the Common Name so you can search on two or more 
    const splitCommonName = bugApiData.CommonName.toLowerCase().split(' ');
    const matchingCount = query.filter(word => splitCommonName.includes(word)).length;

    // Puts Common Name, Genus, Species, Family and Order into one string for easy filtering
    const bugQuery = `${bugApiData.CommonName} ${bugApiData.Genus} ${bugApiData.Species} ${bugApiData.Family} ${bugApiData.Order}`.toLowerCase();
        
    // If bugQuery contains the query (exact without any words between), OR query matches two or more words from the split Common Name, it will show result
    if (bugQuery.includes(query) || matchingCount >= 2) {
      const url = `./${bugApiData.Genus}_${bugApiData.Species}.json`.toLowerCase();

      const url2 = `https://en.wikipedia.org/w/api.php?action=query&titles=${bugApiData.Genus}_${bugApiData.Species}&format=json`

      console.log(url2);

      fetch(url2)
      .then(function (response) {
        if (!response.ok) {
        throw new Error("Failed to fetch the Media API");
        }
        console.log("Media API Fetched correctly");
        return response.json();
      })
      .then(function (queryResults) {
        // Iterate through each query result
        for (const queryResult of queryResults) {
          const pages = queryResult.query.pages;
          
          // Iterate through the dynamic keys in 'pages'
          for (const pageId in pages) {
            if (pages.hasOwnProperty(pageId)) {
              const thumbnailSource = pages[pageId].thumbnail.source;
              
              const element = document.querySelector("#query-result");
            CreateSearchResult(bugApiData, thumbnailSource, element);
            return;
            }
          }
        }
      })
      .catch(function (error) {
        console.error(error);

        const element = document.querySelector("#query-result");

        switch (bugApiData.Order) {
          case "Lepidoptera":
            humbnailSource = "https://upload.wikimedia.org/wikipedia/commons/e/e9/Lepidoptera_Diversity.jpg";
            CreateSearchResult(bugApiData, thumbnailSource, element);
            break;
          case "Diptera":
            thumbnailSource = "https://upload.wikimedia.org/wikipedia/commons/6/6b/Six_Diptera.jpg";
            CreateSearchResult(bugApiData, thumbnailSource, element);
            break;
          case "Mantodea":
            thumbnailSource = "https://oumnh.ox.ac.uk/sites/default/files/styles/mt_image_medium/public/oumnh/images/media/p1150988.jpg?itok=oMyibm0M";
            CreateSearchResult(bugApiData, thumbnailSource, element);
            break;
          case "Blattodea":
            thumbnailSource = "https://ih1.redbubble.net/image.1571671347.8612/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg";
            CreateSearchResult(bugApiData, thumbnailSource, element);
            break;
          case "Hymenoptera":
            thumbnailSource = "https://upload.wikimedia.org/wikipedia/commons/f/f5/Hymenoptera.jpg";
            CreateSearchResult(bugApiData, thumbnailSource, element);
            break;
          case "Phasmida":
            thumbnailSource = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Phasmatodea_overview.jpg/800px-Phasmatodea_overview.jpg";
            CreateSearchResult(bugApiData, thumbnailSource, element);
            break;
          case "Dermaptera":
            thumbnailSource = "https://www.researchgate.net/profile/Christophe-Girod/publication/318276454/figure/fig2/AS:614040577507340@1523410090140/9-Dermaptera-2-Euborellia-cincticollis-Gerstaecker-3-Forcipula-gariazzi.png";
            CreateSearchResult(bugApiData, thumbnailSource, element);
            break;
          case "Formicidae":
            thumbnailSource = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWfzM8MJ_aeFmLhugkuUFkDg2_7VcB_x_qDA&usqp=CAU";
            CreateSearchResult(bugApiData, thumbnailSource, element);
            break;
          case "Coleoptera":
            thumbnailSource = "https://upload.wikimedia.org/wikipedia/commons/2/20/Coleoptera_collage.png";
            CreateSearchResult(bugApiData, thumbnailSource, element);
            break;
          case "Hemiptera":
            thumbnailSource = "https://www.shutterstock.com/shutterstock/photos/2077989610/display_1500/stock-photo-bug-species-of-mediterranean-region-insects-of-the-order-hemiptera-isolated-on-a-white-background-2077989610.jpg";
            CreateSearchResult(bugApiData, thumbnailSource, element);
            break;
          case "Siphonaptera":
            thumbnailSource = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Siphonaptera_%2810.3897-zookeys.678.12006%29_Figure_2.jpg/528px-Siphonaptera_%2810.3897-zookeys.678.12006%29_Figure_2.jpg";
            CreateSearchResult(bugApiData, thumbnailSource, element);
            break;
          case "Orthoptera":
            thumbnailSource = "https://wiki.bugwood.org/thumb.php?f=Orthoptera.jpg&width=450";
            CreateSearchResult(bugApiData, thumbnailSource, element);
            break;
          case "Odonata":
            thumbnailSource = "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41597-019-0318-9/MediaObjects/41597_2019_318_Fig1_HTML.jpg";
            CreateSearchResult(bugApiData, thumbnailSource, element);
            break;
          default:
            thumbnailSource = "";
          }
        
      });
    }
  }})