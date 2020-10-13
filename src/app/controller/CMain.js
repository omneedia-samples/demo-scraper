App.controller.define("CMain", {
  views: ["VMain"],

  models: [],
  /**
  main controller
   */
  init: function () {
    this.control({
      "menu>menuitem": {
        click: "Menu_onClick",
      },
      "mainform button#clickme": {
        click: "clickme_onclick",
      },
    });
    /**
    init view and fire onLoad event
     */
    App.init("VMain", this.onLoad);
  },
  Menu_onClick: function (p) {
    if (p.itemId) {
      //Ext.Msg.alert("Status", "Click event on " + p.itemId);
    }
  },
  clickme_onclick: function () {
    /**
    call a serverside method and fire callback
     */
    App.Hello.world("test", function (response) {
      App.notify("Hello World", response);
    });
  },
  onLoad: function () {},
});
