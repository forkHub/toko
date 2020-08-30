import mysql from "mysql";

export class Connection {
	private static _connection: mysql.Connection;
	public static get connection(): mysql.Connection {
		return this._connection;
	}

	//TODO: setup withoud db on install
	static connect(db: string = 'toko') {
		Connection._connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: db,
			multipleStatements: true
		});

		Connection._connection.connect((error: mysql.MysqlError) => {
			if (error) {
				console.log(error);
			}
			else {
				console.log('connected');
			}
		});
	}
}

// export var connection: Conne