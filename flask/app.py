from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
from flask_cors import CORS
import io
import pickle
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)
frontend_domain = os.getenv("FRONTEND_DOMAIN")
CORS(app, origins=[frontend_domain])

API_KEY = os.getenv("API_KEY")
genai.configure(api_key=API_KEY)

aimodel = genai.GenerativeModel('gemini-2.0-flash')
chat = aimodel.start_chat()

def chat_bot(dis):
    query = f"Explain about disease {dis} and give the precaution in 5 lines clearly in simple way"
    response = chat.send_message(query)
    result = response.text
    return result

model_disease = tf.keras.models.load_model("model/crop_disease.h5")

class_labels = {
    0: "Apple Apple_scab", 1: "Apple Black rot", 2: "Apple Cedar_apple_rust", 3: "Apple healthy",
    4: "Blueberry healthy", 5: "Cherry (including sour) Powdery mildew", 6: "Cherry (including sour) healthy",
    7: "Corn (maize) Cercospora leaf spot Gray leaf spot", 8: "Corn (maize) Common rust", 9: "Corn (maize) Northern Leaf Blight",
    10: "Corn (maize) healthy", 11: "Grape Black rot", 12: "Grape Leaf blight (Isariopsis Leaf Spot)", 13: "Grape healthy",
    14: "Orange Haunglongbing (Citrus greening)", 15: "Peach Bacterial spot", 16: "Peach healthy",
    17: "Pepper (bell) Bacterial spot", 18: "Pepper (bell) healthy", 19: "Potato Early blight",
    20: "Potato Late blight", 21: "Potato healthy", 22: "Raspberry healthy", 23: "Soybean healthy",
    24: "Squash Powdery mildew", 25: "Strawberry Leaf scorch", 26: "Strawberry healthy",
    27: "Tomato Bacterial spot", 28: "Tomato Late blight", 29: "Tomato Leaf Mold",
    30: "Tomato Septoria leaf spot", 31: "Tomato Spider mites (Two-spotted spider mite)",
    32: "Tomato Target Spot", 33: "Tomato Yellow Leaf Curl Virus", 34: "Tomato Mosaic Virus",
    35: "Tomato healthy"
}
@app.route("/", methods=["GET"])
def hello_world_1():
    return jsonify({"msg": "Hello World"})


@app.route("/disease-prediction", methods=["POST"])
def predict_disease():
    try:
        # Check if an image is uploaded
        if "image" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["image"]

        # Validate file type
        if file.filename == "" or not file.filename.lower().endswith(("png", "jpg", "jpeg")):
            return jsonify({"error": "Invalid file type"}), 400

        # Read image file into memory
        img = Image.open(io.BytesIO(file.read())).convert("RGB")
        img = img.resize((100, 100)) 
        img_array = np.array(img) / 255.0  
        img_array = np.expand_dims(img_array, axis=0).astype("float32")  # Expand dims for model input

        print("Image array shape:", img_array.shape)

        prediction = model_disease.predict(img_array)
        predicted_class = int(np.argmax(prediction))  

        predicted_label = class_labels.get(predicted_class, "Unknown Disease")
        
        explain = chat_bot(predicted_label)

        return jsonify({"disease": predicted_label,"explain":explain})

    except Exception as e:
        print("Error during prediction:", str(e))
        return jsonify({"error": str(e)}), 500

# Load the trained model and scaler for crop recommendation
with open("model/rf_model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

with open("model/minmaxscaler.pkl", "rb") as model_file:
    scaler = pickle.load(model_file)

crop_dict = {
    1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut",
    6: "Papaya", 7: "Orange", 8: "Apple", 9: "Muskmelon", 10: "Watermelon",
    11: "Grapes", 12: "Mango", 13: "Banana", 14: "Pomegranate", 15: "Lentil",
    16: "Blackgram", 17: "Mungbean", 18: "Mothbeans", 19: "Pigeonpeas",
    20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
}

@app.route('/recommend-crop', methods=['POST'])
def recommend_crop():
    try:
        data = request.json
        features = np.array([
            float(data["nitrogen"]),
            float(data["phosphorus"]),
            float(data["potassium"]),
            float(data["temperature"]),
            float(data["humidity"]),
            float(data["soil_ph"]),
            float(data["rainfall"])
        ]).reshape(1, -1)

        scaled_features = scaler.transform(features)

        prediction = model.predict(scaled_features)[0]

        recommended_crop = crop_dict.get(prediction, "No suitable crop found")

        return jsonify({"recommended_crop": recommended_crop})
    
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)

