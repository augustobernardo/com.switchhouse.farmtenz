sap.ui.define([
	"com/switchhouse/farmtenz/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("com.switchhouse.farmtenz.controller.Register", {

        onInit: function() {
            this._oView = this.getView();

            this._oRouter = this.getRouter();

            this.setFocus("email");
        },

        onAfterRendering: function() {
            this.setFocus("email");
        },

        onRouteLogin: function() {
            this.navTo("login");
        },
    });
});