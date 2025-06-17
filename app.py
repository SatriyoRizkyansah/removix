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
    try:
        file = request.files['image']
        if not file:
            return "No file uploaded", 400

        # Read and process the image
        input_bytes = file.read()
        output_bytes = remove(input_bytes)
        
        # Create response with file download
        response = send_file(
            io.BytesIO(output_bytes),
            mimetype='image/png',
            as_attachment=True,
            download_name='hasil.png'
        )
        
        # Add header to indicate processing is complete
        response.headers['X-Processing-Complete'] = 'true'
        return response
        
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)
