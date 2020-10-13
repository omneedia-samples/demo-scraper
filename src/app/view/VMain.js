App.view.define("VMain", {
  extend: "Ext.Panel",
  alias: "widget.mainform",
  border: false,

  layout: "border",

  items: [
    {
      region: "north",
      height: 25,
      minHeight: 25,
      border: false,
      baseCls: "cls-header",
      xtype: "Menu",
      itemId: "MenuPanel",
      menu: [],
    },
    {
      region: "center",
      split: true,
      layout: "vbox",
      border: false,
      items: [
        /**
        On définit ici la grille de données
         */
        {
          xtype: "grid",
          itemId: "display",
          width: "100%",
          height: "100%",
          /**
          Colonnes:
          header: ce que voit l'utilisateur
          dataIndex: le mapping avec le champ du store
           */
          columns: [
            {
              header: "id",
              dataIndex: "id",
            },
            {
              header: "Type",
              dataIndex: "type",
              width: 170,
            },
            {
              header: "Domaine",
              dataIndex: "domaine",
              width: 200,
              hidden: true,
            },
            {
              header: "Titre",
              dataIndex: "title",
              flex: 1,
            },
            {
              header: "Dpt",
              dataIndex: "dpt",
              width: 90,
            },
            {
              header: "Ville",
              dataIndex: "ville",
              flex: 1,
            },
          ],
          /**
          On ajoute la fonctionnalité "grouping" a la grille
           */
          features: [{ ftype: "grouping" }],
          /**
          On définit le store de la grille, c'est à dire sa banque de données
          On définit également le champ groupe (ici domaine)
          Le store est populé par la méthode App.Mining.getAll
           */
          store: App.store.create("App.Mining.getAll", {
            groupField: "domaine",
            autoLoad: true,
          }),
          margin: 10,
        },
      ],
    },
  ],
});
