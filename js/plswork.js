function displayResults() {
  var pipeSize = document.getElementById("nav-config").elements[0].value;
  var hoseSize = document.getElementById("nav-config").elements[1].value;
  // radios work differently.. figure out how to show value
  var flangeType = document.getElementById("nav-config").elements[2].value;
  var splashPlate = document.getElementById("nav-config").elements[3].value;
  
  document.getElementById("pipe-size").innerHTML = pipeSize;
  document.getElementById("hose-size").innerHTML = hoseSize;
  document.getElementById("flange").innerHTML = flangeType;
  document.getElementById("plate").innerHTML = splashPlate;
}