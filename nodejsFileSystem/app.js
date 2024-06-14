

const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {

fs.readFile('path/to/file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log('File contents:', data);
});

// Writing to a File

fs.writeFile('path/to/file.txt', 'Hello, World!', 'utf8', (err) => {
  if (err) {
    console.error('Error writing to the file:', err);
    return;
  }
  console.log('File has been written');
});

// Copying a File
fs.copyFile('path/to/source.txt', 'path/to/destination.txt', (err) => {
  if (err) {
    console.error('Error copying the file:', err);
    return;
  }
  console.log('File has been copied');
});

// Moving a File

fs.copyFile('path/to/source.txt', 'path/to/destination.txt', (err) => {
  if (err) {
    console.error('Error copying the file:', err);
    return;
  }
  fs.unlink('path/to/source.txt', (err) => {
    if (err) {
      console.error('Error deleting the original file:', err);
      return;
    }
    console.log('File has been moved');
  });
});



}).listen(8010);