function getControlPanel(){
  var controlPanel =  document.createElement("div");
  controlPanel.setAttribute("class", "control");

  let addressInputDiv = getAddressInputDiv();
  let efficiencytInfoDiv = getEfficiencyInfoDiv();
  let chartDiv = getChartDiv();
  let troughEfficicencyDiv = getTroughEfficicencyDiv();
  let locationTableDiv = getLocationTableDiv();
  
  controlPanel.appendChild(addressInputDiv);
  controlPanel.appendChild(efficiencytInfoDiv);
  controlPanel.appendChild(chartDiv);
  controlPanel.appendChild(troughEfficicencyDiv);
  controlPanel.appendChild(locationTableDiv);

  return controlPanel;
}

function getAddressInputDiv(){
  var addressInputDiv = document.createElement('div');
  addressInputDiv.setAttribute("class", "addressInputDiv");

  var label = document.createElement('label');
  label.innerHTML = "<b>Location:</b>";
  label.htmlFor = "address";
  addressInputDiv.appendChild(label);

  let input = getInputElement("Address: ", "address", " Phoenix, AZ, USA", false)
  addressInputDiv.appendChild(input);

  var getCoordsButton = document.createElement("button");
  getCoordsButton.setAttribute("id", "getCoordsButton");
  getCoordsButton.innerHTML = "Calculate";
  getCoordsButton.addEventListener("click", getCoordsFromAddress);
  
  addressInputDiv.appendChild(getCoordsButton);
  return addressInputDiv;
}

function getEfficiencyInfoDiv(){
  var efficiencytInfoDiv = document.createElement('div');
  efficiencytInfoDiv.setAttribute("class", "efficiencytInfoDiv");
  
  var label = document.createElement('label');
  label.innerHTML = "<b>FOCUS vs. Trough Efficiency %:</b>";
  label.style.width = '50%';
  label.style.whiteSpace =  'nowrap';
  label.htmlFor = "efficiency";
  efficiencytInfoDiv.appendChild(label);

  let efficiencyText = document.createElement('b');
  efficiencyText.setAttribute('id', 'efficiency');
  efficiencyText.style.color = '#10B981';
  efficiencyText.innerHTML = '+0%';
  efficiencytInfoDiv.appendChild(efficiencyText);

  var downloadButton = document.createElement('button');
  downloadButton.style.width = '65px';
  //downloadButton.style.height = '20px';
  var downloadIcon = document.createElement('img');
  downloadIcon.style.width = '100%';
  
  //downloadIcon.setAttribute('src', '/images/icons/download_icon.png');
  downloadIcon.setAttribute("src","download_icon.png");

  downloadButton.setAttribute('id', 'downloadButton');
  //downloadButton.appendChild(downloadIcon);
  downloadButton.innerHTML = "GET CSV"
  downloadButton.addEventListener('click', exportTableToCSV);
  efficiencytInfoDiv.appendChild(downloadButton);

  return efficiencytInfoDiv;
}

function getChartDiv(){
  var chartDiv =  document.createElement("div");
  chartDiv.setAttribute("class", "chart");
  chartDiv.setAttribute("id", "chart");
  return chartDiv;
}

function getTroughEfficicencyDiv(){
  var troughEfficicencyDiv = document.createElement('div');
  troughEfficicencyDiv.setAttribute("class", "troughEfficiencyDiv");
  
  let label = document.createElement("label");
   label.htmlFor = "troughEfficiency";
  label.setAttribute("id", "troughEfficiencyLabel");
  label.innerHTML = "<b>Trough Solar-to-thermal Efficiency:</b>";
  troughEfficicencyDiv.appendChild(label);

  let troughInput = getInputElement("Solar-to-Thermal Efficiency", "troughEfficiency", "70%", false);
  troughEfficicencyDiv.appendChild(troughInput);

  return troughEfficicencyDiv;
}
function getLocationTableDiv(){
  var locationTableDiv = document.createElement('div');
  locationTableDiv.setAttribute("class", "locationTableDiv");
  
  var table = document.createElement('table');
  let footHeadingsRow = table.insertRow();
  let footValuesRow = table.insertRow();

  let locationHeadingCell = footHeadingsRow.insertCell();
  locationHeadingCell.setAttribute("colspan", "3");
  let locationHeadingText = document.createElement("b");
  locationHeadingText.innerHTML = "Location";
  locationHeadingCell.appendChild(locationHeadingText);
  
  let latitudeHeadingCell = footHeadingsRow.insertCell();
  let latitudeHeadingText = document.createElement("b");
  latitudeHeadingText.innerHTML = "Latitude";
  latitudeHeadingCell.appendChild(latitudeHeadingText);

  let longitudeHeadingCell = footHeadingsRow.insertCell();
  let longitudeHeadingText = document.createElement("b");
  longitudeHeadingText.innerHTML = "Longitude";
  longitudeHeadingCell.appendChild(longitudeHeadingText);

  let dniHeadingCell = footHeadingsRow.insertCell();
  let dniHeadingText = document.createElement("b");
  dniHeadingText.innerHTML = "Average DNI (kWh/m²/day)";
  dniHeadingCell.appendChild(dniHeadingText);


  let locationValue = footValuesRow.insertCell();
  locationValue.setAttribute("colspan", "3");
  let locationText = document.createElement("span");
  locationValue.setAttribute("id", "location");
  locationText.innerHTML = "Location";
  locationValue.appendChild(locationText);

  let latitudeValue = footValuesRow.insertCell();
  let latitudeText = document.createElement("span");
  latitudeValue.setAttribute("id", "latitude");
  latitudeText.innerHTML = "Latitude";

  latitudeValue.appendChild(latitudeText);

  let longitudeValue = footValuesRow.insertCell();
  let longitudeText = document.createElement("span");
  longitudeValue.setAttribute("id", "longitude");
  longitudeText.innerHTML = "Longitude";
  longitudeValue.appendChild(longitudeText);

  let dniValue = footValuesRow.insertCell();
  let dniText = document.createElement("span");
  dniValue.setAttribute("id", "avgDNI");
  dniText.innerHTML = "dni";
  dniValue.appendChild(dniText);

  locationTableDiv.appendChild(table);

  return locationTableDiv;
}