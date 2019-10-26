/**
 * Generate file list to select from
 * @param files Array of files
 * @return {array} array with file name & id
 */

const generateFileList = (files) => {
    const arr = [];

    files.forEach((f, i) => {
        const file = {
            value: i,
            label: f.fileName,
            filePath: f.filePath,
            totalDuration: f.totalDuration,
            streams: f.streams,
            healthy: f.library.healthy,
            uuid: f.uuid,
        };

        arr.push(file);
    });

    return arr;
};

export default generateFileList;
