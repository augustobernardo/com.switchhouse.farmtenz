sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "com/switchhouse/farmtenz/model/formatter"
], function (Controller, History, UIComponent, formatter) {
    "use strict";

    return Controller.extend("com.switchhouse.farmtenz.controller.BaseController", {
      formatter: formatter,

      getModel: function (sName) {
        return this.getView().getModel(sName);
      },

      setModel: function (oModel, sName) {
        return this.getView().setModel(oModel, sName);
      },

      getResourceBundle: function () {
        return this.getOwnerComponent().getModel("i18n").getResourceBundle();
      },

      navTo: function (psTarget, pmParameters, pbReplace) {
        this.getRouter().navTo(psTarget, pmParameters, pbReplace);
      },

      getRouter: function () {
        return UIComponent.getRouterFor(this);
      },

      onNavBack: function () {
        let sPreviousHash = History.getInstance().getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.back();
        } else {
          this.getRouter().navTo("login", {}, true /* no history*/);
        }
      },

      onSideNavButtonPress: function () {
        let oToolPage = this.byId("toolPageId");
        let bSideExpanded = oToolPage.getSideExpanded();

        this._setToggleButtonTooltip(bSideExpanded);

        oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
      },

      setFocus: function(sId) {
        let oInput = this.getView().byId(sId);

        setTimeout(function() {
          oInput.focus();
        }, 0);
      },

      _setToggleButtonTooltip: function (bLarge) {
        let oToggleButton = this.byId('sideNavigationToggleButton');
        let oResourceBundle = this.getResourceBundle();
        if (bLarge) {
          oToggleButton.setTooltip(oResourceBundle.getText('sideNavigationToggleButtonTooltipCollapsed'));
        } else {
          oToggleButton.setTooltip(oResourceBundle.getText('sideNavigationToggleButtonTooltipExpanded'));
        }
      },

      checkEmail: function(sEmail, oInputEmail) {
        const rRegexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        let oResourceBundle = this.getResourceBundle();

        if (sEmail === "") {
          oInputEmail.setValueState(sap.ui.core.ValueState.Error);
          oInputEmail.setValueStateText(oResourceBundle.getText("form.emailRequired"));
          return false;
        }

        if (!rRegexEmail.test(sEmail)) {
          oInputEmail.setValueState(sap.ui.core.ValueState.Error);
          oInputEmail.setValueStateText(oResourceBundle.getText("form.emailInvalid"));
          return false;
        }
        oInputEmail.setValueState(sap.ui.core.ValueState.None);
        oInputEmail.setValueStateText("");
        return true;
      },

      checkUsername: function(sUsername, oInputUsername) {
        const rRegexUsername = /^.{3,}$/g;
        let oResourceBundle = this.getResourceBundle();

        if (sUsername === "") {
          oInputUsername.setValueState(sap.ui.core.ValueState.Error);
          oInputUsername.setValueStateText(oResourceBundle.getText("form.usernameRequired"));
          return false;
        }

        if (!rRegexUsername.test(sUsername)) {
          oInputUsername.setValueState(sap.ui.core.ValueState.Error);
          oInputUsername.setValueStateText(oResourceBundle.getText("form.usernameInvalid"));
          return false;
        }
        oInputUsername.setValueState(sap.ui.core.ValueState.None);
        oInputUsername.setValueStateText("");
        return true
      },

      checkPassword: function(sPassword, oInputPass) {
        const rRegexPassword = /^.{8,}$/g;
        let oResourceBundle = this.getResourceBundle();

        if (sPassword === "") {
          oInputPass.setValueState(sap.ui.core.ValueState.Error);
          oInputPass.setValueStateText(oResourceBundle.getText("form.passwordRequired"));
          return false;
        }

        if (!rRegexPassword.test(sPassword)) {
          oInputPass.setValueState(sap.ui.core.ValueState.Error);
          oInputPass.setValueStateText(oResourceBundle.getText("form.passwordInvalid"));
          return false;
        }
        oInputPass.setValueState(sap.ui.core.ValueState.None);
        oInputPass.setValueStateText("");
        return true
      },

      checkPasswordConfirm: function(sPasswordConfirm, sPassword, oInputConfPass) {
        let oResourceBundle = this.getResourceBundle();

        if (sPasswordConfirm === "") {
          oInputConfPass.setValueState(sap.ui.core.ValueState.Error);
          oInputConfPass.setValueStateText(oResourceBundle.getText("form.confirmPasswordRequired"));
          return false;
        }

        if (sPasswordConfirm !== sPassword) {
          oInputConfPass.setValueState(sap.ui.core.ValueState.Error);
          oInputConfPass.setValueStateText(oResourceBundle.getText("form.confirmPasswordError"));
          return false;
        }
        oInputConfPass.setValueState(sap.ui.core.ValueState.None);
        oInputConfPass.setValueStateText("");
        return true
      },

      setCookie: function(sName, sValue, iExdays) {
        let oDate = new Date();
        oDate.setTime(oDate.getTime() + (iExdays*24*60*60*1000));
        let sExpires = `expires=${oDate.toUTCString()}`;
        document.cookie = `${sName}=${sValue};${sExpires};path=/`;
      },

      resetFieldsState: function(sFormId) {
        let oVBox = this.byId(sFormId);

        oVBox.getItems().forEach(oItem => {
          if (oItem.getMetadata().getName() === "sap.m.Input") {
            this.resetStateField(oItem);
          }
        });
      },

      resetStateField: function (oInput) {
        if (oInput.setValueState) {
          oInput.setValueState("None");
        }
        if (oInput.setValueStateText) {
          oInput.setValueStateText("");
        }
      },

      onLiveChangeEmail: function(oEvent) {
        let oInputEmail = oEvent.getSource();
        let sEmail = oInputEmail.getValue();

          this.checkEmail(sEmail, oInputEmail);
      },

      onLiveChangePass: function(oEvent) {
        let oInputPass = oEvent.getSource();
        let sPassword = oInputPass.getValue();

        this.checkPassword(sPassword, oInputPass);
      },

      onLiveChangeUsername: function(oEvent) {
        let oInputUsername = oEvent.getSource();
        let sUsername = oInputUsername.getValue();

        this.checkUsername(sUsername, oInputUsername);
      },

      onRouteLogin: function() {
        this.navTo("login", "", "");
      },

      onRouteRegister: function() {
        this.resetFieldsState("login_form");
        this.navTo("register", "", "");
      },
  
      onRouteForgot: function() {
        this.navTo("forgotPassword", "", "");
      },
    });
  },
);
