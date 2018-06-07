import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import DB from './db';

import indexRoutes from './routes/indexRoutes';
import playerRoutes from './routes/playerRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use("/", indexRoutes);
app.use("/player", playerRoutes)

DB.connect()
.then(() => {
    return app.listen(3003)
}).then(() => {
    console.log("App running on localhost:3003")
}).catch((e: any) => {
    console.error(`App failed to start with reason: ${e}`)
})
