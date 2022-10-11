function insertName() {
  const name = prompt("Enter a username");
  console.log(name);
}
insertName(name);
localStorage.getItem("point") || insertName();

let point = () => {
  if (localStorage.getItem("point")) {
    return +localStorage.getItem("point");
  } else {
    localStorage.setItem("point", 1);
    return 1;
  }
};

function refresh() {
  document.querySelector(".game-text").innerText = `Guess a number from 1-${
    point() ? point() + 1 : 2
  }`;
  point && (document.querySelector(".stage").innerText = `Stage ${point()}`);
}

refresh();
document.querySelector(".input-wrap").addEventListener("submit", submit);

function reset() {
  point = () => 1;
  localStorage.setItem("point", 1);
  refresh();
}

function submit(range) {
  range.preventDefault();
  var inputNum = document.getElementById("number").value;
  var randomNum = Math.round(Math.random() * point() + 1);
  console.log(randomNum);
  if (inputNum != randomNum) {
    alert("SORRY!! TRY ANOTHER NUMBER");
  } else {
    alert("CONGRATULATIONS!!!, Move to the Next Stage");
    document.getElementById("award").textContent = inputNum;
    localStorage.setItem("point", +localStorage.getItem("point") + 1);
    refresh();
  }
}
