const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Data in file: ${data}`)
  })
}

async function webCat(path) {
  let url = await axios.get(path);
  console.log(url.data)
}

let path = process.argv[2];

if (path.startsWith('http')) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}
