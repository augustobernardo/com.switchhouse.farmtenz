sap.ui.define([
	"com/switchhouse/farmtenz/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("com.switchhouse.farmtenz.controller.Login", {

        onInit: function() {
            this._oView = this.getView();

            this._oRouter = this.getRouter();

            this.setFocus("email");
        },

        onAfterRendering: function() {
            this.setFocus("email");
        },

        onRouteRegister: function() {
            this.navTo("register");
        },

        onRouteLogin: function() {
            this.navTo("login");
        },

        onRouteForgot: function() {
            this.navTo("forgot");
        },
    });
});