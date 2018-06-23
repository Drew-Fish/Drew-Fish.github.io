document.querySelector('h1').onclick = function() {
    var Title = document.querySelector('h1');
    currentText = document.getElementById("Title").textContent;
    if (currentText == "Andrew Fisher"){
        Title.textContent= "Portfolio"
    }else{
        Title.textContent= "Andrew Fisher"
    }
}