from flask import Flask, render_template, request, redirect
from cs50 import SQL

db = SQL("sqlite:///file.db")
SPORTS = ["Basketball", 'Handball', 'Football', 'Tennis']

app = Flask(__name__)

@app.route('/', methods=["POST", "GET"])
def hello_world():
    return render_template("index.html", sports=SPORTS)

@app.route('/deregist')
def deregist():
    i = request.args.get("id")
    
    if i:
        db.execute("DELETE FROM registrants WHERE id=? ", i)
    return redirect("/registerants")

@app.route('/register', methods=["POST"])
def register():
    # Check if 'name' is missing OR if 'sport' is NOT in SPORTS
    if not request.form.get("name") or request.form.get("sport") not in SPORTS:
        return render_template("failed.html")

    name = request.form.get("name")
    sport = request.form.get("sport")
    db.execute("INSERT INTO registrants (name, sport) VALUES (?, ?)", name, sport)
    return redirect("/registerants")

@app.route('/registerants', methods=["GET"])
def registrants():
    Registrants = db.execute("SELECT * FROM registrants")
    return render_template("registerants.html", registrants=Registrants)

if __name__ == '__main__':
    db.execute("""
        CREATE TABLE IF NOT EXISTS registrants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            sport TEXT NOT NULL
        )
    """)
    app.run(debug=True)