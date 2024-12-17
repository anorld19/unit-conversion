document.addEventListener('DOMContentLoaded', () => {
    const unitType = document.getElementById('unitType');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const inputValue = document.getElementById('inputValue');
    const convertBtn = document.getElementById('convertBtn');
    const output = document.getElementById('output');
  
    // Unit categories
    const units = {
      length: ['Meters', 'Kilometers', 'Miles', 'Feet'],
      weight: ['Kilograms', 'Grams', 'Pounds', 'Ounces'],
      temperature: ['Celsius', 'Fahrenheit', 'Kelvin']
    };
  
    // Conversion formulas
    const conversions = {
      length: {
        Meters: { Kilometers: (v) => v / 1000, Miles: (v) => v * 0.000621371, Feet: (v) => v * 3.28084 },
        Kilometers: { Meters: (v) => v * 1000, Miles: (v) => v * 0.621371, Feet: (v) => v * 3280.84 },
        Miles: { Meters: (v) => v / 0.000621371, Kilometers: (v) => v / 0.621371, Feet: (v) => v * 5280 },
        Feet: { Meters: (v) => v / 3.28084, Kilometers: (v) => v / 3280.84, Miles: (v) => v / 5280 }
      },
      weight: {
        Kilograms: { Grams: (v) => v * 1000, Pounds: (v) => v * 2.20462, Ounces: (v) => v * 35.274 },
        Grams: { Kilograms: (v) => v / 1000, Pounds: (v) => v * 0.00220462, Ounces: (v) => v * 0.035274 },
        Pounds: { Kilograms: (v) => v / 2.20462, Grams: (v) => v / 0.00220462, Ounces: (v) => v * 16 },
        Ounces: { Kilograms: (v) => v / 35.274, Grams: (v) => v / 0.035274, Pounds: (v) => v / 16 }
      },
      temperature: {
        Celsius: { Fahrenheit: (v) => (v * 9/5) + 32, Kelvin: (v) => v + 273.15 },
        Fahrenheit: { Celsius: (v) => (v - 32) * 5/9, Kelvin: (v) => (v - 32) * 5/9 + 273.15 },
        Kelvin: { Celsius: (v) => v - 273.15, Fahrenheit: (v) => (v - 273.15) * 9/5 + 32 }
      }
    };
  
    // Populate dropdowns dynamically
    const populateDropdowns = () => {
      const selectedUnits = units[unitType.value];
      fromUnit.innerHTML = '';
      toUnit.innerHTML = '';
      selectedUnits.forEach((unit) => {
        const fromOption = document.createElement('option');
        const toOption = document.createElement('option');
        fromOption.value = toOption.value = unit;
        fromOption.textContent = toOption.textContent = unit;
        fromUnit.appendChild(fromOption);
        toUnit.appendChild(toOption);
      });
    };
  
    // Conversion logic
    const convertUnits = () => {
      const value = parseFloat(inputValue.value);
      if (isNaN(value)) {
        output.textContent = 'Invalid input!';
        return;
      }
      const from = fromUnit.value;
      const to = toUnit.value;
      const category = unitType.value;
      const result = conversions[category][from][to](value);
      output.textContent = `${result.toFixed(2)} ${to}`;
    };
  
    // Event listeners
    unitType.addEventListener('change', populateDropdowns);
    convertBtn.addEventListener('click', convertUnits);
  
    // Initialize dropdowns
    populateDropdowns();
  });