const axios = require('axios');

const FUNCTION_URL = process.env.FUNCTION_URL;
const API_KEY = process.env.API_KEY;
const INTERVAL = (process.env.INTERVAL_SECONDS || 3) * 1000;

async function callBot() {
  try {
    const response = await axios.post(FUNCTION_URL, {}, {
      headers: {
        'Content-Type': 'application/json',
        'api_key': API_KEY
      }
    });
    console.log('✅ Bot cycle:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run immediately
callBot();

// Then run on interval
setInterval(callBot, INTERVAL);

// Keep server alive
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ForexAI Bot Running - Last check: ' + new Date().toISOString());
}).listen(process.env.PORT || 3000);

console.log('🚀 ForexAI Bot started! Running every', INTERVAL/1000, 'seconds');
