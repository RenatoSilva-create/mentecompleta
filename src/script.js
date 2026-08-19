document.addEventListener('DOMContentLoaded', () => {
  // Carregar tema salvo
  const tema = localStorage.getItem("temaSite");
  if (tema === "escuro") {
    ativarModoEscuro();
  } else {
    ativarModoClaro();
  }

  carregarFotoPerfil();

  // Form Cadastro
  const formCadastro = document.getElementById('form-cadastro');
  if (formCadastro) {
    formCadastro.addEventListener('submit', (e) => {
      e.preventDefault();
      const usuario = {
        nome: document.getElementById('reg-nome').value,
        email: document.getElementById('reg-email').value,
        nascimento: document.getElementById('reg-nascimento').value
      };
      localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));
      fecharModalCadastro();
      atualizarEstadoUsuario();
    });
  }

  // Form Login
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const usuario = {
        nome: email.split('@')[0],
        email: email
      };
      localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));
      fecharModalLogin();
      atualizarEstadoUsuario();
    });
  }

  atualizarEstadoUsuario();
});

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

function abrirModalCadastro() {
  document.getElementById('modal-cadastro').classList.remove('hidden');
}

function fecharModalCadastro() {
  document.getElementById('modal-cadastro').classList.add('hidden');
}

function abrirModalLogin() {
  document.getElementById('modal-login').classList.remove('hidden');
}

function fecharModalLogin() {
  document.getElementById('modal-login').classList.add('hidden');
}

function atualizarEstadoUsuario() {
  const usuarioJSON = localStorage.getItem('usuarioCadastrado');
  const loggedOutDiv = document.getElementById('sidebar-logged-out');
  const loggedInDiv = document.getElementById('sidebar-logged-in');

  if (usuarioJSON) {
    const usuario = JSON.parse(usuarioJSON);
    document.getElementById('user-name-display').textContent = usuario.nome;
    document.getElementById('user-email-display').textContent = usuario.email;

    loggedOutDiv.classList.add('hidden');
    loggedInDiv.classList.remove('hidden');
  } else {
    loggedOutDiv.classList.remove('hidden');
    loggedInDiv.classList.add('hidden');
  }
}

function fazerLogout() {
  localStorage.removeItem('usuarioCadastrado');
  atualizarEstadoUsuario();
}

function carregarFotoPerfil() {
  const fotoSalva = localStorage.getItem('userFotoPerfil');
  if (fotoSalva) {
    document.getElementById('user-avatar').src = fotoSalva;
  }
}

function solicitarNovaFoto() {
  const urlFoto = prompt("Cole o link (URL) da imagem para a sua foto de perfil:");
  if (urlFoto) {
    localStorage.setItem('userFotoPerfil', urlFoto);
    document.getElementById('user-avatar').src = urlFoto;
  }
}

function atualizarBotoesTema(modo) {
  const btnClaro = document.getElementById('btn-tema-claro');
  const btnEscuro = document.getElementById('btn-tema-escuro');

  if (modo === 'escuro') {
    btnEscuro.classList.add('theme-active');
    btnClaro.classList.remove('theme-active');
  } else {
    btnClaro.classList.add('theme-active');
    btnEscuro.classList.remove('theme-active');
  }
}

function ativarModoClaro() {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("temaSite", "claro");
  atualizarBotoesTema("claro");
}

function ativarModoEscuro() {
  document.body.classList.add("dark-mode");
  localStorage.setItem("temaSite", "escuro");
  atualizarBotoesTema("escuro");
}

/**
 * Função para redirecionar o usuário para a página de compra na Kiwify
 */
function redirecionarKiwify(botao) {
  const kiwifyUrl = botao.getAttribute('data-kiwify-url');

  if (kiwifyUrl && kiwifyUrl !== '#' && kiwifyUrl !== '') {
    window.open(kiwifyUrl, '_blank');
  } else {
    alert('O link de compra para este livro estará disponível em breve!');
  }
}