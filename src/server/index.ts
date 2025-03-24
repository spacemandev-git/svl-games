import { Server } from 'boardgame.io/server';
import { AirLandSeaGame } from '../games/airlandsea';

const server = Server({
    games: [AirLandSeaGame]
});

server.run(8000);