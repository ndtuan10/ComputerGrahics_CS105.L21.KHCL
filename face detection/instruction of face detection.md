# **Face detection using OpenCV and Python**

## **I. Trước tiên, ta cần cài đặt (nếu chưa có):**
  1. Python 3: https://www.python.org/
  2. Jupyter-lab: https://jupyterlab.readthedocs.io/en/stable/getting_started/installation.html
  (hoặc dùng pip): pip install jupyterlab
  3. Opencv-python: https://pypi.org/project/opencv-python/
  (hoặc dùng pip): pip install opencv-python
  
## **II. Thực hiện theo bài hướng dẫn sau:**
https://towardsdatascience.com/face-detection-in-2-minutes-using-opencv-python-90f89d7c0f81

## **III. Sử dụng dữ liệu Haar-cascades**
- Nhận diện khuôn mặt (face detection) sử dụng Haar-cascades là một phương pháp tiếp cận dựa trên máy học, trong đó hàm cascade được đào tạo với một tập dữ liệu đầu vào. Trong thư viện OpenCV đã chứa nhiều bộ phân loại được pretrained trước: face, eyes, smiles,…
- Để tìm được bộ dữ liệu này, ta
  - Tìm trong thư mục cv2 (hoặc opencv), chọn thư mục data, sau đó có rất nhiều gói để chọn lựa, ta chọn “haarcascade_frontalface_default.xml” cho bài toán này.
  - Tìm trong github sau: https://github.com/opencv/opencv/tree/master/data/haarcascades
- Sau đó, tiến hành copy vào trong jupyter-lab. Hoặc các bạn có thể kiếm dữ liệu này trong data có sẵn của opencv trên máy tính.
