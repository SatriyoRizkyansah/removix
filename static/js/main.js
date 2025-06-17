document.addEventListener('DOMContentLoaded', function() {    const dropZone = document.getElementById('dropZone');    const fileInput = document.getElementById('fileInput');    const preview = document.getElementById('preview');    const fileName = document.getElementById('fileName');    const errorMessage = document.getElementById('errorMessage');    const loader = document.getElementById('loader');    const uploadPrompt = document.querySelector('.upload-prompt');    const form = document.getElementById('uploadForm');    // Handle file selection    function handleFile(file) {        if (file.size > 5 * 1024 * 1024) {            showError('File terlalu besar. Maksimum ukuran adalah 5MB.');            return;        }                if (!file.type.match('image.*')) {            showError('Hanya file gambar yang diperbolehkan.');            return;        }        // Clear any previous errors        errorMessage.style.display = 'none';                // Show file name        fileName.textContent = file.name;        fileName.style.display = 'block';
        
        // Show image preview
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            uploadPrompt.style.display = 'none';
        };
        reader.readAsDataURL(file);
        
        fileInput.files = new DataTransfer().files;
        const container = new DataTransfer();
        container.items.add(file);
        fileInput.files = container.files;
    }

    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        preview.style.display = 'none';
        fileName.style.display = 'none';
        uploadPrompt.style.display = 'block';
    }

    // Handle drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        handleFile(e.dataTransfer.files[0]);
    });

    // Handle click to upload
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            handleFile(fileInput.files[0]);
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!fileInput.files.length) {
            showError('Pilih file gambar terlebih dahulu.');
            return;
        }
        loader.style.display = 'flex';
        form.submit();
    });

    // Hide loader after response
    if (document.referrer.includes('/upload')) {
        loader.style.display = 'none';
    }

    // Fallback: hide loader after timeout
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.style.display = 'none';
        }, 10000);
    });
});
