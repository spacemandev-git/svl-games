import { Server, Origins } from 'boardgame.io/server';
import { airlandsea } from './lib/games/airlandsea';

const server = Server({
    games: [airlandsea],
    origins: [Origins.LOCALHOST],
});

const PORT = 8000;
server.run(PORT);
