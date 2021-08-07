import mongoose from 'mongoose';

const mongoConnect = (url: string) => {
	mongoose.connect(url, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then(() => console.log('Base de dados conectada'))
		.catch((err) => console.log(err));
}

export default mongoConnect;