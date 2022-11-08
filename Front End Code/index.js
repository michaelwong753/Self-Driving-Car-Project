var server_port = 8001;
var server_addr = "192.168.1.10";   // the IP address of your Raspberry PI


function client_post(json_req){
    const net = require('net');
    var socket = net.createConnection(server_port, server_addr);
    
    // get the data from the server
    socket.on('data', function(data) {
        // Log the response from the HTTP server.
        console.log("RESPONSE: " + data);
        socket.end();
        socket.destroy();
    }).on('connect', function() {
        // Manually write an HTTP request.
        const json_str = "POST " + JSON.stringify(json_req);
        console.log(json_str);
        socket.write(json_str);
    }).on('end', function() {
        console.log('DONE');
    });
}

function client_get(){
    const net = require('net');
    var socket = net.createConnection(server_port, server_addr);
    
    socket.on('data', function(data) {
        // Log the response from the HTTP server.
        let parsed = JSON.parse(data);
        order_num = parsed.order_num;   
        order_data = parsed.orders;
        var table = document.getElementById("myTbody");
        for(let i = 0; i < order_num; i++){
            let order_data_parsed = order_data[i];
            var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = (i+1).toString();
            var cell2 = row.insertCell(1);
            cell2.innerHTML = order_data_parsed.name;
            var cell3 = row.insertCell(2);
            cell3.innerHTML = order_data_parsed.status;
        }
        socket.end();
        socket.destroy();
    }).on('connect', function() {
        // Manually write an HTTP request.
        socket.write("GET ");
    }).on('end', function() {
        console.log('DONE');
    });
}

function add_request(){
    // get the element from html
    let name = document.getElementById("name").value;
    let pick_up_x = document.getElementById("pick_up_x").value;
    let pick_up_y = document.getElementById("pick_up_y").value;
    let drop_off_x = document.getElementById("drop_off_x").value;
    let drop_off_y  = document.getElementById("drop_off_y").value;

    var json_req = {
        order_name: name,
        pickup_loc: [pick_up_x, pick_up_y],
        dropoff_loc: [drop_off_x, drop_off_y]
    }

    // send the data to the server 
    client_post(json_req);
}