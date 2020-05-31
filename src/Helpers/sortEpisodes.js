/**
 * Sort Episodes by episodeNumber key
 * @param episodes Array of episodes
 * @return {array} Array with sorted episodes
 */

const sortEpisodes = (episodes) =>
    episodes.sort((a, b) => {
        const x = a.episodeNumber;
        const y = b.episodeNumber;

        if (x < y) return -1;
        if (x > y) return 1;

        return 0;
    });

export default sortEpisodes;
