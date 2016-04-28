// http://www.dyn-web.com/tutorials/forms/radio/get-selected.php
function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];
    
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    
    if (name === 'flange' && val === 'no') {
      showDepends();
    } else if (name === 'flange' && val === 'yes') {
      hideDepends();
    }
  
    return val; // return value of checked radio or undefined if none checked
}

function showDepends() {
  var depends = document.getElementsByClassName('depends');
  for (var i = 0; i < depends.length; i++) {
    depends[i].style.display = 'block';
  }
}
function hideDepends() {
  var depends = document.getElementsByClassName('depends');
  for (var i = 0; i < depends.length; i++) {
    depends[i].style.display = 'none';
  }
}


function displayResults() {
  var pipeSize = document.getElementById("nav-config").elements[0].value;
  var hoseSize = document.getElementById("nav-config").elements[1].value;
  // radios work differently.. figure out how to show value
  var flangeType = getRadioVal(document.getElementById("nav-config"), "flange");
  var splashPlate = getRadioVal(document.getElementById("nav-config"), 'plate');
  
  document.getElementById("pipe-size").innerHTML = "Pipe Size: " + pipeSize;
  document.getElementById("hose-size").innerHTML = hoseSize;
  document.getElementById("flange").innerHTML = flangeType;
  document.getElementById("plate").innerHTML = splashPlate;
}