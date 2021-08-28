(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+93b":
/*!************************************************!*\
  !*** ./src/app/Forms/Login/login.component.ts ***!
  \************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.service */ "UKjp");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/auth-service */ "iFFu");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");







const _c0 = ["loginForm"];
function LoginComponent_div_10_small_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Email is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_div_10_small_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Invalid email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, LoginComponent_div_10_small_1_Template, 2, 0, "small", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, LoginComponent_div_10_small_2_Template, 2, 0, "small", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r1.errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r1.errors.pattern);
} }
function LoginComponent_small_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Password is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_small_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Please fill in the email and password! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_small_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Invalid email or password! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class LoginComponent {
    constructor(loginService, router, authService, route) {
        this.loginService = loginService;
        this.router = router;
        this.authService = authService;
        this.route = route;
        this.invalidUserCredentials = false;
        this.userType = "";
        this.invalidBtnPress = false;
    }
    ngOnInit() {
        this.userType = this.route.snapshot.queryParams["userType"];
        // console.log(this.userType);
        // console.log(this.route);
        this.route.queryParams.subscribe(queryParams => {
            // console.log("*");
            this.userType = queryParams["userType"];
        });
    }
    onLogin() {
        if (this.loginForm.valid) {
            this.invalidBtnPress = false;
            console.log(this.loginForm.form.value);
            //Code to set the default user type as 'user'
            if (this.userType !== 'user' && this.userType !== 'admin') {
                // console.log("true");
                this.loginForm.form.value["userType"] = "user";
            }
            else {
                this.loginForm.form.value["userType"] = this.userType;
            }
            this.loginService.login(this.loginForm.form.value).subscribe(data => {
                console.log(data);
                this.loginService.setLoggedInUser(data["loggedInUser"]);
                if (data["loggedInUser"]["userName"] === "-1" || data["loggedInUser"]["userName"] === "0") {
                    this.invalidUserCredentials = true;
                    console.log("Invalid user credentials: " + this.invalidUserCredentials);
                }
                else {
                    console.log("User credentials verified");
                    this.authService.setLoggedInStatus(true);
                    const expiresIn = data["loggedInUser"]["expiresIn"];
                    console.log("expiresIn: ");
                    console.log(expiresIn);
                    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
                    console.log(expirationDate);
                    this.loginService.autoLogout(expiresIn * 1000);
                    if (data["loggedInUser"]["isAdmin"]) {
                        this.router.navigate(['/admin']);
                    }
                    else {
                        this.router.navigate(['/user']);
                    }
                }
            });
        }
        else {
            this.invalidBtnPress = true;
        }
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_login_service__WEBPACK_IMPORTED_MODULE_1__["LoginService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], viewQuery: function LoginComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.loginForm = _t.first);
    } }, decls: 26, vars: 4, consts: [[1, "wrapper"], [1, "title"], [1, "grid-container", 3, "ngSubmit"], ["loginForm", "ngForm"], [1, "field"], ["type", "text", "name", "email", "pattern", "^\\w+[@]\\w+[.]com|in$", "required", "", "ngModel", ""], ["email", "ngModel"], [4, "ngIf"], ["type", "password", "name", "pwd", "autocomplete", "on", "required", "", "ngModel", ""], ["password", "ngModel"], ["class", "text-danger err-msg", 4, "ngIf"], [1, "err-msg"], ["class", "text-danger", 4, "ngIf"], ["type", "submit", "value", "Login"], [1, "signup-link"], ["routerLink", "/registration"], [1, "text-danger", "err-msg"], [1, "text-danger"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Login Form ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "form", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_3_listener() { return ctx.onLogin(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "input", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Email Address");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, LoginComponent_div_10_Template, 3, 2, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "input", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, LoginComponent_small_16_Template, 2, 0, "small", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, LoginComponent_small_18_Template, 2, 0, "small", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, LoginComponent_small_19_Template, 2, 0, "small", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " Not a member ? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "a", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Signup now");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r1.errors && (_r1.invalid && _r1.touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r3.invalid && _r3.touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.invalidBtnPress);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.invalidUserCredentials && !ctx.invalidBtnPress);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["PatternValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]], styles: ["@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');\r\n*[_ngcontent-%COMP%]{\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\nhtml[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{\r\n  display: grid;\r\n  height: 100%;\r\n  width: 100%;\r\n  place-items: center;\r\n  background: #f2f2f2;\r\n  \r\n}\r\n[_ngcontent-%COMP%]::selection{\r\n  background: #4158d0;\r\n  color: #fff;\r\n}\r\n.wrapper[_ngcontent-%COMP%]{\r\n  width: 380px;\r\n  margin: 0 auto;\r\n  position: relative;\r\n  top: 0px;\r\n  background: #fff;\r\n  border-radius: 15px;\r\n  box-shadow: 0px 15px 20px rgba(0,0,0,0.1);\r\n}\r\n.wrapper[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{\r\n  font-size: 35px;\r\n  font-weight: 600;\r\n  text-align: center;\r\n  line-height: 100px;\r\n  color: #fff;\r\n  -webkit-user-select: none;\r\n          user-select: none;\r\n  border-radius: 15px 15px 0 0;\r\n  background: linear-gradient(-135deg, #c850c0, #4158d0);\r\n}\r\n.wrapper[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{\r\n  padding: 10px 30px 50px 30px;\r\n}\r\n.wrapper[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]{\r\n  height: 50px;\r\n  width: 100%;\r\n  margin: 20px 0 30px;\r\n  position: relative;\r\n}\r\n.wrapper[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{\r\n  height: 100%;\r\n  width: 100%;\r\n  outline: none;\r\n  font-size: 17px;\r\n  padding-left: 20px;\r\n  border: 1px solid lightgrey;\r\n  border-radius: 25px;\r\n  transition: all 0.3s ease;\r\n}\r\n.wrapper[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, form[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:valid{\r\n  border-color: #4158d0;\r\n}\r\n.wrapper[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 20px;\r\n  color: #999999;\r\n  font-weight: 400;\r\n  font-size: 17px;\r\n  pointer-events: none;\r\n  transform: translateY(-50%);\r\n  transition: all 0.3s ease;\r\n}\r\nform[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus    ~ label[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:required    ~ label[_ngcontent-%COMP%]{\r\n  top: 0%;\r\n  font-size: 16px;\r\n  color: #4158d0;\r\n  background: #fff;\r\n  transform: translateY(-50%);\r\n}\r\nform[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{\r\n  display: flex;\r\n  width: 100%;\r\n  height: 50px;\r\n  font-size: 16px;\r\n  align-items: center;\r\n  justify-content: space-around;\r\n}\r\nform[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .checkbox[_ngcontent-%COMP%]{\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\nform[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{\r\n  width: 15px;\r\n  height: 15px;\r\n  background: red;\r\n}\r\nform[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{\r\n  color: #262626;\r\n  -webkit-user-select: none;\r\n          user-select: none;\r\n  padding-left: 5px;\r\n}\r\nform[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .pass-link[_ngcontent-%COMP%]{\r\n  color: \"\";\r\n}\r\nform[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   input[type=\"submit\"][_ngcontent-%COMP%]{\r\n  color: #fff;\r\n  border: none;\r\n  padding-left: 0;\r\n  margin-top: -10px;\r\n  font-size: 20px;\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  background: linear-gradient(-135deg, #c850c0, #4158d0);\r\n  transition: all 0.3s ease;\r\n}\r\nform[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   input[type=\"submit\"][_ngcontent-%COMP%]:active{\r\n  transform: scale(0.95);\r\n}\r\nform[_ngcontent-%COMP%]   .signup-link[_ngcontent-%COMP%]{\r\n  color: #262626;\r\n  margin-top: 20px;\r\n  text-align: center;\r\n}\r\nform[_ngcontent-%COMP%]   .pass-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   .signup-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n  color: #4158d0;\r\n  text-decoration: none;\r\n}\r\nform[_ngcontent-%COMP%]   .pass-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, form[_ngcontent-%COMP%]   .signup-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{\r\n  text-decoration: underline;\r\n}\r\n.err-msg[_ngcontent-%COMP%]{\r\n  margin: 10px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMkZBQTJGO0FBQzNGO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixzQkFBc0I7RUFDdEIsa0NBQWtDO0FBQ3BDO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLDREQUE0RDtBQUM5RDtBQUNBO0VBQ0UsbUJBQW1CO0VBQ25CLFdBQVc7QUFDYjtBQUNBO0VBQ0UsWUFBWTtFQUNaLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIseUNBQXlDO0FBQzNDO0FBQ0E7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLHlCQUFpQjtVQUFqQixpQkFBaUI7RUFDakIsNEJBQTRCO0VBQzVCLHNEQUFzRDtBQUN4RDtBQUNBO0VBQ0UsNEJBQTRCO0FBQzlCO0FBQ0E7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsYUFBYTtFQUNiLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsMkJBQTJCO0VBQzNCLG1CQUFtQjtFQUNuQix5QkFBeUI7QUFDM0I7QUFDQTs7RUFFRSxxQkFBcUI7QUFDdkI7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsVUFBVTtFQUNWLGNBQWM7RUFDZCxnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLG9CQUFvQjtFQUNwQiwyQkFBMkI7RUFDM0IseUJBQXlCO0FBQzNCO0FBQ0E7O0VBRUUsT0FBTztFQUNQLGVBQWU7RUFDZixjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLDJCQUEyQjtBQUM3QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCxZQUFZO0VBQ1osZUFBZTtFQUNmLG1CQUFtQjtFQUNuQiw2QkFBNkI7QUFDL0I7QUFDQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0FBQ3pCO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGVBQWU7QUFDakI7QUFDQTtFQUNFLGNBQWM7RUFDZCx5QkFBaUI7VUFBakIsaUJBQWlCO0VBQ2pCLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0UsU0FBUztBQUNYO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2Ysc0RBQXNEO0VBQ3RELHlCQUF5QjtBQUMzQjtBQUNBO0VBQ0Usc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjtBQUNBOztFQUVFLGNBQWM7RUFDZCxxQkFBcUI7QUFDdkI7QUFDQTs7RUFFRSwwQkFBMEI7QUFDNUI7QUFFQTtFQUNFLFlBQVk7QUFDZCIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Qb3BwaW5zOjQwMCw1MDAsNjAwLDcwMCZkaXNwbGF5PXN3YXAnKTtcclxuKntcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XHJcbn1cclxuaHRtbCxib2R5e1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZDogI2YyZjJmMjtcclxuICAvKiBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoLTEzNWRlZywgI2M4NTBjMCwgIzQxNThkMCk7ICovXHJcbn1cclxuOjpzZWxlY3Rpb257XHJcbiAgYmFja2dyb3VuZDogIzQxNThkMDtcclxuICBjb2xvcjogI2ZmZjtcclxufVxyXG4ud3JhcHBlcntcclxuICB3aWR0aDogMzgwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHRvcDogMHB4O1xyXG4gIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcclxuICBib3gtc2hhZG93OiAwcHggMTVweCAyMHB4IHJnYmEoMCwwLDAsMC4xKTtcclxufVxyXG4ud3JhcHBlciAudGl0bGV7XHJcbiAgZm9udC1zaXplOiAzNXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGxpbmUtaGVpZ2h0OiAxMDBweDtcclxuICBjb2xvcjogI2ZmZjtcclxuICB1c2VyLXNlbGVjdDogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiAxNXB4IDE1cHggMCAwO1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgtMTM1ZGVnLCAjYzg1MGMwLCAjNDE1OGQwKTtcclxufVxyXG4ud3JhcHBlciBmb3Jte1xyXG4gIHBhZGRpbmc6IDEwcHggMzBweCA1MHB4IDMwcHg7XHJcbn1cclxuLndyYXBwZXIgZm9ybSAuZmllbGR7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbjogMjBweCAwIDMwcHg7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcbi53cmFwcGVyIGZvcm0gLmZpZWxkIGlucHV0e1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogMTAwJTtcclxuICBvdXRsaW5lOiBub25lO1xyXG4gIGZvbnQtc2l6ZTogMTdweDtcclxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmV5O1xyXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcclxufVxyXG4ud3JhcHBlciBmb3JtIC5maWVsZCBpbnB1dDpmb2N1cyxcclxuZm9ybSAuZmllbGQgaW5wdXQ6dmFsaWR7XHJcbiAgYm9yZGVyLWNvbG9yOiAjNDE1OGQwO1xyXG59XHJcbi53cmFwcGVyIGZvcm0gLmZpZWxkIGxhYmVse1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDUwJTtcclxuICBsZWZ0OiAyMHB4O1xyXG4gIGNvbG9yOiAjOTk5OTk5O1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgZm9udC1zaXplOiAxN3B4O1xyXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xyXG59XHJcbmZvcm0gLmZpZWxkIGlucHV0OmZvY3VzIH4gbGFiZWwsXHJcbmZvcm0gLmZpZWxkIGlucHV0OnJlcXVpcmVkIH4gbGFiZWx7XHJcbiAgdG9wOiAwJTtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgY29sb3I6ICM0MTU4ZDA7XHJcbiAgYmFja2dyb3VuZDogI2ZmZjtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbn1cclxuZm9ybSAuY29udGVudHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogNTBweDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxufVxyXG5mb3JtIC5jb250ZW50IC5jaGVja2JveHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuZm9ybSAuY29udGVudCBpbnB1dHtcclxuICB3aWR0aDogMTVweDtcclxuICBoZWlnaHQ6IDE1cHg7XHJcbiAgYmFja2dyb3VuZDogcmVkO1xyXG59XHJcbmZvcm0gLmNvbnRlbnQgbGFiZWx7XHJcbiAgY29sb3I6ICMyNjI2MjY7XHJcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XHJcbn1cclxuZm9ybSAuY29udGVudCAucGFzcy1saW5re1xyXG4gIGNvbG9yOiBcIlwiO1xyXG59XHJcbmZvcm0gLmZpZWxkIGlucHV0W3R5cGU9XCJzdWJtaXRcIl17XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIHBhZGRpbmctbGVmdDogMDtcclxuICBtYXJnaW4tdG9wOiAtMTBweDtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KC0xMzVkZWcsICNjODUwYzAsICM0MTU4ZDApO1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcbn1cclxuZm9ybSAuZmllbGQgaW5wdXRbdHlwZT1cInN1Ym1pdFwiXTphY3RpdmV7XHJcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTtcclxufVxyXG5mb3JtIC5zaWdudXAtbGlua3tcclxuICBjb2xvcjogIzI2MjYyNjtcclxuICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5mb3JtIC5wYXNzLWxpbmsgYSxcclxuZm9ybSAuc2lnbnVwLWxpbmsgYXtcclxuICBjb2xvcjogIzQxNThkMDtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbn1cclxuZm9ybSAucGFzcy1saW5rIGE6aG92ZXIsXHJcbmZvcm0gLnNpZ251cC1saW5rIGE6aG92ZXJ7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbn1cclxuXHJcbi5lcnItbXNne1xyXG4gIG1hcmdpbjogMTBweDtcclxufVxyXG5cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-login',
                templateUrl: './login.component.html',
                styleUrls: ['./login.component.css'],
            }]
    }], function () { return [{ type: _login_service__WEBPACK_IMPORTED_MODULE_1__["LoginService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }, { type: src_app_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }]; }, { loginForm: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['loginForm']
        }] }); })();


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Shrikant\Chatbot\chatbot-app\src\main.ts */"zUnb");


/***/ }),

/***/ "058T":
/*!**********************************************************!*\
  !*** ./src/app/static-components/home/home.component.ts ***!
  \**********************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-service */ "iFFu");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");





const _c0 = function () { return { userType: "user" }; };
const _c1 = function () { return { userType: "admin" }; };
function HomeComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Login as a user ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Login as an admin ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](3, _c1));
} }
class HomeComponent {
    constructor(authService) {
        this.authService = authService;
        this.userLoggedIn = false;
    }
    ngOnInit() {
        // console.log("Inside home.component.ts ngOnInit");
        if (this.authService.getLoggedInStatus()) {
            this.userLoggedIn = true;
            // console.log("userLoggedIn: "+this.userLoggedIn);
        }
        this.loginEventSub = this.authService.loggedInEvent.subscribe(res => {
            this.userLoggedIn = true;
            // console.log("res: "+res);
        });
        this.logoutEventSub = this.authService.loggedOutEvent.subscribe(() => {
            this.userLoggedIn = false;
        });
    }
    ngOnDestroy() {
        this.loginEventSub.unsubscribe();
        this.logoutEventSub.unsubscribe();
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"])); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 18, vars: 1, consts: [[1, "container"], [1, "row"], [1, "col-sm-6", "home-intro"], [1, "col-sm-6"], ["src", "/images/car-crash.jpg", "alt", "Car crash image", 1, "car-crash-img", "img-responsive"], ["class", "row", 4, "ngIf"], [1, "col-sm-12"], ["routerLink", "/login", 1, "btn", "btn-primary", 3, "queryParams"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Welcome to XYZ Car Insurance Company");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Is your car insured? If no, then this is the time to ponder over your car & personal safety. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Taking a car insurance can prevent you and and your car against any hefty losses caused by car-accidents & thefts. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " If you want to know more about our services, feel free to interact with our ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Chatbot");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "(link in the navigation bar). ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, HomeComponent_div_17_Template, 6, 4, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.userLoggedIn);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLink"]], styles: ["button[_ngcontent-%COMP%] {\r\n    margin: 15px;\r\n}\r\n.img-responsive[_ngcontent-%COMP%] {\r\n    padding: 10px;\r\n}\r\n.container[_ngcontent-%COMP%] {\r\n    background-color: #c1e6e6;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7QUFDaEI7QUFDQTtJQUNJLGFBQWE7QUFDakI7QUFDQTtJQUNJLHlCQUF5QjtBQUM3QiIsImZpbGUiOiJob21lLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJidXR0b24ge1xyXG4gICAgbWFyZ2luOiAxNXB4O1xyXG59XHJcbi5pbWctcmVzcG9uc2l2ZSB7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcbi5jb250YWluZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2MxZTZlNjtcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-home",
                templateUrl: "./home.component.html",
                styleUrls: ['./home.component.css']
            }]
    }], function () { return [{ type: src_app_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"] }]; }, null); })();


/***/ }),

/***/ "5/+S":
/*!******************************************************************!*\
  !*** ./src/app/static-components/about-us/about-us.component.ts ***!
  \******************************************************************/
/*! exports provided: AboutUsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutUsComponent", function() { return AboutUsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class AboutUsComponent {
}
AboutUsComponent.ɵfac = function AboutUsComponent_Factory(t) { return new (t || AboutUsComponent)(); };
AboutUsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AboutUsComponent, selectors: [["app-about-us"]], decls: 26, vars: 0, consts: [[1, "container"], [1, "row"], [1, "col-xs-10", "col-xs-offset-1", "col-sm-4", "col-sm-offset-1", "card"]], template: function AboutUsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Name: Chhitiz Anand");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Employee Id: 1856853");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Technologies known: HTML5, CSS3, JavaScript, Angular, MySQL");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Organization Name: TCS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Name: A.Shrikant");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Employee Id: 1856846");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Technologies known: HTML5, CSS3, JavaScript, Angular, MySQL");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Organization Name: TCS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".card[_ngcontent-%COMP%]{\r\n    border: 1px solid black;\r\n    height: 300px;\r\n    padding-top: 20px;\r\n    margin-bottom: 20px;\r\n    font-size: 16px;\r\n    background-color: #3aafa9;\r\n    \r\n    border-radius: 15px;\r\n    font-weight: bold;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0LXVzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSx1QkFBdUI7SUFDdkIsYUFBYTtJQUNiLGlCQUFpQjtJQUNqQixtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLHlCQUF5QjtJQUN6QiwyREFBMkQ7SUFDM0QsbUJBQW1CO0lBQ25CLGlCQUFpQjtBQUNyQiIsImZpbGUiOiJhYm91dC11cy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmR7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcclxuICAgIGhlaWdodDogMzAwcHg7XHJcbiAgICBwYWRkaW5nLXRvcDogMjBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2FhZmE5O1xyXG4gICAgLyogYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgIzNhYWZhOSk7ICovXHJcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AboutUsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-about-us",
                templateUrl: "./about-us.component.html",
                styleUrls: ['./about-us.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "5nbR":
/*!***************************************!*\
  !*** ./src/app/auth-guard.service.ts ***!
  \***************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth-service */ "iFFu");
/* harmony import */ var _Forms_Login_login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Forms/Login/login.service */ "UKjp");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");





class AuthGuard {
    constructor(authService, loginService, router) {
        this.authService = authService;
        this.loginService = loginService;
        this.router = router;
    }
    canActivate(route, state) {
        return this.authService.isAuthenticated().then((authenticated) => {
            // console.log("Inside auth-guard");
            // console.log("authenticated: "+authenticated);
            if (authenticated) {
                this.authService.loggedInEvent.emit(this.loginService.getLoggedInUser());
                return true;
            }
            else {
                this.router.navigate(['/']);
            }
        });
    }
}
AuthGuard.ɵfac = function AuthGuard_Factory(t) { return new (t || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_Forms_Login_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
AuthGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthGuard, factory: AuthGuard.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthGuard, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"] }, { type: _Forms_Login_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }]; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    apiURL: "http://localhost:3000/"
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "L+W5":
/*!*************************************************!*\
  !*** ./src/app/shared/matchFields.directive.ts ***!
  \*************************************************/
/*! exports provided: AppMatchFields */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppMatchFields", function() { return AppMatchFields; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");



class AppMatchFields {
    validate(control) {
        const controlToCompare = control.parent.get(this.appMatchFields);
        // console.log('#');
        if (control.value === '' || control.value === controlToCompare.value)
            return null;
        else
            return { 'notEqual': true };
    }
}
AppMatchFields.ɵfac = function AppMatchFields_Factory(t) { return new (t || AppMatchFields)(); };
AppMatchFields.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: AppMatchFields, selectors: [["", "appMatchFields", ""]], inputs: { appMatchFields: "appMatchFields" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
                useExisting: AppMatchFields,
                multi: true
            }])] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppMatchFields, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[appMatchFields]',
                providers: [{
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
                        useExisting: AppMatchFields,
                        multi: true
                    }]
            }]
    }], null, { appMatchFields: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "LEOZ":
/*!******************************************************!*\
  !*** ./src/app/chat-window/chat-window.component.ts ***!
  \******************************************************/
/*! exports provided: ChatWindowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatWindowComponent", function() { return ChatWindowComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _chatbot_msg_block_chatbot_msg_block_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chatbot-msg-block/chatbot-msg-block.component */ "exqd");
/* harmony import */ var _user_msg_block_user_msg_block_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-msg-block/user-msg-block.component */ "RRL4");
/* harmony import */ var _chat_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chat.service */ "b01V");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");






const _c0 = ["chatMsgRef"];
const _c1 = ["userMsgRef"];
function ChatWindowComponent_ng_template_5_Template(rf, ctx) { }
class ChatWindowComponent {
    //This chatResponse array is used to store the chatbot's responses.
    // chatResponse = ["<div>Hello user, how can I help you?<div>", "I am Eri a car insurance chatbot.", "I can tell you about car insurance."];
    //This chatResponse array is for test purpose.
    //chatResponse = ["<div>Hello user, how can I help you?<div>", "I am Eri a car insurance chatbot.", "I can tell you about car insurance."];
    constructor(_chatService, componentFactoryResolver, sanitizer) {
        this._chatService = _chatService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.sanitizer = sanitizer;
        this.chatResponse = [];
    }
    onAsk(userMsg) {
        //This will return the userMsg input element.
        //console.log(userMsg);
        //This will return the userMsg input element's value.
        console.log(userMsg.value);
        this.createUserMsgBlockComponent(userMsg.value);
        //This will return the latest 10 chats from the database.
        //this._chatService.getChats().subscribe(data => {this.chatData = data; console.log(this.chatData)});
        //This will post the user chat message to the database and get back the correct reponse.
        this.postChatsSub = this._chatService.postChats(userMsg.value).subscribe(data => {
            this.chatResponse = data;
            console.log(this.chatResponse);
            console.log("Chatbot response received successfully!");
            this.generateChatbotResponse();
        });
        this.userMsgRef.nativeElement.value = "";
        //Testing the chatbot-msg-block component here with dummy message.
        //this.createChatbotMsgBlockComponent("<b>Welcome user how can I help you.</b>");
    }
    generateChatbotResponse() {
        this.chatResponse.forEach((response, i) => {
            setTimeout(() => {
                i++;
                // console.log("Response: "+i);
                // console.log(response);
                this.createChatbotMsgBlockComponent(response);
                // this.createChatbotMsgBlockComponent2(response);
            }, 500 * i);
        });
    }
    createUserMsgBlockComponent(message) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(_user_msg_block_user_msg_block_component__WEBPACK_IMPORTED_MODULE_2__["UserMsgBlockComponent"]);
        const componentRef = this.target.createComponent(factory);
        componentRef.instance.userMsg = message;
    }
    createChatbotMsgBlockComponent(message) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(_chatbot_msg_block_chatbot_msg_block_component__WEBPACK_IMPORTED_MODULE_1__["ChatbotMsgBlockComponent"]);
        const componentRef = this.target.createComponent(factory);
        componentRef.instance.chatbotMsg = this.sanitizer.bypassSecurityTrustHtml(message);
        componentRef.instance.optionWasSelected.subscribe(event => this.onOptionWasSelected(event));
    }
    onOptionWasSelected(id) {
        // console.log("Inside onOptionWasSelected");
        console.log("Id of the bot provided option: " + id);
        this.getResponseForTopicsChosenSub = this._chatService.getResponseForChosenTopic(id).subscribe(data => {
            this.chatResponse = data;
            console.log(this.chatResponse);
            // console.log("Chatbot response for selected option received successfully!");
            this.generateChatbotResponse();
        });
    }
    ngAfterViewInit() {
        setTimeout(() => this.onOptionWasSelected("intro"), 1000);
    }
    ngOnDestroy() {
        //Cleaning up the subscriptions
        if (this.postChatsSub) {
            this.postChatsSub.unsubscribe();
        }
        if (this.getResponseForTopicsChosenSub) {
            this.getResponseForTopicsChosenSub.unsubscribe();
        }
    }
}
ChatWindowComponent.ɵfac = function ChatWindowComponent_Factory(t) { return new (t || ChatWindowComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_chat_service__WEBPACK_IMPORTED_MODULE_3__["ChatService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"])); };
ChatWindowComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ChatWindowComponent, selectors: [["app-chat-window"]], viewQuery: function ChatWindowComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.target = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.userMsgRef = _t.first);
    } }, decls: 14, vars: 0, consts: [[1, "container"], [1, "row"], [1, "col-sm-8", "col-sm-offset-2"], ["id", "chat-window"], ["id", "chat-screen"], ["chatMsgRef", ""], ["id", "chat-console"], ["id", "chat-field"], ["id", "user-msg", "name", "user-msg", "value", "", 2, "width", "100%", "margin", "2px", "padding", "5px", "resize", "none"], ["userMsgRef", ""], ["id", "ask-btn"], ["type", "button", 1, "btn", "btn-primary", 3, "click"]], template: function ChatWindowComponent_Template(rf, ctx) { if (rf & 1) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ChatWindowComponent_ng_template_5_Template, 0, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "textarea", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ChatWindowComponent_Template_button_click_12_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10); return ctx.onAsk(_r2); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Ask");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["#chat-window[_ngcontent-%COMP%] {\r\n    position: relative;\r\n    width: 100%;\r\n    height: 300px;\r\n    margin: 0 auto;\r\n    background-color: #ff5722;\r\n    border: 5px solid black;\r\n    border-radius: 10px;\r\n    top: 40px;\r\n}\r\n#chat-screen[_ngcontent-%COMP%] {\r\n    margin: 5px;\r\n    padding: 5px;\r\n    height: 75%;\r\n    background-color: white;\r\n    border: 1px solid black;\r\n    overflow: auto;\r\n}\r\n#chat-console[_ngcontent-%COMP%] {\r\n    margin: 5px;\r\n    height: 20%;\r\n    border: 1px solid black;\r\n    display: flex; \r\n    flex-wrap: wrap;\r\n    justify-content: space-around;\r\n}\r\n#chat-field[_ngcontent-%COMP%] {\r\n    width: 85%;\r\n    max-height: 90%;\r\n    margin: 2px;\r\n    display: flex;\r\n    \r\n}\r\n#ask-btn[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n@media (max-width: 350px) {\r\n    body[_ngcontent-%COMP%]{\r\n        width: 500px;\r\n    }\r\n    #chat-window[_ngcontent-%COMP%] {\r\n        height: 450px;\r\n    }\r\n}\r\n@media (max-width: 500px) {\r\n    #chat-field[_ngcontent-%COMP%] {\r\n        width: 70%;\r\n    }\r\n}\r\n.user-msg-block[_ngcontent-%COMP%] {\r\n    width: 55%;\r\n    float: right;\r\n    clear: right;\r\n    display: flex;\r\n    margin: 5px;\r\n    flex-direction: row-reverse;\r\n}\r\n.user-msg-text[_ngcontent-%COMP%] {\r\n    background-color: #4b99f1;\r\n    padding: 5px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQtd2luZG93LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLGFBQWE7SUFDYixjQUFjO0lBQ2QseUJBQXlCO0lBQ3pCLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsU0FBUztBQUNiO0FBQ0E7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLFdBQVc7SUFDWCx1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLGNBQWM7QUFDbEI7QUFDQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsdUJBQXVCO0lBQ3ZCLGFBQWE7SUFDYixlQUFlO0lBQ2YsNkJBQTZCO0FBQ2pDO0FBQ0E7SUFDSSxVQUFVO0lBQ1YsZUFBZTtJQUNmLFdBQVc7SUFDWCxhQUFhO0lBQ2IsNkJBQTZCO0FBQ2pDO0FBQ0E7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCO0FBQ0E7SUFDSTtRQUNJLFlBQVk7SUFDaEI7SUFDQTtRQUNJLGFBQWE7SUFDakI7QUFDSjtBQUNBO0lBQ0k7UUFDSSxVQUFVO0lBQ2Q7QUFDSjtBQUNBO0lBQ0ksVUFBVTtJQUNWLFlBQVk7SUFDWixZQUFZO0lBQ1osYUFBYTtJQUNiLFdBQVc7SUFDWCwyQkFBMkI7QUFDL0I7QUFDQTtJQUNJLHlCQUF5QjtJQUN6QixZQUFZO0FBQ2hCIiwiZmlsZSI6ImNoYXQtd2luZG93LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY2hhdC13aW5kb3cge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY1NzIyO1xyXG4gICAgYm9yZGVyOiA1cHggc29saWQgYmxhY2s7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgdG9wOiA0MHB4O1xyXG59XHJcbiNjaGF0LXNjcmVlbiB7XHJcbiAgICBtYXJnaW46IDVweDtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGhlaWdodDogNzUlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG59XHJcbiNjaGF0LWNvbnNvbGUge1xyXG4gICAgbWFyZ2luOiA1cHg7XHJcbiAgICBoZWlnaHQ6IDIwJTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xyXG4gICAgZGlzcGxheTogZmxleDsgXHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxufVxyXG4jY2hhdC1maWVsZCB7XHJcbiAgICB3aWR0aDogODUlO1xyXG4gICAgbWF4LWhlaWdodDogOTAlO1xyXG4gICAgbWFyZ2luOiAycHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgLyogYm9yZGVyOiAxcHggc29saWQgYmxhY2s7ICovXHJcbn1cclxuI2Fzay1idG4ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuQG1lZGlhIChtYXgtd2lkdGg6IDM1MHB4KSB7XHJcbiAgICBib2R5e1xyXG4gICAgICAgIHdpZHRoOiA1MDBweDtcclxuICAgIH1cclxuICAgICNjaGF0LXdpbmRvdyB7XHJcbiAgICAgICAgaGVpZ2h0OiA0NTBweDtcclxuICAgIH1cclxufVxyXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcclxuICAgICNjaGF0LWZpZWxkIHtcclxuICAgICAgICB3aWR0aDogNzAlO1xyXG4gICAgfVxyXG59XHJcbi51c2VyLW1zZy1ibG9jayB7XHJcbiAgICB3aWR0aDogNTUlO1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgY2xlYXI6IHJpZ2h0O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIG1hcmdpbjogNXB4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xyXG59XHJcbi51c2VyLW1zZy10ZXh0IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0Yjk5ZjE7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChatWindowComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-chat-window",
                templateUrl: "./chat-window.component.html",
                styleUrls: ['./chat-window.component.css']
            }]
    }], function () { return [{ type: _chat_service__WEBPACK_IMPORTED_MODULE_3__["ChatService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"] }]; }, { target: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ["chatMsgRef", { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], static: false }]
        }], userMsgRef: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ["userMsgRef"]
        }] }); })();


/***/ }),

/***/ "OfvS":
/*!************************************************************!*\
  !*** ./src/app/Forms/Registration/registration.service.ts ***!
  \************************************************************/
/*! exports provided: RegistrationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationService", function() { return RegistrationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ "AytR");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




class RegistrationService {
    constructor(http) {
        this.http = http;
        this._registerUserApi = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiURL + "user/register";
    }
    registerUser(user) {
        console.log("Inside RegistrationService");
        //console.log(user);
        return this.http.post(this._registerUserApi, { userData: user });
    }
}
RegistrationService.ɵfac = function RegistrationService_Factory(t) { return new (t || RegistrationService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
RegistrationService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RegistrationService, factory: RegistrationService.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RegistrationService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "PCNd":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _loading_spinner_loading_spinner_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loading-spinner/loading-spinner.component */ "zy28");
/* harmony import */ var _matchFields_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./matchFields.directive */ "L+W5");
/* harmony import */ var _navbarCollapse_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navbarCollapse.directive */ "cXc8");






class SharedModule {
}
SharedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: SharedModule });
SharedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function SharedModule_Factory(t) { return new (t || SharedModule)(); }, imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](SharedModule, { declarations: [_matchFields_directive__WEBPACK_IMPORTED_MODULE_3__["AppMatchFields"],
        _loading_spinner_loading_spinner_component__WEBPACK_IMPORTED_MODULE_2__["LoadingSpinnerComponent"],
        _navbarCollapse_directive__WEBPACK_IMPORTED_MODULE_4__["NavbarCollapseDirective"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]], exports: [_matchFields_directive__WEBPACK_IMPORTED_MODULE_3__["AppMatchFields"],
        _loading_spinner_loading_spinner_component__WEBPACK_IMPORTED_MODULE_2__["LoadingSpinnerComponent"],
        _navbarCollapse_directive__WEBPACK_IMPORTED_MODULE_4__["NavbarCollapseDirective"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](SharedModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _matchFields_directive__WEBPACK_IMPORTED_MODULE_3__["AppMatchFields"],
                    _loading_spinner_loading_spinner_component__WEBPACK_IMPORTED_MODULE_2__["LoadingSpinnerComponent"],
                    _navbarCollapse_directive__WEBPACK_IMPORTED_MODULE_4__["NavbarCollapseDirective"]
                ],
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]],
                exports: [
                    _matchFields_directive__WEBPACK_IMPORTED_MODULE_3__["AppMatchFields"],
                    _loading_spinner_loading_spinner_component__WEBPACK_IMPORTED_MODULE_2__["LoadingSpinnerComponent"],
                    _navbarCollapse_directive__WEBPACK_IMPORTED_MODULE_4__["NavbarCollapseDirective"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "RRL4":
/*!************************************************************************!*\
  !*** ./src/app/chat-window/user-msg-block/user-msg-block.component.ts ***!
  \************************************************************************/
/*! exports provided: UserMsgBlockComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserMsgBlockComponent", function() { return UserMsgBlockComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class UserMsgBlockComponent {
    constructor() {
        this.userMsg = "";
        this.msgTime = "";
    }
    //This hook method will be fired after user-msg-block.component's instance is created.
    ngOnInit() {
        this.userMsgTime = new Date();
        if (this.userMsgTime.getMinutes() < 10)
            this.msgTime = this.userMsgTime.getHours() + ":0" + this.userMsgTime.getMinutes();
        else
            this.msgTime = this.userMsgTime.getHours() + ":" + this.userMsgTime.getMinutes();
    }
}
UserMsgBlockComponent.ɵfac = function UserMsgBlockComponent_Factory(t) { return new (t || UserMsgBlockComponent)(); };
UserMsgBlockComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserMsgBlockComponent, selectors: [["app-user-msg-block"]], decls: 6, vars: 2, consts: [[1, "user-msg-block"], [1, "user-msg-text"], [1, "msg-time"]], template: function UserMsgBlockComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "sub");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.userMsg, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.msgTime);
    } }, styles: [".user-msg-block[_ngcontent-%COMP%]{\r\n    width: 55%;\r\n    float: right;\r\n    clear: right;\r\n    display: flex;\r\n    margin: 5px;\r\n    flex-direction: row-reverse;\r\n}\r\n.user-msg-text[_ngcontent-%COMP%]{\r\n    background-color: #4b99f1;\r\n    padding: 5px;\r\n}\r\n.msg-time[_ngcontent-%COMP%]{\r\n    float: right;\r\n    margin-left: 5px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItbXNnLWJsb2NrLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxVQUFVO0lBQ1YsWUFBWTtJQUNaLFlBQVk7SUFDWixhQUFhO0lBQ2IsV0FBVztJQUNYLDJCQUEyQjtBQUMvQjtBQUNBO0lBQ0kseUJBQXlCO0lBQ3pCLFlBQVk7QUFDaEI7QUFDQTtJQUNJLFlBQVk7SUFDWixnQkFBZ0I7QUFDcEIiLCJmaWxlIjoidXNlci1tc2ctYmxvY2suY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi51c2VyLW1zZy1ibG9ja3tcclxuICAgIHdpZHRoOiA1NSU7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICBjbGVhcjogcmlnaHQ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgbWFyZ2luOiA1cHg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XHJcbn1cclxuLnVzZXItbXNnLXRleHR7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGI5OWYxO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG59XHJcbi5tc2ctdGltZXtcclxuICAgIGZsb2F0OiByaWdodDtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserMsgBlockComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-user-msg-block',
                templateUrl: './user-msg-block.component.html',
                styleUrls: ['./user-msg-block.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _Forms_Login_login_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Forms/Login/login.service */ "UKjp");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-service */ "iFFu");
/* harmony import */ var _static_components_header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./static-components/header/header.component */ "phO4");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _static_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./static-components/footer/footer.component */ "zRpI");







class AppComponent {
    constructor(loginService, authService) {
        this.loginService = loginService;
        this.authService = authService;
    }
    ngOnInit() {
        console.log("Inside app.component.ts ngOnInit");
        // console.log(this.loginService.getLoggedInUser());
        console.log(this.loginService.getLoggedInUser());
        this.loginService.verifyToken(this.loginService.getLoggedInUser()).subscribe((res) => {
            console.log("Got token verification response");
            console.log(res);
            if (res["tokenValidity"]) {
                // console.log("loggedIn set");
                this.loginService.setLoggedInUser(res);
                this.loginService.autoLogout(res["expiresIn"] * 1000);
                this.authService.setLoggedInStatus(true);
                this.authService.loggedInEvent.emit(res);
            }
        });
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_Forms_Login_login_service__WEBPACK_IMPORTED_MODULE_1__["LoginService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-footer");
    } }, directives: [_static_components_header_header_component__WEBPACK_IMPORTED_MODULE_3__["HeaderComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterOutlet"], _static_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_5__["FooterComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRyIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGF7XHJcbiAgICBtYXJnaW46IDVweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XHJcbn1cclxuYS5hY3RpdmV7XHJcbiAgICBvcGFjaXR5OiAwLjc7XHJcbn0gKi8iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], function () { return [{ type: _Forms_Login_login_service__WEBPACK_IMPORTED_MODULE_1__["LoginService"] }, { type: _auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] }]; }, null); })();


/***/ }),

/***/ "UKjp":
/*!**********************************************!*\
  !*** ./src/app/Forms/Login/login.service.ts ***!
  \**********************************************/
/*! exports provided: LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "AytR");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var src_app_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/auth-service */ "iFFu");







class LoginService {
    constructor(http, authService) {
        this.http = http;
        this.authService = authService;
        this._loginApi = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiURL + "user/login";
        this._logoutApi = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiURL + "user/logout";
        this._tokenVerifyApi = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiURL + "user/token";
    }
    login(userCredentials) {
        // console.log("Inside login service");
        return this.http.post(this._loginApi, { userCredentials: userCredentials })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])((errorRes) => {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(errorRes);
        }));
    }
    logout(loggedInUser) {
        console.log("Inside logout service");
        console.log(loggedInUser);
        return this.http.post(this._logoutApi, { loggedInUser: loggedInUser });
    }
    autoLogout(expirationDuration) {
        setTimeout(() => {
            this.authService.loggedOutEvent.emit();
            console.log("User logged out!");
        }, expirationDuration);
    }
    verifyToken(loggedInUser) {
        // console.log("Inside verifyToken service");
        // console.log(loggedInUser);
        return this.http.post(this._tokenVerifyApi, { loggedInUser: loggedInUser });
    }
    getLoggedInUser() {
        return this.loggedInUser;
    }
    setLoggedInUser(loggedInUser) {
        this.loggedInUser = loggedInUser;
    }
}
LoginService.ɵfac = function LoginService_Factory(t) { return new (t || LoginService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](src_app_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"])); };
LoginService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LoginService, factory: LoginService.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] }, { type: src_app_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _chat_window_user_msg_block_user_msg_block_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chat-window/user-msg-block/user-msg-block.component */ "RRL4");
/* harmony import */ var _chat_window_chatbot_msg_block_chatbot_msg_block_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chat-window/chatbot-msg-block/chatbot-msg-block.component */ "exqd");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _chat_window_chat_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./chat-window/chat.service */ "b01V");
/* harmony import */ var _static_components_header_header_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./static-components/header/header.component */ "phO4");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _Forms_Login_login_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Forms/Login/login.service */ "UKjp");
/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./auth-guard.service */ "5nbR");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./auth-service */ "iFFu");
/* harmony import */ var _static_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./static-components/footer/footer.component */ "zRpI");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared/shared.module */ "PCNd");
/* harmony import */ var _Forms_Login_login_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Forms/Login/login.component */ "+93b");
/* harmony import */ var _Forms_Registration_registration_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Forms/Registration/registration.component */ "n7nZ");
/* harmony import */ var _chat_window_chat_window_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./chat-window/chat-window.component */ "LEOZ");
/* harmony import */ var _static_components_home_home_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./static-components/home/home.component */ "058T");
/* harmony import */ var _static_components_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./static-components/contacts/contacts.component */ "ug7A");
/* harmony import */ var _static_components_about_us_about_us_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./static-components/about-us/about-us.component */ "5/+S");






















// import { HashLocationStrategy, LocationStrategy } from '@angular/common';
class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_chat_window_chat_service__WEBPACK_IMPORTED_MODULE_7__["ChatService"],
        _Forms_Login_login_service__WEBPACK_IMPORTED_MODULE_10__["LoginService"],
        _auth_guard_service__WEBPACK_IMPORTED_MODULE_11__["AuthGuard"],
        _auth_service__WEBPACK_IMPORTED_MODULE_12__["AuthService"]
        // {provide: LocationStrategy, useClass: HashLocationStrategy}
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_14__["SharedModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _chat_window_user_msg_block_user_msg_block_component__WEBPACK_IMPORTED_MODULE_4__["UserMsgBlockComponent"],
        _chat_window_chatbot_msg_block_chatbot_msg_block_component__WEBPACK_IMPORTED_MODULE_5__["ChatbotMsgBlockComponent"], _Forms_Login_login_component__WEBPACK_IMPORTED_MODULE_15__["LoginComponent"], _Forms_Registration_registration_component__WEBPACK_IMPORTED_MODULE_16__["RegistrationComponent"], _chat_window_chat_window_component__WEBPACK_IMPORTED_MODULE_17__["ChatWindowComponent"], _static_components_home_home_component__WEBPACK_IMPORTED_MODULE_18__["HomeComponent"], _static_components_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_19__["ContactsComponent"], _static_components_about_us_about_us_component__WEBPACK_IMPORTED_MODULE_20__["AboutUsComponent"], _static_components_header_header_component__WEBPACK_IMPORTED_MODULE_8__["HeaderComponent"],
        _static_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_13__["FooterComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_14__["SharedModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                    _chat_window_user_msg_block_user_msg_block_component__WEBPACK_IMPORTED_MODULE_4__["UserMsgBlockComponent"],
                    _chat_window_chatbot_msg_block_chatbot_msg_block_component__WEBPACK_IMPORTED_MODULE_5__["ChatbotMsgBlockComponent"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["routingComponents"],
                    _static_components_header_header_component__WEBPACK_IMPORTED_MODULE_8__["HeaderComponent"],
                    _static_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_13__["FooterComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                    _shared_shared_module__WEBPACK_IMPORTED_MODULE_14__["SharedModule"]
                ],
                providers: [_chat_window_chat_service__WEBPACK_IMPORTED_MODULE_7__["ChatService"],
                    _Forms_Login_login_service__WEBPACK_IMPORTED_MODULE_10__["LoginService"],
                    _auth_guard_service__WEBPACK_IMPORTED_MODULE_11__["AuthGuard"],
                    _auth_service__WEBPACK_IMPORTED_MODULE_12__["AuthService"]
                    // {provide: LocationStrategy, useClass: HashLocationStrategy}
                ],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "b01V":
/*!*********************************************!*\
  !*** ./src/app/chat-window/chat.service.ts ***!
  \*********************************************/
/*! exports provided: ChatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatService", function() { return ChatService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "AytR");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




class ChatService {
    constructor(http) {
        this.http = http;
        this._chatsRetreiveApi = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiURL + "chat/getChat";
        this._chatsPostApi = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiURL + "chat/postChat";
        this._getResponseApi = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiURL + "chat/getResponseForTopicsChosen";
    }
    getChats() {
        return this.http.get(this._chatsRetreiveApi);
    }
    postChats(chatMsg) {
        let chatDateString = this.getDate();
        return this.http.post(this._chatsPostApi, { "user-msg": chatMsg, "chatDate": chatDateString });
    }
    getResponseForChosenTopic(optionId) {
        let chatDateString = this.getDate();
        return this.http.post(this._getResponseApi, { "need": optionId, "chatDate": chatDateString });
    }
    getDate() {
        var x = new Date();
        var year = x.getFullYear();
        var month = x.getMonth() < 10 ? 0 + "" + (x.getMonth() + 1) : (x.getMonth() + 1);
        var date = x.getDate() < 10 ? 0 + "" + x.getDate() : x.getDate();
        var time = x.toLocaleTimeString();
        if (time.includes("PM")) {
            if (parseInt(time.split(":")[0]) != 12) {
                time = (parseInt(time.charAt(0)) + 12) + time.substring(1, time.indexOf('PM') - 1);
            }
            else {
                time.substring(0, time.indexOf('PM') - 1);
            }
        }
        else if (time.includes("AM")) {
            if (parseInt(time.split(":")[0]) != 12) {
                time = time.substring(0, time.indexOf('AM') - 1);
            }
            else {
                time = "00" + time.substring(2, time.indexOf('AM') - 1);
            }
        }
        return year + "-" + month + "-" + date + " " + time;
    }
}
ChatService.ɵfac = function ChatService_Factory(t) { return new (t || ChatService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
ChatService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ChatService, factory: ChatService.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChatService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "cXc8":
/*!****************************************************!*\
  !*** ./src/app/shared/navbarCollapse.directive.ts ***!
  \****************************************************/
/*! exports provided: NavbarCollapseDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarCollapseDirective", function() { return NavbarCollapseDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth-service */ "iFFu");



class NavbarCollapseDirective {
    constructor(el, authService) {
        this.el = el;
        this.authService = authService;
        this.isIn = false;
        let htmlEl = el.nativeElement;
        console.log(htmlEl);
        console.log(el);
    }
    navbarCollapseToggle(event) {
        console.log("Inside navbarCollapse.directive.ts navbarCollapseToggle");
        console.log(event.target["className"]);
        if (event.target["className"] === "navbar-toggle" || event.target["className"] === "icon-bar") {
            console.log("Inside navbarCollapse.directive.ts if");
            this.isIn = !this.isIn;
        }
        else {
            console.log("Inside navbarCollapse.directive.ts else");
            if (window.innerWidth < 920) {
                this.isIn = this.el.nativeElement.contains(event.target) ? !this.isIn : false;
            }
        }
        console.log("isIn:" + this.isIn);
    }
}
NavbarCollapseDirective.ɵfac = function NavbarCollapseDirective_Factory(t) { return new (t || NavbarCollapseDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"])); };
NavbarCollapseDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: NavbarCollapseDirective, selectors: [["", "navbarCollapse", ""]], hostVars: 2, hostBindings: function NavbarCollapseDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavbarCollapseDirective_click_HostBindingHandler($event) { return ctx.navbarCollapseToggle($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("in", ctx.isIn);
    } } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavbarCollapseDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[navbarCollapse]'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }, { type: _auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"] }]; }, { isIn: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
            args: ['class.in']
        }], navbarCollapseToggle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['document:click', ['$event']]
        }] }); })();


/***/ }),

/***/ "exqd":
/*!******************************************************************************!*\
  !*** ./src/app/chat-window/chatbot-msg-block/chatbot-msg-block.component.ts ***!
  \******************************************************************************/
/*! exports provided: ChatbotMsgBlockComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatbotMsgBlockComponent", function() { return ChatbotMsgBlockComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


const _c0 = ["chatbotMsgBlock"];
class ChatbotMsgBlockComponent {
    constructor() {
        this.msgTime = "";
        this.optionWasSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    //This hook method will be fired after chatbot-msg-block.component's instance is created.
    ngOnInit() {
        this.chatbotMsgTime = new Date();
        if (this.chatbotMsgTime.getMinutes() < 10)
            this.msgTime = this.chatbotMsgTime.getHours() + ":0" + this.chatbotMsgTime.getMinutes();
        else
            this.msgTime = this.chatbotMsgTime.getHours() + ":" + this.chatbotMsgTime.getMinutes();
    }
    ngAfterViewInit() {
        // console.log("Inside ngAfterViewInit()");
        //This code will make sure that the latest chatbot message is scrolled automatically into view.
        this.chatbotMsgBlock.nativeElement.scrollIntoView();
    }
    onOptionSelected(event) {
        // console.log("Inside onOptionSelected");
        //console.log(event.target.className);
        if (event.target.className === 'topics')
            this.optionWasSelected.emit(event.target.id);
    }
}
ChatbotMsgBlockComponent.ɵfac = function ChatbotMsgBlockComponent_Factory(t) { return new (t || ChatbotMsgBlockComponent)(); };
ChatbotMsgBlockComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ChatbotMsgBlockComponent, selectors: [["app-chatbot-msg-block"]], viewQuery: function ChatbotMsgBlockComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.chatbotMsgBlock = _t.first);
    } }, outputs: { optionWasSelected: "optionWasSelected" }, decls: 7, vars: 2, consts: [[1, "chatbot-msg-block", 3, "click"], ["chatbotMsgBlock", ""], [1, "chatbot-msg-text"], [3, "innerHtml"], [1, "msg-time"]], template: function ChatbotMsgBlockComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ChatbotMsgBlockComponent_Template_div_click_0_listener($event) { return ctx.onOptionSelected($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "sub");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHtml", ctx.chatbotMsg, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.msgTime);
    } }, styles: [".chatbot-msg-block{\r\n    width: 60%;\r\n    float: left;\r\n    clear: right;\r\n    display: flex;\r\n    margin: 5px;\r\n}\r\n.chatbot-msg-text{\r\n    background-color: #57c686;\r\n    padding: 5px;\r\n}\r\n.msg-time{\r\n    float: right;\r\n    margin-left: 5px;\r\n}\r\n.topics{\r\n    text-decoration: none;\r\n    color: white;\r\n    margin: 5px;\r\n    border: 1px solid black;\r\n    border-radius: 8px;\r\n    background-color: #4742ac;\r\n    padding: 5px;\r\n}\r\n.topics:hover{\r\n    cursor: pointer;\r\n    background-color: #2823b0;\r\n}\r\n#options{\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXRib3QtbXNnLWJsb2NrLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxVQUFVO0lBQ1YsV0FBVztJQUNYLFlBQVk7SUFDWixhQUFhO0lBQ2IsV0FBVztBQUNmO0FBQ0E7SUFDSSx5QkFBeUI7SUFDekIsWUFBWTtBQUNoQjtBQUNBO0lBQ0ksWUFBWTtJQUNaLGdCQUFnQjtBQUNwQjtBQUNBO0lBQ0kscUJBQXFCO0lBQ3JCLFlBQVk7SUFDWixXQUFXO0lBQ1gsdUJBQXVCO0lBQ3ZCLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsWUFBWTtBQUNoQjtBQUNBO0lBQ0ksZUFBZTtJQUNmLHlCQUF5QjtBQUM3QjtBQUNBO0lBQ0ksYUFBYTtJQUNiLGVBQWU7QUFDbkIiLCJmaWxlIjoiY2hhdGJvdC1tc2ctYmxvY2suY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jaGF0Ym90LW1zZy1ibG9ja3tcclxuICAgIHdpZHRoOiA2MCU7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIGNsZWFyOiByaWdodDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBtYXJnaW46IDVweDtcclxufVxyXG4uY2hhdGJvdC1tc2ctdGV4dHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM1N2M2ODY7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbn1cclxuLm1zZy10aW1le1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcclxufVxyXG4udG9waWNze1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgbWFyZ2luOiA1cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NzQyYWM7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbn1cclxuLnRvcGljczpob3ZlcntcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyODIzYjA7XHJcbn1cclxuI29wdGlvbnN7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG59Il19 */"], encapsulation: 3 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChatbotMsgBlockComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-chatbot-msg-block",
                templateUrl: "./chatbot-msg-block.component.html",
                styleUrls: ["./chatbot-msg-block.component.css"],
                //This will make the #options and .topics styles move to global scope.
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].ShadowDom
            }]
    }], function () { return []; }, { chatbotMsgBlock: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['chatbotMsgBlock']
        }], optionWasSelected: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "iFFu":
/*!*********************************!*\
  !*** ./src/app/auth-service.ts ***!
  \*********************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



class AuthService {
    constructor(http) {
        this.http = http;
        //This loggedIn property is just for testing purpose.
        this.loggedIn = false;
        // userName = "";
        // isAdmin = false;
        this.loggedInEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.loggedOutEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    isAuthenticated() {
        const promise = new Promise((resolve, reject) => {
            //Dummy delay.
            // setTimeout(()=>{
            //     console.log("loggedIn: "+this.loggedIn);
            //     resolve(this.loggedIn);
            // },1000);
            //Verifying the token with every erequest to this route.
            // this.loginService.verifyToken(this.loginService.getLoggedInUser()).subscribe((res)=>{
            //     console.log(res);
            //     //Setting the username here is important incase the user refreshes the page from paths other than /user. 
            //     this.userName = res["userName"];
            //     resolve(res["tokenValidity"]);
            // })
            resolve(this.getLoggedInStatus());
        });
        return promise;
    }
    setLoggedInStatus(loginStatus) {
        // console.log("Inside setLoggedInStatus");
        this.loggedIn = loginStatus;
    }
    getLoggedInStatus() {
        return this.loggedIn;
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
AuthService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "n7nZ":
/*!**************************************************************!*\
  !*** ./src/app/Forms/Registration/registration.component.ts ***!
  \**************************************************************/
/*! exports provided: RegistrationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationComponent", function() { return RegistrationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _registration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./registration.service */ "OfvS");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _shared_matchFields_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/matchFields.directive */ "L+W5");








function RegistrationComponent_div_10_small_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Name is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegistrationComponent_div_10_small_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Name must be atleast 3 characters long. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegistrationComponent_div_10_small_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Name can't be more than 30 characters long. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegistrationComponent_div_10_small_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Name can contain only the alphabets.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegistrationComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, RegistrationComponent_div_10_small_1_Template, 2, 0, "small", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, RegistrationComponent_div_10_small_2_Template, 2, 0, "small", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, RegistrationComponent_div_10_small_3_Template, 2, 0, "small", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, RegistrationComponent_div_10_small_4_Template, 2, 0, "small", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.registrationForm.get("name").errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.registrationForm.get("name").errors.minlength);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.registrationForm.get("name").errors.maxlength);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.registrationForm.get("name").errors.pattern);
} }
function RegistrationComponent_div_16_small_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Email is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegistrationComponent_div_16_small_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Invalid email.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegistrationComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, RegistrationComponent_div_16_small_1_Template, 2, 0, "small", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, RegistrationComponent_div_16_small_2_Template, 2, 0, "small", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.registrationForm.get("email").errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.registrationForm.get("email").errors.pattern);
} }
function RegistrationComponent_div_22_small_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Password is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegistrationComponent_div_22_small_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Password must be between 6-15 characters. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegistrationComponent_div_22_small_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Password can contain only alphabets, digits and _(underscore).");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegistrationComponent_div_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, RegistrationComponent_div_22_small_1_Template, 2, 0, "small", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, RegistrationComponent_div_22_small_2_Template, 2, 0, "small", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, RegistrationComponent_div_22_small_3_Template, 2, 0, "small", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.registrationForm.get("password").errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.registrationForm.get("password").errors.minlength);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.registrationForm.get("password").errors.pattern);
} }
function RegistrationComponent_div_28_small_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Confirm password is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegistrationComponent_div_28_small_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Confirm password does match password.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegistrationComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, RegistrationComponent_div_28_small_1_Template, 2, 0, "small", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, RegistrationComponent_div_28_small_2_Template, 2, 0, "small", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.registrationForm.get("confirm_password").errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.registrationForm.get("confirm_password").errors.notEqual);
} }
function RegistrationComponent_small_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "This email already exists! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegistrationComponent_small_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Please fill in all the required fields! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegistrationComponent_small_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "You have been registered successfully! Now you can login. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class RegistrationComponent {
    constructor(registrationService) {
        this.registrationService = registrationService;
        this.duplicateEmail = false;
        this.invalidBtnPress = false;
        this.registrationSuccessful = false;
        this.registrationForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(30), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[a-zA-Z]*")]),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(/^\w+[@]\w+[.]com|in$/)]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(6) || _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(15), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(/^\w*$/)]),
            confirm_password: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(6) || _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(15), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(/^\w*$/)])
        });
    }
    onRegister() {
        if (this.registrationForm.valid) {
            this.invalidBtnPress = false;
            console.log("Registeration occurred");
            this.registerUserSub = this.registrationService.registerUser(this.registrationForm.value).subscribe((res) => {
                console.log(res);
                if (res["msg"] === "") {
                    this.duplicateEmail = true;
                    this.registrationSuccessful = false;
                }
                else {
                    this.registrationSuccessful = true;
                    this.duplicateEmail = false;
                    this.registrationForm.reset({
                        name: '',
                        email: '',
                        password: '',
                        confirm_password: ''
                    });
                }
            });
        }
        else {
            this.invalidBtnPress = true;
            this.registrationSuccessful = false;
        }
    }
    ngOnDestroy() {
        if (this.registerUserSub) {
            this.registerUserSub.unsubscribe();
        }
    }
}
RegistrationComponent.ɵfac = function RegistrationComponent_Factory(t) { return new (t || RegistrationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_registration_service__WEBPACK_IMPORTED_MODULE_2__["RegistrationService"])); };
RegistrationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RegistrationComponent, selectors: [["app-register"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_registration_service__WEBPACK_IMPORTED_MODULE_2__["RegistrationService"]])], decls: 35, vars: 8, consts: [[1, "container"], [1, "title"], [1, "content"], [3, "formGroup", "ngSubmit"], [1, "user-details"], [1, "input-box", "has-error"], [1, "details"], ["type", "text", "placeholder", "Enter your username", "formControlName", "name", "autocomplete", "on"], [4, "ngIf"], [1, "input-box"], ["type", "text", "placeholder", "Enter your email", "formControlName", "email"], ["type", "text", "placeholder", "Enter your password", "name", "password", "formControlName", "password", 3, "input"], ["type", "text", "placeholder", "Confirm your password", "formControlName", "confirm_password", "appMatchFields", "password"], ["class", "text-danger", 4, "ngIf"], ["class", "text-success", 4, "ngIf"], [1, "button"], ["type", "submit", "value", "Register"], [1, "text-danger"], [1, "text-success"]], template: function RegistrationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Registration");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function RegistrationComponent_Template_form_ngSubmit_4_listener() { return ctx.onRegister(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Username");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, RegistrationComponent_div_10_Template, 5, 4, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Email Id");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, RegistrationComponent_div_16_Template, 3, 2, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function RegistrationComponent_Template_input_input_21_listener() { return ctx.registrationForm.get("confirm_password").updateValueAndValidity(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, RegistrationComponent_div_22_Template, 4, 3, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Confirm Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "input", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, RegistrationComponent_div_28_Template, 3, 2, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, RegistrationComponent_small_30_Template, 2, 0, "small", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](31, RegistrationComponent_small_31_Template, 2, 0, "small", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](32, RegistrationComponent_small_32_Template, 2, 0, "small", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.registrationForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.registrationForm.get("name").invalid && ctx.registrationForm.get("name").touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.registrationForm.get("email").invalid && ctx.registrationForm.get("email").touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.registrationForm.get("password").invalid && ctx.registrationForm.get("password").touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.registrationForm.get("confirm_password").invalid && ctx.registrationForm.get("confirm_password").touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.duplicateEmail);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.registrationForm.invalid && ctx.invalidBtnPress);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.invalidBtnPress && ctx.registrationSuccessful && ctx.registrationForm.untouched);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _shared_matchFields_directive__WEBPACK_IMPORTED_MODULE_4__["AppMatchFields"]], styles: ["@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');\r\n*[_ngcontent-%COMP%]{\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins',sans-serif;\r\n}\r\nbody[_ngcontent-%COMP%]{\r\n  height: 100vh;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  padding: 10px;\r\n  background: linear-gradient(135deg, #71b7e6, #9b59b6);\r\n}\r\n.container[_ngcontent-%COMP%]{\r\n  max-width: 700px;\r\n  width: 100%;\r\n  background-color: #fff;\r\n  padding: 25px 30px;\r\n  margin: auto;\r\n  border-radius: 5px;\r\n  box-shadow: 0 5px 10px rgba(0,0,0,0.15);\r\n}\r\n.container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{\r\n  font-size: 25px;\r\n  font-weight: 500;\r\n  position: relative;\r\n}\r\n.container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]::before{\r\n  content: \"\";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  height: 3px;\r\n  width: 30px;\r\n  border-radius: 5px;\r\n  background: linear-gradient(135deg, #71b7e6, #9b59b6);\r\n}\r\n.content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]{\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: space-between;\r\n  margin: 20px 0 12px 0;\r\n}\r\nform[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{\r\n  margin-bottom: 15px;\r\n  width: calc(100% / 2 - 20px);\r\n}\r\nform[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   span.details[_ngcontent-%COMP%]{\r\n  display: block;\r\n  font-weight: 500;\r\n  margin-bottom: 5px;\r\n}\r\n.user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{\r\n  height: 45px;\r\n  width: 100%;\r\n  outline: none;\r\n  font-size: 16px;\r\n  border-radius: 5px;\r\n  padding-left: 15px;\r\n  border: 1px solid #ccc;\r\n  border-bottom-width: 2px;\r\n  transition: all 0.3s ease;\r\n}\r\n.user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:valid{\r\n  border-color: #9b59b6;\r\n}\r\nform[_ngcontent-%COMP%]   .gender-details[_ngcontent-%COMP%]   .gender-title[_ngcontent-%COMP%]{\r\n  font-size: 20px;\r\n  font-weight: 500;\r\n }\r\nform[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]{\r\n   display: flex;\r\n   width: 80%;\r\n   margin: 14px 0 ;\r\n   justify-content: space-between;\r\n }\r\nform[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{\r\n   display: flex;\r\n   align-items: center;\r\n   cursor: pointer;\r\n }\r\nform[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%]{\r\n  height: 18px;\r\n  width: 18px;\r\n  border-radius: 50%;\r\n  margin-right: 10px;\r\n  background: #d9d9d9;\r\n  border: 5px solid transparent;\r\n  transition: all 0.3s ease;\r\n}\r\n#dot-1[_ngcontent-%COMP%]:checked    ~ .category[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   .one[_ngcontent-%COMP%], #dot-2[_ngcontent-%COMP%]:checked    ~ .category[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   .two[_ngcontent-%COMP%], #dot-3[_ngcontent-%COMP%]:checked    ~ .category[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   .three[_ngcontent-%COMP%]{\r\n   background: #9b59b6;\r\n   border-color: #d9d9d9;\r\n }\r\nform[_ngcontent-%COMP%]   input[type=\"radio\"][_ngcontent-%COMP%]{\r\n   display: none;\r\n }\r\nform[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{\r\n   height: 45px;\r\n   margin: 35px 0\r\n }\r\nform[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{\r\n   height: 100%;\r\n   width: 100%;\r\n   border-radius: 5px;\r\n   border: none;\r\n   color: #fff;\r\n   font-size: 18px;\r\n   font-weight: 500;\r\n   letter-spacing: 1px;\r\n   cursor: pointer;\r\n   transition: all 0.3s ease;\r\n   background: linear-gradient(135deg, #71b7e6, #9b59b6);\r\n }\r\nform[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:hover{\r\n  \r\n  background: linear-gradient(-135deg, #71b7e6, #9b59b6);\r\n  }\r\n@media(max-width: 584px){\r\n .container[_ngcontent-%COMP%]{\r\n  max-width: 100%;\r\n}\r\nform[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{\r\n    margin-bottom: 15px;\r\n    width: 100%;\r\n  }\r\n  form[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]{\r\n    width: 100%;\r\n  }\r\n  .content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%]{\r\n    overflow-y: scroll;\r\n  }\r\n  .user-details[_ngcontent-%COMP%]::-webkit-scrollbar{\r\n    width: 5px;\r\n  }\r\n  }\r\n@media(max-width: 459px){\r\n  .container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]{\r\n    flex-direction: column;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdHJhdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHlHQUF5RztBQUN6RztFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysc0JBQXNCO0VBQ3RCLGlDQUFpQztBQUNuQztBQUNBO0VBQ0UsYUFBYTtFQUNiLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixxREFBcUQ7QUFDdkQ7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLHVDQUF1QztBQUN6QztBQUNBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsT0FBTztFQUNQLFNBQVM7RUFDVCxXQUFXO0VBQ1gsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixxREFBcUQ7QUFDdkQ7QUFDQTtFQUNFLGFBQWE7RUFDYixlQUFlO0VBQ2YsOEJBQThCO0VBQzlCLHFCQUFxQjtBQUN2QjtBQUNBO0VBQ0UsbUJBQW1CO0VBQ25CLDRCQUE0QjtBQUM5QjtBQUNBO0VBQ0UsY0FBYztFQUNkLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsYUFBYTtFQUNiLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0Qix3QkFBd0I7RUFDeEIseUJBQXlCO0FBQzNCO0FBQ0E7O0VBRUUscUJBQXFCO0FBQ3ZCO0FBQ0M7RUFDQyxlQUFlO0VBQ2YsZ0JBQWdCO0NBQ2pCO0FBQ0E7R0FDRSxhQUFhO0dBQ2IsVUFBVTtHQUNWLGVBQWU7R0FDZiw4QkFBOEI7Q0FDaEM7QUFDQTtHQUNFLGFBQWE7R0FDYixtQkFBbUI7R0FDbkIsZUFBZTtDQUNqQjtBQUNBO0VBQ0MsWUFBWTtFQUNaLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQiw2QkFBNkI7RUFDN0IseUJBQXlCO0FBQzNCO0FBQ0M7OztHQUdFLG1CQUFtQjtHQUNuQixxQkFBcUI7Q0FDdkI7QUFDQTtHQUNFLGFBQWE7Q0FDZjtBQUNBO0dBQ0UsWUFBWTtHQUNaO0NBQ0Y7QUFDQTtHQUNFLFlBQVk7R0FDWixXQUFXO0dBQ1gsa0JBQWtCO0dBQ2xCLFlBQVk7R0FDWixXQUFXO0dBQ1gsZUFBZTtHQUNmLGdCQUFnQjtHQUNoQixtQkFBbUI7R0FDbkIsZUFBZTtHQUNmLHlCQUF5QjtHQUN6QixxREFBcUQ7Q0FDdkQ7QUFDQTtFQUNDLDRCQUE0QjtFQUM1QixzREFBc0Q7RUFDdEQ7QUFDRDtDQUNBO0VBQ0MsZUFBZTtBQUNqQjtBQUNBO0lBQ0ksbUJBQW1CO0lBQ25CLFdBQVc7RUFDYjtFQUNBO0lBQ0UsV0FBVztFQUNiO0VBQ0E7SUFDRSxrQkFBa0I7RUFDcEI7RUFDQTtJQUNFLFVBQVU7RUFDWjtFQUNBO0FBQ0E7RUFDQTtJQUNFLHNCQUFzQjtFQUN4QjtBQUNGIiwiZmlsZSI6InJlZ2lzdHJhdGlvbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGluczp3Z2h0QDIwMDszMDA7NDAwOzUwMDs2MDA7NzAwJmRpc3BsYXk9c3dhcCcpO1xyXG4qe1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJyxzYW5zLXNlcmlmO1xyXG59XHJcbmJvZHl7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNzFiN2U2LCAjOWI1OWI2KTtcclxufVxyXG4uY29udGFpbmVye1xyXG4gIG1heC13aWR0aDogNzAwcHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBwYWRkaW5nOiAyNXB4IDMwcHg7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBib3gtc2hhZG93OiAwIDVweCAxMHB4IHJnYmEoMCwwLDAsMC4xNSk7XHJcbn1cclxuLmNvbnRhaW5lciAudGl0bGV7XHJcbiAgZm9udC1zaXplOiAyNXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcbi5jb250YWluZXIgLnRpdGxlOjpiZWZvcmV7XHJcbiAgY29udGVudDogXCJcIjtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGVmdDogMDtcclxuICBib3R0b206IDA7XHJcbiAgaGVpZ2h0OiAzcHg7XHJcbiAgd2lkdGg6IDMwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM3MWI3ZTYsICM5YjU5YjYpO1xyXG59XHJcbi5jb250ZW50IGZvcm0gLnVzZXItZGV0YWlsc3tcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgbWFyZ2luOiAyMHB4IDAgMTJweCAwO1xyXG59XHJcbmZvcm0gLnVzZXItZGV0YWlscyAuaW5wdXQtYm94e1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgd2lkdGg6IGNhbGMoMTAwJSAvIDIgLSAyMHB4KTtcclxufVxyXG5mb3JtIC5pbnB1dC1ib3ggc3Bhbi5kZXRhaWxze1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG59XHJcbi51c2VyLWRldGFpbHMgLmlucHV0LWJveCBpbnB1dHtcclxuICBoZWlnaHQ6IDQ1cHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgb3V0bGluZTogbm9uZTtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIHBhZGRpbmctbGVmdDogMTVweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDJweDtcclxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xyXG59XHJcbi51c2VyLWRldGFpbHMgLmlucHV0LWJveCBpbnB1dDpmb2N1cyxcclxuLnVzZXItZGV0YWlscyAuaW5wdXQtYm94IGlucHV0OnZhbGlke1xyXG4gIGJvcmRlci1jb2xvcjogIzliNTliNjtcclxufVxyXG4gZm9ybSAuZ2VuZGVyLWRldGFpbHMgLmdlbmRlci10aXRsZXtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuIH1cclxuIGZvcm0gLmNhdGVnb3J5e1xyXG4gICBkaXNwbGF5OiBmbGV4O1xyXG4gICB3aWR0aDogODAlO1xyXG4gICBtYXJnaW46IDE0cHggMCA7XHJcbiAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuIH1cclxuIGZvcm0gLmNhdGVnb3J5IGxhYmVse1xyXG4gICBkaXNwbGF5OiBmbGV4O1xyXG4gICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICBjdXJzb3I6IHBvaW50ZXI7XHJcbiB9XHJcbiBmb3JtIC5jYXRlZ29yeSBsYWJlbCAuZG90e1xyXG4gIGhlaWdodDogMThweDtcclxuICB3aWR0aDogMThweDtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gIGJhY2tncm91bmQ6ICNkOWQ5ZDk7XHJcbiAgYm9yZGVyOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcclxufVxyXG4gI2RvdC0xOmNoZWNrZWQgfiAuY2F0ZWdvcnkgbGFiZWwgLm9uZSxcclxuICNkb3QtMjpjaGVja2VkIH4gLmNhdGVnb3J5IGxhYmVsIC50d28sXHJcbiAjZG90LTM6Y2hlY2tlZCB+IC5jYXRlZ29yeSBsYWJlbCAudGhyZWV7XHJcbiAgIGJhY2tncm91bmQ6ICM5YjU5YjY7XHJcbiAgIGJvcmRlci1jb2xvcjogI2Q5ZDlkOTtcclxuIH1cclxuIGZvcm0gaW5wdXRbdHlwZT1cInJhZGlvXCJde1xyXG4gICBkaXNwbGF5OiBub25lO1xyXG4gfVxyXG4gZm9ybSAuYnV0dG9ue1xyXG4gICBoZWlnaHQ6IDQ1cHg7XHJcbiAgIG1hcmdpbjogMzVweCAwXHJcbiB9XHJcbiBmb3JtIC5idXR0b24gaW5wdXR7XHJcbiAgIGhlaWdodDogMTAwJTtcclxuICAgd2lkdGg6IDEwMCU7XHJcbiAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgYm9yZGVyOiBub25lO1xyXG4gICBjb2xvcjogI2ZmZjtcclxuICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICBmb250LXdlaWdodDogNTAwO1xyXG4gICBsZXR0ZXItc3BhY2luZzogMXB4O1xyXG4gICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcbiAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM3MWI3ZTYsICM5YjU5YjYpO1xyXG4gfVxyXG4gZm9ybSAuYnV0dG9uIGlucHV0OmhvdmVye1xyXG4gIC8qIHRyYW5zZm9ybTogc2NhbGUoMC45OSk7ICovXHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KC0xMzVkZWcsICM3MWI3ZTYsICM5YjU5YjYpO1xyXG4gIH1cclxuIEBtZWRpYShtYXgtd2lkdGg6IDU4NHB4KXtcclxuIC5jb250YWluZXJ7XHJcbiAgbWF4LXdpZHRoOiAxMDAlO1xyXG59XHJcbmZvcm0gLnVzZXItZGV0YWlscyAuaW5wdXQtYm94e1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICBmb3JtIC5jYXRlZ29yeXtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICAuY29udGVudCBmb3JtIC51c2VyLWRldGFpbHN7XHJcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcbiAgfVxyXG4gIC51c2VyLWRldGFpbHM6Oi13ZWJraXQtc2Nyb2xsYmFye1xyXG4gICAgd2lkdGg6IDVweDtcclxuICB9XHJcbiAgfVxyXG4gIEBtZWRpYShtYXgtd2lkdGg6IDQ1OXB4KXtcclxuICAuY29udGFpbmVyIC5jb250ZW50IC5jYXRlZ29yeXtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgfVxyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RegistrationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-register',
                templateUrl: './registration.component.html',
                styleUrls: ['./registration.component.css'],
                providers: [_registration_service__WEBPACK_IMPORTED_MODULE_2__["RegistrationService"]]
            }]
    }], function () { return [{ type: _registration_service__WEBPACK_IMPORTED_MODULE_2__["RegistrationService"] }]; }, null); })();


/***/ }),

/***/ "phO4":
/*!**************************************************************!*\
  !*** ./src/app/static-components/header/header.component.ts ***!
  \**************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-service */ "iFFu");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_Forms_Login_login_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Forms/Login/login.service */ "UKjp");
/* harmony import */ var _shared_navbarCollapse_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/navbarCollapse.directive */ "cXc8");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");







const _c0 = function () { return { exact: true }; };
function HeaderComponent_li_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Welcome");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c0));
} }
function HeaderComponent_li_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Dashboard");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c0));
} }
function HeaderComponent_ul_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "li", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "SignUp");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c0));
} }
function HeaderComponent_ul_26_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "li", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HeaderComponent_ul_26_Template_a_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.onLogout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Welcome ", ctx_r3.userName, "");
} }
class HeaderComponent {
    constructor(authService, router, loginService) {
        this.authService = authService;
        this.router = router;
        this.loginService = loginService;
        this.userName = "";
        this.userLoggedIn = false;
        this.isAdmin = false;
    }
    ngOnInit() {
        this.loginEventSub = this.authService.loggedInEvent.subscribe(res => {
            // console.log(res);
            this.userName = res['userName'];
            this.isAdmin = res['isAdmin'];
            this.userLoggedIn = true;
            // console.log("userName: "+this.userName);
        });
        this.logoutEventSub = this.authService.loggedOutEvent.subscribe(() => {
            this.authService.setLoggedInStatus(false);
            this.userLoggedIn = false;
            this.router.navigate(['/']);
        });
    }
    onLogout() {
        this.logoutEventSub = this.loginService.logout(this.loginService.getLoggedInUser()).subscribe((res) => {
            console.log(res);
            if (res["logoutStatus"]) {
                this.authService.loggedOutEvent.emit();
            }
        });
    }
    ngOnDestroy() {
        this.loginEventSub.unsubscribe();
        this.logoutEventSub.unsubscribe();
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_Forms_Login_login_service__WEBPACK_IMPORTED_MODULE_3__["LoginService"])); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 27, vars: 6, consts: [[1, "navbar", "navbar-inverse", "navbar-fixed-top"], [1, "container-fluid"], [1, "navbar-header"], ["type", "button", 1, "navbar-toggle"], [1, "icon-bar"], ["routerLink", "/", 1, "navbar-brand"], ["id", "myNavbar", "navbarCollapse", "", 1, "collapse", "navbar-collapse"], [1, "nav", "navbar-nav"], ["routerLinkActive", "active", 3, "routerLinkActiveOptions"], ["routerLink", "/home"], ["routerLinkActive", "active", 3, "routerLinkActiveOptions", 4, "ngIf"], ["routerLinkActive", "active"], ["routerLink", "/chatbot"], ["routerLink", "/about"], ["routerLink", "/contacts"], ["class", "nav navbar-nav navbar-right", 4, "ngIf"], ["routerLink", "/user"], ["routerLink", "/admin"], [1, "nav", "navbar-nav", "navbar-right"], ["routerLink", "/registration"], [1, "navbar-text"], [1, "logout", 3, "click"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "XYZ Car Insurance Company");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "ul", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "li", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, HeaderComponent_li_14_Template, 3, 2, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, HeaderComponent_li_15_Template, 3, 2, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Chatbot");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "li", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "a", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "About Us");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "li", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "a", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Contacts");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, HeaderComponent_ul_25_Template, 4, 2, "ul", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, HeaderComponent_ul_26_Template, 6, 1, "ul", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.userLoggedIn && !ctx.isAdmin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.userLoggedIn && ctx.isAdmin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.userLoggedIn);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.userLoggedIn);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _shared_navbarCollapse_directive__WEBPACK_IMPORTED_MODULE_4__["NavbarCollapseDirective"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"]], styles: [".logout[_ngcontent-%COMP%]{\r\n    cursor: pointer;\r\n}\r\n@media (min-width: 920px){\r\n    .navbar[_ngcontent-%COMP%] {\r\n        border-radius: 0px;\r\n    }\r\n}\r\n@media (max-width: 341px){\r\n    .navbar-brand[_ngcontent-%COMP%] {\r\n        font-size: 14px;\r\n    }\r\n}\r\n.navbar-inverse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%] > li.active[_ngcontent-%COMP%] > a[_ngcontent-%COMP%] {\r\n    background-color: red;\r\n    border-radius: 3px;\r\n}\r\n.navbar-inverse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]:hover > a[_ngcontent-%COMP%] {\r\n    background-color: red;\r\n    border-radius: 3px;\r\n}\r\n.navbar-inverse[_ngcontent-%COMP%]   .navbar-brand[_ngcontent-%COMP%] {\r\n    color: #ccb619;\r\n}\r\n@media (max-width: 920px) {\r\n    .navbar-header[_ngcontent-%COMP%] {\r\n        float: none;\r\n    }\r\n    .navbar-left[_ngcontent-%COMP%], .navbar-right[_ngcontent-%COMP%] {\r\n        float: none !important;\r\n    }\r\n    .navbar-toggle[_ngcontent-%COMP%] {\r\n        display: block;\r\n    }\r\n    .navbar-collapse[_ngcontent-%COMP%] {\r\n        border-top: 1px solid transparent;\r\n        box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);\r\n    }\r\n    .navbar-fixed-top[_ngcontent-%COMP%] {\r\n        top: 0;\r\n        border-width: 0 0 1px;\r\n    }\r\n    .navbar-collapse.collapse[_ngcontent-%COMP%] {\r\n        display: none!important;\r\n    }\r\n    .navbar-nav[_ngcontent-%COMP%] {\r\n        float: none!important;\r\n        margin-top: 7.5px;\r\n    }\r\n    .navbar-nav[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] {\r\n        float: none;\r\n    }\r\n    .navbar-nav[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%] {\r\n        padding-top: 10px;\r\n        padding-bottom: 10px;\r\n    }\r\n    .collapse.in[_ngcontent-%COMP%]{\r\n        display:block !important;\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtBQUNuQjtBQUNBO0lBQ0k7UUFDSSxrQkFBa0I7SUFDdEI7QUFDSjtBQUNBO0lBQ0k7UUFDSSxlQUFlO0lBQ25CO0FBQ0o7QUFDQTtJQUNJLHFCQUFxQjtJQUNyQixrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLHFCQUFxQjtJQUNyQixrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLGNBQWM7QUFDbEI7QUFDQTtJQUNJO1FBQ0ksV0FBVztJQUNmO0lBQ0E7UUFDSSxzQkFBc0I7SUFDMUI7SUFDQTtRQUNJLGNBQWM7SUFDbEI7SUFDQTtRQUNJLGlDQUFpQztRQUNqQywrQ0FBK0M7SUFDbkQ7SUFDQTtRQUNJLE1BQU07UUFDTixxQkFBcUI7SUFDekI7SUFDQTtRQUNJLHVCQUF1QjtJQUMzQjtJQUNBO1FBQ0kscUJBQXFCO1FBQ3JCLGlCQUFpQjtJQUNyQjtJQUNBO1FBQ0ksV0FBVztJQUNmO0lBQ0E7UUFDSSxpQkFBaUI7UUFDakIsb0JBQW9CO0lBQ3hCO0lBQ0E7UUFDSSx3QkFBd0I7SUFDNUI7QUFDSiIsImZpbGUiOiJoZWFkZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sb2dvdXR7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuQG1lZGlhIChtaW4td2lkdGg6IDkyMHB4KXtcclxuICAgIC5uYXZiYXIge1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDBweDtcclxuICAgIH1cclxufVxyXG5AbWVkaWEgKG1heC13aWR0aDogMzQxcHgpe1xyXG4gICAgLm5hdmJhci1icmFuZCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgfVxyXG59XHJcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdj5saS5hY3RpdmU+YSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbn1cclxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2PmxpOmhvdmVyPmEge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xyXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG59XHJcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLWJyYW5kIHtcclxuICAgIGNvbG9yOiAjY2NiNjE5O1xyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOiA5MjBweCkge1xyXG4gICAgLm5hdmJhci1oZWFkZXIge1xyXG4gICAgICAgIGZsb2F0OiBub25lO1xyXG4gICAgfVxyXG4gICAgLm5hdmJhci1sZWZ0LC5uYXZiYXItcmlnaHQge1xyXG4gICAgICAgIGZsb2F0OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAubmF2YmFyLXRvZ2dsZSB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB9XHJcbiAgICAubmF2YmFyLWNvbGxhcHNlIHtcclxuICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCByZ2JhKDI1NSwyNTUsMjU1LDAuMSk7XHJcbiAgICB9XHJcbiAgICAubmF2YmFyLWZpeGVkLXRvcCB7XHJcbiAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgIGJvcmRlci13aWR0aDogMCAwIDFweDtcclxuICAgIH1cclxuICAgIC5uYXZiYXItY29sbGFwc2UuY29sbGFwc2Uge1xyXG4gICAgICAgIGRpc3BsYXk6IG5vbmUhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLm5hdmJhci1uYXYge1xyXG4gICAgICAgIGZsb2F0OiBub25lIWltcG9ydGFudDtcclxuICAgICAgICBtYXJnaW4tdG9wOiA3LjVweDtcclxuICAgIH1cclxuICAgIC5uYXZiYXItbmF2PmxpIHtcclxuICAgICAgICBmbG9hdDogbm9uZTtcclxuICAgIH1cclxuICAgIC5uYXZiYXItbmF2PmxpPmEge1xyXG4gICAgICAgIHBhZGRpbmctdG9wOiAxMHB4O1xyXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG4gICAgfVxyXG4gICAgLmNvbGxhcHNlLmlue1xyXG4gICAgICAgIGRpc3BsYXk6YmxvY2sgIWltcG9ydGFudDtcclxuICAgIH1cclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HeaderComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-header",
                templateUrl: "./header.component.html",
                styleUrls: ['./header.component.css']
            }]
    }], function () { return [{ type: src_app_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }, { type: src_app_Forms_Login_login_service__WEBPACK_IMPORTED_MODULE_3__["LoginService"] }]; }, null); })();


/***/ }),

/***/ "tgUi":
/*!******************************************************************************!*\
  !*** ./src/app/static-components/page-not-found/page-not-found.component.ts ***!
  \******************************************************************************/
/*! exports provided: PageNotFound */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNotFound", function() { return PageNotFound; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class PageNotFound {
}
PageNotFound.ɵfac = function PageNotFound_Factory(t) { return new (t || PageNotFound)(); };
PageNotFound.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PageNotFound, selectors: [["app-page-not-found"]], decls: 2, vars: 0, template: function PageNotFound_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "The page you are looking for was not found!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYWdlLW5vdC1mb3VuZC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PageNotFound, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-page-not-found',
                templateUrl: 'page-not-found.component.html',
                styleUrls: ['page-not-found.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "ug7A":
/*!******************************************************************!*\
  !*** ./src/app/static-components/contacts/contacts.component.ts ***!
  \******************************************************************/
/*! exports provided: ContactsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactsComponent", function() { return ContactsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ContactsComponent {
}
ContactsComponent.ɵfac = function ContactsComponent_Factory(t) { return new (t || ContactsComponent)(); };
ContactsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ContactsComponent, selectors: [["app-contacts"]], decls: 22, vars: 0, consts: [[1, "container"], [1, "row"], [1, "col-sm-6"], ["src", "/images/b.jpg", "alt", "Image", 1, "img-responsive"], [1, "heading"], [1, "glyphicon", "glyphicon-envelope"], [1, "contact-detail"], [1, "glyphicon", "glyphicon-earphone"], [1, "glyphicon", "glyphicon-pencil"]], template: function ContactsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h3", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Email:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "xyz@gmail.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "h3", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Phone No:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "1234567890");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "h3", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Working hours:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Mon-Fri, 9:00am - 6:00pm");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".heading[_ngcontent-%COMP%]{\r\n    color: #2f1fb8;\r\n}\r\n.contact-detail[_ngcontent-%COMP%]{\r\n    color: rebeccapurple;\r\n    font-size: 24px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhY3RzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxjQUFjO0FBQ2xCO0FBQ0E7SUFDSSxvQkFBb0I7SUFDcEIsZUFBZTtBQUNuQiIsImZpbGUiOiJjb250YWN0cy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRpbmd7XHJcbiAgICBjb2xvcjogIzJmMWZiODtcclxufVxyXG4uY29udGFjdC1kZXRhaWx7XHJcbiAgICBjb2xvcjogcmViZWNjYXB1cnBsZTtcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ContactsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-contacts",
                templateUrl: "./contacts.component.html",
                styleUrls: ['./contacts.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule, routingComponents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routingComponents", function() { return routingComponents; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-guard.service */ "5nbR");
/* harmony import */ var _chat_window_chat_window_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chat-window/chat-window.component */ "LEOZ");
/* harmony import */ var _Forms_Login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Forms/Login/login.component */ "+93b");
/* harmony import */ var _Forms_Registration_registration_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Forms/Registration/registration.component */ "n7nZ");
/* harmony import */ var _static_components_about_us_about_us_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./static-components/about-us/about-us.component */ "5/+S");
/* harmony import */ var _static_components_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./static-components/contacts/contacts.component */ "ug7A");
/* harmony import */ var _static_components_home_home_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./static-components/home/home.component */ "058T");
/* harmony import */ var _static_components_page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./static-components/page-not-found/page-not-found.component */ "tgUi");












const routes = [
    {
        path: '',
        component: _static_components_home_home_component__WEBPACK_IMPORTED_MODULE_8__["HomeComponent"]
    },
    {
        path: 'home',
        component: _static_components_home_home_component__WEBPACK_IMPORTED_MODULE_8__["HomeComponent"]
    },
    {
        path: 'login',
        component: _Forms_Login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"],
    },
    {
        path: 'registration',
        component: _Forms_Registration_registration_component__WEBPACK_IMPORTED_MODULE_5__["RegistrationComponent"]
    },
    {
        path: 'chatbot',
        component: _chat_window_chat_window_component__WEBPACK_IMPORTED_MODULE_3__["ChatWindowComponent"]
    },
    {
        path: 'about',
        component: _static_components_about_us_about_us_component__WEBPACK_IMPORTED_MODULE_6__["AboutUsComponent"]
    },
    {
        path: 'contacts',
        component: _static_components_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_7__["ContactsComponent"]
    },
    {
        path: 'user',
        loadChildren: () => __webpack_require__.e(/*! import() | user-user-module */ "user-user-module").then(__webpack_require__.bind(null, /*! ./user/user.module */ "7UCR")).then(m => m.UserModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]],
    },
    {
        path: 'admin',
        loadChildren: () => __webpack_require__.e(/*! import() | admin-admin-module */ "admin-admin-module").then(__webpack_require__.bind(null, /*! ./admin/admin.module */ "jkDv")).then(m => m.AdminModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]]
    },
    {
        path: '**',
        component: _static_components_page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_9__["PageNotFound"]
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();
const routingComponents = [
    _Forms_Login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"],
    _Forms_Registration_registration_component__WEBPACK_IMPORTED_MODULE_5__["RegistrationComponent"],
    _chat_window_chat_window_component__WEBPACK_IMPORTED_MODULE_3__["ChatWindowComponent"],
    _static_components_home_home_component__WEBPACK_IMPORTED_MODULE_8__["HomeComponent"],
    _static_components_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_7__["ContactsComponent"],
    _static_components_about_us_about_us_component__WEBPACK_IMPORTED_MODULE_6__["AboutUsComponent"]
];


/***/ }),

/***/ "zRpI":
/*!**************************************************************!*\
  !*** ./src/app/static-components/footer/footer.component.ts ***!
  \**************************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class FooterComponent {
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 4, vars: 0, consts: [[1, "bottom"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Copyright \u00A9 2021-2022. All rights reserved.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["*[_ngcontent-%COMP%] {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n    font-family: 'Poppins',sans-serif;\r\n    text-decoration: none;\r\n}\r\nfooter[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  position: relative;\r\n  \r\n  top: 100px;\r\n  background: #000;\r\n}\r\nfooter[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    text-align: center;\r\n    color: #d9d9d9;\r\n    padding: 10px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Rlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksU0FBUztJQUNULFVBQVU7SUFDVixzQkFBc0I7SUFDdEIsaUNBQWlDO0lBQ2pDLHFCQUFxQjtBQUN6QjtBQUNBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQjtZQUNVO0VBQ1YsVUFBVTtFQUNWLGdCQUFnQjtBQUNsQjtBQUNBO0lBQ0ksV0FBVztJQUNYLGtCQUFrQjtJQUNsQixjQUFjO0lBQ2QsYUFBYTtBQUNqQiIsImZpbGUiOiJmb290ZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIioge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnLHNhbnMtc2VyaWY7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbn1cclxuZm9vdGVyIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgLyogYm90dG9tOiAwcHg7XHJcbiAgbGVmdDogMDsgKi9cclxuICB0b3A6IDEwMHB4O1xyXG4gIGJhY2tncm91bmQ6ICMwMDA7XHJcbn1cclxuZm9vdGVyIC5ib3R0b20ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogI2Q5ZDlkOTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FooterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-footer',
                templateUrl: 'footer.component.html',
                styleUrls: ['footer.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ }),

/***/ "zy28":
/*!*********************************************************************!*\
  !*** ./src/app/shared/loading-spinner/loading-spinner.component.ts ***!
  \*********************************************************************/
/*! exports provided: LoadingSpinnerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingSpinnerComponent", function() { return LoadingSpinnerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class LoadingSpinnerComponent {
}
LoadingSpinnerComponent.ɵfac = function LoadingSpinnerComponent_Factory(t) { return new (t || LoadingSpinnerComponent)(); };
LoadingSpinnerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoadingSpinnerComponent, selectors: [["app-loading-spinner"]], decls: 4, vars: 0, consts: [[1, "lds-ring"]], template: function LoadingSpinnerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".lds-ring[_ngcontent-%COMP%] {\r\n    \r\n    position: relative;\r\n    width: 80px;\r\n    height: 80px;\r\n    margin: 5% auto;\r\n}\r\n.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\r\n    box-sizing: border-box;\r\n    display: block;\r\n    position: absolute;\r\n    width: 64px;\r\n    height: 64px;\r\n    margin: 8px;\r\n    border: 8px solid rgb(67, 37, 136);\r\n    border-radius: 50%;\r\n    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\r\n    border-color: rgb(67, 37, 136) transparent transparent transparent;\r\n}\r\n.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(1) {\r\n    animation-delay: -0.45s;\r\n}\r\n.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2) {\r\n    animation-delay: -0.3s;\r\n}\r\n.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(3) {\r\n    animation-delay: -0.15s;\r\n}\r\n@keyframes lds-ring {\r\n    0% {\r\n        transform: rotate(0deg);\r\n    }\r\n    100% {\r\n        transform: rotate(360deg);\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmctc3Bpbm5lci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksMkJBQTJCO0lBQzNCLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsWUFBWTtJQUNaLGVBQWU7QUFDbkI7QUFDQTtJQUNJLHNCQUFzQjtJQUN0QixjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxZQUFZO0lBQ1osV0FBVztJQUNYLGtDQUFrQztJQUNsQyxrQkFBa0I7SUFDbEIsOERBQThEO0lBQzlELGtFQUFrRTtBQUN0RTtBQUNBO0lBQ0ksdUJBQXVCO0FBQzNCO0FBQ0E7SUFDSSxzQkFBc0I7QUFDMUI7QUFDQTtJQUNJLHVCQUF1QjtBQUMzQjtBQUNBO0lBQ0k7UUFDSSx1QkFBdUI7SUFDM0I7SUFDQTtRQUNJLHlCQUF5QjtJQUM3QjtBQUNKIiwiZmlsZSI6ImxvYWRpbmctc3Bpbm5lci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxkcy1yaW5nIHtcclxuICAgIC8qIGRpc3BsYXk6IGlubGluZS1ibG9jazsgKi9cclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHdpZHRoOiA4MHB4O1xyXG4gICAgaGVpZ2h0OiA4MHB4O1xyXG4gICAgbWFyZ2luOiA1JSBhdXRvO1xyXG59XHJcbi5sZHMtcmluZyBkaXYge1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgd2lkdGg6IDY0cHg7XHJcbiAgICBoZWlnaHQ6IDY0cHg7XHJcbiAgICBtYXJnaW46IDhweDtcclxuICAgIGJvcmRlcjogOHB4IHNvbGlkIHJnYig2NywgMzcsIDEzNik7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBhbmltYXRpb246IGxkcy1yaW5nIDEuMnMgY3ViaWMtYmV6aWVyKDAuNSwgMCwgMC41LCAxKSBpbmZpbml0ZTtcclxuICAgIGJvcmRlci1jb2xvcjogcmdiKDY3LCAzNywgMTM2KSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDtcclxufVxyXG4ubGRzLXJpbmcgZGl2Om50aC1jaGlsZCgxKSB7XHJcbiAgICBhbmltYXRpb24tZGVsYXk6IC0wLjQ1cztcclxufVxyXG4ubGRzLXJpbmcgZGl2Om50aC1jaGlsZCgyKSB7XHJcbiAgICBhbmltYXRpb24tZGVsYXk6IC0wLjNzO1xyXG59XHJcbi5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDMpIHtcclxuICAgIGFuaW1hdGlvbi1kZWxheTogLTAuMTVzO1xyXG59XHJcbkBrZXlmcmFtZXMgbGRzLXJpbmcge1xyXG4gICAgMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gICAgfVxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgIH1cclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoadingSpinnerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-loading-spinner',
                template: '<div class="lds-ring"><div></div><div></div><div></div></div>',
                styleUrls: ['loading-spinner.component.css']
            }]
    }], null, null); })();


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map