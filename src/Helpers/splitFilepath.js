import { truncate } from 'lodash';

const splitFilepath = (file) => {
    const splitFile = file.split('/');
    let fileIndex = file.lastIndexOf('/');
    fileIndex = fileIndex === -1 ? file.length : fileIndex + 1;

    const filePath = truncate(file.substring(0, fileIndex), { length: 30 });
    const fileName = splitFile[splitFile.length - 1];

    return `${filePath} ${fileName}`;
};

export default splitFilepath;
