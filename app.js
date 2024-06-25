// TODO : Select all selectors
// TODO : Make the Pick color btn functional
// TODO : Make copy color functional
// TODO : Show color on top
// TODO : Local storage
// TODO : Clear button to clear all the previous colors

// Selectors
const colorPickerBtn = document.getElementById("color-picker");
const clearAll = document.querySelector(".clear-all");
const colorList = document.querySelector(".all-colors");
// const pickedColors = [];

// Step 5
let pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

// Step 01

const activateEyeDropper = async () => {
  try {
    const eyeDropper = new EyeDropper();
    console.log(eyeDropper);

    // const test = eyeDropper.open();
    // console.log(test);

    const colorCode = await eyeDropper.open();
    console.log(colorCode.sRGBHex);
    // copy to clipboard
    navigator.clipboard.writeText(colorCode.sRGBHex);
    // sending the new color code to the array
    pickedColors.push(colorCode.sRGBHex);

    //Step4
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    // console.log(pickedColors);
    showColor();
  } catch (error) {
    alert("Failed");
  }
};

// Step 2

const showColor = () => {
  if (pickedColors.length > 0) {
    document.querySelector(".picked-colors").style.display = "block";
    colorList.innerHTML = pickedColors
      .map(
        (color) =>
          `
        <li class="color">
            <span class="rect" style="background-color:${color}"></span>
            <span class="value hex">${color}</span>
          </li>
        `
      )
      .join("");

    // Step 7 (copy color)
    let colors = document.querySelectorAll(".color");
    console.log(colors);
    colors.forEach((li) => {
      li.addEventListener("click", (e) => {
        let color = e.target.innerText;
        navigator.clipboard.writeText(color);
        e.target.innerText = "Copied";

        // Set color to the initial state
        setTimeout(() => (e.target.innerText = color), 400);
      });
    });
  } else {
    document.querySelector(".picked-colors").style.display = "none";
  }
};

// Step 3
const clearListOfColors = () => {
  // colorList.innerHTML = "";

  //Step 6
  pickedColors.length = 0;
  localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
  document.querySelector(".picked-colors").style.display = "none";
};

//Activate color picker
colorPickerBtn.addEventListener("click", activateEyeDropper);
// Call clear function
clearAll.addEventListener("click", clearListOfColors);

//Show color by default
showColor();
