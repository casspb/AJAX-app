(() => {

  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const loader = document.querySelector("#loader");

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"



  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/materials"


  //functions
  function loadInfoBoxes() {
    // Make AJAX call to the API
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoBoxes => {
        console.log(infoBoxes);
  
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          const titleElement = document.createElement('h2');
          titleElement.textContent = infoBox.heading;
  
          const textElement = document.createElement('p');
          textElement.textContent = infoBox.description;

          selected.appendChild(titleElement);
          selected.appendChild(textElement);

          
        });
      })
      .catch(error => {
        console.log(error);
  
        const errorMsg = document.createElement("p");
        errorMsg.textContent = "Oops, it looks like something went wrong, please check your internet connection or try again later.";
        const containers = document.querySelectorAll(".error-container");
        
        containers.forEach(container => {
          container.appendChild(errorMsg.cloneNode(true));
        });
      });
  }
  
  loadInfoBoxes();

  function loadMaterialInfo() {
    loader.classList.remove("hidden");
  
    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materials => {
        console.log(materials);
  
        // Clear existing content before adding new data
        materialList.innerHTML = "";
  
        materials.forEach(material => {
          const clone = materialTemplate.content.cloneNode(true);
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;
  
          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;
  
          materialList.appendChild(clone);
        });
  
        // Hide the loader after data has been loaded
        loader.classList.add("hidden");
      })
      .catch(error => {
        console.log(error);
        loader.classList.add("hidden");
  
        const errorMsg = document.createElement("p");
        errorMsg.textContent = "Oops, something went wrong, please check your internet connection or try again later.";
        materialList.appendChild(errorMsg);
      });
  }
  
  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

