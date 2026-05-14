import { getAffiliate } from "../config/affiliates";

export default function HeroScreen({ affiliateCode, onStart }) {
  const affiliate = getAffiliate(affiliateCode);

  return (
    <div className="hero-screen">
      {/* Imagem do topo — rola junto com a página e some no scroll */}
      <div className="hero-image-wrap">
        <picture>
          <source media="(min-width: 768px)" srcSet="/hero/hero-desk.png" />
          <img
            src="/hero/hero-mobile.png"
            alt="Bolão da Convocação 2026"
            className="hero-image"
          />
        </picture>

        {/* Overlay gradient sobre a parte inferior da imagem — fade pro bg */}
        <div className="hero-image-overlay" aria-hidden />

        {/* CTA posicionado na parte inferior da imagem */}
        <div className="hero-cta-overlay">
          {affiliate && affiliate.name !== "TBD" && (
            <div className="hero-affiliate-chip">
              🎯 Convite de <strong>{affiliate.name}</strong>
            </div>
          )}

          <p className="hero-cta-text">
            Quem mais acertar a convocação leva <strong>R$ 1.000 no PIX</strong>.
          </p>

          <button className="btn-primary btn-hero" onClick={onStart}>
            MONTAR MINHA ESCALAÇÃO →
          </button>

          <div className="hero-prize-tag">
            💰 <strong>R$ 1.000 no PIX</strong> direto pra quem mais acertar
          </div>
        </div>
      </div>

      {/* Conteúdo abaixo da imagem — flow normal, escorre depois dela */}
      <div className="hero-body">
        <div className="hero-prize-card">
          <div className="hero-prize-label">PRÊMIO</div>
          <div className="hero-prize-value">R$ 1.000 no PIX</div>
          <div className="hero-prize-sub">Pagamento direto pro vencedor após a convocação oficial · Inscrições até domingo 23h59</div>
        </div>

        <div className="hero-howto">
          <h3 className="hero-howto-title">COMO FUNCIONA</h3>
          <div className="hero-step">
            <div className="hero-step-num">1</div>
            <div className="hero-step-text">
              <strong>Monte sua escalação</strong>
              <span>Escolhe 23 jogadores dos 52 da pré-lista da CBF</span>
            </div>
          </div>
          <div className="hero-step">
            <div className="hero-step-num">2</div>
            <div className="hero-step-text">
              <strong>Cadastra numa casa parceira</strong>
              <span>Pelo link oficial do Arena pra validar tua participação</span>
            </div>
          </div>
          <div className="hero-step">
            <div className="hero-step-num">3</div>
            <div className="hero-step-text">
              <strong>Manda print do depósito (a partir de R$50)</strong>
              <span>Pra confirmar que tua conta é nova e tu tá no jogo</span>
            </div>
          </div>
          <div className="hero-step">
            <div className="hero-step-num">4</div>
            <div className="hero-step-text">
              <strong>Entra na Comunidade do Mateus</strong>
              <span>Grupo do WhatsApp com tips diárias até o fim da Copa</span>
            </div>
          </div>
        </div>

        <div className="hero-criteria">
          <h3 className="hero-criteria-title">COMO É A PONTUAÇÃO</h3>
          <p>
            Você ganha <strong>1 ponto</strong> por cada jogador da sua escalação
            que o Ancelotti convocar de verdade. Quem fizer mais pontos vence.
            Em caso de empate, sorteio ao vivo no canal do Mateus na quarta.
          </p>
        </div>

        <button className="btn-primary btn-hero" onClick={onStart}>
          BORA MONTAR →
        </button>

        <p className="hero-compliance">
          +18 · Jogo responsável · Apoio: 0800 026 1818<br />
          Promoção sem vínculo com a CBF ou Seleção Brasileira
        </p>
      </div>
    </div>
  );
}
