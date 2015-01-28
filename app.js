var MY_HID_VENDOR_ID  = 0x2354;
var MY_HID_PRODUCT_ID = 0x3333;
var DEVICE_INFO = {"vendorId": MY_HID_VENDOR_ID, "productId": MY_HID_PRODUCT_ID };

var connectionId = null;


var myDevicePoll = function() {
  var size = 16;

  chrome.hid.receive(connectionId, function(reportId, data) {
    if (data != null) {
      // Convert Byte into Ascii to follow the format of our device
      //myText.value = arrayBufferToString(data);
      console.log('Data: ' + data);
    }

    setTimeout(myDevicePoll, 0);
  });
}



function initializeHid() {
  chrome.hid.getDevices(DEVICE_INFO, function(devices) {
    if (!devices || !devices.length) {
      console.log('device not found');
      return;
    }
    console.log('Found device: ' + devices[0].deviceId);
    myHidDevice = devices[0].deviceId;

    // Connect to the HID device
    chrome.hid.connect(myHidDevice, function(connection) {
      console.log('Connected to the HID device!');
      connectionId = connection.connectionId;
      console.log('This is the connection id' + connectionId);
      var bytes = new Uint8Array(8);
      bytes[0] = "I".charCodeAt();
      for (var i = 1; i < bytes.length; ++i) {
           bytes[i] = 0;
      }
      chrome.hid.send(connectionId, 0, bytes.buffer, function() {
           console.log("hello");
           myDevicePoll();
      });
      // Poll the USB HID Interrupt pipe
      myDevicePoll();
    });
  });
}

initializeHid(myDevicePoll);

console.log("My App is running ...");


