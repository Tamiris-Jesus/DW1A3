
// Seleciona os elementos do HTML
const box = document.getElementById("custom-box");
const rotationRange = document.getElementById("rotation-range");
const scaleRange = document.getElementById("scale-range");
const translateXRange = document.getElementById("translateX-range");
const translateYRange = document.getElementById("translateY-range");
const skewXRange = document.getElementById("skewX-range");
const skewYRange = document.getElementById("skewY-range");
const transitionDuration = document.getElementById("transition-duration");
const cssInfo = document.getElementById("css-info");


// Função para atualizar as informações do CSS e aplicar as transformações
function updateCssInfo() {
  const rotation = rotationRange.value;
  const scale = scaleRange.value;
  const translateX = translateXRange.value;
  const translateY = translateYRange.value;
  const skewX = skewXRange.value;
  const skewY = skewYRange.value;
  const duration = transitionDuration.value;

  const cssTransform = `rotate(${rotation}deg) scale(${scale}) translateX(${translateX}px) translateY(${translateY}px) skewX(${skewX}deg) skewY(${skewY}deg)`;
  const cssTransition = `transform ${duration}s`;

  box.style.transform = cssTransform;
  box.style.transition = cssTransition;

  cssInfo.innerHTML = `transform: ${cssTransform};<br><br>
                       transition: ${cssTransition};`;
}

// Adiciona eventos de input aos elementos de controle
rotationRange.addEventListener("input", updateCssInfo);
scaleRange.addEventListener("input", updateCssInfo);
translateXRange.addEventListener("input", updateCssInfo);
translateYRange.addEventListener("input", updateCssInfo);
skewXRange.addEventListener("input", updateCssInfo);
skewYRange.addEventListener("input", updateCssInfo);
transitionDuration.addEventListener("input", updateCssInfo);

// Define o código CSS formatado no elemento <code> usando Prism.js


updateCssInfo();


