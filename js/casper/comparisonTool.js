this.onload = function() {
    initComparisonTool();
    var tag = document.createElement('script');
    tag.src = '/js/casper/nasa_direct.js';
    document.getElementsByTagName('head')[0].appendChild(tag);
};

references = [
    {
        refText: 'DNI data courtesy of NASA Atmospheric Science Data Center.',
        refURL: 'https://power.larc.nasa.gov/data-access-viewer/'
    },
    {
        refText:
            'See here for description of methodology behind CSP Performance Comparison Tool –BETA',
        refURL: '/static/resources/CASPER.pdf'
    }
];

let chart = null;
let downloadTable = null;
let queryMode = 'troughSimplified';

const defaultApertureArea = 1; //13.94;
const defaultLatitude = 33.4;
const defaultLongitude = -112.1;
const defaultTroughEfficiency = '70%';
const defaultPanelInclination = 0;

let selectedApertureArea = defaultApertureArea;
let selectedLatitude = defaultLatitude;
let selectedLongitude = defaultLongitude;
const selectedTroughInclination = 0; //= defaultTroughInclination;

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const TableColumns = [
    'Month',
    'DNI (kWh/m²/Day)',
    'Incident Energy (kWh/m²/Day)',
    'Focus Peak Solar-to-Thermal Efficiency',
    'Focus Cosine Effect',
    'Focus Average Solar-to-Thermal Efficiency',
    'Focus Energy Collected (kWh/day)',
    'Trough Peak Solar-to-Thermal Efficiency',
    'Trough Cosine Effect',
    'Trough Average Solar-to-Thermal Efficiency',
    'Trough Energy Collected (kWh/day)',
    'FOCUS Dish vs Trough'
];

async function getComparisonData() {
    let focusParams = {};
    let comparisonParmas = {};
    let comparisonLabel = '';
    let comparisonData = [];
    //console.log(queryMode);
    switch (queryMode) {
        case 'troughDetailed':
            comparisonLabel = 'CSP Trough';
            break;
        case 'troughSimplified':
            comparisonLabel = 'CSP Trough';
            break;
        //case "pv":
        // comparisonLabel = "Photovoltaic";
        // break;
        default:
    }

    //let troughData = [];
    let soltiguaData = [];
    let dishData = [];
    let pvData = [];
    let incidentData = [];
    const latIndex = Math.round(selectedLatitude).toString();
    const lngIndex = Math.round(selectedLongitude).toString();

    if (typeof nasaDirect == 'undefined' && (latIndex != 33 || lngIndex != -112)) {
        console.log(latIndex);
        console.log(lngIndex);
        console.log('nasa data not loaded');
        button = document.getElementById('getCoordsButton');
        button.setAttribute('enabled', 'false');
        button.innerHTML = 'Loading Data';
        while (typeof nasaDirect == 'undefined') {
            console.log('delaying for data');
            await new Promise(r => setTimeout(r, 500));
        }
        button.setAttribute('enabled', 'true');
        button.innerHTML = 'Calculate';
    } else {
        console.log('nasa data loaded');
        console.log(typeof nasaDirect);
        console.log(latIndex);
        console.log(lngIndex);
    }

    document.getElementById('avgDNI').innerHTML = getAvgIncidentAtCoordsForYear(
        selectedLatitude,
        selectedLongitude
    );
    for (let month = 0; month < 12; month++) {
        dishData.push(
            getDishCollected(selectedLatitude, selectedLongitude, month, selectedApertureArea)
        );
        incidentData.push(
            getAverageIncidentAtCoords(selectedLatitude, selectedLongitude, month) *
                selectedApertureArea
        );
        if (queryMode === 'troughSimplified') {
            comparisonData.push(
                getSoltiguaCollected(
                    selectedLatitude,
                    selectedLongitude,
                    month,
                    selectedApertureArea,
                    selectedTroughInclination
                )
            );
        } else {
            comparisonData.push(
                getTroughCollected(
                    selectedLatitude,
                    selectedLongitude,
                    month,
                    selectedApertureArea,
                    selectedTroughInclination
                )
            );
        }
    }

    // /console.log(comparisonData);
    let APIresponse = await getPVCollected(
        selectedLatitude,
        selectedLongitude,
        1,
        defaultPanelInclination,
        selectedApertureArea
    );
    //console.log(APIresponse);
    pvData = APIresponse.outputs.ac_monthly.map(a => a / 100);
    //console.log(pvData);
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Average Direct Normal Irradiance by day',
                data: incidentData,
                fill: false,
                borderColor: 'yellow',
                tension: 0.1
            },
            {
                label: 'FOCUS Parabolic Dish',
                data: dishData,
                fill: false,
                borderColor: 'rgb(247, 151, 7)',
                tension: 0.1
            },
            {
                label: comparisonLabel,
                data: comparisonData,
                fill: false,
                borderColor: 'rgb(75, 192, 255)',
                tension: 0.5
            }
        ]
    };
    initChart(data);
    initTable(incidentData, dishData, comparisonData);
}

function getCoordsFromAddress() {
    //EXAMPLE "https://nominatim.openstreetmap.org/search?q=+Reading,+PA,+USA&format=json"
    let apiURL = 'https://nominatim.openstreetmap.org/search?q=';
    const formatString = '&format=json';

    var address = document.getElementById('address').value;
    var addressParts = address.split(/[ ,]+/);
    addressParts.forEach(part => {
        apiURL += '+' + part;
    });
    apiURL += formatString;

    let apiResponse = fetch(apiURL)
        .then(data => data.json())
        .then(json => {
            if (json.length > 0) {
                const discoveredLat = Number(json[0].lat).toFixed(1);
                const discoveredLng = Number(json[0].lon).toFixed(1);

                document.getElementById('location').innerHTML = address;
                document.getElementById('latitude').innerHTML = discoveredLat;
                selectedLatitude = json[0].lat;
                document.getElementById('longitude').innerHTML = discoveredLng;
                selectedLongitude = json[0].lon;

                getComparisonData();
            } else {
                alert('Unable to find this address. Please try typing it differently');
            }
        });
}

function initComparisonTool() {
    var container = getContainer();
    getCoordsFromAddress();
}

function getContainer() {
    var container = document.getElementById('comparisonTool');
    container.setAttribute('class', 'container');

    var headingBar = getHeadingBar();
    container.appendChild(headingBar);

    var controlPanel = getControlPanel();
    container.appendChild(controlPanel);

    var chartContent = getChartContent();
    container.appendChild(chartContent);

    var outputContent = getOutputContent();
    container.appendChild(outputContent);

    var footer = getFooterBar();
    container.appendChild(footer);

    return container;
}

function getFooterBar() {
    const div = document.createElement('section');
    const dividerLine = document.createElement('hr');
    div.appendChild(dividerLine);

    var notesLabel = document.createElement('h4');
    // referencesButton.setAttribute("id", "referencesButton");
    notesLabel.innerHTML = 'Notes:';
    notesLabel.classList.add('mt-4');
    // referencesButton.addEventListener("click", onShowRefClicked);
    div.appendChild(notesLabel);

    var contentDiv = document.createElement('div');
    //contentDiv.setAttribute("class", "refContent");
    // contentDiv.setAttribute("id", "references");

    contentDiv.appendChild(getReferences());

    contentDiv.classList.add('notes');

    div.appendChild(contentDiv);

    return div;
}

function getReferences() {
    var ol = document.createElement('ol');
    references.forEach(ref => {
        var li = document.createElement('li');
        var a = document.createElement('a');
        var linkText = document.createTextNode(ref.refText);
        a.appendChild(linkText);
        a.title = ref.refText;
        a.href = ref.refURL;
        li.appendChild(a);
        ol.appendChild(li);
    });
    return ol;
}

function onShowRefClicked() {
    var contentDiv = document.getElementById('references');
    if (contentDiv.style.display === 'block') {
        contentDiv.style.display = 'none';
    } else {
        contentDiv.style.display = 'block';
    }
}

function getHeadingBar() {
    const div = document.createElement('div');
    // const logo = document.createElement("img");
    //logo.src =  "./solarfluxLogo.png";
    //logo.height = "50%";
    //div.appendChild(logo);
    const title = document.createElement('h2');
    title.innerHTML = 'CASPER - CSP Performance Comparison';
    title.setAttribute('id', 'title');
    title.setAttribute('class', 'section-header');
    div.setAttribute('class', 'titleBar');
    const dividerLine = document.createElement('hr');
    div.appendChild(title);
    div.appendChild(dividerLine);
    return div;
}

function getChartPanel() {
    var chartPanel = document.createElement('div');
    chartPanel.setAttribute('class', 'chart');
    chartPanel.setAttribute('id', 'chart');
    return chartPanel;
}

function onValueChange(id, value) {
    if (id === 'aperture') {
        selectedApertureArea = value;
    } else if (id === 'longitude') {
        selectedLongitude = value;
    } else if (id === 'latitude') {
        selectedLatitude = value;
    }
    if (id !== 'address' && id !== 'troughEfficiency') {
        let warningSpan = document.getElementById(id + 'Warning');
        if (isNaN(value)) {
            warningSpan.style.visibility = 'visible';
        } else {
            warningSpan.style.visibility = 'collapse';
        }
    }

    let calculateButton = document.getElementById('calculateButton');
    if (isNaN(selectedLatitude) || isNaN(selectedLongitude) || isNaN(selectedApertureArea)) {
        // calculateButton.setAttribute("disabled", "true");
    } else {
        //calculateButton.removeAttribute("disabled");
    }
}

function onCalculateClicked() {
    getComparisonData();
}

function onDownloadClicked() {
    console.log('Download clicked');
}

function addInputTableHeading(table, text) {
    var tableHead = table.createTHead();
    let row = tableHead.insertRow();
    let labelCell = row.insertCell();
    let headingText = document.createElement('h4');
    headingText.innerHTML = text;
    labelCell.setAttribute('colspan', '2');
    labelCell.appendChild(headingText);
}

function getInputElement(labelText, id, defaultValue, disabled) {
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', defaultValue);
    input.setAttribute('id', id);
    input.disabled = disabled;
    input.oninput = () => {
        onValueChange(id, input.value);
    };
    return input;
}

function addInputTableRow(table, labelText, id, defaultValue, disabled) {
    let row = table.insertRow();
    let labelCell = row.insertCell();
    var label = document.createElement('label');
    label.innerHTML = labelText + ': ';
    label.htmlFor = id;
    labelCell.appendChild(label);
    let inputCell = row.insertCell();
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', defaultValue);
    input.setAttribute('id', id);
    input.disabled = disabled;
    input.oninput = () => {
        onValueChange(id, input.value);
    };
    inputCell.appendChild(input);
    if (id !== 'address') {
        let warningCell = row.insertCell();
        let inputWarning = document.createElement('span');
        inputWarning.innerHTML = '*INVALID ' + labelText;
        inputWarning.setAttribute('class', 'coordWarning');
        inputWarning.setAttribute('id', id + 'Warning');
        inputWarning.style.visibility = 'hidden';
        warningCell.appendChild(inputWarning);
    }
}

function getInfoBox() {
    let infoContainer = document.createElement('div');
    infoContainer.setAttribute('class', 'infoContainer');

    let divider = document.createElement('hr');
    infoContainer.appendChild(divider);

    let headingText = document.createElement('h4');
    headingText.innerHTML = 'Information';
    infoContainer.appendChild(headingText);

    let textArea = document.createElement('textArea');
    textArea.setAttribute('class', 'infoTextArea');
    textArea.setAttribute('readOnly', 'true');
    textArea.innerHTML = 'DNI data courtesy of NASA Atmospheric Science Data Center.';
    infoContainer.appendChild(textArea);
    return infoContainer;
}

function initChart(data) {
    var canvasID = 'chartCanv';

    if (!document.getElementById(canvasID)) {
        //console.log("No old Canvas");
        canv = document.createElement('canvas');
        canv.id = canvasID;
        var chartcontainer = document.getElementById('chart');
        chartcontainer.appendChild(canv);
    }

    if (chart !== null) {
        chart.destroy();
    }

    var ctx = document.getElementById(canvasID);

    chart = new Chart(ctx, {
        type: ['line'],
        data: data,
        options: {
            scales: {
                yAxes: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value, index, values) {
                            return value;
                        }
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Estimated Energy Collection (kWh/m²/day)'
                }
            }
        }
    });
    chart.update();
    return chart;
}

function exportTableToCSV() {
    var csv = [];
    var rows = downloadTable.rows;

    for (var i = 1; i < rows.length; i++) {
        var row = [],
            cols = rows[i].querySelectorAll('td, th');

        for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);

        csv.push(row.join(','));
    }
    // Download CSV file
    downloadCSV(csv.join('\n'));
}

function downloadCSV(csv) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {
        type: 'text/csv'
    });

    // Download link
    downloadLink = document.createElement('a');

    // File name
    downloadLink.download = 'SolarfluxCSPComparison.csv';

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = 'none';

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function initTable(available, dish, trough) {
    try {
        var oldTable = document.getElementById('dataTable');
        if (oldTable !== null) {
            oldTable.parentNode.removeChild(oldTable);
        }
    } catch (error) {
        console.log(error);
    }

    var table = document.createElement('table');
    table.setAttribute('id', 'dataTable');
    table.appendChild(getTableHead(table));
    //Add rows for 12 months
    for (var i = 0; i < 12; i++) {
        let row = table.insertRow();
        let rowData = getTableDataForMonth(i, available, dish, trough);
        for (let key in rowData) {
            let cell = row.insertCell();
            let value = document.createTextNode(rowData[key]);
            cell.appendChild(value);
        }
    }
    //Add Averages row
    getAveragesRow(table);
    //ADD Sum Row
    getSumsRow(table);

    function getWeightedPerformanceDelta(table) {
        focusWeightedSum = table.rows[15].cells[6].innerHTML.replace(/(<([^>]+)>)/gi, '');
        troughWeightedSum = table.rows[15].cells[10].innerHTML.replace(/(<([^>]+)>)/gi, '');
        weightedPerformanceDelta = Number((focusWeightedSum / troughWeightedSum - 1) * 100).toFixed(
            2
        );
        return weightedPerformanceDelta;
    }

    var chartcontainer = document.getElementById('chart');
    document.getElementById('efficiency').innerHTML =
        '+' + getWeightedPerformanceDelta(table) + '%';
    downloadTable = table;
    //chartcontainer.appendChild(table);
}
function getAveragesRow(table) {
    let avgsRow = table.insertRow();
    let title = avgsRow.insertCell();
    title.innerHTML = '<b>Annual Avg.</b>';
    for (var i = 1; i < 12; i++) {
        let cell = avgsRow.insertCell();
        if (i > 1 && i % 2 != 0) {
            cell.innerHTML = '<b>' + Number(getAvgOfTableColumn(table, i)).toFixed(2) + '%</b>';
        } else {
            cell.innerHTML = '<b>' + Number(getAvgOfTableColumn(table, i)).toFixed(2) + '</b>';
        }
        if (i == 11) {
            cell.innerHTML = '<b>+' + Number(getAvgOfTableColumn(table, i)).toFixed(2) + '%</b>';
        }
    }
}

function getSumsRow(table) {
    let sumRow = table.insertRow();
    let title = sumRow.insertCell();
    title.innerHTML = '<b>Annual Total (kWh/yr)</b>';

    const sumAvgPerDay = Number(getSumOfTableColumn(table, 1)).toFixed(2);
    let sumAvgPerDayCell = sumRow.insertCell();
    sumAvgPerDayCell.innerHTML = '<b>' + sumAvgPerDay + '</b>';

    const sumIncidentPerDay = Number(getSumOfTableColumn(table, 2)).toFixed(2);
    let incidentSum = sumRow.insertCell();
    incidentSum.innerHTML = '<b>' + sumIncidentPerDay + '</b>';
    //add blank cell. You cant get the sum of the efficiency percentage
    sumRow.insertCell();
    sumRow.insertCell();
    sumRow.insertCell();
    const sumDishCollectedPerDay = Number(getSumOfTableColumn(table, 6)).toFixed(2);
    let dishCollected = sumRow.insertCell();
    dishCollected.innerHTML = '<b>' + sumDishCollectedPerDay + '</b>';

    //add blank cell. You cant get the sum of the efficiency percentage
    sumRow.insertCell();
    sumRow.insertCell();
    sumRow.insertCell();
    const sumTroughCollectedPerDay = Number(getSumOfTableColumn(table, 10)).toFixed(2);
    let troughCollected = sumRow.insertCell();
    troughCollected.innerHTML = '<b>' + sumTroughCollectedPerDay + '</b>';

    sumRow.insertCell();
}

function getTableHead(table) {
    var tableHead = table.createTHead();

    var topRow = tableHead.insertRow();
    let spacer = document.createElement('th');
    spacer.setAttribute('colspan', '3');
    topRow.appendChild(spacer);

    let dishTitle = document.createElement('th');
    dishTitle.setAttribute('class', 'heading');
    dishTitle.setAttribute('colspan', '4');
    let dishTitleText = document.createTextNode('FOCUS Parabolic Dish');
    dishTitle.appendChild(dishTitleText);

    let troughTitle = document.createElement('th');
    troughTitle.setAttribute('class', 'heading');
    troughTitle.setAttribute('colspan', '4');
    let troughTitleText = document.createTextNode('Parabolic Trough');

    troughTitle.appendChild(troughTitleText);

    topRow.appendChild(dishTitle);
    topRow.appendChild(troughTitle);
    topRow.insertCell();

    let row = tableHead.insertRow();

    TableColumns.forEach(column => {
        let text = document.createTextNode(column);
        let th = document.createElement('th');
        th.appendChild(text);
        row.appendChild(th);
    });
    return tableHead;
}

function getTableDataForMonth(month, available, dish, trough) {
    const monthText = labels[month];
    const avgKWattsPerMPerDay = Number(
        getAverageIncidentAtCoords(selectedLatitude, selectedLongitude, month)
    ).toFixed(2);
    const avgIncident = Number(avgKWattsPerMPerDay * selectedApertureArea).toFixed(2);

    const dishPeakEfficiency =
        Number(getDishEfficiency(avgKWattsPerMPerDay) * 100).toFixed(2) + '%';
    const dishCosineEffect = Number(1.0).toFixed(2);
    const dishAverageEfficiency = dishPeakEfficiency;
    const dishCollected = dish[month];
    let troughPeakEfficiency = 0;
    if (queryMode == 'troughSimplified') {
        troughPeakEfficiency = document.getElementById('troughEfficiency').value; //Number(getTroughEfficiency(selectedLatitude, selectedLongitude, month, selectedTroughInclination)*100).toFixed(2)+"%";
    } else {
        troughPeakEfficiency =
            Number(
                getTroughEfficiency(
                    selectedLatitude,
                    selectedLongitude,
                    month,
                    selectedTroughInclination
                ) * 100
            ).toFixed(2) + '%';
    }
    const troughCosine = Number(
        getSingleAxisCosineEffect(
            selectedLatitude,
            selectedLongitude,
            month,
            selectedTroughInclination
        )
    ).toFixed(2);

    const troughAverageEfficiency =
        Number(troughPeakEfficiency.replace(/[^\d.-]/g, '') * troughCosine).toFixed(2) + '%';
    const troughCollected = Number(trough[month]).toFixed(2);

    const dishVsTrough =
        '+' + Number((dishCollected / troughCollected) * 100 - 100).toFixed(2) + '%';

    const monthsData = {
        monthText,
        avgKWattsPerMPerDay,
        avgIncident,

        dishPeakEfficiency,
        dishCosineEffect,
        dishAverageEfficiency,
        dishCollected,

        troughPeakEfficiency,
        troughCosine,
        troughAverageEfficiency,
        troughCollected,

        dishVsTrough
    };
    return monthsData;
}

function getAvgOfTableColumn(table, columnNumber) {
    var row = table.rows;
    let sum = 0;
    for (var i = 2, row; i <= 13; i++) {
        let cleanedNumber = table.rows[i].cells[columnNumber].innerHTML.replace(/[^\d.-]/g, '');
        sum += Number(cleanedNumber);
    }
    return sum / 12;
}
function getSumOfTableColumn(table, columnNumber) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var row = table.rows;
    let sum = 0;
    for (var i = 1, row; i <= 12; i++) {
        let cleanedNumber = table.rows[i].cells[columnNumber].innerHTML.replace(/[^\d.-]/g, '');
        sum += Number(cleanedNumber) * daysInMonth[i - 1];
    }
    return sum;
}
