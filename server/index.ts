import { setupDb } from './db';
import app from './app';

async function init () {
  try {
    await setupDb();
    app.listen(process.env.REACT_APP_SERVER_PORT, () => {
      console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

init();