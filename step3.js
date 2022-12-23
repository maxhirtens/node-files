const fs = require('fs');
const axios = require('axios');

// print out text from file.
function cat(data, out) {
  fs.readFile(data, 'utf8', (err, text) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    output(text, out);
    console.log(text);
  })
}

// print out text from url.
async function webCat(data, out) {
  let text = await axios.get(data);
  output(text.data, out);
  console.log(text.data);
}

// write text from url or file to new file.
function output(data, out) {
  if (out) {
    fs.writeFile(out, data, 'utf8', (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        console.log(data);
      }
    }
    )
  }
};

let data;
let out;

if (process.argv[2] === '--out') {
  console.log('WRITING');
  data = process.argv[3];
  out = process.argv[4];
} else {
  data = process.argv[2];
}

if (data.startsWith('http')) {
  webCat(data, out);
} else {
  cat(data, out);
}
