import net from 'node:net'

const PORT = 9100
const HOST = '127.0.0.1'

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
const server = net.createServer((socket) => {
  console.log('Client connected:', socket.remoteAddress, socket.remotePort)

  // Handle incoming messages from clients.
  socket.on('data', (data) => {
    console.log('Received data from client:', data.toString())
    // Here you would handle the data as per the protocol of the EPSON FP81 II (WS) printer
    // For testing, you can simply echo back the data
    socket.write(`Echo: ${data}`)
  })

  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected:', socket.remoteAddress, socket.remotePort)
  })

  // Handle errors
  socket.on('error', (err) => {
    console.error('Socket error:', err)
  })
})

// Start listening on the specified port and host
server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`)
})
