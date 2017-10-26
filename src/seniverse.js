class Seniverse {
  constructor(uid,key,options){
    const url = 'https://api.seniverse.com/v3/';  
    const apitypes = {
      weather: {
        now: 'weather/now.json?',
        grid_now: 'weather/grid/now.json?',
        grid_minutely: 'weather/grid/minutely.json?',
        daily: 'weather/daily.json?',
        hourly: 'weather/hourly.json?',
        hourly_history: 'weather/hourly_history.json?',
        hourly3h: 'weather/hourly3h.json?',
        alarm: 'weather/alarm.json?'
      }
    }
    const defaultOptions = {
      api: 'now',
      language: 'zh-Hans',
      location: 'beijing',
      ttl: 1800,
      unit: 'c',
      callback: 'showData'
    };
    for (let option in defaultOptions) {
      if (defaultOptions.hasOwnProperty(option) && !options.hasOwnProperty(option)) {
        options[option] = defaultOptions[option];
      }
    }
    this.uid = uid || '';
    this.key = key || '';
    this.options = options;
    this.options.api = url+apitypes.weather[options.api];
  }
  sign () {
    let ctime = Math.floor((new Date().getTime())/1000);
    let query = `ts=${ctime}&ttl=${this.options.ttl}&uid=${this.uid}`;
    let sha1 = CryptoJS.HmacSHA1(query,this.key);  
    let sign = encodeURIComponent(sha1.toString(CryptoJS.enc.Base64)); 
    return query+'&sig='+sign;
  }
  request () {
    const signed = this.sign();
    let url = `location=${this.options.location}&unit=${this.options.unit}&language=${this.options.language}&${signed}&callback=${this.options.callback}`;
    let tag = document.createElement('script');
    tag.src = this.options.api+url;
    document.body.appendChild(tag);
  }
}