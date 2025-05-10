document.addEventListener('DOMContentLoaded', () => {
    fetch('config.json')
        .then(response => response.json())
        .then(data => carregarPortfolio(data))
        .catch(error => console.error('Erro ao carregar configurações:', error));
});

function carregarPortfolio(config) {
    // ============= HERO SECTION =============
    const heroSection = document.querySelector('.hero');
    heroSection.style.backgroundImage = 
        `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${config.hero.imagem_background})`;

    // Carrega foto de perfil
    const heroFoto = document.getElementById('hero-foto');
    if(config.hero.imagem_perfil) {
        heroFoto.innerHTML = `<img src="${config.hero.imagem_perfil}" alt="Foto de Perfil">`;
    }

    document.getElementById('hero-titulo').textContent = config.hero.titulo;
    document.getElementById('hero-subtitulo').textContent = config.hero.subtitulo;

    // ============= SOBRE SECTION =============
    document.getElementById('sobre-titulo').textContent = config.sobre.titulo;
    document.getElementById('sobre-conteudo').textContent = config.sobre.conteudo;

    // ============= PROJETOS SECTION =============
    const projetosContainer = document.getElementById('projetos-container');
    projetosContainer.innerHTML = config.projetos.map(projeto => `
        <div class="projeto-card">
            <img src="projetos/${projeto.imagem}" alt="${projeto.titulo}">
            <h3>${projeto.titulo}</h3>
            <p>${projeto.descricao}</p>
            <div class="tecnologias">
                ${projeto.tecnologias.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <a href="${projeto.link}" class="btn" target="_blank">Ver Detalhes</a>
        </div>
    `).join('');

    // ============= HABILIDADES SECTION =============
    const habilidadesContainer = document.getElementById('habilidades-container');
    habilidadesContainer.innerHTML = config.habilidades.map(habilidade => `
        <div class="habilidade">
            <i class="${habilidade.icone}"></i>
            <h3>${habilidade.nome}</h3>
        </div>
    `).join('');

    // ============= CONTATO SECTION =============
    const contatoContainer = document.getElementById('contato-container');
    contatoContainer.innerHTML = config.contato.map(contato => `
        <div class="contato-item">
            <i class="${contato.icone}"></i>
            <a href="${contato.url}" target="_blank">${contato.tipo}</a>
        </div>
    `).join('');

    // ============= SMOOTH SCROLL =============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}