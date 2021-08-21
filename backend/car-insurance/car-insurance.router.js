const express  = require('express');
const router = express.Router();
const carInsuranceController = require('./car-insurance.controller');
const userController = require('../user/user.controller');

router.post("/apply", userController.authenticate_token, carInsuranceController.apply_car_insurance);
router.post("/getInsuranceDetail", carInsuranceController.get_car_insurance_detail);
router.get("/details", userController.authenticate_token, carInsuranceController.get_user_car_insurance_details);
router.post("/claim", userController.authenticate_token, carInsuranceController.claim_car_insurance);

module.exports  = router;