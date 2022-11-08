import picar_4wd as fc
from advanced_mapping import *
from navigation import *
import math
import heapq
import numpy as np
import argparse
import sys
import time
import cv2
from object_detector import ObjectDetector
from object_detector import ObjectDetectorOptions
import utils

def run_pickup_dropoff(current, dest):
    # Start capturing video input from the camera
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    # Initialize the object detection model
    options = ObjectDetectorOptions(
        num_threads=4,
        score_threshold=0.3,
        max_results=3,
        enable_edgetpu=False)
    detector = ObjectDetector(model_path="efficientdet_lite0.tflite", options=options)

    # From current to pickup location
    face = navigation(current, dest, cap, detector)

    time.sleep(10)

    cap.release()
    cv2.destroyAllWindows()
    return dest, face

def main():
    curr = (19,0)
    
    '''curr, face = run_pickup(curr, (19,2))
    reset_face(face)
    print("PICKEDUP")
    curr, face = run_dropoff(curr, (19,5))
    reset_face(face)
    print("DROPPEDOFF")'''

    curr, face = run_pickup(curr, (17,0))
    reset_face(face)
    print("PICKEDUP")
    curr, face = run_dropoff(curr, (19,2))
    reset_face(face)
    print("DROPPEDOFF")

if __name__ == "__main__":
    try: 
        main()
    finally:
        fc.stop()