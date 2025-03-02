from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=["POST", "GET"])
def hello_world():
    if request.method == "POST":
        name = request.form.get("name")
        return render_template("greet.html", name=name)
    return render_template("Hello.html")


if __name__ == '__main__':
    app.run(debug=True)