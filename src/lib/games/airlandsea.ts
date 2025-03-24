
export const airlandsea = {
    name: 'airlandsea',

    setup: () => ({
        players: {
            '0': {
                hand: [],
                score: 0
            },
            '1': {
                hand: [],
                score: 0
            }
        },
        currentPlayer: '0'
    }),

    moves: {
        playCard: (G: any, ctx: any, cardId: number) => {
            // Implement card playing logic here
        }
    }
};
