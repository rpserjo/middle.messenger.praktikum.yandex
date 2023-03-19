const cutString = (string, cutSize) => {
    if (string.length > cutSize) {
        return `${string.substring(0, (cutSize - 3))}...`;
    }
    return string;
};

export default cutString;
