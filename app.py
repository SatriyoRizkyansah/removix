from flask import Flask, render_template, request, send_file
from rembg import remove
import io
from PIL import Image

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['image']
    if not file:
        return "No file uploaded", 400

    input_bytes = file.read()
    output_bytes = remove(input_bytes)

    return send_file(
        io.BytesIO(output_bytes),
        mimetype='image/png',
        as_attachment=True,
        download_name='hasil.png'
    )

if __name__ == '__main__':
    app.run(debug=True)
