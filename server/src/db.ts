import { MongoClient, Db, Collection } from "mongodb";
import config from "./config";
import IPlayer from "./IPlayer";

class Database {
	private _db: Db;

	public async connect() {
		const client = await MongoClient.connect(config.db.connectionUri);
		this._db = client.db(config.db.database);
	}

	public getDatabase(): Db {
		return this._db;
	}

	public Players(): Collection<IPlayer> {
		return this._db.collection<IPlayer>("players");
	}
}

export default new Database();
