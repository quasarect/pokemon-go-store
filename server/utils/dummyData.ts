import mongoose from 'mongoose';
import fs from 'fs';
import assetModel from '../models/asset';
import { AssetTypes } from '../types/models/asset';

mongoose
	.connect(
		'mongodb+srv://cshewale23:chinmay123@cluster0.ulcm6vq.mongodb.net/pokemon',
	)
	.then(async () => {
		console.log('Connected to MongoDB');
		const Data: string = fs.readFileSync(
			'/home/chinmay/Desktop/Forks/pokemon-go-store/server/utils/DummyData.json',
			'utf-8',
		);
		const jsonData = JSON.parse(Data);

		const accounts = jsonData.accounts;
		const accountsPrivate = jsonData.accounts_private;
		const accountDisplay = jsonData.accounts_display;
		const pgSharps = jsonData.pg_sharps;

		for (let i: number = 0; i < 8; i++) {
			const min = 50;
			const max = 100;
			const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
			const account = new assetModel({
				assetType: AssetTypes.pogo_account,
				price: randomNum,
				info: accounts[i],
				private: accountsPrivate[i],
				display: accountDisplay[i],
			});
			const pg_sharp = new assetModel({
				assetType: AssetTypes.pg_sharp,
				info: pgSharps[i],
        private: accountsPrivate[i],
				price: randomNum,
			});
			await pg_sharp.save();

			console.log(`pgsharp ${i + 1} saved`);

			await account.save();

			console.log(`account ${i + 1} saved`);
		}
    process.exit(0);
	})
	.catch((err) => console.log(err));
