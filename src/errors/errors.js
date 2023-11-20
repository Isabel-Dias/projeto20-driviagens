function invalidFormat(data = "data") {
    return {
        type: "invalidFormat",
        message: `The ${data}'s format is invalid!`
    }
}

function conflict(data = "data") {
    return {
        type: "conflict",
        message: `The ${data} inserted already exists!`
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

