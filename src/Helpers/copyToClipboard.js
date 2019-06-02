const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value).catch(() => false);
};

export default copyToClipboard;
