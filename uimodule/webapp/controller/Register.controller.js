sap.ui.define([
	"com/switchhouse/farmtenz/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.switchhouse.farmtenz.controller.Register", {

		onInit: function() {
			this._oView = this.getView();

			this._oRouter = this.getRouter();

			this._oModelView = new JSONModel(this._setOModelView());
			this._oView.setModel(this._oModelView, "loginModel");

			this.setFocus("input_email_register");
		},

		onAfterRendering: function() {
			this.resetFieldsState("register_form");
			this.setFocus("input_email_register");
		},

		_setOModelView: function() {
			return {
				RegisterForm: {
					Email: "",
					Username: "",
					Password: "",
					PasswordConfirm: "",
				},
			};
		},

		_checkRegisterForm: function() {
			let sEmail = this._oModelView.getProperty("/RegisterForm/Email");
			let sUsername = this._oModelView.getProperty("/RegisterForm/Username");
			let sPassword = this._oModelView.getProperty("/RegisterForm/Password");
			let sPasswordConfirm = this._oModelView.getProperty("/RegisterForm/PasswordConfirm");

			let bResultEmail = this.checkEmail(sEmail, this._oView.byId("input_email_register"));
			let bResultUsername = this.checkUsername(sUsername, this._oView.byId("input_username_register"));
			let bResultPassword = this.checkPassword(sPassword, this._oView.byId("input_pass_register"));
			let bResultPasswordConfirm = this.checkPasswordConfirm(sPasswordConfirm, sPassword, this._oView.byId("input_confirm_pass_register"));

			if (bResultEmail && bResultUsername && bResultPassword && bResultPasswordConfirm) {
				return true;
			}
			return false;
		},

		onRegister: function() {
			if (this._checkRegisterForm()) {
				// const sPassword = this._oModelView.getProperty("/RegisterForm/Password");
				// const sEmail = this._oModelView.getProperty("/RegisterForm/Email");
				// const bRememberMe = this._oModelView.getProperty("/RegisterForm/RememberMe");

				// // encrypt the password and save it in a cookie that expires in 7 days
				// if (bRememberMe) {
				//     const sCookieName = btoa("rememberMe");
				//     const sCookieValue = btoa(sPassword);
				//     const iDays = 7;
				//     this.setCookie(sCookieName, sCookieValue, iDays);
				// }

				// // create a token with the email and crypt it
				// const sToken = btoa(sEmail); // decrypt the token -> const sEmail = atob(sToken);

				// localStorage.setItem("infoLogin", sToken);

				// this.navTo("home", {
				//     token: sToken,
				// }, true);
			}
		},


		onSubmitRegister: function() {
			this.onRegister();
		},

		onLiveChangeUsername: function(oEvent) {

		},

		onLiveChangeConfPass: function(oEvent) {

		},

		onRouteLogin: function() {
			this.navTo("login");
		},
	});
});