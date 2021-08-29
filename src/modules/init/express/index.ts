import express from 'express';
import { initMiddleware, initPostMiddleware } from './middleware';
import { initApiRoutes } from './routes';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
initMiddleware(app);
initApiRoutes(app);
initPostMiddleware(app);

// Start Express server
app.listen(app.get('port'), () => {
  console.log(app.get('port'), app.get('env'));
  console.log('  App -- is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
