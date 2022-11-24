module.exports = (id) => {
    if (id != null)
        return id.split("$")[0];
    else
        return undefined
}