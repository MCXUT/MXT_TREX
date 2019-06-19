<!-- price range selector -->

$( function() {
  $( "#slider-range" ).slider({
    range: true,
    animate: "slowFade",
    min: 0,
    max: 50000,
    values: [ 0, 50000 ],
    step: 1000,
    slide: function( event, ui ) {
      // $( "#leasts" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ));

      $( "#leasts" ).val(ui.values[0] + "원");
      $( "#maxs" ).val(ui.values[1] +"원");

      // $( "#maxs" ).val( "$" + $( "#slider-range" ).slider( "values", 1 ));
      $("#paymentis").html(" : " + ui.values[0] + "원 - " + ui.values[1] + "원")

      // $("#paymentis").html(" : " + $("#slider-range").slider("values", 0) + "원 - " +
      // $("#slider-range").slider("values", 1) + "원");
    }
  });

  // $( "#leasts" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ));
  // $( "#maxs" ).val( "$" + $( "#slider-range" ).slider( "values", 1 ));

} );



// responsive value change of text box in cost
$("#leasts").change(function(){

  $("#slider-range").slider("values", 0, $(this).val().replace(/\D/g,''));
});

$("#maxs").change(function(){

  $("#slider-range").slider("values", 1, $(this).val().replace(/\D/g,''));
});





// Map button on and off
function myFunction5(){

 var checkbox = document.getElementById("roundswitch");
 var map = document.getElementById("map");
 var wrapper = document.getElementById("wrapper");
 if(checkbox.checked == true){
   map.style.width= "40%";
   wrapper.style.width = "60%";
 } else {
   map.style.width= "0%";
   wrapper.style.width = "100%";
 }
}


document.querySelector("body").addEventListener("click", (e) => {
  if(e.target.className == "dropbtn moneybar"){
    if(document.getElementById("money").style.display=="none"){
      document.getElementById("money").style.display="block";
    } else{
      document.getElementById("money").style.display="none";
    }
  } else if($(e.target).hasClass("money")) {
    document.getElementById("money").style.display="block";
  } else {
    if($("#slider-range").slider("values", 0) != "0"){
      document.getElementById("money").style.display="none";
      $("#paymentis").html(" : " + $("#slider-range").slider("values", 0) + "원 - " +
      $("#slider-range").slider("values", 1) + "원");
    } else {
      document.getElementById("money").style.display="none"
    }}
});

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
    if(e.target.id == "monsta") {
      $("#.myDropdown2.dropdown-content.checkbox").toggleClass("show");
    }else{
    if($("#myDropdown2.dropdown-content.checkbox.show").hasClass("show")){
      if(e.target.id == "myDropdown"){

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
  }
  , function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });

});


document.getElementById("myDropdown").addEventListener("close", (e) => {
    document.querySelector("#registerModal").style.display = "block";

});




// document.getElementsByClassName("datepicker").defaultValue = "날짜";

document.getElementById("login").addEventListener("click", (e) => {
    document.querySelector("#registerModal").style.display = "block";

});


document.getElementById("registerModal").addEventListener("click", (e) => {
    if(e.target.className == "modal in modal_site_login ui-draggable") {
      var memi = document.getElementById("memi").value;
      var inwon = document.getElementsByClassName("inwon");
      document.getElementById("registerModal").style.display = "none";
      document.getElementById("inwon").innerHTML = " : " +
      document.getElementById("memi").value + "명";

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
  document.getElementById("nal").value="날짜"
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


    function initMap() {
      //Map options
      // var mapProp= {
      //   center:new google.maps.LatLng(45.510191,-73.575735),
      //   zoom:14,
      // };
      //
      // function initMap(){
        var options = {
          zoom: 13,
          center: {lat:42.4668, lng: -70.9495}
        }

      //New map
      var map = new google.maps.Map(document.getElementById('map'), options);

      //Listen for click on map
      // google.maps.event.addListener(map,'click',
      // function(event){
      //   //Add marker
      //   addMarker({coords:event.latLng});
      // });




      // var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

      // //Add marker
      // var marker = new google.maps.Marker({
      //   position:{lat: 42.4668, lng: -70.9495},
      //   map: map
      // })
      // var infoWindow = new google.maps.InfoWindow({
      //   content:'<h1>Lynn MA</h1>'
      // });
      //
      // marker.addListener('click', function(){
      //   infoWindow.open(map, marker);
      // });


      //Array of markers
      var markers = [
        {
        coords:{lat:42.4668, lng:-70.9495},
        // iconImage:"https://developers.google.com/maps/documentation/
        // javascript/examples/full/images/beachflag.png",
        content:'<h1>kokokoko</h1>'
        },

        {
          coords:{lat:42.7762, lng:-71.0773},
          content:'<h1>Ameesbury MA</h1>'
        },
        {
          coords:{lat:42.4762, lng:-71.0773},
          content:'<h1>AasdadaMA</h1><br><h2>aksdlakdlakdla</h2>'
        }
      ];

      // Loop through markers
      for(var i = 0; i < markers.length; i++){
        addMarker(markers[i]);
      }
        // addMarker({
        //   coords:{lat:42.4668, lng:-70.9495},
        //   // iconImage:"https://developers.google.com/maps/documentation/
        //   // javascript/examples/full/images/beachflag.png",
        //   content:'<h1>kokokoko</h1>'
        // });
        // addMarker({
        //   coords:{lat:42.7762, lng:-71.0773},
        //   content:'<h1>Ameesbury MA</h1>'
        // });

        function addMarker(props){
          var marker = new google.maps.Marker({
            position: props.coords,
            map:map,
            //icon: props.iconImage
          });

          // Check for customicon
          if(props.iconImage){
            // Set icon image
            marker.setIcon(props.iconImage);
          }

          //Check contents
          if(props.content){
            var infoWindow = new google.maps.InfoWindow({
              content:props.content
            });

            marker.addListener('click', function(){
              infoWindow.open(map, marker);
            });

          }
        }
      }
