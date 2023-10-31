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
			const oInputEmail = this._oView.byId("input_email_register");
			const oInputUsername = this._oView.byId("input_username_register");
			const oInputPass = this._oView.byId("input_pass_register");
			const oInputConfPass = this._oView.byId("input_confirm_pass_register");

			const sEmail = this._oModelView.getProperty("/RegisterForm/Email");
			const sUsername = this._oModelView.getProperty("/RegisterForm/Username");
			const sPassword = this._oModelView.getProperty("/RegisterForm/Password");
			const sPasswordConfirm = this._oModelView.getProperty("/RegisterForm/PasswordConfirm");


			this.checkMandatoryFields(oInputEmail, oInputPass)

			if (oInputEmail.getValueState() === "None" || oInputPass.getValueState() === "None" 
				|| oInputUsername.getValueState() === "None" || oInputConfPass.getValueState() === "None") {

				const bResultEmail = this.checkEmail(sEmail, oInputEmail);
				const bResultUsername = this.checkUsername(sUsername, oInputUsername);
				const bResultPassword = this.checkPassword(sPassword, oInputPass);
				const bResultPasswordConfirm = this.checkPasswordConfirm(sPasswordConfirm, sPassword, oInputConfPass);

				if (bResultEmail && bResultPassword && bResultUsername && bResultPasswordConfirm) {
					return true;
				}
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