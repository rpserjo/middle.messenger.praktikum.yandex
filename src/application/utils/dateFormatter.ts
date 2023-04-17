const dateFormatter = (dateString: string, short: boolean = true): string => {
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const date = new Date(dateString);
    const now = new Date();
    const _i = date.getMinutes();
    const _h = date.getHours();
    const i = (_i < 10) ? `0${_i}` : `${_i}`;
    const h = (_h < 10) ? `0${_h}` : `${_h}`;
    const _d = date.getDate();
    const d = (_d < 10) ? `0${_d}` : `${_d}`;
    const day = date.getDay();
    const _m = date.getMonth();
    const m = (_m < 10) ? `0${_m}` : `${_m}`;
    const delta = now.getDate() - _d;
    if (short) {
        if (delta === 0) {
            return `${h}:${i}`;
        } if (delta < 8) {
            return `${days[day]}`;
        }
        return `${d}.${m}`;
    }
    let time = `${d} ${months[_m]}, `;

    if (delta === 1) time = 'yesterday, ';

    if (delta === 0) time = '';

    time = `${time}${h}:${i}`;

    return time;
};

export default dateFormatter;
