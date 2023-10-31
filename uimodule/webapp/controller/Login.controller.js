sap.ui.define([
	"com/switchhouse/farmtenz/controller/BaseController",
  "sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.switchhouse.farmtenz.controller.Login", {

    onInit: function() {
      this._oView = this.getView();
      this._oRouter = this.getRouter();

      this._oModelView = new JSONModel(this._setOModelView());
      this._oView.setModel(this._oModelView, "loginModel");

      this.setFocus("input_email");
    },

    onAfterRendering: function() {
      this.resetFieldsState("login_form");
      this.setFocus("input_email");
    },

    _setOModelView: function() {
      return {
        LoginForm: {
          Email: "",
          Password: "",
          RememberMe: false,
        },
      };
    },

    _checkLoginForm: function() {
      let sEmail = this._oModelView.getProperty("/LoginForm/Email");
      let sPassword = this._oModelView.getProperty("/LoginForm/Password");

      let bResultEmail = this.checkEmail(sEmail, this._oView.byId("input_email"));
      let bResultPassword = this.checkPassword(sPassword, this._oView.byId("input_pass"));

      if (bResultEmail && bResultPassword) {
        return true;
      }
      return false;
    },

    onLogin: function() {
      if (this._checkLoginForm()) {
        let sPassword = this._oModelView.getProperty("/LoginForm/Password");
        let sEmail = this._oModelView.getProperty("/LoginForm/Email");
        let bRememberMe = this._oModelView.getProperty("/LoginForm/RememberMe");

        // encrypt the password and save it in a cookie that expires in 7 days
        if (bRememberMe) {
          let sCookieName = btoa("rememberMe");
          let sCookieValue = btoa(sPassword);
          let iDays = 7;
          this.setCookie(sCookieName, sCookieValue, iDays);
        }

        // create a token with the email and crypt it
        let sToken = btoa(sEmail); // decrypt the token -> let sEmail = atob(sToken);

        localStorage.setItem("infoLogin", sToken);

        this.navTo("home", {
          token: sToken,
        }, true);
      }
    },

    onSubmitLogin: function() {
      this.onLogin();
    },
  });
});