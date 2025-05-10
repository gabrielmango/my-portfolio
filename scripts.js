document.addEventListener('DOMContentLoaded', () => {
    fetch('config.json')
        .then(response => response.json())
        .then(data => carregarPortfolio(data))
        .catch(error => console.error('Erro ao carregar configurações:', error));
});

function carregarPortfolio(config) {
    // Hero Section
    document.getElementById('hero-titulo').textContent = config.hero.titulo;
    document.getElementById('hero-subtitulo').textContent = config.hero.subtitulo;
    document.querySelector('.hero').style.backgroundImage = 
        `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${config.hero.imagem_background})`;

    // Sobre Section
    document.getElementById('sobre-titulo').textContent = config.sobre.titulo;
    document.getElementById('sobre-conteudo').textContent = config.sobre.conteudo;

    // Projetos
    const projetosContainer = document.getElementById('projetos-container');
    config.projetos.forEach(projeto => {
        projetosContainer.innerHTML += `
            <div class="projeto-card">
                <img src="projetos/${projeto.imagem}" alt="${projeto.titulo}">
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
                <div class="tecnologias">
                    ${projeto.tecnologias.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="${projeto.link}" class="btn">Ver Detalhes</a>
            </div>
        `;
    });

    // Habilidades
    const habilidadesContainer = document.getElementById('habilidades-container');
    config.habilidades.forEach(habilidade => {
        habilidadesContainer.innerHTML += `
            <div class="habilidade">
                <i class="${habilidade.icone}"></i>
                <h3>${habilidade.nome}</h3>
            </div>
        `;
    });

    // Contato
    const contatoContainer = document.getElementById('contato-container');
    config.contato.forEach(contato => {
        contatoContainer.innerHTML += `
            <div class="contato-item">
                <i class="${contato.icone}"></i>
                <a href="${contato.url}" target="_blank">${contato.tipo}</a>
            </div>
        `;
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}