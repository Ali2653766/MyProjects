from flask import Flask,redirect,request,render_template,session
from flask_session import Session

app = Flask("__name__")

app.config["SESSION_PERMANET"] = False
app.config["SESSION_TYPE"] = "filesystem"

Session(app)


@app.route("/")
def index():
    return render_template("index.html", name = session.get("name"))
    
@app.route("/login", methods = ["POST", "GET"])
def login():
    if request.method == "POST":
        session["name"] = request.form.get("name")
        return redirect("/")
    return render_template("login.html")


if __name__ == '__main__':
  app.run(debug=True) 