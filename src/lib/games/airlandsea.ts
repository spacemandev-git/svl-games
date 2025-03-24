
import type { Game } from 'boardgame.io';

type PlayerState = {
    hand: any[];
    score: number;
    ready: boolean;
}

type GameState = {
    players: {
        [key: string]: PlayerState;
    };
    currentPlayer: string;
}

export const airlandsea: Game<GameState> = {
    name: 'airlandsea',
    minPlayers: 2,
    maxPlayers: 2,

    setup: (ctx) => ({
        players: {
            '0': { hand: [], score: 0, ready: false },
            '1': { hand: [], score: 0, ready: false }
        },
        currentPlayer: '0'
    }),

    phases: {
        lobby: {
            start: true,
            next: 'play',
            turn: {
                activePlayers: { all: 'lobby' }
            },
            moves: {
                toggleReady: ({ G }, playerID: string) => {
                    if (G.players[playerID]) {
                        G.players[playerID].ready = !G.players[playerID].ready;
                    }
                }
            }
        },
        play: {
            moves: {
                playCard: ({ G, ctx }: { G: GameState; ctx: any }, cardId: number) => {
                    // Implement card playing logic here
                }
            }
        }
    },

    endIf: ({ G }) => {
        const allReady = Object.values(G.players).every(p => p.ready);
        if (allReady) {
            return { next: 'play' };
        }
    }
};
