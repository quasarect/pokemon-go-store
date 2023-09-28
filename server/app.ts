import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './routes/router';

const app = express();

config();

const port = process.env.PORT || 5000;
const mongoDBurl = process.env.MONGODB_URL || '';

app.use(cors());

app.use(morgan('short'));

app.use(express.json());

app.use('/media', express.static('media'));

app.use('/test', (req, res) => {
	console.log('Received Request');
	res.status(200).json({ message: 'Receivec response' });
});

app.use('/', router);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
	mongoose
		.connect(mongoDBurl)
		.then(() => {
			console.log('Connected to MongoDB');
		})
		.catch((error) => {
			console.log(error);
			console.log("Could'nt connect to mongoDB");
		});
});
