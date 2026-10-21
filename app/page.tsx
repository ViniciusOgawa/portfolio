import { Hero } from "./hero";
import { LayerHold } from "./layer-hold";
import { ContactForm } from "./contact-form";
import { Motion } from "./motion";

const PROJECTS = [
  {
    name: "Pulso",
    what: "Painel de vendas em tempo real para lojas pequenas.",
    problem: "O dono da loja só via as vendas do dia no fim da noite.",
    solution: "Um painel que atualiza sozinho e abre rápido até no celular.",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    image: "/assets/proj-pulso.jpg",
  },
  {
    name: "Agenda Clara",
    what: "Agendamento online para clínicas.",
    problem: "Pacientes ligavam três vezes para marcar uma consulta.",
    solution: "Uma agenda que mostra só os horários livres e confirma na hora.",
    stack: ["React", "Django", "PostgreSQL"],
    image: "/assets/proj-agenda.jpg",
  },
  {
    name: "Trilha",
    what: "App de estudos com revisão espaçada.",
    problem: "Quem estuda esquece metade do conteúdo em uma semana.",
    solution: "Revisões que aparecem no dia certo, sem a pessoa precisar lembrar.",
    stack: ["React", "TypeScript", "Express", "TypeORM"],
    image: "/assets/proj-trilha.jpg",
  },
  {
    name: "Vitrine UI",
    what: "Biblioteca de componentes acessíveis.",
    problem: "Cada tela do time tinha um botão diferente.",
    solution: "Um conjunto de componentes prontos, testados e iguais em todo lugar.",
    stack: ["React", "TypeScript", "CSS3"],
    image: "/assets/proj-vitrine.jpg",
  },
];

const STEPS = [
  {
    title: "Entendo o problema.",
    text: "Antes de abrir o editor, eu pergunto quem vai usar e o que precisa funcionar.",
  },
  {
    title: "Escolho o caminho mais simples.",
    text: "Menos peças, menos coisas para quebrar.",
  },
  {
    title: "Entrego e cuido.",
    text: "Código revisado, testado e fácil para o próximo dev entender.",
  },
];

const STACK = [
  { group: "Front-end", items: ["JavaScript (ES6)", "React", "TypeScript", "HTML5", "CSS3"] },
  { group: "Back-end", items: ["Node.js", "Express", "Python", "Django", "APIs RESTful"] },
  { group: "Dados", items: ["SQL", "PostgreSQL", "TypeORM", "ORM"] },
  { group: "Rotina", items: ["GitHub", "Times ágeis"] },
];

const FAQ = [
  {
    q: "Você trabalha só com front-end?",
    a: "Meu foco é front-end, mas eu também construo APIs em Node.js e Django e modelo bancos PostgreSQL. Consigo conversar com o time de back-end na mesma língua.",
  },
  {
    q: "Como você trabalha em equipe?",
    a: "Bem. Já trabalho com metodologias ágeis, revisão de código e GitHub no dia a dia.",
  },
  {
    q: "Seu código é fácil de manter?",
    a: "Essa é a meta de todo projeto. Nomes claros, componentes pequenos e nada de esperteza que só eu entendo.",
  },
  {
    q: "Onde vejo seu código?",
    a: "No meu GitHub, github.com/ViniciusOgawa.",
  },
];

function LayerLine() {
  return (
    <svg className="layer-line" data-reveal viewBox="0 0 1200 8" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="4" x2="1200" y2="4" pathLength={1} />
      <circle cx="600" cy="4" r="3" />
    </svg>
  );
}

function StepIcon() {
  return (
    <svg className="step-icon" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M8 13h24M8 20h24" pathLength={1} />
      <path className="step-icon-low" d="M8 27h24" pathLength={1} />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Pular para o conteúdo
      </a>
      <div className="environment" aria-hidden="true">
        <div className="env-glow" />
        <div className="env-dust" />
      </div>

      <nav className="nav" aria-label="Principal">
        <a className="nav-brand" href="#">
          <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
            <path d="M6 10h20M6 16h20" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M6 22h20" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <span>Vinicius Ogawa</span>
        </a>
        <div className="nav-links">
          <a href="#projetos">Projetos</a>
          <a href="#stack">Stack</a>
          <a href="#sobre">Sobre</a>
          <a className="nav-cta" href="#contato">
            Falar comigo
          </a>
        </div>
      </nav>

      <Hero />

      <main id="main" tabIndex={-1}>
        <section className="section projects" id="projetos" data-live>
          <header className="section-head" data-reveal>
            <p className="kicker">Projetos</p>
            <h2 className="section-title">Coisas que eu construí.</h2>
            <p className="note">Projetos de exemplo por enquanto. Os reais chegam em breve.</p>
          </header>
          <div className="project-list">
            {PROJECTS.map((p, i) => (
              <article className={`project${i % 2 ? " project--flip" : ""}`} data-reveal key={p.name}>
                <div className="project-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" loading="lazy" width={1920} height={1080} />
                  <span className="project-num">0{i + 1}</span>
                </div>
                <div className="project-body">
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-what">{p.what}</p>
                  <dl className="project-ps">
                    <div>
                      <dt>Problema</dt>
                      <dd>{p.problem}</dd>
                    </div>
                    <div>
                      <dt>Solução</dt>
                      <dd>{p.solution}</dd>
                    </div>
                  </dl>
                  <ul className="tags" aria-label="Tecnologias">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <div className="project-links">
                    <span className="soon" aria-disabled="true">
                      Ver demo <small>em breve</small>
                    </span>
                    <span className="soon" aria-disabled="true">
                      Código <small>em breve</small>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <LayerLine />

        <section className="section request" id="ponta-a-ponta" data-live>
          <header className="section-head section-head--center" data-reveal>
            <p className="kicker">Ponta a ponta</p>
            <h2 className="section-title">Segure para descer pelas camadas.</h2>
          </header>
          <div data-reveal>
            <LayerHold />
          </div>
        </section>

        <LayerLine />

        <section className="section process" data-live>
          <header className="section-head process-head" data-reveal>
            <p className="kicker">Processo</p>
            <h2 className="section-title">Como eu trabalho.</h2>
          </header>
          <ol className="timeline" data-reveal>
            {STEPS.map((s, i) => (
              <li className="step" key={s.title}>
                <StepIcon />
                <span className="step-num">0{i + 1}</span>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-text">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section stack" id="stack" data-live>
          <header className="section-head" data-reveal>
            <p className="kicker">Stack</p>
            <h2 className="section-title">Ferramentas do dia a dia.</h2>
          </header>
          <div className="stack-grid" data-reveal>
            {STACK.map((g) => (
              <div className="stack-col" key={g.group}>
                <h3 className="stack-group">{g.group}</h3>
                <ul>
                  {g.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <LayerLine />

        <section className="section about" id="sobre" data-live>
          <div className="about-media" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/hero-ending.jpg" alt="" loading="lazy" width={1920} height={1080} />
          </div>
          <div className="about-body" data-reveal>
            <p className="kicker">Sobre</p>
            <h2 className="section-title">Programo desde o ensino médio.</h2>
            <p className="about-text">
              Foi essa curiosidade que me levou à Engenharia de Software. Hoje desenvolvo aplicações web de ponta a
              ponta: interfaces em React e TypeScript, APIs RESTful em Node.js ou Django e bancos de dados PostgreSQL.
              Gosto de transformar problemas em soluções simples, eficientes e fáceis de manter. Trabalho bem em times
              ágeis e estou sempre estudando para evoluir como desenvolvedor.
            </p>
          </div>
        </section>

        <section className="section faq" data-live>
          <header className="section-head" data-reveal>
            <p className="kicker">Perguntas</p>
            <h2 className="section-title">O que costumam me perguntar.</h2>
          </header>
          <div className="faq-list" data-reveal>
            {FAQ.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>
                  <span>{f.q}</span>
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 6l5 5 5-5" />
                  </svg>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section contact" id="contato" data-live>
          <div className="contact-intro" data-reveal>
            <p className="kicker">Contato</p>
            <h2 className="section-title contact-title">Vamos conversar?</h2>
            <p className="contact-sub">Tem uma vaga ou um projeto? Me manda uma mensagem.</p>
            <ul className="contact-links">
              <li>
                <span className="contact-label">Email</span>
                <a href="mailto:vini_ogawa@hotmail.com">vini_ogawa@hotmail.com</a>
              </li>
              <li>
                <span className="contact-label">GitHub</span>
                <a href="https://github.com/ViniciusOgawa" target="_blank" rel="noreferrer">
                  github.com/ViniciusOgawa
                </a>
              </li>
            </ul>
          </div>
          <div data-reveal>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Vinicius Ogawa, 2026.</p>
        <p className="footer-note">Projetos e imagens de exemplo, gerados por IA. Os reais chegam em breve.</p>
      </footer>

      <Motion />
    </>
  );
}
