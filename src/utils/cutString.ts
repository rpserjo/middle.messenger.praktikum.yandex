const cutString = (string: string, cutSize: number): string => {
    if (string.length > cutSize) {
        return `${string.substring(0, (cutSize - 3))}...`;
    }
    return string;
};

export default cutString;
