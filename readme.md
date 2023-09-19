1stCaptcha package for JS
=
[1stcaptcha.com](https://1stcaptcha.com) package for JS

Solver recaptchaV2, recaptchaV3, hcaptcha, funcaptcha, imageToText, Zalo Captcha,.... Super fast and cheapest.

# Install

## CDN install

```html
<head>
    <script src="https://1stcaptcha.github.io/1stcaptcha-js/1stcaptcha.js"></script>
</head>
```
OR
```html
<head>
    <script src="https://cdn.jsdelivr.net/gh/1stcaptcha/1stcaptcha-js/1stcaptcha.js"></script>
</head>
```

## Manual install

```
download https://github.com/1stcaptcha/1stcaptcha-js/blob/main/1stcaptcha.js
add library to script
```
```html
<head>
    <script src="{{FILE_PATH}}/1stcaptcha.js"></script>
</head>
```

# Usage

## init client

```html
<script>
  const apiKey = "YOUR_API_KEY";
  const client = new OneStCaptchaClient(apiKey);
</script>
```

## getBalance:

```node
(async () => {
  const result = await client.getBalance();
  console.log(result);
})();
```

## solver recaptcha v2:

```node
(async () => {
  const result = await client.solveRecaptchaV2ProxyLess(
    "https://www.google.com/recaptcha/api2/demo",
    "6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-"
  );
  console.log(result);
})();
```

## solver recaptcha v2 enterprise:

```node
(async () => {
  const result = await client.solveRecaptchaV2EnterpriseProxyLess(
    "YOUR_SITE_URL",
    "YOUR_SITE_KEY"
  );
  if (result.code === 0) {
    console.log(result.token);
  } else {
    console.log(result.messeage);
  }
})()
```

## solver recaptcha v3:

```node
(async () => {
  const result = await client.solveRecaptchaV3ProxyLess(
    "YOUR_SITE_URL",
    "YOUR_SITE_KEY",
    "YOUR_ACTION"
  );
  console.log(result);
})()
```

## solver recaptcha v3 enterprise:

```node
(async () => {
  const result = await client.solveRecaptchaV3EnterpriseProxyLess("YOUR_SITE_URL", "YOUR_SITE_KEY", "YOUR_ACTION");
  if (result.code === 0) {
    console.log(result.token);
    console.log(result.userAgent)
  } else {
    console.log(result.messeage);
  }
})()
```

## solve image2text

```node
(async () => {
  const result = await client.imageToText(
    "YOUR_BASE64_IMG",
    "YOUR_IMG_URL"
  );
  console.log(result);
})()
```

## solve recaptchaClick

```node
(async () => {
  const result = await client.recaptchaClick(
    "https://www.google.com/recaptcha/api2/payload?p=06AAYGu2SS-VoFh3lhBvNxEIR5EmdEoqpJ1JVtMOvqYII1DGQbfui2S_ela5OF3pO4pxfjMQxRkUMm2szwznSZNoWruONOUTUcbxwMn2mVimdFm6oX0_qAyQJ0EtjNSpOl_H4kFjMPOZIr2i11TKRTG447zgqw_XlhnvR3NKNtfOIZc0V1_4H_OvOAY6IwgYjaflJWHMIXMvNEnt7rOTpC3WPw4VfbkCx20w&k=6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-",
    "Select all squares with bicycles"
  );
  console.log(result);
})()
```

## funcaptcha

```node
(async () => {
  const result = await client.funCaptchaProxyLess(
    "https://outlook.com/",
    "2CB16598-CB82-4CF7-B332-5990DB66F3AB"
  );
  if (result.code === 0) {
    console.log(result.token);
  } else {
    console.log(result.messeage);
  }
})()
```