sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "com/switchhouse/farmtenz/model/models"
], function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("com.switchhouse.farmtenz.Component", {
        metadata: {
            manifest: "json",
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);

            this.getRouter().initialize();

            this.setModel(models.createDeviceModel(), "device");
        },
    });
});
