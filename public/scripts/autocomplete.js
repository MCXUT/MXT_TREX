$( function() {
var availableTags1 = [
  "현지 통역",
  "현지 차량",
  "번역",
  "현지 기관 섭외"
];
$( "#tags1" ).autocomplete({
  source: availableTags1
});

var availableTags2 = [
  "독일",
  "대한민국",
  "홍콩",
  "가나"
];
$( "#tags2" ).autocomplete({
  source: availableTags2
});

} );
