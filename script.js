// Fetch bug API
fetch("https://bugs.verfasor.com/api")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Failed to fetch the Incest API");
    }
    console.log("Fetched correctly");
    return response.json();
  })
  .then(function (bugs) {
    for (const bug of bugs) {
      AppendBug(bug);
    }
  })
  .catch(function (error) {
    console.error(error);
  });