answers = {
  intro: [
    "<span>Hi there!</span>",
    "<span>I am <b>Eri</b> a chatbot.</span>",
    "You can choose the topic mentioned below or write your question in the chatbox.",
    "<div id='options'><div id='car-insurance' class='topics'>Car Insurance</div><div id='insurance-plans' class='topics'>Insurance Plans</div><div id='insurance-coverages' class='topics'>Insurance Coverages</div><div id='insurance-pricing' class='topics'>Insurance Pricing</div></div>",
  ],
  "car-insurance": [
    "Car/Motor insurance is an insurance policy that covers the policyholder in case of financial losses – resulting from an accident or other damages – sustained by the insured vehicle.",
  ],
  "insurance-plans": [
    "<span>We offer 2 types of car insurance plans: <strong>Comprehensive</strong> and <strong>Third-Party</strong>.</span>",
    "<span>A <strong>Comprehensive</strong> car insurance is one of the most valuable types of car insurance that covers both third-party liabilities and damages to your own car as well.</span>",
    "<span>A <strong>Third-party</strong> car insurance is one of the most common types of car insurance; in which only damages & losses caused to a third-party person, vehicle or property are covered.</span>",
  ],
  "insurance-coverages": [
    "<span>Select the one whose coverage you want to view:</span><br><div id='comprehensive-plan-coverages' class='topics'>Comprehensive Plan Coverages</div><div id='third-party-plan-coverages' class='topics'>Third-Party Plan Coverages</div>",
  ],
  "comprehensive-plan-coverages": [
    "<h3>Comprehensive Plan Coverages</h3><ul><li>Damage due to Accidents</li><li>Damage due to a Natural Calamity</li><li>Damage due to Fire</li><li>Personal Injuries or Death in an Accident</li><li>Car Thefts</li><li>Injuries/Death of Third-Party</li><li>Damage to Third-Party property</li></ul>",
  ],
  "third-party-plan-coverages": [
    "<h3>Third-Party Plan Coverages</h3><ul><li>Personal Injuries or Death in an Accident</li><li>Injuries/Death of Third-Party</li><li>Damage to Third-Party property</li></ul>",
  ],
  "insurance-pricing": [
    "<h3>For third party car insurance plan:</h3><apan>Monthly premium: <b>Rs 1500</b></span><br><span>Annual premium: <b>Rs 16500</b></span>",
    "<h3>For comprehensive car insurance plan:</h3><span>Monthly premium: <b>Rs 4000</b></span><br><span>Annual premium: <b>Rs 44000</b></span>",
  ],
  "why-car-insurance": [
    "<span>Taking car insurance will secure you from any finacial liability that may arise when you are at fault in a car accident or when mishap occurs because of a third-party negligence.</span>",
    "<span>That is why it is absolutely necessary for every automobile owner to apply for one.<span>",
  ],
  "out-of-the-box-query": [
    "<span>Sorry, I don't have any information on that.</span>",
  ],
  greet: [
    "<span>Welcome, how can I help you today?</span>",
    "<span>You can choose the topic mentioned below or write your question in the chatbox.</span>",
    "<div id='options'> <div id='car-insurance' class='topics'>Car Insurance</div><div id='insurance-plans' class='topics'>Insurance Plans</div><div id='insurance-coverages' class='topics'>Insurance Coverages</div><div id='insurance-pricing' class='topics'>Insurance Pricing</div></div>",
  ],
  name: [
    "<span>My name is <b>Eri</b> and I am a car insurance chatbot.</span>",
  ],
  "chatbot-creator": [
    "<span>I have been created by <b>A.Shrikant</b> to help people resolve their queries related to car insurance.</span>",
  ],
  "insurance-apply": [
    "<span>To apply for car insurance you just need to follow these steps.</span>",
    "<span>1. <b>Sign Up</b> first in case you don't have an XYZ car insurance account or <b>login</b> as an user if you do have one.</span>",
    "<span>2. Go to <b>'More'</b> dropdown menu and click on the <b>'Apply for car insurance'</b></span>",
    "<span>3. Fill the car insurance application form and click on <b>'Submit'</b> and there you go, you applied for car insurance.",
  ],
};

queries = {
  "car-insurance": {
    shouldContain: [
      ["what", "car insurance"],
      ["car", "insurance"],
      ["insurance"],
    ],
    shouldNotContain: [
      ["plan"],
      ["policies"],
      ["third", "party"],
      ["comprehensive"],
      ["coverage"],
      ["price"],
      ["pricing"],
      ["rate"],
      ["apply", "insurance"],
      ["procedure"],
      ["why"],
      ["take"],
      ["type"],
      ["do|does", "not want"],
      ["don't|doesn't", "want"],
    ],
  },
  "insurance-plans": {
    shouldContain: [["car insurance", "plan|plans|policy|policies|type"]],
  },
  "third-party-plan-coverages": {
    shouldContain: [
      ["third", "party", "car", "insurance"],
      ["third", "party", "insurance"],
    ],
  },
  "comprehensive-plan-coverages": {
    shouldContain: [
      ["comprehensive", "car", "insurance"],
      ["comprehensive", "insurance"],
    ],
  },
  "insurance-coverages": {
    shouldContain: [["coverage"], ["coverages"]],
  },
  "insurance-pricing": {
    shouldContain: [["price"], ["pricing"], ["rate"]],
  },
  "why-car-insurance": {
    shouldContain: [
      ["don't|doesn't", "need"],
      ["do not|does  not", "need"],
      ["don't|doesn't", "want"],
      ["do not|does not", "want"],
      ["why"],
      ["what", "use"],
      ["why", "take"],
    ],
  },
  greet: {
    shouldContain: [
      ["hi", "eri"],
      ["hello", "eri"],
      ["hi", "there"],
      ["hello", "there"],
      ["good morning"],
      ["good afternoon"],
      ["good night"],
      ["how", "are", "you"],
    ],
  },
  name: {
    shouldContain: [
      ["what", "is", "your", "name"],
      ["who", "are", "you"],
      ["your", "name"],
    ],
  },
  "insurance-apply": {
    shouldContain: [
      ["how", "apply", "car", "insurance"],
      ["how", "apply", "for", "insurance"],
      ["insurance", "application", "procedure"],
      ["steps", "apply", "car", "insurance"],
    ],
  },
  "chatbot-creator": {
    shouldContain: [
      ["who", "made|created|built", "you"],
      ["who", "your", "creator"],
    ],
  },
};

/* getResponseForTopicsChosen(needFor) returns the response in html format for the 
intent corresponding to the chatbot provided option that the user has selected.
needFor -> contains the intent as a string
*/
function getResponseForTopicsChosen(needFor) {
  var responseMsg = new Array();
  switch (needFor) {
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

/* getResponseForUserChatMsg(receivedMsg) returns an object of the structure:
  {resMsg: string, intent: string}
  'resMsg' property contains the response for the user asked query in html format.
  'intent' property contains the intent corresponding to user asked query.
  */
function getResponseForUserChatMsg(receivedMsg) {
  let responseMsg = [];

  console.log("Original received message: " + receivedMsg);
  const intent = getIntent(receivedMsg);
  responseMsg = answers[intent];
  console.log("Intent: " + intent);
  responseObject = { resMsg: responseMsg, intent: intent };
  return responseObject;
}

/* getIntent() takes an argument: str -> user provided query as string, and returns
the intent after scanning through str to look for certain set of pre-defined 
keywords. */
function getIntent(str) {
  let intentFound = 0,
    intent = null;

  normalizedMsg = str.trim().replace(/\s+/g, " ").toLowerCase();

  for (query in queries) {
    let shouldContainFlag = null,
      shouldNotContainFlag = null;
    // console.log("query:",query);
    for (key in queries[query]) {
      if (key === "shouldContain") {
        if (intentChecker(queries[query][key], normalizedMsg)) {
          shouldContainFlag = true;
        } else shouldContainFlag = false;
      } else if (key === "shouldNotContain") {
        if (!intentChecker(queries[query][key], normalizedMsg)) {
          shouldNotContainFlag = true;
        } else shouldNotContainFlag = false;
      }
    }
    // console.log("shouldContainFlag: " + shouldContainFlag + ", shouldNotContainFlag: " + shouldNotContainFlag);
    if (
      shouldContainFlag === true &&
      (shouldNotContainFlag === null || shouldNotContainFlag === true)
    ) {
      intentFound = true;
      intent = query;
      break;
    }
  }
  if (intentFound) return intent;
  else return "out-of-the-box-query";
}

/* intentChecker(arr, str) takes 2 arguments.
arr -> array of arrays where each subarray is an array of string
str -> normalized user query
intentChecker() checks if the string str contains all the keywords in order from at 
least 1 subarray in arr, if it is so then true is returned else false. 
*/
function intentChecker(arr, str) {
  var i,
    j,
    flag = 0;
  // console.log("str: "+str);
  // console.log(arr);
  for (i = 0; i < arr.length; i++) {
    // console.log(arr[i]);
    var curPos = -1,
      prevPos = -1,
      orderCheck = 1;
    for (j = 0; j < arr[i].length; j++) {
      const keywords = arr[i][j].split("|");
      // console.log("keywords: ",keywords);
      for (let k = 0; k < keywords.length; k++) {
        curPos = str.search(keywords[k]);
        //console.log(curPos+" "+prevPos);
        if (curPos !== -1) break;
      }
      if (curPos === -1 || curPos < prevPos) {
        orderCheck = 0;
        break;
      }
      prevPos = curPos;
    }
    //console.log("j: "+j);
    //console.log("Array Length: "+arr[i].length);
    //console.log("orderCheck: "+orderCheck);

    if (j == arr[i].length && orderCheck == 1) {
      flag = 1;
      break;
    }
  }
  // console.log("flag: "+flag);
  if (flag == 1) return true;
  else return false;
}

// str = "What kind of car insurance types do you have?";
// str = "What is your name?";
// str = "Who are you?";
// str = "Can you suggest me car insurance types?";
// str = "What are prices for car insurance?";
// str = "I do not want car insurance.";
// str = "Who is your creator?";
// console.log("Intent:", getIntent(str));

exports.getResponseForTopicsChosen = getResponseForTopicsChosen;
exports.getResponseForUserChatMsg = getResponseForUserChatMsg;
