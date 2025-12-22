export function formatPrice(x: number) {
    if (x === null || x === undefined || x <= 0) {
        return 0;
    }

    return numberWithSpaces(x);
}

export function formatPriceShort(x: number) {
    if (x === null || x === undefined || x <= 0) {
        return 0;
    }

    return numberWithSpacesShort(x);
}

export function numberWithSpaces(x: number) {
    if (x === null || x === undefined || x <= 0) {
        return 0;
    }

    return parseFloat(x.toString()).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function numberWithSpacesShort(x: number) {
    if (x === null || x === undefined || x <= 0) {
        return 0;
    }

    return parseFloat(x.toString()).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatPriceFeature(x: number, br: boolean = false) {
    if (x === null || x === undefined || x <= 0) {
        return 0;
    }

    let value = x.toString().replace(/ /g, '');

    let formatter = Number(value).toFixed(0);

    if (Number(formatter) >= 1000000) {
        formatter = (Number(formatter) / 1000000).toFixed(2).toString()
            .replace('.', ',').replace(/0+$/g, '').replace(/,$/g, '')

        if (br) {
            return formatter + '<br> млн.'
        }

        return formatter + '  млн.'
    }

    if (Number(formatter) >= 1000) {
        formatter = (Number(formatter) / 1000).toFixed(2).toString()
            .replace('.', ',').replace(/0+$/g, '').replace(/,$/g, '')


        if (br) {
            return formatter + '<br> тыс.'
        }

        return formatter + '  тыс.'
    }

    return x.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}