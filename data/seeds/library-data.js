const library = [
    {
        title: "Till We Have Faces",
        author: "C.S. Lewis",
        summary: "A retelling of the myth of Cupid and Psyche - Lewis crafts a fascinating tale that delves to the depths of the human soul."
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkein",
        summary: "A timid hobbit is brought along the adventure of a lifetime to help twelve dwarves reclaim their destroyed kingdom from a dragon."
    }
];

exports.library = library;

exports.seed = function (knex) {
    return knex('library').insert(library);
}