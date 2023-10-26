sap.ui.define(["sap/ui/test/Opa5"], function (Opa5) {
    "use strict";

    return Opa5.extend("com.switchhouse.farmtenz.test.integration.arrangements.Startup", {
        iStartMyApp: function () {
            this.iStartMyUIComponent({
                componentConfig: {
                    name: "com.switchhouse.farmtenz",
                    async: true,
                    manifest: true,
                },
            });
        },
    });
});
