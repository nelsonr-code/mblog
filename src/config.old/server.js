import express from "express";
import morgan from "morgan";

// importing modules customized
import config from "../config/configuration";
import routeIndex from "../api/routes/route.index";
import routeUser from "../api/routes/route.users";

// Initilization
const app = express();

app.set('port', config.PORT || 3001)
// console.log(config.PORT);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/api', routeIndex);
app.use('/profile', routeUser);
// app.use(require('../api/routes/route.index'))


export default app;