# Requirements

1. open TCP communication
2. send array of commands generated from us
3. receive array of responses from each command
4. close connection

# Steps

- [x] add logic to load data from browser page into extension (window.currentPrinters)
- [x] add event to send message from web page to extension with data (we need to decide this one too)
- [x] some basic config page for future usage
- test open connection and data transfer with dummy TCP server
  - [x] webpage prepares data/ commands for printer
  - [x] webpage send this data (command + printer id) using `window.postMessage`
  - [x] chrome extension listens for messages
  - [x] chrome extension read printer id, commands. Printer id will be used to get IP address/ protocol info from printer config data.
  - chrome extension then sends these commands to printer and collect results
  - [x] chrome extension sends message to web page (similarly as mentioned in step 1)
  - [x] webpage needs to listen to messages from extension and collect results back

# Printer/ Config Info:

Array of onject with these properties:

printerid: unique ID of the printer, we will use it for identification
model: model of the printer, refer later for model types
name: name of the printer
privateipaddress: private IP address of the printer
registrationnumber: unique number registered for fiscal puroposes... for some model, this is required as authorization

fiscal printers:
EPSON FP81 II (WS)
EPSON FP81 II S (WS)
EPSON FP81 II T (WS)
EPSON FP90 III (WS)
CUSTOM XML (WS)
CUSTOM 2ND GEN (TCP)

thermal printers (not fiscal):
TM-T20 III (WS)

WS: web service
TCP: TCP socket
