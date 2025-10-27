module.exports = function (hbs) {
    hbs.registerHelper('eq', function (a, b) {
        return a === b;
    });
}