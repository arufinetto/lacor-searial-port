const SerialPort = require("serialport");
const RestClient = require('./RestClient');
var express  = require('express'),
app=express() //inicializamos express

const API_BASE_URL = 'http://192.168.1.13:3000/api';
const client = new RestClient(API_BASE_URL);

var portMac = '/dev/tty.usbserial-A401279N';
var portWindows = 'COM5'

const mySerial = new SerialPort(portWindows,{
	baudRate:9600,
	dataBits: 7,
	stopBits: 1,
	Parity: 'none',
	flowControl: false,
	buffer : 4096
}, false)

//const parser = new SerialPort.parsers.Readline()

// when your serial port receives data, this event is fired
// so you can capture the data and do what you need

var result = ''
mySerial.on('readable', async function() {
	try {
		const data = await mySerial.read(2465)
		if(data != null){
	
                // POST request example
                const newPost = {
                    result : data.toString()
                };
                const createdPost = await client.post('/save-result/counter19', newPost);
                console.log('POST /posts:', createdPost);
		
		}
	} catch (error) {
		console.log(error)
	}
	
})

app.set('port', process.env.PORT || 3002 );
console.log(process.env.PORT)

app.listen(app.get('port'),function(){
	console.log("APP por el puerto 3002");
 });


