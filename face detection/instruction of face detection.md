# **Face detection using OpenCV and Python**

## **I. First, we need to install (if not already):** 
  1. Python 3: https://www.python.org/
  2. Jupyter-lab: https://jupyterlab.readthedocs.io/en/stable/getting_started/installation.html
  (or use pip): pip install jupyterlab
  3. Opencv-python: https://pypi.org/project/opencv-python/
  (or use pip): pip install opencv-python
  
## **II. Follow the instruction below:**
https://towardsdatascience.com/face-detection-in-2-minutes-using-opencv-python-90f89d7c0f81

## **III. Using Haar-cascades data**
- Face detection (Nhận diện khuôn mặt) using Haar-cascades is a machine learning-based approach in which a cascade function is trained with an input dataset. The OpenCV library already contains many pretrained classifiers: face, eyes, smiles, etc.
- To find this dataset, we
  - Find in the cv2 folder (or opencv), select data folder, then there are many packages to choose from, we choose "haarcascade_frontalface_default.xml" for this problem.
  - or Find in github: https://github.com/opencv/opencv/tree/master/data/haarcascades
- Then, proceed to copy into jupyter-lab. Or you can find this data in opencv's available data on your computer.
