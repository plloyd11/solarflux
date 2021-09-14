function getControlPanel() {
    var controlPanel = document.createElement('div');
    controlPanel.setAttribute('class', 'control');

    var table = document.createElement('table');
    let row = table.insertRow();

    //let labelCell = row.insertCell();
    //let headingText = document.createElement("h4");
    //headingText.innerHTML = "Location";
    //labelCell.appendChild(headingText);

    let labelCell = row.insertCell();
    let addressCell = row.insertCell();

    var label = document.createElement('label');
    label.innerHTML = '<b>Location:</b>';
    label.htmlFor = 'address';
    labelCell.appendChild(label);
    let input = getInputElement('Address: ', 'address', ' Phoenix, AZ, USA', false);
    addressCell.appendChild(input);
    var getCoordsButton = document.createElement('button');
    let buttonCell = row.insertCell();
    getCoordsButton.setAttribute('id', 'getCoordsButton');
    getCoordsButton.innerHTML = 'Calculate';
    getCoordsButton.addEventListener('click', getCoordsFromAddress);

    buttonCell.appendChild(getCoordsButton);

    let spacer1 = row.insertCell();
    let spacer2 = row.insertCell();
    /* let spacer3 = row.insertCell();
  let spacer4 = row.insertCell();
  let spacer5 = row.insertCell();*/

    let labelCell2 = row.insertCell();
    labelCell2.setAttribute('class', 'efficiencyBox');
    labelCell2.style.padding = '5px';
    let headingText2 = document.createElement('b');
    headingText2.innerHTML = 'FOCUS vs. Trough Efficiency %';
    labelCell2.appendChild(headingText2);

    let efficiencyCell = row.insertCell();
    efficiencyCell.setAttribute('class', 'efficiencyBox');
    let efficiencyText = document.createElement('b');
    efficiencyCell.setAttribute('id', 'efficiency');
    efficiencyCell.style.color = '#10B981';
    efficiencyText.innerHTML = '+0%';
    efficiencyCell.appendChild(efficiencyText);

    let downloadCell = row.insertCell();
    var downloadButton = document.createElement('button');
    downloadButton.style.width = '50px';
    downloadButton.style.height = '50px';
    var downloadIcon = document.createElement('img');
    downloadIcon.style.width = '100%';
    //downloadIcon.style.marginLeft = "10%";
    downloadIcon.setAttribute('src', '/images/icons/download_icon.png');
    downloadButton.setAttribute('id', 'downloadButton');
    downloadButton.appendChild(downloadIcon);
    downloadButton.addEventListener('click', exportTableToCSV);
    downloadCell.appendChild(downloadButton);

    let chartRow = table.insertRow();
    let chartCell = chartRow.insertCell();
    chartCell.setAttribute('colspan', '90');
    var chartPanel = document.createElement('div');
    chartPanel.setAttribute('class', 'chart');
    chartPanel.setAttribute('id', 'chart');
    chartCell.appendChild(chartPanel);

    let footHeadingsRow = table.insertRow();
    let footValuesRow = table.insertRow();
    let footSpacer1 = footHeadingsRow.insertCell();

    let troughEfficiencyCell = footHeadingsRow.insertCell();
    let trouhgEfficiencyText = document.createElement('b');
    trouhgEfficiencyText.innerHTML = 'Trough Solar-to-thermal Efficiency';
    troughEfficiencyCell.appendChild(trouhgEfficiencyText);

    let footSpacer3 = footHeadingsRow.insertCell();

    let locationHeadingCell = footHeadingsRow.insertCell();
    let locationHeadingText = document.createElement('b');
    locationHeadingText.innerHTML = 'Location';
    locationHeadingCell.appendChild(locationHeadingText);

    let latitudeHeadingCell = footHeadingsRow.insertCell();
    let latitudeHeadingText = document.createElement('b');
    latitudeHeadingText.innerHTML = 'Latitude';
    latitudeHeadingCell.appendChild(latitudeHeadingText);

    let longitudeHeadingCell = footHeadingsRow.insertCell();
    let longitudeHeadingText = document.createElement('b');
    longitudeHeadingText.innerHTML = 'Longitude';
    longitudeHeadingCell.appendChild(longitudeHeadingText);

    let dniHeadingCell = footHeadingsRow.insertCell();
    let dniHeadingText = document.createElement('b');
    dniHeadingText.innerHTML = 'Average DNI (kWh/m²/day)';
    dniHeadingCell.appendChild(dniHeadingText);

    let footSpacer2 = footValuesRow.insertCell();

    let troughEfficiencyValue = footValuesRow.insertCell();
    troughEfficiencyValue.appendChild(
        getInputElement('Solar-to-Thermal Efficiency', 'troughEfficiency', '70%', false)
    );

    let footSpacer4 = footValuesRow.insertCell();

    let locationValue = footValuesRow.insertCell();
    let locationText = document.createElement('span');
    locationValue.setAttribute('id', 'location');
    locationText.innerHTML = 'Location';
    locationValue.appendChild(locationText);

    let latitudeValue = footValuesRow.insertCell();
    let latitudeText = document.createElement('span');
    latitudeValue.setAttribute('id', 'latitude');
    latitudeText.innerHTML = 'latitude';

    latitudeValue.appendChild(latitudeText);

    let longitudeValue = footValuesRow.insertCell();
    let longitudeText = document.createElement('span');
    longitudeValue.setAttribute('id', 'longitude');
    longitudeText.innerHTML = 'longitude';
    longitudeValue.appendChild(longitudeText);

    let dniValue = footValuesRow.insertCell();
    let dniText = document.createElement('span');
    dniValue.setAttribute('id', 'avgDNI');
    dniText.innerHTML = 'dni';
    dniValue.appendChild(dniText);

    controlPanel.appendChild(table);
    /* var getCoordsRow = table.insertRow()
   var spaceCell = getCoordsRow.insertCell();
  var buttonCell = getCoordsRow.insertCell();

*/

    //addInputTableRow(table, "Latitude", "latitude", defaultLatitude, false);
    //addInputTableRow(table, "Longitude", "longitude", defaultLongitude, false);
    // addInputTableHeading(table, "Comparison Parameters");
    //addSelectBoxToRow(table, "ComparisonType", "comparisonType");
    //addInputTableRow(table, "Reflective Aperture", "aperture", defaultApertureArea, false);
    /*let row = table.insertRow();
  let labelCell = row.insertCell();
  labelCell.innerHTML= "Compare Per Meter Squared:";
  let checkboxCell = row.insertCell();
  var checkbox = document.createElement('input');
  checkbox.setAttribute("type","checkbox");
 // checkboxCell.appendChild(checkbox);*/

    //addInputTableRow(table, "Reflective Aperture", "aperture", defaultApertureArea, false);
    //addInputTableRow(table, "Trough Inclination", "troughInclination", defaultTroughInclination, false);

    //controlPanel.appendChild(getParamsPanel("focus"));
    // var comparedParams = getParamsPanel("troughSimplified");
    //comparedParams.setAttribute("id", "comparedParams");
    //controlPanel.appendChild(comparedParams);

    //var buttonTable = document.createElement('table');

    //var buttonRow = buttonTable.insertRow()
    // var calcCell = buttonRow.insertCell();
    //var calculateButton = document.createElement("button");
    // calculateButton.setAttribute("id", "calculateButton");
    // calculateButton.innerHTML = "Calculate";
    // calculateButton.addEventListener("click", onCalculateClicked);
    // calcCell.appendChild(calculateButton);

    /*var downloadCell = buttonRow.insertCell();
  var downloadButton = document.createElement("button");
  downloadButton.setAttribute("id", "downloadButton");
  downloadButton.setAttribute("disabled", "true");
  downloadButton.innerHTML = "Download CSV";
  downloadButton.addEventListener("click", onDownloadClicked);
  downloadCell.appendChild(downloadButton);*/
    // controlPanel.appendChild(buttonTable);

    //controlPanel.appendChild(getInfoBox());
    return controlPanel;
}

function getParamsPanel(comparisonType) {
    var paramPanel = document.createElement('div');
    var mainParams = document.createElement('div');

    var advancedParams = document.createElement('div');
    advancedParams.setAttribute('id', comparisonType + 'Advanced');

    switch (comparisonType) {
        case 'focus':
            mainParams.appendChild(getFocusMainParams());
            advancedParams.appendChild(getFocusAdvancedParams());
            break;
        case 'troughSimplified':
            mainParams.appendChild(getTroughSimplifiedMainParams());
            advancedParams.appendChild(getTroughSimplifiedAdvancedParams());
            break;
        case 'troughDetailed':
            mainParams.appendChild(getTroughDetailedMainParams());
            advancedParams.appendChild(getTroughDetailedAdvancedParams());
            break;
        case 'pv':
            mainParams.appendChild(getPVMainParams());
            advancedParams.appendChild(getPVAdvancedParams());
            break;
        default:
            mainParams.appendChild('slkfjew');
    }

    paramPanel.appendChild(mainParams);
    if (comparisonType !== 'troughSimplified') {
        let advancedButton = document.createElement('button');
        advancedButton.setAttribute('id', 'advancedButton' + comparisonType);
        advancedButton.innerHTML = 'show advanced';
        advancedButton.addEventListener('click', advancedButton => {
            var contentDiv = document.getElementById(comparisonType + 'Advanced');
            var button = document.getElementById('advancedButton' + comparisonType);
            if (contentDiv.style.display === 'block') {
                button.innerHTML = 'show advanced';
                contentDiv.style.display = 'none';
            } else {
                button.innerHTML = 'hide advanced';
                contentDiv.style.display = 'block';
            }
        });

        paramPanel.appendChild(advancedButton);
    }

    advancedParams.style.display = 'none';
    paramPanel.appendChild(advancedParams);
    return paramPanel;
}

function getFocusMainParams() {
    var table = document.createElement('table');
    addInputTableHeading(table, 'Focus Parabolic Dish');
    //addInputTableRow(table, "Reflective Aperture", "dishAperture", defaultApertureArea, true);

    return table;
}
function getFocusAdvancedParams() {
    var table = document.createElement('table');
    const solarWeightedReflectance = 0.88;
    const cleanliness = 0.98;
    const dishGeometricDistortions = 0.95;
    const dishThermalDistortions = 0.0012;
    const receiverStrutShadow = 0.97;
    const reflectorIntegrity = 1;
    const receiverConversionEfficiency = 0.91;
    addInputTableRow(
        table,
        'Solar Weighted Reflectance',
        'dishSolarWeightedReflectance',
        solarWeightedReflectance,
        true
    );
    addInputTableRow(table, 'Surface Cleanliness', 'dishSurfaceCleanliness', cleanliness, true);
    addInputTableRow(
        table,
        'Geometric Distortions',
        'dishGeometricDistortions',
        dishGeometricDistortions,
        true
    );
    addInputTableRow(table, 'Thermal Distortions', 'dishThermalDistortions', 0.0012, true);
    addInputTableRow(
        table,
        'Receiver Strut Shadow',
        'receiverStrutShadow',
        receiverStrutShadow,
        true
    );
    addInputTableRow(table, 'Reflector Integrity', 'reflectorIntegrity', reflectorIntegrity, true);
    addInputTableRow(
        table,
        'Receiver Conversion Efficiency',
        'receiverConversionEfficiency',
        receiverConversionEfficiency,
        true
    );

    return table;
}
function getTroughDetailedMainParams() {
    var table = document.createElement('table');
    addInputTableHeading(table, 'Trough Detailed Parameters');

    //addInputTableRow(table, "Trough Inclination", "troughDetailedInclination", defaultTroughInclination, false);

    return table;
}
function getTroughDetailedAdvancedParams() {
    var table = document.createElement('table');
    const shading = 0.98;
    const solarWeightedReflectance = 0.88;
    const cleanliness = 0.98;
    const IAM = 0.98;
    const endLosses = 0.99;
    const intercept = 0.95;
    const shieldingByBellows = 0.97;
    const glassTransmission = 0.94;
    const receiverAbsorptance = 0.95;
    const receiverThermalLosses = 0.91;

    addInputTableRow(table, 'Shading', 'shading', shading, false);
    addInputTableRow(
        table,
        'Solar Weighted Reflectance',
        'solarWeightedReflectance',
        solarWeightedReflectance,
        false
    );
    addInputTableRow(table, 'Cleanliness', 'cleanliness', cleanliness, false);
    addInputTableRow(table, 'IAM', 'IAM', IAM, false);
    addInputTableRow(table, 'endLosses', 'endLosses', endLosses, false);
    addInputTableRow(table, 'intercept', 'intercept', intercept, false);
    addInputTableRow(
        table,
        'shielding By Bellows',
        'shieldingByBellows',
        shieldingByBellows,
        false
    );
    addInputTableRow(table, 'glass Transmission', 'glassTransmission', glassTransmission, false);
    addInputTableRow(
        table,
        'receiver Absorptance',
        'receiverAbsorptance',
        receiverAbsorptance,
        false
    );
    addInputTableRow(
        table,
        'receiver Thermal Losses',
        'receiverThermalLosses',
        receiverThermalLosses,
        false
    );

    return table;
}

function getTroughSimplifiedMainParams() {
    var table = document.createElement('table');
    addInputTableHeading(table, 'Trough Simplified Parameters');
    // addInputTableRow(table, "Reflective Aperture", "aperture", defaultApertureArea, false);
    addInputTableRow(
        table,
        'Solar-to-Thermal Efficiency',
        'troughEfficiency',
        defaultTroughEfficiency,
        false
    );
    //addInputTableRow(table, "Trough Inclination", "troughSimplifiedInclination", defaultTroughInclination, false);
    return table;
}

function getTroughSimplifiedAdvancedParams() {
    var table = document.createElement('table');
    // var row = table.insertRow();
    //cell = row.insertCell();
    //cell.innerHTML = "Advanced >";
    //addInputTableRow(table, "Reflective Aperture", "aperture", defaultApertureArea, false);

    return table;
}

function getPVMainParams() {
    var table = document.createElement('table');
    addInputTableHeading(table, 'PV Main Parameters');
    addInputTableRow(table, 'Reflective Aperture', 'aperture', defaultApertureArea, false);

    return table;
}

function getPVAdvancedParams() {
    var table = document.createElement('table');
    const soiling = 0.98;
    const shading = 0.97;
    //const snow = 0 %;
    const mismatch = 0.98;
    const wiring = 0.98;
    const connections = 0.995;
    const lightInducedDegradation = 0.985;
    const nameplateRating = 0.99;
    const availability = 0.97;
    addInputTableRow(table, 'Cleanliness', 'Pvcleanliness', soiling, false);
    addInputTableRow(table, 'shading', 'shading', shading, false);
    addInputTableRow(table, 'mismatch', 'mismatch', mismatch, false);
    addInputTableRow(table, 'wiring', 'wiring', wiring, false);
    addInputTableRow(table, 'connections', 'connections', connections, false);
    addInputTableRow(
        table,
        'light Induced Degradation',
        'lightInducedDegradation',
        lightInducedDegradation,
        false
    );
    addInputTableRow(table, 'nameplate Rating', 'nameplateRating', nameplateRating, false);
    addInputTableRow(table, 'availability', 'availability', availability, false);

    return table;
}

function addSelectBoxToRow(table, labelText, id) {
    let row = table.insertRow();
    let labelCell = row.insertCell();
    var label = document.createElement('label');
    label.innerHTML = labelText + ': ';
    label.htmlFor = id;
    labelCell.appendChild(label);
    let inputCell = row.insertCell();
    var input = document.createElement('SELECT');
    input.setAttribute('class', 'comparisonType');

    var fVtroughSimplified = document.createElement('option');
    fVtroughSimplified.setAttribute('value', 'troughSimplified');
    var fVsolText = document.createTextNode('FOCUS (thermal) Vs Trough Simplified');
    fVtroughSimplified.appendChild(fVsolText);

    var fVtroughDetailed = document.createElement('option');
    fVtroughDetailed.setAttribute('value', 'troughDetailed');
    //fVcsp.setAttribute("disabled", "true");
    var fVcspText = document.createTextNode('FOCUS (thermal) Vs Trough Detailed');
    fVtroughDetailed.appendChild(fVcspText);

    var fVpv = document.createElement('option');
    fVpv.setAttribute('value', 'pv');
    // fVpv.setAttribute("disabled", "true");
    var fVpvText = document.createTextNode('FOCUS (+gen) Vs PV');
    fVpv.appendChild(fVpvText);

    //input.appendChild(fVall);
    input.appendChild(fVtroughSimplified);
    //input.appendChild(fVpv);
    input.appendChild(fVtroughDetailed);
    input.setAttribute('id', id);
    input.setAttribute('value', 'soltigua');
    input.oninput = () => redrawComparedParameters(input.id, input.value);
    inputCell.appendChild(input);
}

function redrawComparedParameters(id, selectedComparison) {
    queryMode = selectedComparison;
    console.log(selectedComparison);
    try {
        var oldparams = document.getElementById('comparedParams');
        if (oldparams !== null) {
            let newParams = getParamsPanel(selectedComparison);
            newParams.setAttribute('id', 'comparedParams');
            oldparams.parentNode.replaceChild(newParams, oldparams);
        }
    } catch (error) {
        console.log(error);
    }
}
