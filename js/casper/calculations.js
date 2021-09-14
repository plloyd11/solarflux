labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
phoenixData = [5.73, 6.1, 7.36, 8.75, 9.06, 8.8, 7.27, 6.55, 7.27, 6.75, 6.33, 5.59];
const NOON_HOUR = 12;

function getAverageIncidentAtCoords(lat, lng, monthOfYear) {
    const latIndex = Math.round(lat).toString();
    const lngIndex = Math.round(lng).toString();
    if (latIndex == 33 && lngIndex == -112) {
        return phoenixData[monthOfYear];
    } else {
        return nasaDirect[latIndex][lngIndex][monthOfYear];
    }
}

function getAvgIncidentAtCoordsForYear(lat, lng) {
    const latIndex = Math.round(lat).toString();
    const lngIndex = Math.round(lng).toString();

    let sumValues = 0;
    for (var i = 0; i <= 11; i++) {
        if (latIndex == 33 && lngIndex == -112) {
            sumValues += Number(phoenixData[i]);
        } else {
            sumValues += Number(nasaDirect[latIndex][lngIndex][i]);
        }
    }
    //console.log(sumValues);
    return Number(sumValues / 12).toFixed(2);
}

function getAverageDiffuseIncidentAtCoords(lat, lng, monthOfYear) {
    const latIndex = Math.round(lat).toString();
    const lngIndex = Math.round(lng).toString();
    //console.log(nasaDirect);
    return nasaDiffuse[latIndex][lngIndex][monthOfYear];
}

function getTroughCollected(lat, lng, monthOfYear, apertureArea, troughInclination) {
    const efficiency = getTroughEfficiency(lat, lng, monthOfYear, troughInclination);
    const incidentEnergy = getAverageIncidentAtCoords(lat, lng, monthOfYear);
    const collectedEnergyPerMeter = incidentEnergy * efficiency;
    const totalCollectedEnergy = Number.parseFloat(
        Number(collectedEnergyPerMeter * apertureArea).toFixed(2)
    );
    return totalCollectedEnergy;
}

function getSoltiguaCollected(lat, lng, monthOfYear, apertureArea, troughInclination) {
    // console.log(lat);
    const param_cosineEffect = getSingleAxisCosineEffect(lat, lng, monthOfYear, troughInclination);
    //console.log(param_cosineEffect);
    const incidentEnergy = getAverageIncidentAtCoords(lat, lng, monthOfYear);
    let efficencyRating =
        document.getElementById('troughEfficiency').value.replace(/[^\d.-]/g, '') / 100;

    const efficiency = efficencyRating * param_cosineEffect;
    const collectedEnergyPerMeter = incidentEnergy * efficiency;
    const totalCollectedEnergy = Number.parseFloat(
        Number(collectedEnergyPerMeter * apertureArea).toFixed(2)
    );
    // console.log(efficencyRating);
    return totalCollectedEnergy;
}

function getDishCollected(lat, lng, monthOfYear, apertureArea) {
    const incidentEnergy = getAverageIncidentAtCoords(lat, lng, monthOfYear);
    const efficiency = getDishEfficiency(incidentEnergy);
    const collectedEnergyPerMeter = incidentEnergy * efficiency;
    const totalCollectedEnergy = Number.parseFloat(
        Number(collectedEnergyPerMeter * apertureArea).toFixed(2)
    );
    return totalCollectedEnergy;
}
function getPVCollected(lat, lng, monthOfYear, panelInclination, apertureArea) {
    let arrayAzimuth = 180;
    let arrayCapacity = 4; //kw

    // 0 = Fixed - Open Rack
    // 1 = Fixed - Roof Mounted
    // 2 = 1-Axis
    // 3 = 1-Axis Backtracking
    // 4 = 2-Axis
    let arrayType = 1;

    //Module types
    // 0 = Standard
    // 1 = Premium
    let moduleType = 0;

    let losses = getPVEfficiency();
    //console.log(losses);
    url =
        'https://developer.nrel.gov/api/pvwatts/v6.json?api_key=DEMO_KEY&lat=40.5&lon=-75&system_capacity=6&azimuth=180&tilt=40&array_type=4&module_type=1&losses=10';

    let apiResponse = fetch(url)
        .then(data => data.json())
        .then(json => {
            return json;
        });
    return apiResponse;
}

function getPVEfficiency() {
    let soiling = 0.98;
    let shading = 0.97;
    // let snow = 0 %;
    let mismatch = 0.98;
    let wiring = 0.98;
    let connections = 0.995;
    let lightInducedDegradation = 0.985;
    let nameplateRating = 0.99;
    let availability = 0.97;

    let losses =
        soiling *
        shading *
        mismatch *
        wiring *
        connections *
        lightInducedDegradation *
        nameplateRating *
        availability;
    return 100 - losses * 100;
}

function getTroughEfficiency(lat, lng, monthOfYear, troughInclination) {
    const param_cosineEffect = getSingleAxisCosineEffect(lat, lng, monthOfYear, troughInclination);
    const param_shading = document.getElementById('shading').value; //0.98;
    const param_solarWeightedReflectance = document.getElementById('solarWeightedReflectance')
        .value; //0.88;
    const param_cleanliness = document.getElementById('cleanliness').value; //0.98;
    const param_IAM = document.getElementById('IAM').value; //0.98;
    const param_endLosses = document.getElementById('endLosses').value; //0.99;
    const param_intercept = document.getElementById('intercept').value; //0.95;
    const param_shieldingByBellows = document.getElementById('shieldingByBellows').value; //0.97;
    const param_glassTransmission = document.getElementById('glassTransmission').value; //0.94;
    const param_receiverAbsorptance = document.getElementById('receiverAbsorptance').value; //0.95;
    const param_receiverThermalLosses = document.getElementById('receiverThermalLosses').value; //0.91;

    const troughEfficiency =
        param_cosineEffect *
        param_shading *
        param_solarWeightedReflectance *
        param_cleanliness *
        param_IAM *
        param_endLosses *
        param_intercept *
        param_shieldingByBellows *
        param_glassTransmission *
        param_receiverAbsorptance *
        param_receiverThermalLosses;
    return troughEfficiency;
}
function getPVEfficiencyOld(lat, lng, monthOfYear, panelInclination) {
    const param_cosineEffect = 1; //getFixedAxisCosineEffect(lat, lng, monthOfYear, panelInclination);
    //TODO, use actual pv efficieny calcuilations
    const PLACEHOLDER_EFFICIENCY = 0.19; //assume 19 percent effiency
    return param_cosineEffect * PLACEHOLDER_EFFICIENCY;
}

function getSingleAxisCosineEffect(lat, lng, monthOfYear, troughInclination) {
    let sumIncidenceAngles = 0;
    for (var i = 1; i <= daysInMonth[monthOfYear]; i++) {
        let date = getLocalisedDate(lng, i, NOON_HOUR, monthOfYear);
        const solarPos = SunCalc.getPosition(date, lat, lng);

        const angleOfIncidence = solarPos.zenithInRads - degrees_to_radians(troughInclination);
        sumIncidenceAngles += angleOfIncidence;
        //console.log("month:"+monthOfYear+"  day:"+i+" :"+Math.cos(angleOfIncidence));
    }
    let avgIncidenceAngle = sumIncidenceAngles / daysInMonth[monthOfYear];

    let monthlyAvgCosine = Math.cos(avgIncidenceAngle);
    //console.log("avg incidenge angle"+radians_to_degrees(avgIncidenceAngle));
    //console.log("monthlyAvgCosine "+monthlyAvgCosine);

    return monthlyAvgCosine;
}
function radians_to_degrees(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
}

function getFixedAxisCosineEffect(lat, lng, monthOfYear, panelInclination) {
    let sumMonthsIncidenceAngles = 0;
    for (var i = 1; i <= daysInMonth[monthOfYear]; i++) {
        const daysAngleOfIncidence = getAvgSolarZenithForDay(
            lat,
            lng,
            i,
            monthOfYear,
            panelInclination
        );
        sumMonthsIncidenceAngles += daysAngleOfIncidence;
        //console.log("month:"+monthOfYear+"  day:"+i+" :"+Math.cos(daysAngleOfIncidence));
    }
    let avgIncidenceAngle = sumMonthsIncidenceAngles / daysInMonth[monthOfYear];
    let monthlyAvgCosine = Math.cos(avgIncidenceAngle);
    // console.log(monthlyAvgCosine);
    return monthlyAvgCosine;
}

// for each hour from sunrise to noon, get the solar elevation.
// the average of all these hours should proved average incidence angle for pv cells
function getAvgSolarZenithForDay(lat, lng, day, month, panelInclination) {
    let date = getLocalisedDate(lng, 1, NOON_HOUR, 7);
    let x = SunCalc.getTimes(date, lat, lng, 0);
    var sunrise = x.sunrise;
    var noon = x.solarNoon;

    var diff = Math.round((noon - sunrise) / 1000 / 60 / 60);

    var sumIncidenceAngles = 0;

    for (var i = 0; i < diff; i++) {
        elevationTime = getLocalisedDate(lng, 1, NOON_HOUR - i, 7);
        let solarPos = SunCalc.getPosition(elevationTime, lat, lng);
        sumIncidenceAngles += solarPos.zenithInRads - degrees_to_radians(panelInclination);
    }
    return sumIncidenceAngles / diff;
}

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

function getThermalDistortion(dailyAvgIncident) {
    const dishThermalDistortions = 1 - 0.0012 * dailyAvgIncident;
    return dishThermalDistortions;
}

function getDishEfficiency(dailyAvgIncident) {
    const param_solarWeightedReflectance = 0.88;
    const param_cleanliness = 0.98; // was .99 changed to fix percentage
    const para_DishGeometricDistortions = 0.95;
    const para_DishThermalDistortions = 1 - 0.0012 * dailyAvgIncident;
    const param_receiverStrutShadow = 0.97;
    const param_reflectorIntegrity = 1;
    const param_receiverConversionEfficiency = 0.91;

    const dishEfficiency =
        param_solarWeightedReflectance *
        param_cleanliness *
        para_DishGeometricDistortions *
        para_DishThermalDistortions *
        param_receiverStrutShadow *
        param_reflectorIntegrity *
        param_receiverConversionEfficiency;
    return dishEfficiency;
}

function getLocalisedDate(lng, day, hour, monthOfYear) {
    let direction = -1; //default to west of Grenwich
    if (lng >= 0) {
        direction = 1;
    }
    let offset = ((direction * lng * 24) / 360) * 60 * 60 * 1000;
    let userTime = new Date(Date.UTC(2021, monthOfYear, day, hour, 0, 0));
    let utcTime = new Date(userTime.toUTCString());
    let queryLocalDate = new Date(utcTime.getTime() + offset * (direction * -1));
    // console.log(queryLocalDate);
    return queryLocalDate;
}
