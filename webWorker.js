onmessage = function (e) {
  var result = filter(e.data.list,e.data.filter)
  postMessage({result});
}

function filter(list,filter){
  return list.filter(function(item){
    var searchTerm = filter.toLowerCase(),
      itemText = (item.name + item.country).toLowerCase();
    return itemText.indexOf(searchTerm) !== -1;
  })
}