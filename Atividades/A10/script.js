

const masks = {
  cpf(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(\d{3}\-)(\d{2})\d+?$/, '$1$2')
      // .replace(/(\d{2})\d+?$/, '$1');
      
  },
  // cnpj(value) {
  //   return value
  //     .replace(/\D/g, '')
  //     .replace(/(\d{2})(\d)/, '$1.$2')
  //     .replace(/(\d{3})(\d)/, '$1.$2')
  //     .replace(/(\d{3})(\d)/, '$1/$2')
  //     .replace(/(\d{4})(\d)/, '$1-$2')
  //     .replace(/(-\d{2})\d+?$/, '$1');
  // },
  rg(value){
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{1})\d+?$/, '$1');
  },
  phone(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1');
  },
  cep(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  },
  // pis(value) {
  //   return value
  //     .replace(/\D/g, '')
  //     .replace(/(\d{3})(\d)/, '$1.$2')
  //     .replace(/(\d{5})(\d)/, '$1.$2')
  //     .replace(/(\d{5}\.)(\d{2})(\d)/, '$1$2-$3')
  //     .replace(/(-\d{1})\d+?$/, '$1');
  // },
  cart(value){
    return value
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})\d+?$/, '$1');
  },
  numS(value){
    return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1-$2')
    .replace(/(\d{6})(\d)/, '$1-$2')
    .replace(/(\d{6}\-)(\d{2})\d+?$/, '$1$2')
  }
};

// função para validar email
const validateEmail = (email) => {
  if (email === '') {
    return false;
  }

  if (
    email.indexOf('@') === -1 ||
    email.indexOf('.') === -1 ||
    email.indexOf('.') - email.indexOf('@') === 1 ||
    email.includes(' ')

  ) {
    return false;
  }

  // divide o email em antes e depois do arroba 
  const parts = email.split('@');
  const username = parts[0];
  const domain = parts[1];

  if (username === '' || domain === '') {
    return false;
  }

  const domainParts = domain.split('.');
  const lastPart = domainParts[domainParts.length - 1];

  if (lastPart.length < 2) {
    return false;
  }

  return true;
};

// Função para validar cpf 
const validateCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, ''); 
  // Remove caracteres não numéricos
  // o cpf é enviado com a máscara, por isso é necessária retirá-la 

/*  
  Verifica se o CPF tem quantidade inválida de dígitos 
  ou dígitos repetidos
*/  

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false; 
  }
  
  // Converte cada dígito para um número
  const digits = cpf.split('').map(Number); 

  // Verifica o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }
  let verificationDigit1 = (sum * 10) % 11;
  if (verificationDigit1 === 10) {
    verificationDigit1 = 0;
  }
  if (verificationDigit1 !== digits[9]) {
    return false; // CPF inválido
  }

  // Verifica o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += digits[i] * (11 - i);
  }
  let verificationDigit2 = (sum * 10) % 11;
  if (verificationDigit2 === 10) {
    verificationDigit2 = 0;
  }
  if (verificationDigit2 !== digits[10]) {
    return false; // CPF inválido
  }

  return true; // CPF válido
};


document.querySelectorAll('input').forEach(($input) => {
  const field = $input.dataset.js;
  const errorElement = document.createElement('small');
  errorElement.className = 'error-message';
  $input.parentNode.insertBefore(errorElement, $input.nextSibling);

  // Adiciona as máscaras aos inputs 
  $input.addEventListener(
    'input',
    (e) => {
      e.target.value = masks[field](e.target.value);
      validateInput(e.target, errorElement);
    },
    false
  );

  if (field === 'email') {
    $input.addEventListener(
      'input',
      (e) => {
        validateInput(e.target, errorElement);
      },
      false
    );
  }
});


const validateInput = (input, errorElement) => {
  const value = input.value.trim();
  const minDigits = parseInt(input.dataset.minDigits);

  // verifica que o input possui caracteres iguais 
  const hasRepeatedDigits = (value, count) => {
    const digits = value.replace(/\D/g, '');
    const regex = new RegExp(`(\\d)\\1{${count - 1},}`);
    return regex.test(digits);
  };

  // Verifica se os campos possuem menos dígitos do que o estabelecido
  if (value.replace(/\D/g, '').length < minDigits) {
    input.classList.add('errorInput');
    errorElement.textContent = `Esse campo é obrigatório. Digite pelo menos ${minDigits} dígitos.`;
    errorElement.style.display = 'block';
    // verifica se algum caractere se repete 5 vezes 
  } else if (hasRepeatedDigits(value, 5)) {
    input.classList.add('errorInput');
    errorElement.textContent = 'Não são permitidos 5 ou mais caracteres iguais.';
    errorElement.style.display = 'block';
  } else {
    input.classList.remove('errorInput');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }

  // faz a verificação do email
  if (input.dataset.js === 'email' && !validateEmail(value)) {
    input.classList.add('errorInput');
    errorElement.textContent = 'Digite um endereço de e-mail válido.';
    errorElement.style.display = 'block';
  }

  // faz a validação do cpf 
  if (input.dataset.js === 'cpf' && !validateCPF(value)) {
    input.classList.add('errorInput');
    errorElement.textContent = 'Digite um CPF válido.';
    errorElement.style.display = 'block';
  }

  

};

// Verifica se não existe nenhum erro em nenhum input
const validateForm = () => {
  const inputs = document.querySelectorAll('input');
  let hasErrors = false;

  inputs.forEach((input) => {
    const errorElement = input.nextElementSibling;
    validateInput(input, errorElement);

    if (input.classList.contains('errorInput')) {
      hasErrors = true;
    }
  });

  return !hasErrors;
};

// Impede que o botão seja enviado se existir algum erro no formulário
const button = document.getElementById('button');
button.addEventListener('click', (event) => {
  event.preventDefault();

  // Caso não tenha erros, envia o form
  if (validateForm()) {
    document.getElementById('form').submit();
    alert("Formulário enviado com sucesso!")
  }
});



