from flask import Flask, request, jsonify
import tensorflow as tf
import pickle
import numpy as np
import os
from flask_cors import CORS  # Enables frontend requests

app = Flask(__name__)
CORS(app)  # Allow frontend to call API

# Load models
model_disease = tf.keras.models.load_model("model/crop_disease.h5")
model_recommend = pickle.load(open("model/crop_recommend.pkl", "rb"))

@app.route("/predict-disease", methods=["POST"])
def predict_disease():
    try:
        data = request.json
        if "imagePath" not in data:
            return jsonify({"error": "Missing imagePath field"}), 400

        image_path = data["imagePath"]
        
        if not os.path.exists(image_path):
            return jsonify({"error": "Image file not found"}), 400
        
        img = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
        img_array = tf.keras.preprocessing.image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0).astype("float32")

        prediction = model_disease.predict(img_array)
        predicted_class = int(np.argmax(prediction))

        return jsonify({"disease": predicted_class})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/recommend-crop", methods=["POST"])
def recommend_crop():
    try:
        data = request.json
        if "temperature" not in data or "season" not in data:
            return jsonify({"error": "Missing temperature or season field"}), 400

        temperature = float(data["temperature"])

        # Assuming "season" is categorical (e.g., "Winter", "Summer")
        # Convert it into numerical encoding (you might need an actual mapping based on training data)
        season_mapping = {"Winter": 0, "Summer": 1, "Rainy": 2}
        season = season_mapping.get(data["season"], -1)

        if season == -1:
            return jsonify({"error": "Invalid season value"}), 400

        prediction = model_recommend.predict([[temperature, season]])
        return jsonify({"crop": str(prediction[0])})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
