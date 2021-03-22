module.exports = function (mail) {
    return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail))
};