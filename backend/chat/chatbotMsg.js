
answers={
    "intro":[
        "<span>Hi there!</span>", "<span>I am <b>Eri</b> a chatbot.</span>", "You can choose the topic mentioned below or write your question in the chatbox.",
        "<div id='options'><div id='car-insurance' class='topics'>Car Insurance</div><div id='insurance-plans' class='topics'>Insurance Plans</div><div id='insurance-coverages' class='topics'>Insurance Coverages</div><div id='insurance-pricing' class='topics'>Insurance Pricing</div></div>"
    ],
    "car-insurance":[
        "Car/Motor insurance is an insurance policy that covers the policyholder in case of financial losses – resulting from an accident or other damages – sustained by the insured vehicle."
    ],
    "insurance-plans":[
        "<span>We offer 2 types of car insurance plans: <strong>Comprehensive</strong> and <strong>Third-Party</strong>.</span>",
        "<span>A <strong>Comprehensive</strong> car insurance is one of the most valuable types of car insurance that covers both third-party liabilities and damages to your own car as well.</span>",
        "<span>A <strong>Third-party</strong> car insurance is one of the most common types of car insurance; in which only damages & losses caused to a third-party person, vehicle or property are covered.</span>"
    ],
    "insurance-coverages":[
        "<span>Select the one whose coverage you want to view:</span><br><div id='comprehensive-plan-coverages' class='topics'>Comprehensive Plan Coverages</div><div id='third-party-plan-coverages' class='topics'>Third-Party Plan Coverages</div>"
    ],
    "comprehensive-plan-coverages":[
        "<h3>Comprehensive Plan Coverages</h3><ul><li>Damage due to Accidents</li><li>Damage due to a Natural Calamity</li><li>Damage due to Fire</li><li>Personal Injuries or Death in an Accident</li><li>Car Thefts</li><li>Injuries/Death of Third-Party</li><li>Damage to Third-Party property</li></ul>"
    ],
    "third-party-plan-coverages":[
        "<h3>Third-Party Plan Coverages</h3><ul><li>Personal Injuries or Death in an Accident</li><li>Injuries/Death of Third-Party</li><li>Damage to Third-Party property</li></ul>"
    ],
    "insurance-pricing":[
        "<h3>For third party car insurance plan:</h3><apan>Monthly premium: <b>Rs 1500</b></span><br><span>Annual premium: <b>Rs 16500</b></span>", "<h3>For comprehensive car insurance plan:</h3><span>Monthly premium: <b>Rs 4000</b></span><br><span>Annual premium: <b>Rs 4400</b></span>"
    ]
    ,
    "why-car-insurance":[
        "<span>Taking car insurance will secure you from any finacial liability that may arise when you are at fault in a car accident or when mishap occurs because of a third-party negligence.</span>", "<span>That is why it is absolutely necessary for every automobile owner to apply for one.<span>"
    ],
    "out-of-the-box-query":[
        "<span>Sorry, I don't have any information on that.</span>"
    ],
    "greet":[
        "<span>Welcome, how can I help you today?</span>", "<span>You can choose the topic mentioned below or write your question in the chatbox.</span>",
        "<div id='options'> <div id='car-insurance' class='topics'>Car Insurance</div><div id='insurance-plans' class='topics'>Insurance Plans</div><div id='insurance-coverages' class='topics'>Insurance Coverages</div><div id='insurance-pricing' class='topics'>Insurance Pricing</div></div>"
    ],
    "name":[
        "<span>My name is <b>Eri</b> and I am a car insurance chatbot.</span>"
    ],
    "insurance-apply":[
        "<span>To apply for car insurance you just need to follow these steps.</span>",
        "<span>1. <b>Sign Up</b> first in case you don't have an XYZ car insurance account or <b>login</b> as an user if you do have one.</span>",
        "<span>2. Go to <b>'More'</b> dropdown menu and click on the <b>'Apply for car insurance'</b></span>",
        "<span>3. Fill the car insurance application form and click on <b>'Submit'</b> and there you go, you applied for car insurance."

    ]
    
}

queries = {
    "car-insurance":
        {
            shouldContain: [["what", "car insurance"], ["car", "insurance"], ["insurance"]],
            shouldNotContain: [["plan"], ["plans"], ["policies"], ["third", "party"], ["comprehensive"], ["coverage"], ["coverages"], ["price"], ["pricing"], ["rate"], ["rates"], ["apply", "insurance"], ["procedure"], ["why"], ["don't", "need"], ["do not", "need"], ["take"], ["don't", "want"], ["do not", "want"]],
        },
    "insurance-plans":[
        ["plan"], ["plans"], ["policies"]
    ],
    "third-party-plan-coverages":[
        ["third", "party", "car", "insurance"], ["third", "party", "insurance"]
    ],
    "comprehensive-plan-coverages":[
        ["comprehensive", "car", "insurance"], ["comprehensive", "insurance"]
    ],
    "insurance-coverages":[
        ["coverage"], ["coverages"]
    ],
    "insurance-pricing":[
        ["price"], ["pricing"], ["rate"]
    ]
    ,
    "why-car-insurance":[
        ["i", "don't", "need"], ["i", "do not", "need"], ["i", "don't", "want"], ["i", "do not", "want"], ["why"], ["what", "use"], ["why", "take"]
    ],
    "greet":[
        ["hi", "eri"], ["hello", "eri"], ["hi", "there"], ["hello", "there"], ["good morning"], ["good afternoon"], ["good night"], ["how", "are", "you"]
    ],
    "name":[
        ["what", "is", "your", "name"], ["who", "are", "you"], ["your", "name"]
    ],
    "insurance-apply":[
        ["how", "apply", "car", "insurance"], ["how", "apply", "for", "insurance"], ["insurance", "application", "procedure"], ["steps", "apply", "car", "insurance"]
    ]
}

function getResponseForTopicsChosen(needFor){
    var responseMsg = new Array();
    switch (needFor){
        case "intro":
            responseMsg = answers.intro;
            console.log("Intro info");
            break;
        case "car-insurance":
            responseMsg = answers["car-insurance"];
            console.log("Car insurance info");
            break;
        case "insurance-plans":
            responseMsg = answers["insurance-plans"];
            console.log("Car insurance plans info");
            break;
        case "insurance-coverages":
            responseMsg = answers["insurance-coverages"];
            console.log("Car insurance coverages info");
            break;
        case "insurance-pricing":
            responseMsg = answers["insurance-pricing"];
            console.log("Car insurance pricing info");
            break;    
        case "comprehensive-plan-coverages":
            responseMsg = answers["comprehensive-plan-coverages"];
            console.log("Comprehensive plan coverages info");
            break;
        case "third-party-plan-coverages":
            responseMsg = answers["third-party-plan-coverages"];
            console.log("Third-Party plan coverages info");
            break;
        case "insurance-apply":
            responseMsg = answers["insurance-apply"];
            console.log("Car insurance apply info");
            break;
        default:
            console.log("Invalid topic");
    }
    return responseMsg;
}

function getResponseForUserChatMsg(receivedMsg){
    var responseMsg = new Array();

    console.log("Original received message: "+receivedMsg);
    receivedMsg = receivedMsg.trim().replace(/\s+/g," ").toLowerCase();
    console.log("Normalized received message: "+receivedMsg);

    var shouldContainFlag = 0, shouldNotContainFlag=0, intentFound=0, query, intent;
    
    for(query in queries){
        console.log("query: "+query);
        switch(query){
            case "greet":
                if(intentFinder(queries[query], receivedMsg)){
                    intentFound=1;
                }
                //console.log(intentFinder(queries[query], receivedMsg));
                console.log("Intent Found: "+intentFound);
                break;
            case "name":
                if(intentFinder(queries[query], receivedMsg)){
                    intentFound=1;
                }
                console.log("Intent Found: "+intentFound);
                break;
            case "car-insurance":
                for(key in queries[query]){
                    //console.log(key);
                    if(key == "shouldContain"){
                        if(intentFinder(queries[query][key], receivedMsg)){
                            shouldContainFlag = 1;
                        }
                        else
                            break;
                    }
                    else if(key == "shouldNotContain"){
                        if(!intentFinder(queries[query][key], receivedMsg)){
                            shouldNotContainFlag = 1;
                            intentFound = 1;
                        }
                    }
                }
                //console.log("shouldContainFlag: "+shouldContainFlag);
                //console.log("shouldNotContainFlag: "+shouldNotContainFlag);
                console.log("Intent Found: "+intentFound);
                break;
            case "insurance-plans":
                if(shouldContainFlag == 1){
                    if(intentFinder(queries[query], receivedMsg)){
                        intentFound = 1;
                    }
                }
                console.log("Intent Found: "+intentFound);
                break;
            case "third-party-plan-coverages":
                if(intentFinder(queries[query], receivedMsg)){
                    intentFound = 1;
                }
                console.log("Intent Found: "+intentFound);
                break;
            case "comprehensive-plan-coverages":
                if(intentFinder(queries[query], receivedMsg)){
                    intentFound = 1;
                }
                console.log("Intent Found: "+intentFound);
                break;
            case "insurance-coverages":
                if(shouldContainFlag == 1){
                    if(intentFinder(queries[query], receivedMsg)){
                        intentFound = 1;
                    }
                }
                console.log("Intent Found: "+intentFound);
                break;
            case "insurance-pricing":
                if(shouldContainFlag == 1){
                    if(intentFinder(queries[query], receivedMsg)){
                        intentFound = 1;
                    }
                }
                console.log("Intent Found: "+intentFound);
                break;
            case "insurance-apply":
                if(intentFinder(queries[query], receivedMsg)){
                    intentFound=1;
                }   
                console.log("Intent Found: "+intentFound);
                break;
            case "why-car-insurance":
                if(shouldContainFlag == 1){
                    if(intentFinder(queries[query], receivedMsg)){
                        intentFound=1;
                    }
                }     
                console.log("Intent Found: "+intentFound);
                break;
            default:
                console.log("Unepected query");
        }
        if(intentFound == 1){
            //console.log("Intent: "+query);
            intent = query;
            break;
        }
        else{
            intent = "out-of-the-box-query"
        }
    }
    responseMsg = answers[intent];
    console.log("Intent: "+intent);
    responseObject = {resMsg: responseMsg, intent: intent};
    return responseObject;
}

function intentFinder(arr, str){
    var i, j, flag=0;
    console.log("str: "+str);
    console.log(arr);
    for(i=0;i<arr.length;i++){
        // console.log(arr[i]);
        var curPos=-1, prevPos=-1, orderCheck=1;
        for(j=0; j<arr[i].length; j++){
            curPos = str.search(arr[i][j]);
            //console.log(curPos+" "+prevPos);
            if( curPos === -1 || (curPos < prevPos)){
                orderCheck = 0;
                break;
            }  
            prevPos = curPos;
        }
        //console.log("j: "+j);
        //console.log("Array Length: "+arr[i].length);
        //console.log("orderCheck: "+orderCheck);

        if(j==arr[i].length && orderCheck == 1){
            flag=1;
            break;
        }
    }
    console.log("flag: "+flag);
    if(flag == 1)
        return true;
    else
        return false;
}

exports.getResponseForTopicsChosen = getResponseForTopicsChosen;
exports.getResponseForUserChatMsg = getResponseForUserChatMsg;