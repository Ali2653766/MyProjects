import csv
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
ALLOWED_EXTENSIONS = {'csv'}
stored_data = []  # تخزين جميع البيانات بعد تحميل CSV

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/", methods=['GET'])
def index():
    return render_template("index.html")

@app.route('/upload', methods=['POST'])
def upload():
    global stored_data
    stored_data.clear()

    if 'file' not in request.files:
        return "لم يتم العثور على ملف!", 400

    file = request.files['file']

    if file.filename == '':
        return "لم يتم اختيار أي ملف!", 400

    if not allowed_file(file.filename):
        return "يجب أن يكون الملف بصيغة CSV فقط!", 400

    file_data = file.read().decode("utf-8").splitlines()
    reader = csv.reader(file_data)
    data = list(reader)

    if not data:
        return "ملف فارغ!", 400

    headers = data[0]
    rows = data[1:]

    stored_data = rows  # حفظ كل البيانات للتحميل السريع

    return render_template("table.html", headers=headers, rows=stored_data[:1000])

@app.route("/get_data")
def get_data():
    """إرجاع بيانات CSV على دفعات عند التمرير"""
    page = int(request.args.get("page", 1))
    per_page = 1000  # زيادة عدد الصفوف المحملة دفعة واحدة إلى 1000
    start = (page - 1) * per_page
    end = start + per_page

    return jsonify(stored_data[start:end])

if __name__ == '__main__':
    app.run(debug=True)
