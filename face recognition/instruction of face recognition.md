**Hướng dẫn cài đặt cho bài tập Face Recognition**

**I. Trước tiên, ta cần cài đặt (nếu chưa có):**
1. Python 3: https://www.python.org/
2. Jupyter-lab: https://jupyterlab.readthedocs.io/en/stable/getting_started/installation.html
(hoặc dùng pip): pip install jupyterlab
3. Opencv-python: https://pypi.org/project/opencv-python/
(hoặc dùng pip): pip install opencv-python
4. Face-recognition lib cho python 3: pip3 install face-recognition
  - Nếu gặp lỗi cho thư viện lib, cài thêm: pip install cmake
      - pip –no-cache-dir install face_recognition
  - Hoặc thử dlib: https://pypi.org/project/dlib/ (hoặc dùng pip): pip install dlib

**II. Thực hiện:**
- Tiến hành mở jupyter-lab và thực hiện:
  - 1. Viết chương trình để rút trích đặc trưng khuôn mặt: face_landmarks.
  - 2. Viết chương trình dùng jupyter-lab google-colab để nhận dạng khuôn mặt qua ảnh hoặc webcam.

