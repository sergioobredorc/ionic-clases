from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)  # 🔥 habilita CORS para Ionic

HUGGINGFACE_API_KEY = "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"
MODEL_URL = "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment"


headers = {
    "Authorization": f"Bearer {HUGGINGFACE_API_KEY}"
}

@app.route("/analyze", methods=["POST"])
def analyze_text():
    data = request.json
    text = data.get("text")

    if not text:
        return jsonify({"error": "Texto vacío"}), 400

    response = requests.post(
        MODEL_URL,
        headers=headers,
        json={"inputs": text}
    )

    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)
