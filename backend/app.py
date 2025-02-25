import sys
import os
from flask import Flask, jsonify
from flask_cors import CORS

# Ensure Python recognizes `utils/`
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "utils")))

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/api/mastodon", methods=["GET"])
def get_mastodon_posts():
    from mastodon_api import fetch_mastodon_posts  # Import inside function
    posts = fetch_mastodon_posts(limit=5)
    return jsonify(posts)

if __name__ == "__main__":
    app.run(debug=True)
