from contextlib import closing
import sqlite3

from flask import Flask, Response, jsonify, request, json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/contacts")
def show():
    connection = sqlite3.connect("contacts.db")
    with closing(connection.cursor()) as cursor:
        results = cursor.execute("SELECT name, phone, birthday FROM contacts")
        body = json.dumps(
            [
                dict(name=name, phone=phone, birthday=birthday)
                for name, phone, birthday in results
            ],
        )
        return Response(status=200, response=body)


@app.route("/contacts", methods=["PUT"])
def add():
    json = request.get_json()
    name, phone, birthday = json["name"], json["phone"], json["birthday"]

    connection = sqlite3.connect("contacts.db")
    with closing(connection.cursor()) as cursor:
        cursor.execute(
            """
            INSERT INTO contacts (name, phone, birthday)
                 VALUES (?, ?, ?)
            """, (name, phone, birthday),
        )
        connection.commit()
    return Response(status=201)
