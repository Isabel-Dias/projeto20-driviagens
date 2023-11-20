function invalidFormat(data = "data") {
    return {
        type: "invalidFormat",
        message: `The ${data} is invalid!`
    }
}

function conflict(data = "data") {
    return {
        type: "conflict",
        message: `The ${data} inserted is in conflict, it can't be repeated!`
    }
}

function notFound(data = "Item") {
    return {
        type: "notFound",
        message: `${data} not found!`
    }
}

export const errors = {
    invalidFormat,
    conflict,
    notFound
}

