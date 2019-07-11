<!-- price range selector -->
//
// $( function() {
//   $( "#slider-range" ).slider({
//     range: true,
//     animate: "slowFade",
//     min: 0,
//     max: 100000,
//     values: [ 0, 100000 ],
//     step: 1000,
//     slide: function( event, ui ) {
//       // $( "#leasts" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ));
//
//       $( "#leasts" ).val(ui.values[0] + "원");
//       $( "#maxs" ).val(ui.values[1] +"원");
//
//       // $( "#maxs" ).val( "$" + $( "#slider-range" ).slider( "values", 1 ));
//       $("#paymentis").html(" : " + ui.values[0] + "원 - " + ui.values[1] + "원")
//
//       // $("#paymentis").html(" : " + $("#slider-range").slider("values", 0) + "원 - " +
//       // $("#slider-range").slider("values", 1) + "원");
//     }
//   });
//
//   // $( "#leasts" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ));
//   // $( "#maxs" ).val( "$" + $( "#slider-range" ).slider( "values", 1 ));
//
// } );




function jusoFunction(){
  // var bigone = document.getElementById("wrapper").style.width;
  // var max = bigone.slice(0, bigone.length-1);
  // var real_max = max/2;
  // // var result = real_max.concat("%");
  // real_max += "%";
  // console.log(max);
  // console.log(real_max);

    var smallone = document.getElementsByClassName("col");
    console.log(smallone[2].style.width);

  var i, input, filter, wrapper, col, juso, text, map;
  input = document.getElementById("mymyInput").value;
  wrapper = document.getElementsByClassName("row");
  // col = wrapper.document.quarySelector(".col");
  juso = document.getElementsByClassName("juso");
  map = document.getElementById("map");
  // text = juso[0].textContent;
  // console.log(wrapper);
  // console.log(input);
  // console.log(juso);
  // console.log(text);
  // console.log(juso[0].textContent.includes(input));
  // console.log(wrapper.length/2);
  for(i=0; i<wrapper.length/2; i++){
    if(juso[i].textContent.includes(input)){
      wrapper[i].style.display = "flex";
    }
    else{
      wrapper[i].style.display = "none";
    }
  }
  // map.setCenter(lat: 47.510260, lng: -73.575745)
  // map.setCenter({lat: 41.85, lng: -87.65});
};
var enter = document.getElementById("mymyInput");
enter.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        jusoFunction();
    }
});







// 드롭다운 리스트 체크되어있을때 색깔변하게
$("input[type=checkbox]").change(function(e){
  if($(this).hasClass("rebut")){
    if($("input[class=rebut]:checked").length > 0){
      console.log($("input:checked").length);
      $("#monsta").css("backgroundColor", "#F58B44");
      $("#monsta").css("color", "#fff");


    } else{
      $("#monsta").css("backgroundColor", "#fff");
      $("#monsta").css("color", "rgb(72, 72, 72)");

    }
  } else if($(this).hasClass("rebut2")) {
    if($("input[class=rebut2]:checked").length > 0){
      $("#monsta2").css("backgroundColor", "#F58B44");
      $("#monsta2").css("color", "#fff");

    } else{
      $("#monsta2").css("backgroundColor", "#fff");
      $("#monsta2").css("color", "rgb(72, 72, 72)");
    }
  }
});







// responsive value change of text box in cost
// $("#leasts").change(function(){
//   $("#slider-range").slider("values", 0, $(this).val().replace(/\D/g,''));
// });
//
// $("#maxs").change(function(){
//   $("#slider-range").slider("values", 1, $(this).val().replace(/\D/g,''));
// });


// document.querySelector(".dateragepicker").addEventListener("close", function(e){
//   document.getElementById("nal").style.background="rgb(0, 132, 137)";
//   document.getElementById("nal").style.color="#fff";
//
// });



// Map button on and off
function myFunction5(){

 var checkbox = document.getElementById("roundswitch");
 var map = document.getElementById("map");
 var wrapper = document.getElementById("wrapper");
 if(checkbox.checked == true){
   map.style.width= "50%";
   wrapper.style.width = "50%";
 } else {
   map.style.width= "0%";
   wrapper.style.width = "100%";
 }
}




// 업종/전공 바깥클릭하면 없어지게 //
document.querySelector("body").addEventListener("click", (e) => {
  if(e.target.id != "myDropdown"){
    if(e.target.id == "monsta") {
      $("#.myDropdown.dropdown-content.checkbox").toggleClass("show");
    }else{
    if($("#myDropdown.dropdown-content.checkbox.show").hasClass("show")){
      if(e.target.id == "myDropdown"){

      }else{
        if(e.target.tagName != "INPUT" && e.target.tagName !== "LABEL")
          $("#myDropdown.dropdown-content.checkbox").toggleClass("show");
  }}
  }
}
});



document.querySelector("body").addEventListener("click", (e) => {
  if(e.target.id != "myDropdown2"){
    if(e.target.id == "monsta2") {
      $("#.myDropdown2.dropdown-content.checkbox").toggleClass("show");
    }else{
    if($("#myDropdown2.dropdown-content.checkbox.show").hasClass("show")){
      if(e.target.id == "myDropdown2"){

      }else{
        if(e.target.tagName != "INPUT" && e.target.tagName !== "LABEL")
          $("#myDropdown2.dropdown-content.checkbox").toggleClass("show");
  }}
  }
}
});



function myFunction(){
  var element = document.getElementsByClassName("end-date");
  element.classList.remove("in-range");
}



/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function myFunction2() {
  document.getElementById("myDropdown2").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it


$(function(e) {
  var minDate = new Date();
  $('input[name="daterange"]').daterangepicker({
    minDate : minDate,
    opens: 'right',
    showOn: "both",



    // buttonClasses: ['btn btn-default'],
    //       applyClass: 'btn-small btn-primary',
    //       cancelClass: 'btn-small'


    // buttonImageOnly: true,
    // buttonText: "선택",
    // today: "날짜"
  },
  $('input[name="daterange"]').on('hide.daterangepicker', function(ev, picker){
    $('#nal').css("backgroundColor","#F58B44");
    $('#nal').css("color","#fff");

  })
  , function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));

  });

});


// document.getElementById("myDropdown").addEventListener("close", (e) => {
//     document.querySelector("#registerModal").style.display = "block";
//
// });

document.querySelector(".close").addEventListener("click", (e) => {
    document.querySelector("#sliderss").style.display = "none";
    document.querySelector("#map").style.display = "block";
});


// document.getElementsByClassName("datepicker").defaultValue = "날짜";

// document.getElementById("login").addEventListener("click", (e) => {
//     document.querySelector("#registerModal").style.display = "block";
//
// });
$(document).ready(() => {
    var urlParams = new URLSearchParams(window.location.search);

    console.log(urlParams.get("shit"));
    if(urlParams.get("shit") === "shit") {
        document.querySelector("#sliderss").style.display = "block";
        document.querySelector("#map").style.display = "none";
    }
});

document.getElementById("formore").addEventListener("click", (e) => {
    console.log("eeee");
    document.querySelector("#sliderss").style.display = "block";
    document.querySelector("#map").style.display = "none";
});




document.getElementById("registerModal").addEventListener("click", (e) => {
    if(e.target.className == "modal in modal_site_login ui-draggable") {
      var memi = document.getElementById("memi").value;
      var inwon = document.getElementsByClassName("inwon");
      if(memi != 0){
      document.getElementById("registerModal").style.display = "none";
      document.getElementById("inwon").innerHTML = " : " +
      document.getElementById("memi").value + "명";
      document.getElementById("login").style.background="#F58B44";
      document.getElementById("login").style.color="#fff";
      } else{
        document.getElementById("registerModal").style.display = "none";
        document.getElementById("inwon").innerHTML = "";
        document.getElementById("login").style.background="#fff";
        document.getElementById("login").style.color="rgb(72, 72, 72)";
      }

      // document.getElementById("nal").style.backgroundColor="blue";
      // document.getElementById("login").style.backgroundColor="blue";
      // document.getElementById("monsta").style.backgroundColor="blue";
    }
});


//
// document.getElementById("myDropdown").addEventListener("click", (e) => {
//     if(e.target.className !== "dropdown-content") {
//       document.getElementById("myDropdown").style.display="none";
//     }
// });


const $menu = $('#myDropdown');

$(document).mouseup(function (e) {
   if (!$menu.is(e.target) // if the target of the click isn't the container...
   && $menu.has(e.target).length === 0) // ... nor a descendant of the container
   {
     $menu.removeClass('is-active');
  }
 });

$('.toggle').on('click', () => {
  $menu.toggleClass('is-active');
});




<!-- calendar styling -->

document.getElementById("nal").addEventListener("click", (e) => {
  document.querySelector(".applyBtn").innerHTML = "적용";
  document.querySelector(".cancelBtn").innerHTML = "취소";
  // document.getElementById("nal").value="날짜"
})



// document.getElementById("nal").addEventListener("close", (e) => {
//   document.getElementById("nal").value="날짜"
// })


// $(".inwon").text() = document.getElementById("memi").value;

function dontdoit(){
  document.getElementById("nal").value="업무날짜"
}

$('.btn-number').click(function(e){
    e.preventDefault();

    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {

            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {

    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }


});
$(".input-number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
         // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});


    // function initMap() {
    //     //Map options
    //     var options = {
    //       zoom: 1,
    //       center: {lat:42.4668, lng: -70.9495}
    //     }
    //
    //     //New map
    //     var map = new google.maps.Map(document.getElementById("map"), options);
    //
    //     var markers = [];
    //     // Iterate through all loaded partners and push markers
    //     <% for (var i = 0; i < allPartners.length; i++) { %>
    //       console.log("1111");
    //       // only for partners with correct address registered
    //       <% if (allPartners[i].coordinates) { %>
    //         var place = {
    //           coords: { lat: <%= allPartners[i].coordinates.lat %>, lng: <%= allPartners[i].coordinates.lng %> },
    //           content: "<%= allPartners[i].name %>"
    //         };
    //         markers.push(place);
    //       <% } %>
    //     <% } %>
    //
    //     // Loop through and add markers
    //     for(var i = 0; i < markers.length; i++){
    //       addMarker(markers[i]);
    //     }
    //
    //
    //     function addMarker(props){
    //       var marker = new google.maps.Marker({
    //         position: props.coords,
    //         map:map
    //       });
    //
    //       // Check for customicon
    //       if(props.iconImage){
    //         // Set icon image
    //         marker.setIcon(props.iconImage);
    //       }
    //
    //       //Check contents
    //       if(props.content){
    //         var infoWindow = new google.maps.InfoWindow({
    //           content:props.content
    //         });
    //
    //         marker.addListener('click', function(){
    //           infoWindow.open(map, marker);
    //         });
    //       }
    //
    //     }
    //
    // }
