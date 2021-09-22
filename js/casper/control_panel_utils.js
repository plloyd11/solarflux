function getControlPanel() {
    var controlPanel = document.createElement('section');

    controlPanel.setAttribute('class', 'chart-controls');

    let addressInputDiv = getAddressInputDiv();
    let efficiencytInfoDiv = getEfficiencyInfoDiv();

    controlPanel.appendChild(addressInputDiv);
    controlPanel.appendChild(efficiencytInfoDiv);

    return controlPanel;
}

function getChartContent() {
    var chartContent = document.createElement('section');
    chartContent.setAttribute('class', 'chart-content');

    let chartDiv = getChartDiv();

    chartContent.appendChild(chartDiv);

    return chartContent;
}

function getOutputContent() {
    var outputContent = document.createElement('section');
    outputContent.classList.add('output-content');

    let troughEfficicencyDiv = getTroughEfficicencyDiv();
    let locationTableDiv = getLocationTableDiv();

    outputContent.appendChild(troughEfficicencyDiv);
    outputContent.appendChild(locationTableDiv);

    return outputContent;
}

function getAddressInputDiv() {
    var addressInputDiv = document.createElement('div');
    addressInputDiv.setAttribute('class', 'addressInputDiv');

    var label = document.createElement('label');
    label.innerHTML = '<b>Location:</b>';
    label.htmlFor = 'address';
    addressInputDiv.appendChild(label);

    let input = getInputElement('Address: ', 'address', ' Phoenix, AZ, USA', false);
    input.classList.add('input-field');

    addressInputDiv.appendChild(input);

    var getCoordsButton = document.createElement('button');
    getCoordsButton.setAttribute('class', 'primary-cta');
    getCoordsButton.innerHTML = 'Calculate';
    getCoordsButton.addEventListener('click', getCoordsFromAddress);

    addressInputDiv.appendChild(getCoordsButton);
    return addressInputDiv;
}

function getEfficiencyInfoDiv() {
    var efficiencytInfoDiv = document.createElement('div');
    efficiencytInfoDiv.setAttribute('class', 'efficiencyInfoDiv');

    var label = document.createElement('span');
    label.setAttribute('id', 'efficiencyLabel');
    label.innerHTML = 'FOCUS vs. Trough Efficiency %:';
    label.htmlFor = 'efficiency';
    efficiencytInfoDiv.appendChild(label);

    let efficiencyText = document.createElement('span');
    efficiencyText.setAttribute('id', 'efficiency');
    efficiencyText.style.color = '#10B981';
    efficiencyText.innerHTML = '+0%';
    efficiencytInfoDiv.appendChild(efficiencyText);

    var downloadButton = document.createElement('button');
    var downloadIcon = document.createElement('img');
    downloadIcon.style.width = '100%';

    downloadIcon.setAttribute('src', 'download_icon.png');

    downloadButton.setAttribute('id', 'downloadButton');
    downloadButton.setAttribute('class', 'secondary-btn');

    //downloadButton.appendChild(downloadIcon);
    downloadButton.innerHTML = 'Download CSV';
    downloadButton.addEventListener('click', exportTableToCSV);
    efficiencytInfoDiv.appendChild(downloadButton);

    return efficiencytInfoDiv;
}

function getChartDiv() {
    var chartDiv = document.createElement('div');
    chartDiv.setAttribute('class', 'chart');
    chartDiv.setAttribute('id', 'chart');
    return chartDiv;
}

function getTroughEfficicencyDiv() {
    var troughEfficicencyDiv = document.createElement('div');
    troughEfficicencyDiv.setAttribute('class', 'troughEfficiencyDiv');

    let label = document.createElement('label');
    label.htmlFor = 'troughEfficiency';
    label.setAttribute('id', 'troughEfficiencyLabel');
    label.innerHTML = '<b>Trough Solar-to-thermal Efficiency:</b>';
    troughEfficicencyDiv.appendChild(label);

    let troughInput = getInputElement(
        'Solar-to-Thermal Efficiency',
        'troughEfficiency',
        '70%',
        false
    );
    troughEfficicencyDiv.appendChild(troughInput);
    troughInput.classList.add('input-field');

    return troughEfficicencyDiv;
}
function getLocationTableDiv() {
    var locationTableDiv = document.createElement('div');
    locationTableDiv.setAttribute('class', 'locationTableDiv');

    var table = document.createElement('table');
    table.classList.add('table-auto');
    let footHeadingsRow = table.insertRow();
    let footValuesRow = table.insertRow();

    let locationHeadingCell = footHeadingsRow.insertCell();
    locationHeadingCell.setAttribute('colspan', '3');
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

    let locationValue = footValuesRow.insertCell();
    locationValue.setAttribute('colspan', '3');
    let locationText = document.createElement('span');
    locationValue.setAttribute('id', 'location');
    locationText.innerHTML = 'Location';
    locationValue.appendChild(locationText);

    let latitudeValue = footValuesRow.insertCell();
    let latitudeText = document.createElement('span');
    latitudeValue.setAttribute('id', 'latitude');
    latitudeText.innerHTML = 'Latitude';

    latitudeValue.appendChild(latitudeText);

    let longitudeValue = footValuesRow.insertCell();
    let longitudeText = document.createElement('span');
    longitudeValue.setAttribute('id', 'longitude');
    longitudeText.innerHTML = 'Longitude';
    longitudeValue.appendChild(longitudeText);

    let dniValue = footValuesRow.insertCell();
    let dniText = document.createElement('span');
    dniValue.setAttribute('id', 'avgDNI');
    dniText.innerHTML = 'dni';
    dniValue.appendChild(dniText);

    locationTableDiv.appendChild(table);

    return locationTableDiv;
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
