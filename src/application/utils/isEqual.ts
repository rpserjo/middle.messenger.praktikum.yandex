/* eslint-disable */
function isPlainObject(value: unknown): value is Indexed {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | Indexed {
    return isPlainObject(value) || isArray(value);
}

const isEqual = (lhs: Indexed, rhs: Indexed): boolean => {
    //console.log('EQUAL', lhs, rhs)
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
};

export default isEqual;
