/**
 * Seperates suggestions by type.
 * @param {Array} arr List of suggestions to be seperated by type
 * @return {Array} Updated suggestions array seperated by type
 */

const updateSuggestions = (arr) => {
    if (arr === undefined || arr.length === 0) return [];

    const numberOfResults = 5;

    const updatedSuggestions = [
        {
            title: 'Movies',
            suggestions: [],
        },
        {
            title: 'Series',
            suggestions: [],
        },
    ];

    arr.forEach((sug) => {
        if (sug.type === 'Movie' && updatedSuggestions[0].suggestions.length < numberOfResults) {
            updatedSuggestions[0].suggestions.push(sug);
        } else if (sug.type === 'Series' && updatedSuggestions[1].suggestions.length < numberOfResults) {
            updatedSuggestions[1].suggestions.push(sug);
        }
    });

    updatedSuggestions.forEach((type, i) => {
        if (type.suggestions.length === 0) updatedSuggestions.splice(i, 1);
    });

    return updatedSuggestions;
};

export default updateSuggestions;
