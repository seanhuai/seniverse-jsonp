"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Seniverse = (function () {
  function Seniverse(uid, key, options) {
    _classCallCheck(this, Seniverse);

    var url = "https://api.seniverse.com/v3/";
    var apitypes = {
      weather: {
        now: "weather/now.json?",
        grid_now: "weather/grid/now.json?",
        grid_minutely: "weather/grid/minutely.json?",
        daily: "weather/daily.json?",
        hourly: "weather/hourly.json?",
        hourly_history: "weather/hourly_history.json?",
        hourly3h: "weather/hourly3h.json?",
        alarm: "weather/alarm.json?"
      }
    };
    var defaultOptions = {
      api: "now",
      language: "zh-Hans",
      location: "beijing",
      ttl: 1800,
      unit: "c",
      callback: "showData"
    };
    for (var option in defaultOptions) {
      if (defaultOptions.hasOwnProperty(option) && !options.hasOwnProperty(option)) {
        options[option] = defaultOptions[option];
      }
    }
    this.uid = uid || "";
    this.key = key || "";
    this.options = options;
    this.options.api = url + apitypes.weather[options.api];
  }

  _prototypeProperties(Seniverse, null, {
    sign: {
      value: function sign() {
        var ctime = Math.floor(new Date().getTime() / 1000);
        var query = "ts=" + ctime + "&ttl=" + this.options.ttl + "&uid=" + this.uid;
        var sha1 = CryptoJS.HmacSHA1(query, this.key);
        var sign = encodeURIComponent(sha1.toString(CryptoJS.enc.Base64));
        return query + "&sig=" + sign;
      },
      writable: true,
      configurable: true
    },
    request: {
      value: function request() {
        var signed = this.sign();
        var url = "location=" + this.options.location + "&unit=" + this.options.unit + "&language=" + this.options.language + "&" + signed + "&callback=" + this.options.callback;
        var tag = document.createElement("script");
        tag.src = this.options.api + url;
        document.body.appendChild(tag);
      },
      writable: true,
      configurable: true
    }
  });

  return Seniverse;
})();