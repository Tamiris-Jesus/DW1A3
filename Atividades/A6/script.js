const $checkbox = document.querySelector('#mode');
var title = document.querySelector('#title');
var p1 = document.querySelector('#p1');
var p2 = document.querySelector('#p2');
var p3 = document.querySelector('#p3');

$checkbox.addEventListener('change', function(){
  if($checkbox.checked == true){
      document.getElementById("imagem").src="img/img3.png";
      title.textContent = "Exemplo de animal de hábitos noturnos";
      p1.textContent = "Os morcegos são animais fascinantes que pertencem à ordem Chiroptera, a única ordem de mamíferos que é capaz de voar. Existem mais de mil espécies de morcegos em todo o mundo, variando em tamanho desde o pequeno morcego-abelha até o gigante morcego-de-cauda-dourada. Os morcegos são encontrados em todos os continentes, exceto na Antártica, e são conhecidos por serem os únicos mamíferos capazes de voar verdadeiramente.";
      p2.textContent = "Os morcegos têm um papel vital nos ecossistemas em que vivem. Muitas espécies se alimentam de insetos, ajudando a manter o controle populacional de pragas e prevenindo a propagação de doenças transmitidas por insetos. Outros morcegos se alimentam de frutas e néctar, ajudando na polinização de plantas e na dispersão de sementes. Além disso, os morcegos são uma importante fonte de alimento para muitos predadores, como aves de rapina e animais carnívoros.";
      p3.textContent = "Embora os morcegos sejam frequentemente associados a imagens de vampiros e criaturas noturnas, a maioria das espécies é inofensiva e tímida. De fato, os morcegos são animais muito sociais e vivem em grupos chamados colônias. Eles usam a ecolocalização para se orientar no escuro e encontrar suas presas ou evitar obstáculos. Infelizmente, muitas espécies de morcegos estão ameaçadas de extinção devido à perda de habitat, doenças e caça. A conservação desses animais é fundamental para a manutenção da biodiversidade e do equilíbrio dos ecossistemas em todo o mundo.";
    }
  else{
      document.getElementById("imagem").src="img/img2.png";
      title.textContent = "Exemplo de animal de hábitos diurnos";
      p1.textContent = "Os beija-flores são pequenas aves conhecidas por sua habilidade de voar parado no ar, graças às suas asas rápidas e batidas. Eles pertencem à família Trochilidae e são encontrados exclusivamente nas Américas, desde o Alasca até a Terra do Fogo. Com mais de 300 espécies conhecidas, os beija-flores são um dos grupos de aves mais diversos do mundo.";
      p2.textContent = "Os beija-flores são conhecidos por sua dieta exclusiva de néctar e pequenos insetos. Eles têm um bico longo e fino que lhes permite acessar o néctar de flores profundas, além de uma língua bifurcada que se divide na ponta para sugar o néctar com eficiência. Sua alimentação de néctar é tão importante que eles têm um papel fundamental na polinização de muitas espécies de plantas. Além disso, sua capacidade de voar em várias direções, de cabeça para baixo e em zigue-zague, faz com que sejam importantes polinizadores de plantas em áreas de difícil acesso.";
      p3.textContent = "Os beija-flores são animais fascinantes e populares para observação de pássaros. Muitas espécies são migratórias e viajam centenas ou até milhares de quilômetros por ano. Eles são encontrados em uma variedade de habitats, desde florestas tropicais a desertos e pradarias. Infelizmente, muitas espécies de beija-flores estão ameaçadas devido à perda de habitat, mudanças climáticas e uso de pesticidas que afetam sua alimentação de néctar.";
       }
})