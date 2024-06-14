let currentQuestion = 1;
let answers = {};

function nextQuestion() {
  document
    .getElementById(`question${currentQuestion}`)
    .classList.remove("active");
  currentQuestion++;
  if (currentQuestion <= 15) {
    document
      .getElementById(`question${currentQuestion}`)
      .classList.add("active");
  } else {
    calculateScore();
  }
}

function storeAnswer(question, answer) {
  answers[question] = answer;
  nextQuestion();
}

function storeInputAnswer(question) {
  const input = document.getElementById(question);
  if (validateNumberInput(input)) {
    answers[question] = input.value;
    nextQuestion();
  }
}

function validateNumberInput(input) {
  const value = input.value;
  if (!value || isNaN(value)) {
    alert("Пожалуйста, введите числовое значение.");
    input.focus();
    return false;
  }
  return true;
}

function storeCheckboxAnswers(checkboxIds) {
  checkboxIds.forEach((id) => {
    const checkbox = document.getElementById(id);
    answers[id] = checkbox.checked;
  });
  nextQuestion();
}

const cities = {
  osh: ["не выбрано", "Ош",],
  chuy: ["не выбрано", "Бишкек",],
  batken:["не выбрано"," Баткен","Кызыл-Кия","Сүлүктү",""],
  jalalabad:["не выбрано","Жалал-Абад","Кара-Көл","Майлуу-Суу","Таш-Көмүр","Көк-Жаңгак"],
  naryn:["Нарын"],
  talas:["Талас"],
  issykkul:    ["Каракол","Балыкчы"]

};

const districts = {
  Ош: ["не выбрано", "Район A1", "Район A2", "Район A3"],
  Бишкек: [
    "не выбрано",
    "Ленинский",
    "Первомайский",
    "Октябрьский",
    "Свердловский",
  ],
};

function updateDropdown(element, options) {
  element.innerHTML = "";
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    element.appendChild(optionElement);
  });
}

document.getElementById("areaSelect").addEventListener("change", function () {
  const selectedArea = this.value;
  const selectedCities = cities[selectedArea] || [];
  updateDropdown(document.getElementById("citySelect"), selectedCities);
  document.getElementById("districtSelect").innerHTML = "";
});

document.getElementById("citySelect").addEventListener("change", function () {
  const selectedCity = this.value;
  const selectedDistricts = districts[selectedCity] || [];
  updateDropdown(document.getElementById("districtSelect"), selectedDistricts);
});

function calculateScore() {
  let reason = 0;
  let houseType = 0;
  let housPot = 0;
  let housPage = 0;
  let balcony = 0;
  let bathroomType = 0;
  let repairType = 0;
  let repairAge = 0;

  var area = document.getElementById("areaSelect").value;
  var city = document.getElementById("citySelect").value;
  var ser= document.getElementById("serSelect").value;
  var district = document.getElementById("districtSelect").value;
  var areaSize = document
    .getElementById("question9")
    .querySelector("input").value;

  var baseCost = areaSize * 1200;

  let cityCost = 0;
  switch (city) {
    case "Ош":
      cityCost += 1000;
      break;
    case "Бишкек":
      cityCost += 1200;
      break;
  }

  if (answers["reason"] === "Хочу продать квартиру") {
    reason += 1000;
  } else if (answers["reason"] === "Купить") {
    reason += 0;
  } else if (answers["reason"] === "Сдать") {
    reason += 0;
  } else if (answers["reason"] === "Снять") {
    reason += 0;
  } else if (answers["reason"] === "Просто интересно") {
    reason += 0;
  }

  if (answers["houseType"] === "Кирпичный") {
    houseType += 520;
  }
  if (answers["houseType"] === "Монолитный") {
    houseType += 530;
  }
  if (answers["houseType"] === "Панельный") {
    houseType += 540;
  }
  if (answers["houseType"] === "Блочный") {
    houseType += 550;
  }
  if (answers["houseType"] === "Деревянный") {
    houseType += 560;
  }
  if (answers["houseType"] === "Монолитно-кирпичный") {
    houseType += 880;
  }
  if (answers["houseType"] === "Сталинский") {
    houseType += 570;
  }

  if (answers["housPot"] === "less_2_5") {
    housPot += 200;
  }
  if (answers["housPot"] === "2_5_to_2_8") {
    housPot += 300;
  }
  if (answers["housPot"] === "2_8_to_3_4") {
    housPot += 350;
  }
  if (answers["housPot"] === "more_3_4") {
    housPot += 400;
  }

  if (answers["housPage"] === "1") {
    housPage += 500;
  }
  if (answers["housPage"] === "2") {
    housPage += 700;
  }
  if (answers["housPage"] === "3") {
    housPage += 900;
  }
  if (answers["housPage"] === "4") {
    housPage += 1100;
  }
  if (answers["housPage"] === "5") {
    housPage += 1300;
  }

  if (answers["balcony"] === "Да") {
    balcony += 300;
  }
  if (answers["balcony"] === "Нет") {
    balcony -= 100;
  }

  if (answers["bathroomType"] === "Совмещенный") {
    bathroomType -= 100;
  }
  if (answers["bathroomType"] === "Раздельный") {
    bathroomType += 200;
  }

  if (answers["repairType"] === "Косметический") {
    repairType += 500;
  }
  if (answers["repairType"] === "Дизайнерский") {
    repairType += 1000;
  }
  if (answers["repairType"] === "Не знаю") {
    repairType -= 400;
  }

  if (answers["repairAge"] === "Менее года") {
    repairAge += 1000;
  }
  if (answers["repairAge"] === "От года до 5 лет") {
    repairAge += 200;
  }
  if (answers["repairAge"] === "От 5 лет до 10 лет") {
    repairAge += 100;
  }
  if (answers["repairAge"] === "Более 10 лет") {
    repairAge -= 500;
  }
  if (answers["repairAge"] === "Не знаю") {
    repairAge += 0;
  }

  let score =
    cityCost +
    baseCost +
    reason +
    houseType +
    housPot +
    housPage +
    balcony +
    bathroomType +
    repairType +
    repairAge;
  let infrastructureScore = 0;
  const selectedInfrastructure = [];

  if (answers["school"]) {
    infrastructureScore += 150;
    selectedInfrastructure.push("Школа");
  }
  if (answers["kindergarten"]) {
    infrastructureScore += 150;
    selectedInfrastructure.push("Детский сад");
  }
  if (answers["polyclinic"]) {
    infrastructureScore += 150;
    selectedInfrastructure.push("Поликлиника");
  }
  if (answers["shop"]) {
    infrastructureScore += 150;
    selectedInfrastructure.push("Магазин");
  }

  if (answers["sports"]) {
    infrastructureScore += 150;
    selectedInfrastructure.push("Детская площадка");
  }
  if (answers["children"]) {
    infrastructureScore += 150;
    selectedInfrastructure.push("Спортивная площадка");
  }

  score += infrastructureScore;

  let utilitySystems = 0;
  const selectedUtilitySystems = [];

  if (answers["heating"]) {
    utilitySystems += 150;
    selectedUtilitySystems.push("Теплоснабжение");
  }
  if (answers["gas"]) {
    utilitySystems += 150;
    selectedUtilitySystems.push("Газоснабжение");
  }
  if (answers["coldWater"]) {
    utilitySystems += 150;
    selectedUtilitySystems.push("Холодное водоснабжение");
  }
  if (answers["hotWater"]) {
    utilitySystems += 150;
    selectedUtilitySystems.push("Горячее водоснабжение");
  }
  if (answers["drainage"]) {
    utilitySystems += 150;
    selectedUtilitySystems.push("Водоотведение");
  }

  score += utilitySystems;

  console.log("Total score:", score);
  let resultElement = document.getElementById("result");
  resultElement.textContent =
    "Средняя оценочная стоимость Вашей квартиры: $ " + score;

  let parametersInfo = "Характеристики дома:<br>";
 
  parametersInfo += "<b>Город:</b> " + city + "<br>";
  parametersInfo += "<b>Серия:</b> " + ser+ "<br>";
  parametersInfo += "<b>Тип дома:</b> " + answers["houseType"] + "<br>";
  parametersInfo += "<b>Количество комнат:</b> " + answers["housPage"] + "<br>";
  parametersInfo += "<b>Площадь квартиры:</b> " + areaSize + " кв. м<br>";
  parametersInfo +="<b>Наличие балкона:</b> " + (answers["balcony"] ? "Да" : "Нет") + "<br>";
  parametersInfo += "<b>Тип ванной комнаты:</b> " + answers["bathroomType"] + "<br>";
  parametersInfo += "<b>Тип ремонта:</b> " + answers["repairType"] + "<br>";
  parametersInfo += "<b>Возраст ремонта:</b> " + answers["repairAge"] + "<br>";
  parametersInfo += "<b>Коммунальные системы:</b> " + selectedUtilitySystems.join(", ") + "<br>";
  parametersInfo +="<b>Инфраструктура:</b> " + selectedInfrastructure.join(", ") + "<br>";

  let parametersElement = document.getElementById("parameters");
  parametersElement.innerHTML = parametersInfo;
}

function resetForm() {
  answers = {};
  currentQuestion = 1;
  document.getElementById("result").textContent = "";
  document.getElementById("parameters").innerHTML = "";

  document
    .querySelectorAll('input[type="text"], input[type="number"]')
    .forEach((input) => (input.value = ""));
  document
    .querySelectorAll('input[type="checkbox"]')
    .forEach((checkbox) => (checkbox.checked = false));
  document
    .querySelectorAll("select")
    .forEach((select) => (select.selectedIndex = 0));

  document
    .querySelectorAll(".question")
    .forEach((question) => question.classList.remove("active"));
  document.getElementById(`question${currentQuestion}`).classList.add("active");
}















