let currentBaseHours = 0;
let currentPackageName = "";

const pricing = {
    tier1: { base: { 3: 1350, 4: 1650, 5: 1950, 6: 2250 }, extra: 250 },
    tier2: { base: { 3: 1950, 4: 2350, 5: 2750, 6: 3150 }, extra: 350 },
    tier3: { base: { 3: 2550, 4: 3050, 5: 3550, 6: 4050 }, extra: 450 }
};

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function selectPackage(name, hours) {
    currentPackageName = name;
    currentBaseHours = hours;
    document.getElementById('selected-pkg-name').innerText = "Personalize: " + name;
    document.getElementById('customizer').classList.remove('hidden');
    updateEstimate();
    scrollToSection('customizer');
}

function updateEstimate() {
    const guests = parseInt(document.getElementById('calc-guests').value) || 0;
    const miles = parseInt(document.getElementById('calc-miles').value) || 0;
    const extraHours = parseInt(document.getElementById('calc-extra-hours').value) || 0;
    const menuUpgrade = document.getElementById('calc-menu').checked;

    let tierKey = 'tier1';
    let bartenders = 1;
    if (guests > 50 && guests <= 100) { tierKey = 'tier2'; bartenders = 2; }
    if (guests > 100) { tierKey = 'tier3'; bartenders = 3; }
    
    if (guests > 150) {
        document.getElementById('estimate-total').innerText = "Custom Quote";
        document.getElementById('estimate-details').innerText = "Events over 150 guests require custom staffing.";
        return;
    }

    let total = pricing[tierKey].base[currentBaseHours];
    total += (extraHours * pricing[tierKey].extra);

    let travelFee = 0;
    if (miles > 35) {
        travelFee = 100 + ((miles - 35) * 0.50);
    }
    total += travelFee;
    if (menuUpgrade) total += 150;

    document.getElementById('estimate-total').innerText = `$${total.toFixed(2)}`;
    const details = `${currentPackageName} (${currentBaseHours + extraHours} hrs) | ${bartenders} Bartender(s) | Travel: $${travelFee.toFixed(2)}`;
    document.getElementById('estimate-details').innerText = details;
    document.getElementById('form-summary').value = `Package: ${details} | Total Estimate: $${total.toFixed(2)}`;
}