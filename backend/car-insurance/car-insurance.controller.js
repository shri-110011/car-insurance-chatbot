const carInsuranceApplyService = require('./car-insurance-services/car-insurance-apply.service');
const carInsuranceDetailsService = require('./car-insurance-services/car-insurance-details.service');
const carInsuranceClaimService = require('./car-insurance-services/car-insurance-claim.service');

exports.apply_car_insurance = (req, res)=> {
    console.log(req.body);
    if(req.body.email === req.body.userDataFromToken.email){
            carInsuranceApplyService.apply(req.body)
        .then((result)=> {
            console.log(result);
            res.send(result);
        });
    }
    else{
        console.log("Email didn't match the account email id !");
        res.send({msg: "1"});
    }
}

exports.get_user_car_insurance_details = (req,res)=> {
    console.log("Inside get_user_car_insurance_details");
    console.log(req.body);
    carInsuranceDetailsService.userCarInsuranceDetails(req.body.userDataFromToken)
    .then(result=>{
        res.send(result);
    });
}

exports.claim_car_insurance = (req,res)=> {
    console.log("Inside get_user_car_insurance_details");
    console.log(req.body);
    carInsuranceClaimService.claim(req.body)
    .then(result=>{
        res.send(result);
    });
}

exports.get_car_insurance_detail = (req, res)=> {
    carInsuranceDetailsService.getInsuranceDetail()
    .then(result=> {
        res.send(result);
    });
}