# Self-Driving-Car-Project
Using the raspberry pi car, we want to create a delivery car that accepts and manages delivery requests from the internet and delivers them to the right location. Our project will feature the picar that delivers the items, a web for clients to add orders by filling the request form for the car to deliver as well as see the information of all orders that the car has received, and the server that manages the orders by communicating with both the client and the picar. It also has an image detection ability to see a stop sign and process it with the appropriate action.

![alt text](https://github.com/michaelwong753/Self-Driving-Car-Project/blob/main/car_gif.gif)

# Back End
On the backend side, we used multiprocessing to run the functions that run the delivery car and the functions that handle the client-server communication simultaneously. To do so, we used the subprocess and multiprocessing packages where we used the latter package’s Process, Queue, and Manager to share data between the two processes.

On the delivery process, the server will continuously check if there is anything on the queue. If the queue is not empty, the program will remove the oldest order on the queue to process that order using the car. For the code that runs the car, we used an implementation of the navigation code we made in Lab 1. When the server will receive its pick up and drop off location from the client. The code will then navigate the car from its current location to the pick up location. The car will then wait until it is confirmed that the object was picked up from the client. The car will then head off to its drop off location and wait until the object is received. If it ever sees a stop sign, it will stop. After that, the server will process the next order from its queue or if there is none, the car will remain still until it receives an order.


![alt text](https://github.com/michaelwong753/Self-Driving-Car-Project/blob/main/backend.png)


# Front End
On the front-end side, we use ElectronJs for the interface. We have 2 HTML files; 1 containing the code for our homepage which includes all order status, while the other one includes the input bar for order request. In addition of using a CSS file, we also imported BootStrap for the sake of simplicity in building the UI. Inside index.js file, it has 2 main functions -- client_post and client_get. client_post is responsible in handling input request from the front end and sending it to the back end, while client_get handles the order status in the main page. We also use the library ‘net’ to create the connection to the back end in index.js.
