const dotenv = require("dotenv");
dotenv.config();

import server from './src/infraestructure/express/server';
import mongooseConnectionHandler  from './src/infraestructure/mongoose/connection';

mongooseConnectionHandler.connect();
server.start();