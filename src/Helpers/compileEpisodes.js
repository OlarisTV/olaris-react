import sortEpisodes from './sortEpisodes';
/**
 * Compiles All Episodes from Object of Seasons
 * @param series Array of Seasons
 * @return {array} Array with all episodes
 */

const compileEpisodes = (series) => {
    let e = [];

    series.forEach(({ episodes }) => {
        e = episodes.map((episode) => episode);
    });

    return sortEpisodes(e);
};

export default compileEpisodes;
