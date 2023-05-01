const carInsuranceApplyService = require('./car-insurance-services/car-insurance-apply.service');
const carInsuranceDetailsService = require('./car-insurance-services/car-insurance-details.service');
const carInsuranceClaimService = require('./car-insurance-services/car-insurance-claim.service');

exports.apply_car_insurance = (req, res)=> {
    if(req.body.email === req.body.userDataFromToken.email) {
            carInsuranceApplyService.apply(req.body)
        .then((result)=> {
            console.log(result);
            res.send(result);
        })
        .catch(err => {
            console.log("Error occurred while processing car insurance application!");
            res.status(err.error.statusCode).send(err);
        });
    }
    else{
        console.log("Provided email didn't match the account email id!");
        let errorResponse = {
            error: { statusCode: "400", errorCode: "EMAIL_ID_MISMATCH", message: "Provided email didn't match the account email id!" },
        };
        res.status(errorResponse.error.statusCode).send(errorResponse);
    }
}

exports.get_user_car_insurance_details = (req,res)=> {
    carInsuranceDetailsService.userCarInsuranceDetails(req.body.userDataFromToken)
    .then(result=>{
        res.send(result);
    })
    .catch(err => {
        let errorResponse = {
            error: { statusCode: err.statusCode, message: err.message },
        };
        console.log("Error occurred while fetching the user's car insurance details!");
        res.status(errorResponse.error.statusCode).send(errorResponse);
    });
}

exports.claim_car_insurance = (req,res)=> {
    carInsuranceClaimService.claim(req.body)
    .then(result=>{
        res.send(result);
    })
    .catch(err => {
        console.log("Error occurred while car insurance claimimg process!");
        res.status(err.error.statusCode).send(err);
    });;
}

exports.get_car_insurance_details = (req, res)=> {
    carInsuranceDetailsService.getCarInsuranceDetails()
    .then(result=> {
        res.send(result);
    })
    .catch(err => {
        let errorResponse = {
            error: { statusCode: err.statusCode, message: err.message },
        };
        console.log("Error occurred while fetching the car insurance details!");
        res.status(errorResponse.error.statusCode).send(errorResponse);
    });
}