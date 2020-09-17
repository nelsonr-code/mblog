import config from 'config';
import mongoose from 'mongoose';
import logger from '../../logger';
import { LoadModels } from '../models';

class MongooseConnectionHandler {

  // para usar la de atlas, setea la variable de entorno NODE_ENV=developer
  connectionUrl = config.get('database.masterblog');
  ////////////////////////////////////////////////////////////////////////
  dbOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
  _connection = null;
  static connectionAttempts = 0;
  static maxConnectionRetries = 10;

  async connect() {
    try {
      this._connection = await mongoose.connect(this.connectionUrl, this.dbOptions);
      logger.info('[Database connection stablished]', mongoose.connection.db.databaseName);
      mongoose.connection.on('error', err => {
        logger.error('[Database connection] error', err.message);
      });
    } catch(err) {
      logger.fatal(err);
      if(MongooseConnectionHandler.connectionAttempts > MongooseConnectionHandler.maxConnectionRetries) {
        process.exit(1);
      }
      this.connect();
      MongooseConnectionHandler.connectionAttempts += 1;
    }
  }

  connection() { return this._connection; }
}

export default new MongooseConnectionHandler();