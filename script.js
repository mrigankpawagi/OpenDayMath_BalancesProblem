var V = location.href.split("v=")[1].split("&")[0];
if (V == "") {
  var total_coins = 12; // Default value
} else {
  var total_coins = +V;
}

for (var i = 0; i < total_coins; i++) {
  document.querySelector(
    "#coins"
  ).innerHTML += `<div class="coin" draggable='true' id='coin${i}'>${
    i + 1
  }</div>`;
}
var biased = Math.floor(Math.random() * total_coins);
var biasing = -1 + 2 * Math.floor(Math.random() * 2);

document.querySelectorAll(".coin")[biased].classList.add("biased");

document.querySelectorAll(".coin").forEach((coin) => {
  coin.addEventListener("dragstart", dragStart);
});
document.querySelectorAll(".bucket").forEach((bucket) => {
  bucket.addEventListener("dragenter", dragEnter);
  bucket.addEventListener("dragover", dragOver);
  bucket.addEventListener("dragleave", dragLeave);
  bucket.addEventListener("drop", drop);
});

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
}
function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  console.log(data);
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function dragLeave(e) {
  e.target.classList.remove("drag-over");
}

function drop(e) {
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);

    if(e.target.classList.contains("bucket")) {
        e.target.appendChild(draggable);
    } 
    else{
        e.target.parentNode.appendChild(draggable);
    }

    // document.querySelector(".bucket.drag-over").appendChild(draggable);
    

    e.target.classList.remove("drag-over");
    draggable.classList.remove("hide");  
}

document.querySelector("#measure").addEventListener("click", weigh);

function weigh() {
    var left = 0; 
    var right = 0;
    var left_coins = document.querySelectorAll("#left .coin").length;
    var right_coins = document.querySelectorAll("#right .coin").length;
    var left_biased = document.querySelectorAll("#left .biased").length;
    var right_biased = document.querySelectorAll("#right .biased").length;
    left = left_coins + 0.1 * left_biased;
    right = right_coins + 0.1 * right_biased;
    if (left > right) {
        document.querySelector("#bar").style.transform = "rotate(-25deg)";
        document.querySelector("#left").style.bottom = 'calc(0.365 * (100vh - 120px))';
        document.querySelector("#left").style.left = '0';
        document.querySelector("#right").style.bottom = 'calc(0.655 * (100vh - 120px))';
        document.querySelector("#right").style.right = 'calc(0.05 * (100vh - 120px))';
    }
    else if (left < right) {
        document.querySelector("#bar").style.transform = "rotate(25deg)";
        document.querySelector("#left").style.bottom = 'calc(0.655 * (100vh - 120px))';
        document.querySelector("#left").style.left = 'calc(0.05 * (100vh - 120px))';
        document.querySelector("#right").style.bottom = 'calc(0.365 * (100vh - 120px))';
        document.querySelector("#right").style.right = '0';

    }
    else {
        document.querySelector("#bar").style.transform = "rotate(0deg)";
        document.querySelector("#left").style.bottom = 'calc(0.51 * (100vh - 120px))';
        document.querySelector("#left").style.left = '0';
        document.querySelector("#right").style.bottom = 'calc(0.51 * (100vh - 120px))';
        document.querySelector("#right").style.right = '0';
    }
    // console.log(left, right);
    
    var LOG = document.querySelector("#balance").innerHTML;
    html2canvas(document.querySelector("#balance")).then(function(canvas) {
        document.querySelector("#history-list").prepend(canvas);
    });
}

