console.log(countryCode);

const getBoldText = (text) => {
  let boldText = document.createElement("b");
  boldText.innerText = text;
  return boldText;
};

const createSpanWithClass = (className) => {
  let newSpan = document.createElement("span");
  newSpan.classList.add(className);
  newSpan.classList.add("stat-span");

  return newSpan;
};

const generateDOM = (data) => {
  let fragment = new DocumentFragment();
  data.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.classList.add("country-card");
    const imageSection = document.createElement("div");
    imageSection.classList.add("name-image-section");
    const countryLogo = document.createElement("img");
    countryLogo.src = `https://www.countryflags.io/${
      countryCode[country.country]
    }/flat/64.png`;
    const countryTitle = document.createElement("h5");
    countryTitle.appendChild(getBoldText(country.country));
    imageSection.appendChild(countryLogo);
    imageSection.appendChild(countryTitle);
    // console.log(imageSection);

    /// Stats section
    const statsSection = document.createElement("div");
    statsSection.classList.add("stats-section");
    const active = createSpanWithClass("red");
    const recoverd = createSpanWithClass("green");
    const dead = createSpanWithClass("blue");
    active.appendChild(getBoldText(country.active));
    active.append("Active");
    recoverd.appendChild(getBoldText(country.recovered));
    recoverd.append("Recovered");
    dead.appendChild(getBoldText(country.deaths));
    dead.append(" Dead");
    statsSection.appendChild(active);
    statsSection.appendChild(recoverd);
    statsSection.appendChild(dead);
    // console.log(statsSection);
    countryCard.appendChild(imageSection);
    countryCard.appendChild(statsSection);
    // console.log(countryCard);
    if (countryCode[country.country]) {
      fragment.appendChild(countryCard);
    }
  });
  return fragment;
};

const dispCountry = () => {
  // Selecting container class and adding loading effect as the data is fetched
  // document.querySelector(".grid-wrapper").innerHTML += loadingEffect;
  fetch("https://coronavirus-19-api.herokuapp.com/countries")
    .then((data) => {
      //After the data fetching is over , remove loading node

      return data.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("data", JSON.stringify(data));
      const container = document.querySelector(".grid-wrapper");
      container.textContent = "";
      const DOM = generateDOM(data);
      container.appendChild(DOM);
      console.log(DOM);
    });
};

const searchCountry = () => {
  let searchVal = document.getElementById("searcher").value;
  // Selecting container class and adding loading effect as the data is fetched

  const grid = document.querySelector(".grid-wrapper");
  grid.textContent = "";

  let data = JSON.parse(localStorage.getItem("data"));
  data = data.filter(
    (country) =>
      country.country.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1
  );
  if (data.length === 0) {
    grid.innerText = "No results found.";
  } else {
    grid.appendChild(generateDOM(data));
  }
};
