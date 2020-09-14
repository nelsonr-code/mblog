const dotenv = require("dotenv");
dotenv.config();

coonsole.log('variables de entorno!', process.env);

import server from './src/infraestructure/express/server';
import mongooseConnectionHandler  from './src/infraestructure/mongoose/connection';

mongooseConnectionHandler.connect();
server.start();