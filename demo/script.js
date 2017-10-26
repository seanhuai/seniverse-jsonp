var s = new Seniverse('U921DEDA8D','qvysjt6ouxgcgm2x',{
  api: 'now',
  callback: 'getData'
});
s.request();
function getData(json){
  var w = document.getElementById('weather'),
      t = document.getElementById('time');
  w.innerHTML = json.results[0].location.name+' '+json.results[0].now.text+' '+json.results[0].now.temperature+'℃';
  t.innerHTML = json.results[0].last_update;
}