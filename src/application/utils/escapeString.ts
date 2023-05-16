const escapeString = (string: string): string => {
    const dict = new Map<string, string>([
        ['<', '&lt;'],
        ['>', '&gt;'],
        ['&', '&amp;'],
        ['\'', '&apos;'],
        ['"', '&quot;'],
    ]);
    return string.replace(/[<>&'"]/g, (ch) => {
        return dict.get(ch) || '';
    });
};

export default escapeString;
