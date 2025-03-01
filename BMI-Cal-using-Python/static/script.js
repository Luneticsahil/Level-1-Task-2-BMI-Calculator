document.getElementById('calculate').addEventListener('click', function() {
    // Get user input values
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const unit_h = document.getElementById('height-unit').value;

    // Validate inputs
    if (height === '' || weight === '') {
        alert('Please enter both height and weight.');
        return;
    }

    // Prepare the data to be sent to the Flask backend
    const data = {
        weight: weight,
        height: height,
        unit_h: unit_h
    };

    // Make a POST request to the Flask server
    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        const bmi = result.bmi;
        const category = result.category;

        // Display BMI result
        document.getElementById('result').textContent = `Your BMI: ${bmi}`;
        document.getElementById('bmi-category').textContent = `Category: ${category}`;

        // Update the BMI bar
        const bmiBar = document.getElementById('bmi-bar');
        let barWidth = 0;

        if (category === "Underweight") {
            barWidth = 25;
        } else if (category === "Normal weight") {
            barWidth = 50;
        } else if (category === "Overweight") {
            barWidth = 75;
        } else if (category === "Obese") {
            barWidth = 100;
        }

        bmiBar.style.width = barWidth + '%';

        // Display health recommendations
        let healthMessage = '';
        if (category === 'Underweight') {
            healthMessage = 'You are underweight. Increase calories with nutrient-dense foods. like: Oats with milk, eggs, toast with avocado, milk with protein powder, chicken/tofu with rice, salad, sweet potatoe.  ';
        } else if (category === 'Normal weight') {
            healthMessage = 'You are in a healthy weight range. Maintain a balanced diet and exercise regularly. like: Avocado toast, mixed fruit, coffee/tea, Mixed nuts, fruit, Salmon, roasted vegetables, quinoa. ';
        } else if (category === 'Overweight') {
            healthMessage = 'You are overweight. Consider losing weight through a healthy diet and regular exercise. like: Spinach smoothie, eggs, toast, Grilled chicken salad, quinoa, Herbal tea, Greek yogurt. ';
        } else {
            healthMessage = 'You are obese. Consult a healthcare professional for weight management options. like: Oats with berries, boiled eggs, Salmon, roasted veggies, steamed greens, Grilled chicken salad with veggies. ';
        }

        document.getElementById('health-recommendations').textContent = healthMessage;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error processing your request.');
    });
});

// Clear button functionality
document.getElementById('clear').addEventListener('click', function() {
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('height-unit').value = 'cm';
    document.getElementById('result').textContent = '';
    document.getElementById('bmi-category').textContent = '';
    document.getElementById('health-recommendations').textContent = '';
    document.getElementById('bmi-bar').style.width = '0%';
});
