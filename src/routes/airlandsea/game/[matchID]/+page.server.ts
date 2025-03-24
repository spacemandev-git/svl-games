
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    if (!params.matchID) {
        throw error(404, 'Match ID is required');
    }
    return {
        matchID: params.matchID
    };
};
