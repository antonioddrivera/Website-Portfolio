function handleSelection() {
    const majorMinorDropdown = document.getElementById('majorMinor');
    const keyDropdown = document.getElementById('key');
    const majorList = document.getElementById('majorList');
    const minorList = document.getElementById('minorList');

    const majorMinorValue = majorMinorDropdown.value;
    const keyValue = keyDropdown.value;

    // Check if both dropdowns have selections to show the appropriate scale menu
    if (majorMinorValue && keyValue) {
        if (majorMinorValue === 'Major') {
            majorList.style.display = 'block';
            minorList.style.display = 'none';
        } else if (majorMinorValue === 'Minor') {
            majorList.style.display = 'none';
            minorList.style.display = 'block';
        }
    } else {
        majorList.style.display = 'none';
        minorList.style.display = 'none';
    }

    // Update the selected values for majorMinor and key dropdowns
    updateSelectedValues(majorMinorValue, keyValue);

    // Update dropdown colors based on selection
    updateDropdownColor(majorMinorDropdown);
    updateDropdownColor(keyDropdown);

    // Update the scale selection
    handleScaleSelection();
}

function updateSelectedValues(majorMinorValue, keyValue) {
    const majorMinorDiv = document.getElementById('quality');

    majorMinorDiv.textContent = majorMinorValue ? `Selected Major/Minor: ${majorMinorValue}` : '';
    // Removed keyDiv update
}

function updateDropdownColor(dropdown) {
    if (dropdown.value) {
        dropdown.classList.add('selected');
    } else {
        dropdown.classList.remove('selected');
    }
}

function handleScaleSelection() {
    const majorOption = document.getElementById('majorOption')?.value;
    const minorOption = document.getElementById('minorOption')?.value;
    const majorMinorDropdown = document.getElementById('majorMinor');
    const keyDropdown = document.getElementById('key');
    const imageContainer = document.getElementById('imageContainer');
    const scaleImage = document.getElementById('scaleImage');

    const majorMinorValue = majorMinorDropdown.value;
    const keyValue = keyDropdown.value;

    const displayType = document.querySelector('input[name="displayType"]:checked').value;
    const position = document.querySelector('input[name="position"]:checked').value;

    let selectedScale = '';
    if (majorMinorValue === 'Major' && majorOption) {
        selectedScale = majorOption;
    } else if (majorMinorValue === 'Minor' && minorOption) {
        selectedScale = minorOption;
    }

    if (selectedScale && majorMinorValue && keyValue) {
        // Encode the key and scale values to handle special characters
        const encodedKeyValue = encodeURIComponent(keyValue);
        const encodedMajorMinorValue = encodeURIComponent(majorMinorValue);
        const encodedScale = encodeURIComponent(selectedScale.toLowerCase());
        const encodedImageFileName = encodeURIComponent(displayType + (position === 'on' ? '-pos' : ''));

        // Build the image path based on the selected options
        const imagePath = `/images/${encodedKeyValue}/${encodedMajorMinorValue}/${encodedScale}/${encodedImageFileName}.png`;
        scaleImage.src = imagePath;
        imageContainer.style.display = 'block';
    } else {
        imageContainer.style.display = 'none';
    }
}

// Initial color update to set the default color
document.addEventListener('DOMContentLoaded', () => {
    updateDropdownColor(document.getElementById('majorMinor'));
    updateDropdownColor(document.getElementById('key'));
});
