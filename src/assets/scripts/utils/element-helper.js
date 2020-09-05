const checkElement = (selector) => {
    return new Promise((resolve) => {
        const waitEl = (selector, count = 0) => {
            const el = document.querySelector(selector);

            if (el) {
                resolve(el)
            } else {
                setTimeout(() => {
                    waitEl(selector, count)
                }, 100);
            }
        };
        waitEl(selector);
    });
};

const checkMultiElement = (selector) => {
    return new Promise((resolve, reject) => {
        const waitEl = (selector, count = 0) => {
            const el = document.querySelectorAll(selector);

            if (el.length > 1) {
                resolve(el)
            } else {
                setTimeout(() => {
                    waitEl(selector, count)
                }, 100);
            }
        };
        waitEl(selector);
    });
};

export {
    checkElement,
    checkMultiElement
}