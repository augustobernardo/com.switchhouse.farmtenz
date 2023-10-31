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
            const sEmail = this._oModelView.getProperty("/LoginForm/Email");
            const sPassword = this._oModelView.getProperty("/LoginForm/Password");
            const oInputEmail = this._oView.byId("input_email");
            const oInputPass = this._oView.byId("input_pass");

            this.checkMandatoryFields(oInputEmail, oInputPass)

            if (oInputEmail.getValueState() === "None" || oInputPass.getValueState() === "None") {
                const bResultEmail = this.checkEmail(sEmail, oInputEmail);
                const bResultPassword = this.checkPassword(sPassword, oInputPass);

                if (bResultEmail && bResultPassword) {
                    return true;
                }
            }
            return false;
        },

        onLogin: function() {
            if (this._checkLoginForm()) {
                const sPassword = this._oModelView.getProperty("/LoginForm/Password");
                const sEmail = this._oModelView.getProperty("/LoginForm/Email");
                const bRememberMe = this._oModelView.getProperty("/LoginForm/RememberMe");

                // encrypt the password and save it in a cookie that expires in 7 days
                if (bRememberMe) {
                    const sCookieName = btoa("rememberMe");
                    const sCookieValue = btoa(sPassword);
                    const iDays = 7;
                    this.setCookie(sCookieName, sCookieValue, iDays);
                }

                // create a token with the email and crypt it
                const sToken = btoa(sEmail); // decrypt the token -> const sEmail = atob(sToken);

                localStorage.setItem("infoLogin", sToken);

                this.navTo("home", {
                    token: sToken,
                }, true);
            }
        },
		
        onSubmitLogin: function() {
            this.onLogin();
        },

        onRouteRegister: function() {
            this.resetFieldsState("login_form");
            this.navTo("register", "", "");
        },

        onRouteForgot: function() {
            this.navTo("forgot", "", "");
        },
    });
});