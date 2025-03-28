import { Server, Origins } from 'boardgame.io/server';
import { airlandsea } from './lib/games/airlandsea';
import {PostgresStore} from 'bgio-postgres';

const db = new PostgresStore(process.env.DB_URL!);

const server = Server({
    games: [airlandsea],
    origins: [Origins.LOCALHOST],
    db,
});

const PORT = 8000;
server.run(PORT);
