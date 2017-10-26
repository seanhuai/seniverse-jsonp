# seniverse-jsonp

心知天气 API，前端 jsonp 封装组件。

关于心知天气 API，请参考官方文档：[心知天气-天气数据 API 文档](https://www.seniverse.com/doc)。

本组件所用加密模块为 [Crypto-Js](https://github.com/brix/crypto-js) 3.1.9 版本。加密模块项目著作权所有者 [brix](https://github.com/brix)，此项目遵守 The MIT License。

示例使用由 [BootCDN](http://www.bootcdn.cn/) 提供的 CDN 服务 。

## 下载

```bash
git clone https://github.com/seanhuai/seniverse-jsonp.git
cd seniverse-jsonp
```
使用 git clone 命令，复制本仓库至本地。

## 使用方式

**注意：引用 seniverse.min.js 文件前，需保证引入 crypto-js.min.js 文件。**

```html
  <script src="https://cdn.bootcss.com/crypto-js/3.1.9/crypto-js.min.js"></script>  
  <script src="seniverse.min.js"></script>
```

使用 script 标签将 seniverse.min.js 文件引入所需页面即可。

具体使用情形，可参考 [Demo 代码](https://github.com/seanhuai/seniverse-jsonp/blob/master/demo)，或访问[Demo](https://seanhuai.github.io/seniverse-jsonp/demo/)。

## 示例

```javascript
  const s = new Seniverse('your uid','your key',{
    api: 'now',
    location: 'beijing',
    callback: 'showData'
  });
  s.request();
```

对 Seniverse 进行实例化后，调用 request() 方法。

## API 结构

### 属性

```javascript
new Seniverse(uid,key,options)
```

* uid(必选)，是心知天气用户 ID 值，在注册心知会员时得到的一个10位字符串，如 `'U123456789'`。

* key(必选)，是由心知天气提供的API密钥，用来验证API请求合法性的一个唯一字符串。

options 是具体的设置信息，以键值对形式传参。

```javascript
{
  api: 'now',
  language: 'zh-Hans',
  location: 'beijing',
  ttl: 1800,
  unit: 'c',
  callback: 'showData'
}
```

* options.api(必选)，指定所调用的 api 类型，默认值为 `'now'`。可选值有 `'now'` (天气实况) / `'grid_now'` (格点天气实况) / `'grid_minutely'` (格点分钟级降水预报) / `'daily'` (逐日天气预报和昨日天气) / `'hourly'` (24小时逐小时天气预报) / `'hourly_history'` (过去24小时历史天气) / `'hourly3h'` (15天逐3小时精细化天气预报) 和 `'alarm'` (气象灾害预警)。

*注意：若使用 daily(逐日天气预报和昨日天气)及 hourly(24小时逐小时天气预报)类型 API，调用 request() 方法时将无法声明起始日期(start)参数、天数(days)参数和小时数(hours)参数，将默认按照所能获取的最多数据返回内容。欲避免此问题，可以在调用 sign() 方法后自行编写后续功能代码。*

*提示：目前仅支持气象信息查询，空气质量信息、自然语言天气查询、生活信息查询和地理信息查询等，暂不支持。*

* options.language(可选)，指定本次请求的工作语言，默认值为 `'zh-Hans'`。详见[多语言支持说明](https://www.seniverse.com/doc#language)。

* options.location(必选)，指定本次请求的地点信息，支持城市 ID 值/城市中文名/城市拼音/省份名+城市名，支持经纬度(格式 纬度:经度，英文冒号分隔)和 IP 地址。

* options.ttl(可选)，指定请求签名有效期，单位为秒，默认值为 `1800`。

* options.unit(可选)，指定返回数据的单位信息，默认值为 `'c'`。详见[天气数据单位的说明](https://www.seniverse.com/doc#unit)。 

* options.callback(必选)，指定回调函数名用于数据处理，默认为 `'showData'`。

### 方法

以下方法在实例化对象后调用，无需再次传参。

```javascript
new Seniverse(...).sign();
```
* sign() 方法，返回一个已包含时间戳(ts)参数、uid 参数和签名(sig)参数的请求字符串。

```javascript
new Seniverse(...).request();
```

* request() 方法，无返回值。执行后，将生成完整请求，并在 HTML 页面创建包含这一请求的 script 标签。

## 错误码

关于返回的错误码，详见 [API 返回错误代码说明](https://www.seniverse.com/doc#error)。

## 协议声明

此项目遵守 The MIT License

根据协议，你可以使用，复制和修改软件；可以用于个人项目或商业项目；使用此项目源码必须附带 MIT 协议声明。