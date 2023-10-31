sap.ui.define([
	"com/switchhouse/farmtenz/controller/BaseController",
  "sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.switchhouse.farmtenz.controller.ForgotPass", {

    onInit: function() {
      this._oView = this.getView();
      this._oRouter = this.getRouter();

      this._oModel = new JSONModel(this._setOModelView());
      this._oView.setModel("forgotPass", this._oModel);

      this.setFocus("input_email_forgotPass");
    },

    onAfterRendering: function() {
      this.resetFieldsState("forgotPass_vbox");
      this.setFocus("input_email_forgotPass");
    },

    _setOModelView: function() {
      var oData = {
        ForgotPass: {
          Email: "",
        },
      }
      return oData;
    },

    onForgotPass: function() {
      let oInput = this._oView.byId("input_email_forgotPass");
      let sEmail = oInput.getValue();
      let bResult = this.checkEmail(sEmail, oInput);

      if (bResult) {
        this.onSend();
      }
    },

    onSend: function(oEvent) {
      // TODO: Send an email to the user with a link to reset the password
    },

	});
});