module.exports = {
  getAll: function (o, cb) {
    // On définit la librairie que nous allons utiliser (scraper)
    var scraper = App.using("@omneedia/scraper");
    // On définit ici le module de défintion du webscraping
    // C'est basiquement un mapping entre la position des tags dans le html
    // et des champs d'une base de données
    var mol = require("./modules/mol.js");
    // On charge le scrapper avec la définition précédente.
    var api = scraper(mol);
    // On lance l'api getAll (qui récupère les 100 derniers marchés)
    // 1: page 1
    // { order: "desc"} ordre décroissant
    api.getAll(
      1,
      {
        order: "desc",
      },
      cb
    );
  },
};
