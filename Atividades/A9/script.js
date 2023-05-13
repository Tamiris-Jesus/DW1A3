
// Seleciona os elementos do HTML
const box = document.getElementById("box");
const controls = document.getElementById("controls");
const widthRange = document.getElementById("width-range");
const heightRange = document.getElementById("height-range");
const backgroundColorPicker = document.getElementById("background-color-picker");
const borderWidthRange = document.getElementById("border-width-range");
const borderColorPicker = document.getElementById("border-color-picker");
const marginTopRange = document.getElementById("margin-top-range");
const marginRightRange = document.getElementById("margin-right-range");
const marginBottomRange = document.getElementById("margin-bottom-range");
const marginLeftRange = document.getElementById("margin-left-range");
const borderRadiusRange = document.getElementById("border-radius-range");

// Função que atualiza as informações do CSS na div de informações 

function updateCssInfo() {
  const cssInfo = document.getElementById("css-info");

  // Obtém as propriedades CSS do elemento
  const computedStyle = window.getComputedStyle(box);
  const width = computedStyle.getPropertyValue("width");
  const height = computedStyle.getPropertyValue("height");
  const backgroundColor = computedStyle.getPropertyValue("background-color");
  const borderWidth = computedStyle.getPropertyValue("border-width");
  const borderColor = computedStyle.getPropertyValue("border-color");
  const marginTop = computedStyle.getPropertyValue("margin-top");
  const marginRight = computedStyle.getPropertyValue("margin-right");
  const marginBottom = computedStyle.getPropertyValue("margin-bottom");
  const marginLeft = computedStyle.getPropertyValue("margin-left");
  const borderRadius = computedStyle.getPropertyValue("border-radius");

  // Atualiza o texto das informações do CSS
  cssInfo.innerHTML = `width: ${width};<br>
                       height: ${height};<br>
                       background-color: ${backgroundColor};<br>
                       border-width: ${borderWidth};<br>
                       border-color: ${borderColor};<br>
                       margin-top: ${marginTop};<br>
                       margin-right: ${marginRight};<br>
                       margin-bottom: ${marginBottom};<br>
                       margin-left: ${marginLeft};<br>
                       border-radius: ${borderRadius};<br> `;
}

// Adiciona os eventos aos elementos de controle

widthRange.addEventListener("input", function(event) {
  box.style.width = event.target.value + "px";
  updateCssInfo();

});

heightRange.addEventListener("input", function(event) {
  box.style.height = event.target.value + "px";
  updateCssInfo();

});

backgroundColorPicker.addEventListener("input", function(event) {
  box.style.backgroundColor = event.target.value;
  updateCssInfo();

});

borderWidthRange.addEventListener("input", function(event) {
  box.style.borderWidth = event.target.value + "px";
  updateCssInfo();

});

borderColorPicker.addEventListener("input", function(event) {
  box.style.borderColor = event.target.value;
  updateCssInfo();

});

marginTopRange.addEventListener("input", function(event) {
  box.style.marginTop = event.target.value + "px";
  updateCssInfo();

});

marginRightRange.addEventListener("input", function(event) {
  box.style.marginRight = event.target.value + "px";
  updateCssInfo();

});

marginBottomRange.addEventListener("input", function(event) {
  box.style.marginBottom = event.target.value + "px";
  updateCssInfo();

});

marginLeftRange.addEventListener("input", function(event) {
  box.style.marginLeft = event.target.value + "px";
  updateCssInfo();

});

borderRadiusRange.addEventListener("input", function(event) {
  box.style.borderRadius = event.target.value + "px";
  updateCssInfo();
});

updateCssInfo();


