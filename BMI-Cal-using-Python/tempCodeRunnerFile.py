from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def calculate_bmi(weight, height, unit_h):
    if unit_h == "feet":
        height = height * 30.48  # Convert feet to cm
    elif unit_h == "inches":
        height = height * 2.54  # Convert inches to cm
    
    height_m = height / 100  # Convert cm to meters
    bmi = weight / (height_m ** 2)
    
    if bmi < 18.5:
        category = "Underweight"
    elif 18.5 <= bmi < 24.9:
        category = "Normal weight"
    elif 25 <= bmi < 29.9:
        category = "Overweight"
    else:
        category = "Obese"
    
    return round(bmi, 2), category

@app.route('/')
def home():
    return render_template('cal.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    weight = float(data['weight'])  # Weight is always in kg
    height = float(data['height'])
    unit_h = data['unit_h']
    
    bmi, category = calculate_bmi(weight, height, unit_h)
    return jsonify({"bmi": bmi, "category": category})

if __name__ == '__main__':
    app.run(debug=True)
