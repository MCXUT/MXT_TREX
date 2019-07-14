
$( document ).ready(function() {

    var index = getParameterByName('index');
    var text = ["_dashBoard","_users-clients","_users-partners","_services_1","_services_2","_services_3","_adminList","_addAdmin","_users_deleted"]
   // $('#div'+ index).trigger('click');
   //  $('ul > li').not('#target' + index).hide()
   $('left').not('#div' + index + text[index-1]).hide()
   $('#div'+ index + text[index-1]).show();
   $('#nav1').removeClass('active');
   $('#nav'+ index).addClass('active');

   if(index ==2 || index == 3 || index == 9){
       $("#nav_item_users").css({ display: "block" });
   }
   else if(index == 4 || index == 5 || index == 6){
       $("#nav_item_services").css({ display: "block" });
   }
   else if(index == 7 || index == 8){
       $("#nav_item_admin").css({ display: "block" });
   }
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


function myFunction() {
  var input, filter, table, tr, td, cell, i, j;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = "none";

    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < td.length; j++) {
      cell = tr[i].getElementsByTagName("td")[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        }
      }
    }
  }
}

function myFunction2() {
  var input, filter, table, tr, td, cell, i, j;
  input = document.getElementById("myInput2");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable2");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = "none";

    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < td.length; j++) {
      cell = tr[i].getElementsByTagName("td")[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        }
      }
    }
  }
}

function myFunction3() {
  var input, filter, table, tr, td, cell, i, j;
  input = document.getElementById("myInput3");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable3");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = "none";

    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < td.length; j++) {
      cell = tr[i].getElementsByTagName("td")[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        }
      }
    }
  }
}

function myFunction4() {
  var input, filter, table, tr, td, cell, i, j;
  input = document.getElementById("myInput4");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable4");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = "none";

    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < td.length; j++) {
      cell = tr[i].getElementsByTagName("td")[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        }
      }
    }
  }
}

function myFunction5() {
  var input, filter, table, tr, td, cell, i, j;
  input = document.getElementById("myInput5");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable5");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = "none";

    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < td.length; j++) {
      cell = tr[i].getElementsByTagName("td")[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        }
      }
    }
  }
}

// searching in partner profile tab
function myFunction6() {
  var input, filter, table, tr, td, cell, i, j;
  input = document.getElementById("myInput6");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable6");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = "none";

    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < td.length; j++) {
      cell = tr[i].getElementsByTagName("td")[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        }
      }
    }
  }
}


function dashBoard(){
    document.getElementById('div1_dashBoard').style.display='inline';
    document.getElementById('div2_users-clients').style.display='none';
    document.getElementById('div3_users-partners').style.display='none';
    document.getElementById('div4_services_1').style.display="none";
    document.getElementById('div5_services_2').style.display="none";
    document.getElementById('div6_services_3').style.display="none";
    document.getElementById('div7_adminList').style.display='none';
    document.getElementById('div8_addAdmin').style.display='none';
    document.getElementById('div9_users_deleted').style.display="none";
}

function usersClients(){
    document.getElementById('div1_dashBoard').style.display='none';
    document.getElementById('div2_users-clients').style.display='inline';
    document.getElementById('div3_users-partners').style.display='none';
    document.getElementById('div4_services_1').style.display="none";
    document.getElementById('div5_services_2').style.display="none";
    document.getElementById('div6_services_3').style.display="none";
    document.getElementById('div7_adminList').style.display='none';
    document.getElementById('div8_addAdmin').style.display='none';
    document.getElementById('div9_users_deleted').style.display="none";
}

function usersPartners(){
    document.getElementById('div1_dashBoard').style.display='none';
    document.getElementById('div2_users-clients').style.display='none';
    document.getElementById('div3_users-partners').style.display='inline';
    document.getElementById('div4_services_1').style.display="none";
    document.getElementById('div5_services_2').style.display="none";
    document.getElementById('div6_services_3').style.display="none";
    document.getElementById('div7_adminList').style.display='none';
    document.getElementById('div8_addAdmin').style.display='none';
    document.getElementById('div9_users_deleted').style.display="none";
}

function services1(){
    document.getElementById('div1_dashBoard').style.display='none';
    document.getElementById('div2_users-clients').style.display='none';
    document.getElementById('div3_users-partners').style.display='none';
    document.getElementById('div4_services_1').style.display="inline";
    document.getElementById('div5_services_2').style.display="none";
    document.getElementById('div6_services_3').style.display="none";
    document.getElementById('div7_adminList').style.display='none';
    document.getElementById('div8_addAdmin').style.display='none';
    document.getElementById('div9_users_deleted').style.display="none";
}

function services2(){
  document.getElementById('div1_dashBoard').style.display='none';
  document.getElementById('div2_users-clients').style.display='none';
  document.getElementById('div3_users-partners').style.display='none';
  document.getElementById('div4_services_1').style.display="none";
  document.getElementById('div5_services_2').style.display="inline";
  document.getElementById('div6_services_3').style.display="none";
  document.getElementById('div7_adminList').style.display='none';
  document.getElementById('div8_addAdmin').style.display='none';
  document.getElementById('div9_users_deleted').style.display="none";

}
function services3(){
  document.getElementById('div1_dashBoard').style.display='none';
  document.getElementById('div2_users-clients').style.display='none';
  document.getElementById('div3_users-partners').style.display='none';
  document.getElementById('div4_services_1').style.display="none";
  document.getElementById('div5_services_2').style.display="none";
  document.getElementById('div6_services_3').style.display="inline";
  document.getElementById('div7_adminList').style.display='none';
  document.getElementById('div8_addAdmin').style.display='none';
  document.getElementById('div9_users_deleted').style.display="none";
}

function adminList(){
    document.getElementById('div1_dashBoard').style.display='none';
    document.getElementById('div2_users-clients').style.display='none';
    document.getElementById('div3_users-partners').style.display='none';
    document.getElementById('div4_services_1').style.display="none";
    document.getElementById('div5_services_2').style.display="none";
    document.getElementById('div6_services_3').style.display="none";
    document.getElementById('div7_adminList').style.display='inline';
    document.getElementById('div8_addAdmin').style.display='none';
    document.getElementById('div9_users_deleted').style.display="none";
}

function addAdmin(){
    document.getElementById('div1_dashBoard').style.display='none';
    document.getElementById('div2_users-clients').style.display='none';
    document.getElementById('div3_users-partners').style.display='none';
    document.getElementById('div4_services_1').style.display="none";
    document.getElementById('div5_services_2').style.display="none";
    document.getElementById('div6_services_3').style.display="none";
    document.getElementById('div7_adminList').style.display='none';
    document.getElementById('div8_addAdmin').style.display='inline';
    document.getElementById('div9_users_deleted').style.display="none";

}

function usersDeleted(){
    document.getElementById('div1_dashBoard').style.display='none';
    document.getElementById('div2_users-clients').style.display='none';
    document.getElementById('div3_users-partners').style.display='none';
    document.getElementById('div4_services_1').style.display="none";
    document.getElementById('div5_services_2').style.display="none";
    document.getElementById('div6_services_3').style.display="none";
    document.getElementById('div7_adminList').style.display='none';
    document.getElementById('div8_addAdmin').style.display='none';
    document.getElementById('div9_users_deleted').style.display="inline";

}
