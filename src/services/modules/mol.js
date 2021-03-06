/**
Module de définition du webscraping
 */
module.exports = {
  description: "marchesonline api",
  // Ici, on définit les variables globales du module (privé)
  vars: {
    root: "https://www.marchesonline.com",
    login: "!",
    password: "!",
  },
  // .. et publique
  public: {
    site: 20,
  },
  // optionnel: module login (si le site doit être authentifié)
  login: {
    url: "/mon-compte/connexion",
    method: "POST",
    form: {
      action: "login",
      referer: "{root}/index.php",
      login: "{login}",
      password: "{password}",
    },
  },
  // On définit les méthodes que nous allons utiliser
  methods: {
    get: {
      description: "Récupère les informations du marché",
      uri: "{url}",
      args: ["url"],
      method: "GET",
      scheme: [
        {
          field: "!id",
          type: "string",
          selector:
            "body > div.pageAvis.twoColumns > div.colOne > section > div.identityNotice > p.noticeNumber.jqMailSubject",
          render: function (value) {
            return "AO-" + value.split("\tAO-")[1].split("\n")[0];
          },
        },
        {
          field: "Commentaire",
          selector:
            "body > div.pageAvis.twoColumns > div.colOne > div.contenuDeLAvis > div.contenuIntegral.borderBottom",
          type: "string",
          output: "text",
        },
        {
          field: "raw",
          selector: "html",
          type: "string",
          render: function (value) {
            return (
              "<html>" +
              value.replace(
                "<head>",
                '<head><base href="https://www.marchesonline.com" />'
              ) +
              "</html>"
            );
          },
        },
      ],
    },
    getAll: {
      // description de la méthode
      description: "Récupère un index des marchés en cours",
      // uri de la ressource
      uri: "/appels-offres/en-cours?page={page}",
      // Les différents paramètres (on retrouve le sort que nous allons utiliser)
      args: ["page", "order", "sort", "itemsperpage"],
      // Méthode supportée (ici post)
      method: "POST",
      // On définit ici les différents paramètres pour mener à bien le post
      form: {
        order: "order|desc",
        sortBy: "sort|date_mise_en_ligne",
        itemPerPage: "itemsperpage|100",
        id_ref_type_avis: 1,
        id_ref_domaine_activite: 4,
        referer: "https://www.marchesonline.com/index.php",
        date_mise_en_ligne: "TODAY",
      },
      // On fait le mapping entre les tags et les champs que nous allons manipuler
      scheme: [
        // mapping sous forme d'objet
        {
          field: "!id", // noter le ! pour index
          type: "string",
          selector: ".noticeNumberLabel", // Le sélecteur du champ (dom)
          // On utilise "render" lorsque la valeur retourné doit être rafinée
          render: function (value) {
            return value.split(": ")[1].split("\n")[0];
          },
        },
        // Mapping sous forme texte quand les valeurs sont faciles à rappatrier
        // de la forme nom_du_champ:type_de_champ={dom}
        "title:string={h2}",
        "client:string={span[itemprop]}",
        "dpt:string={a > div.noticeInfo > ul.colOne > li.location > span:nth-child(2)}",
        "ville:string={a > div.noticeInfo > ul.colOne > li.location > span:nth-child(3)}",
        {
          field: "type",
          type: "string",
          selector: ".process",
          output: "text",
        },
        {
          field: "date_publication",
          type: "date",
          selector: ".onlineDate",
          render: function (value) {
            return value.split(": ")[1].split("\n")[0];
          },
        },
        {
          field: "date_limite",
          type: "date",
          selector: ".dateColor",
        },
        {
          field: "domaine",
          type: "string",
          selector: "a > div.noticeInfo > ul.colOne > li.activity",
          render: function (value) {
            return value.split("</span>")[1];
          },
        },
        {
          field: "url",
          type: "string",
          selector: "section > a",
          attr: "href",
        },
        {
          field: "revision",
          type: "int",
          value: function (me) {
            return me.url
              .substr(me.url.lastIndexOf("/") + 1, me.url.length)
              .split("-")[2];
          },
        },
        {
          field: "idAnnonce",
          type: "string",
          value: function (me) {
            return me.id.split("AO-")[1];
          },
        },
        {
          field: "site",
          type: "int",
          value: 20,
        },
      ],
    },
  },
};
