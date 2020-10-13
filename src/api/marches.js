module.exports = function (app, express) {
  return {
    // Ici on décrit l'api
    description: "Liste des marchés publics",
    routes: {
      // la route
      "/marches": [
        {
          // On définit notre méthod (ici get)
          get: function (req, res) {
            var scraper = App.using("@omneedia/scraper");
            var mol = require("./marches/mol.js");
            var api = scraper(mol, {});
            api.getAll(
              1,
              {
                order: "desc",
              },
              function (r) {
                // et on renvoie le résultat de la méthode api.getAll
                res.json(r);
              }
            );
          },
          description: "retourne la liste des 100 derniers marchés publics",
        },
      ],
    },
  };
};
