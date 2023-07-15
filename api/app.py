from flask import Flask, jsonify, request
from flask_cors import CORS
from mock_data import slides


application = Flask(__name__)
CORS(application)


@application.route("/api/fetch-data")
def fetch_data():
    params = request.args
    total = int(params.get("total", 20))

    return jsonify({"slides": slides[:total]})


if __name__ == "__main__":
    application.run(debug=True, host="0.0.0.0")