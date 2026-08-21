require('dotenv').config();

const app = require('./src/app');
const connectDatabase = require('./src/db/connect');

const requiredEnvironmentVariables = ['MONGODB_URI', 'JWT_SECRET', 'CORS_ORIGIN'];

for (const variable of requiredEnvironmentVariables) {
  if (!process.env[variable]) {
    console.error(`Missing required environment variable: ${variable}`);
    process.exit(1);
  }
}

const port = process.env.PORT || 5000;

async function startServer() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`Friends Manager API is running on port ${port}`);
  });
}

startServer();
