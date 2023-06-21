const consultarBtn = document.querySelector('#consultar-btn');


function calcularIdade() {
  var dataNascimento = document.getElementById('data_nascimento').value;
  var partesData = dataNascimento.split("-");
  var dataNascimentoFormatada = new Date(partesData[0], partesData[1] - 1, partesData[2]);
  var dataAtual = new Date();
  var idade = dataAtual.getFullYear() - dataNascimentoFormatada.getFullYear();
  if (dataAtual.getMonth() < dataNascimentoFormatada.getMonth() ||
      (dataAtual.getMonth() === dataNascimentoFormatada.getMonth() && dataAtual.getDate() < dataNascimentoFormatada.getDate())) {
    idade--;
  }
  document.getElementById('idade').value = idade;
  document.querySelector('label[for="idade"]').classList.add('active');
}

document.getElementById('data_nascimento').addEventListener('change', calcularIdade);
M.AutoInit();



function consultarEndereco() {
  let cep = document.querySelector('#cep').value;

  if (cep.length !== 8) {
    alert('O CEP digitado é inválido!');
    return;
  }

  let url = `https://viacep.com.br/ws/${cep}/json/`;

  fetch(url)
    .then(function(response) {
      response.json()
        .then(atualizarEndereco);
    });
}

consultarBtn.addEventListener('click', function(event) {
  event.preventDefault(); // Impede o envio automático do formulário
  consultarEndereco();
});

function atualizarEndereco(dados) {
  if (dados.erro) {
    alert("Erro ao tentar localizar CEP");
  } else {
    $('#endereco').val(dados.logradouro);
    $('#bairro').val(dados.bairro);
    $('#cidade').val(dados.localidade);
    $('#estado').val(dados.uf);
  }

  document.querySelector('label[for="endereco"]').classList.add('active');
  document.querySelector('label[for="bairro"]').classList.add('active');
  document.querySelector('label[for="cidade"]').classList.add('active');
  document.querySelector('label[for="estado"]').classList.add('active');
}
