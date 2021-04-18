import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1', routes);
app.set('port', process.env.PORT || 3333);

app.listen(app.get('port'), () => console.log(`Listening in ${app.get('port')}`));