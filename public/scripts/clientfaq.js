
$( document ).ready(function() {

   var index = getParameterByName('index')
  // $('#div'+ index).trigger('click');
  //  $('ul > li').not('#target' + index).hide()
  $('center').not('#div' + index).hide()
  $('#div'+ index).show();
//    $('#target' + index).addClass('active');
  $('#tag' +index).css({"color": "#f8ba00", "borderBottom": "1px solid #f8ba00"});
return false;
});


function getParameterByName(name) {
    url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function changeTag(item){
    document.getElementById('div1').style.display='inline';
    document.getElementById('div2').style.display='none';
    document.getElementById('div3').style.display='none';
    item.style.color='#f8ba00';
    item.style.borderBottom='1px solid #f8ba00';
    document.getElementById('tag2').style.color='black';
    document.getElementById('tag2').borderBottom='1px solid black';
    document.getElementById('tag3').style.color='black';
    document.getElementById('tag3').borderBottom='1px solid black';

}
function changeTag2(item){
  document.getElementById('div1').style.display='none';
  document.getElementById('div2').style.display='inline';
  document.getElementById('div3').style.display='none';
  item.style.color='#f8ba00';
  item.style.borderBottom='1px solid #f8ba00';
  document.getElementById('tag3').style.color='black';
  document.getElementById('tag3').borderBottom='1px solid white';
  document.getElementById('tag1').style.color='black';
  document.getElementById('tag1').borderBottom='1px solid white';
}
function changeTag3(item){
  document.getElementById('div1').style.display='none';
  document.getElementById('div2').style.display='none';
  document.getElementById('div3').style.display='inline';
  item.style.color='#f8ba00';
  item.style.borderBottom='1px solid #f8ba00';
  document.getElementById('tag2').style.color='black';
  document.getElementById('tag2').borderBottom='1px solid white';
  document.getElementById('tag1').style.color='black';
  document.getElementById('tag1').borderBottom='1px solid white';
}
