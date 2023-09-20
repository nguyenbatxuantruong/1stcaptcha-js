let apiKey = "";
let siteURL;
let siteKey;
let pageAction;
let isProcessing = false;
let counter = 0;
const showProcessing = () => {
  setInterval(() => {
    if (isProcessing == true) {
      document.getElementById("result").text = "Processing " + counter + "s";
      counter++;
    }
    else counter = 0;
  }, 1000)
}

const getFormData = () => {
  apiKey = document.getElementById("api_key").value || apiKey;
  siteURL = document.getElementById("site_url").value;
  siteKey = document.getElementById("site_key").value;
  pageAction = document.getElementById("page_action").value;
  caption = document.getElementById("caption").value;
  isProcessing = true;
  console.log({ apiKey, siteURL, siteKey, pageAction, caption });
}

const setFormData = (e) => {
  switch (e.target.id) {
    case "setCapchaV2Example":
      siteURL = "https://www.google.com/recaptcha/api2/demo";
      siteKey = "6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-";
      pageAction = "";
      caption = "";
      break;
    case "setCapchaV3Example":
      siteURL = "https://2captcha.com/demo/recaptcha-v3";
      siteKey = "6LfB5_IbAAAAAMCtsjEHEHKqcB9iQocwwxTiihJu";
      pageAction = "demo_action";
      caption = "";
      break;
    case "setRecaptchaClickExample":
      siteURL = "https://www.google.com/recaptcha/api2/payload?p=06AAYGu2SS-VoFh3lhBvNxEIR5EmdEoqpJ1JVtMOvqYII1DGQbfui2S_ela5OF3pO4pxfjMQxRkUMm2szwznSZNoWruONOUTUcbxwMn2mVimdFm6oX0_qAyQJ0EtjNSpOl_H4kFjMPOZIr2i11TKRTG447zgqw_XlhnvR3NKNtfOIZc0V1_4H_OvOAY6IwgYjaflJWHMIXMvNEnt7rOTpC3WPw4VfbkCx20w&k=6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-";
      siteKey = "";
      pageAction = "";
      caption = "Select all squares with bicycles";
      break;
    case "setFuncaptchaExample":
      siteURL = "https://outlook.com/";
      siteKey = "2CB16598-CB82-4CF7-B332-5990DB66F3AB";
      pageAction = "";
      caption = "";
      break;
    case "clear":
      siteURL = "";
      siteKey = "";
      pageAction = "";
      caption = "";
      document.getElementById("result").text = "";
      break;
    default:
      break;
  }
  document.getElementById("site_url").value = siteURL;
  document.getElementById("site_key").value = siteKey;
  document.getElementById("page_action").value = pageAction;
  document.getElementById("caption").value = caption;
}

const handleAction = async (e) => {
  try {
    getFormData();
    const client = new OneStCaptchaClient(apiKey);
    let result = {};
    switch (e.target.id) {
      case "getBalance":
        result = await client.getBalance();
        break;
      case "solveRecaptchaV2ProxyLess":
        result = await client.solveRecaptchaV2ProxyLess(siteURL, siteKey);
        break;
      case "solveRecaptchaV2EnterpriseProxyLess":
        result = await client.solveRecaptchaV2EnterpriseProxyLess(siteURL, siteKey);
        break;
      case "solveRecaptchaV3ProxyLess":
        result = await client.solveRecaptchaV3ProxyLess(siteURL, siteKey, pageAction);
        break;
      case "solveRecaptchaV3EnterpriseProxyLess":
        result = await client.solveRecaptchaV3EnterpriseProxyLess(siteURL, siteKey, pageAction);
        break;
      case "imageToText":
        result = await client.imageToText("", "./example.png");
        break;
      case "recaptchaClick":
        result = await client.recaptchaClick(siteURL, caption);
        break;
      case "funcaptcha":
        result = await client.funCaptchaProxyLess(siteURL, siteKey);
        break;
      default:
        result = { message: "Unknown action" }
        break;
    }
    isProcessing = false;
    document.getElementById("result").text = JSON.stringify(result);
  }
  catch (error) {
    isProcessing = false;
    document.getElementById("result").text = JSON.stringify(error.message);
  }
}

document.getElementById("setCapchaV2Example").addEventListener("click", setFormData);
document.getElementById("setCapchaV3Example").addEventListener("click", setFormData);
document.getElementById("setRecaptchaClickExample").addEventListener("click", setFormData);
document.getElementById("setFuncaptchaExample").addEventListener("click", setFormData);
document.getElementById("clear").addEventListener("click", setFormData);

document.getElementById("getBalance").addEventListener("click", handleAction);
document.getElementById("solveRecaptchaV2ProxyLess").addEventListener("click", handleAction);
document.getElementById("solveRecaptchaV2EnterpriseProxyLess").addEventListener("click", handleAction);
document.getElementById("solveRecaptchaV3ProxyLess").addEventListener("click", handleAction);
document.getElementById("solveRecaptchaV3EnterpriseProxyLess").addEventListener("click", handleAction);
document.getElementById("imageToText").addEventListener("click", handleAction);
document.getElementById("recaptchaClick").addEventListener("click", handleAction);
document.getElementById("funcaptcha").addEventListener("click", handleAction);

showProcessing();