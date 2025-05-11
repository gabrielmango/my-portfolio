document.addEventListener('DOMContentLoaded', () => {
    // Carregar configurações do JSON
    fetch('config.json')
        .then(response => response.json())
        .then(data => carregarPortfolio(data))
        .catch(error => console.error('Erro ao carregar configurações:', error));

    // Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Abrir/Fechar Menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Fechar menu ao clicar nos links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
});

function carregarPortfolio(config) {
    // ============= HERO SECTION =============
    const heroSection = document.querySelector('.hero');
    if (config.hero) {
        heroSection.style.backgroundImage = 
            `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${config.hero.imagem_background})`;

        // Foto de Perfil
        const heroFoto = document.getElementById('hero-foto');
        if (config.hero.imagem_perfil) {
            heroFoto.innerHTML = `<img src="${config.hero.imagem_perfil}" alt="Foto de Perfil">`;
        }

        // Textos
        document.getElementById('hero-titulo').textContent = config.hero.titulo;
        document.getElementById('hero-subtitulo').textContent = config.hero.subtitulo;

        // Botão de Download
        if (config.hero.resume_url) {
            const resumeBtn = document.getElementById('hero-resume-btn');
            resumeBtn.href = config.hero.resume_url;
            resumeBtn.download = true;
        } else {
            document.getElementById('hero-resume-btn').remove();
        }
    }

    // ============= SOBRE SECTION =============
    if (config.sobre) {
        document.getElementById('sobre-titulo').textContent = config.sobre.titulo;
        document.getElementById('sobre-conteudo').textContent = config.sobre.conteudo;
    }

    // ============= CERTIFICAÇÕES =============
    if (config.certificacoes) {
        const certificacoesContainer = document.getElementById('certificacoes-container');
        certificacoesContainer.innerHTML = config.certificacoes.map(cert => `
            <div class="certificacao-card">
                <div class="certificacao-logo">
                    <img src="assets/certificacoes/${cert.logo}" alt="${cert.empresa}">
                </div>
                <div class="certificacao-info">
                    <h3 class="certificacao-titulo">${cert.titulo}</h3>
                    <p class="certificacao-empresa">${cert.empresa}</p>
                    <a href="${cert.link}" class="certificacao-link" target="_blank" rel="noopener">
                        Ver Credencial
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        `).join('');
    }

    // ============= PROJETOS =============
    if (config.projetos) {
        const projetosContainer = document.getElementById('projetos-container');
        projetosContainer.innerHTML = config.projetos.map(projeto => `
            <div class="projeto-card">
                <div class="projeto-imagem-container">
                    <img src="${projeto.imagem}" alt="${projeto.titulo}">
                </div>
                <div class="projeto-conteudo">
                    <h3>${projeto.titulo}</h3>
                    <p>${projeto.descricao}</p>
                    <div class="tecnologias">
                        ${projeto.tecnologias.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    <div class="projeto-links">
                        ${projeto.repo_url ? `
                            <a href="${projeto.repo_url}" class="btn btn-repo" target="_blank" rel="noopener">
                                <i class="fab fa-github"></i> Repositório
                            </a>
                        ` : ''}
                        
                        ${projeto.project_url ? `
                            <a href="${projeto.project_url}" class="btn btn-project" target="_blank" rel="noopener">
                                <i class="fas fa-external-link-alt"></i> Ver Projeto
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ============= HABILIDADES =============
    if (config.habilidades) {
        const habilidadesContainer = document.getElementById('habilidades-container');
        habilidadesContainer.innerHTML = config.habilidades.map(habilidade => `
            <div class="habilidade">
                <i class="${habilidade.icone}"></i>
                <h3>${habilidade.nome}</h3>
            </div>
        `).join('');
    }

    // ============= CONTATO =============
    if (config.contato) {
        const contatoContainer = document.getElementById('contato-container');
        contatoContainer.innerHTML = config.contato.map(contato => `
            <div class="contato-item">
                <i class="${contato.icone}"></i>
                <a href="${contato.url}" target="_blank" rel="noopener">${contato.tipo}</a>
            </div>
        `).join('');
    }

    // ============= SMOOTH SCROLL =============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}