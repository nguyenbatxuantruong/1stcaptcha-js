class OneStCaptchaClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://api.1stcaptcha.com";
  }

  async getBalance() {
    const response = await fetch(this.baseURL + "/user/balance?" +
      new URLSearchParams({
        apikey: this.apiKey,
      })
    );
    let data = await response.json();
    if (response.status === 200) {
      if (data["Code"] === 0) {
        return data["Balance"]
      } else {
        throw new Error(`${data["Message"]}`);
      }
    } else {
      throw new Error(`${data["Message"] || JSON.stringify(data)}`);
    }
  }

  async getTaskResult(taskId, timeoutSec = 180, timeSleep = 2, typeCaptcha = "") {
    let timeStart = new Date().getTime();
    let timeEnd = timeStart + timeoutSec * 1000;
    while (new Date().getTime() < timeEnd) {
      const response = await fetch(this.baseURL + "/getresult?" +
        new URLSearchParams({
          apikey: this.apiKey, taskid: taskId,
        })
      );
      let data = await response.json();
      if (response.status === 200) {
        if (data["Code"] === 0) {
          if (data['Status'] === "SUCCESS") {
            if (typeCaptcha === "image2text" || typeCaptcha === "recaptcha_click") {
              return data["Data"]
            }
            if (typeCaptcha === "v3_enterprise") {
              return {
                token: data["Data"]["Token"],
                userAgent: data["Data"]["UserAgent"],
              }
            }
            return data["Data"]["Token"]
          } else if (data['Status'] === "ERROR") {
            throw new Error(`${data["Message"]}`);
          }
          // Wait timeSleep seconds
          await new Promise(r => setTimeout(r, timeSleep * 1000));
        } else {
          throw new Error(`${data["Error"]}`);
        }
      } else {
        throw new Error(`${data["Message"] || JSON.stringify(data)}`);
      }
    }
  }

  async solveRecaptchaV2ProxyLess(siteUrl, siteKey, invisible = false, timeout = 180, timeSleep = 2) {
    try {
      const response = await fetch(this.baseURL + "/recaptchav2?" +
        new URLSearchParams({
          apikey: this.apiKey,
          sitekey: siteKey,
          siteurl: siteUrl,
          version: "v2",
          invisible: invisible.toString(),
        })
      );
      let data = await response.json();
      if (response.status === 200) {
        if (data["Code"] === 0) {
          let taskId = data['TaskId'];
          let token = await this.getTaskResult(taskId, timeout, timeSleep);
          return {
            code: 0,
            token: token,
          }
        }
      }
      return { "code": 1, "messeage": data["Message"] || JSON.stringify(data) }
    } catch (e) {
      return { "code": 1, "messeage": e.toString() }
    }

  }

  async solveRecaptchaV2EnterpriseProxyLess(siteUrl, siteKey, timeout = 180, timeSleep = 2) {
    try {
      const response = await fetch(this.baseURL + "/recaptchav2_enterprise?" +
        new URLSearchParams({
          apikey: this.apiKey,
          sitekey: siteKey,
          siteurl: siteUrl,
        })
      );
      let data = await response.json();
      if (response.status === 200) {
        if (data["Code"] === 0) {
          let taskId = data['TaskId'];
          let token = await this.getTaskResult(taskId, timeout, timeSleep);
          return {
            code: 0,
            token: token,
          }
        }
      }
      return { "code": 1, "messeage": data["Message"] || JSON.stringify(data) }
    } catch (e) {
      return { "code": 1, "messeage": e.toString() }
    }

  }

  async solveRecaptchaV3ProxyLess(siteUrl, siteKey, pageAction, minScore = 0.3, timeout = 180, timeSleep = 2) {
    try {
      const response = await fetch(this.baseURL + "/recaptchav3?" +
        new URLSearchParams({
          apikey: this.apiKey,
          sitekey: siteKey,
          siteurl: siteUrl,
          pageaction: pageAction,
          minscore: minScore,
          version: "v3",
        })
      );
      let data = await response.json();
      if (response.status === 200) {
        if (data["Code"] === 0) {
          let taskId = data['TaskId'];
          let token = await this.getTaskResult(taskId, timeout, timeSleep);
          return {
            code: 0,
            token: token,
          }
        }
      }
      return { "code": 1, "messeage": data["Message"] || JSON.stringify(data) }
    } catch (e) {
      return { "code": 1, "messeage": e.toString() }
    }
  }

  async solveRecaptchaV3EnterpriseProxyLess(siteUrl, siteKey, pageAction, minScore = 0.3, timeout = 180, timeSleep = 2) {
    try {
      const response = await fetch(this.baseURL + "/recaptchav3_enterprise?" +
        new URLSearchParams({
          apikey: this.apiKey,
          sitekey: siteKey,
          siteurl: siteUrl,
          pageaction: pageAction,
          minscore: minScore,
        })
      );
      let data = await response.json();
      if (response.status === 200) {
        if (data["Code"] === 0) {
          let taskId = data['TaskId'];
          let result = await this.getTaskResult(taskId, timeout, timeSleep, "v3_enterprise");
          return {
            code: 0,
            token: result.token,
            userAgent: result?.userAgent,
          }
        }
      }
      return { "code": 1, "messeage": data["Message"] || JSON.stringify(data) }
    } catch (e) {
      return { "code": 1, "messeage": e.toString() }
    }
  }

  async funCaptchaProxyLess(siteUrl, siteKey, timeout = 180, timeSleep = 3) {
    try {
      const response = await fetch(this.baseURL + "/funcaptchatokentask?" +
        new URLSearchParams({
          apikey: this.apiKey,
          sitekey: siteKey,
          siteurl: siteUrl,
        })
      );
      let data = await response.json();
      if (response.status === 200) {
        if (data["Code"] === 0) {
          let taskId = data['TaskId'];
          let token = await this.getTaskResult(taskId, timeout, timeSleep);
          return {
            code: 0,
            token: token,
          }
        }
      }
      return { "code": 1, "messeage": data["Message"] || JSON.stringify(data) }
    } catch (e) {
      return { "code": 1, "messeage": e.toString() }
    }
  }

  async recaptchaClick(urlList, caption, timeout = 60, timeSleep = 3) {
    try {
      const response = await fetch(this.baseURL + "/recognition", {
        method: "POST",
        body: JSON.stringify({
          Image_urls: urlList,
          Caption: caption,
          Apikey: this.apiKey,
          Type: "recaptcha",
        })
    })
    let data = await response.json();
    if (response.status === 200) {
      if (data["Code"] === 0) {
        let taskId = data['TaskId'];
        let token = await this.getTaskResult(taskId, timeout, timeSleep, "recaptcha_click");
        return {
          code: 0,
          token: token,
        }
      }
    }
    return { "code": 1, "messeage": data["Message"] || JSON.stringify(data) }
  } catch(e) {
    return { "code": 1, "messeage": e.toString() }
  }
}

  async convertFileToBase64(filePath) {
  const file = await fetch(filePath);
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(await file.blob());
    reader.onload = () => resolve(reader.result.toString().replace(/^data:(.*,)?/, ''));
    reader.onerror = reject;
  });
}

  async imageToText(base64img = undefined, filePath = undefined, timeout = 60, timeSleep = 3) {
  if (!base64img && !filePath) {
    return { "code": 1, "messeage": "base64img or filePath is required" }
  }
  if (!base64img) {
    base64img = await this.convertFileToBase64(filePath)
  }
  try {
    const response = await fetch(this.baseURL + "/recognition", {
      method: "POST",
      body: JSON.stringify({
        Image: base64img,
        Apikey: this.apiKey,
        Type: "imagetotext",
      })
    })
    let data = await response.json();
    if (response.status === 200) {
      if (data["Code"] === 0) {
        let taskId = data['TaskId'];
        let token = await this.getTaskResult(taskId, timeout, timeSleep, "image2text");
        return {
          code: 0,
          token: token,
        }
      }
    }
    return { "code": 1, "messeage": data["Message"] || JSON.stringify(data) }
  } catch (e) {
    return { "code": 1, "messeage": e.toString() }
  }
}
}