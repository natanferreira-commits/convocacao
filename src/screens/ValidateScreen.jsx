import { useState } from "react";
import { HOUSES, getHouseLink } from "../config/houses";

export default function ValidateScreen({ participant, affiliateCode, entryId, onNext, onHouseSelected }) {
  const [activeHouse, setActiveHouse] = useState(null);
  const [clicked, setClicked] = useState(false);

  const affiliateLink = activeHouse ? getHouseLink(activeHouse.id, affiliateCode) : null;

  function selectHouse(house) {
    setActiveHouse(house);
    setClicked(false);
    onHouseSelected?.(house.id);
    window.gtag?.('event', 'casa_escolhida', { casa: house.name, affiliate: affiliateCode });
  }

  function handleAffiliateClick() {
    window.gtag?.('event', 'click_afiliado', {
      casa: activeHouse?.name,
      affiliate: affiliateCode,
      entry_id: entryId,
    });
    setClicked(true);
  }

  return (
    <div className="screen validate-screen">
      <div className="validate-header">
        <div className="validate-check">✓</div>
        <h2 className="validate-title">Escalação salva!</h2>
        <p className="validate-desc">
          <strong>{participant?.name?.split(' ')[0] || "Show"}</strong>, agora falta validar tua participação.
          Pra isso, você precisa criar conta numa casa parceira pelo nosso link.
        </p>
      </div>

      {!activeHouse ? (
        <div className="card">
          <h3 className="card-title">Escolhe uma casa parceira</h3>
          <p className="card-sub">
            Selecione <strong>uma casa onde você ainda NÃO tem conta</strong>.
            A promoção é exclusiva pra novos cadastros.
          </p>

          <div className="house-choice-list">
            {HOUSES.map(house => (
              <button
                key={house.id}
                type="button"
                className="house-choice-card"
                onClick={() => selectHouse(house)}
              >
                <img
                  src={house.logo}
                  alt={house.name}
                  className="house-choice-logo"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <div className="house-choice-info">
                  <span className="house-choice-name">{house.name}</span>
                  <span className="house-choice-cta">Cadastrar aqui →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="validate-cta-card">
          <div className="validate-step-label">PASSO 1 DE 2 · Cadastro</div>

          <div className="validate-house-pick">
            <img
              src={activeHouse.logo}
              alt={activeHouse.name}
              className="validate-house-logo"
            />
            <div>
              <h3 className="validate-house-name">{activeHouse.name}</h3>
              <button
                className="validate-house-change"
                type="button"
                onClick={() => { setActiveHouse(null); setClicked(false); }}
              >
                Trocar casa
              </button>
            </div>
          </div>

          <div className="validate-instructions">
            <h4>Como fazer:</h4>
            <ol>
              <li>Clica no botão abaixo — vai abrir o site da <strong>{activeHouse.name}</strong></li>
              <li>Cria tua conta normal (e-mail, senha, dados)</li>
              <li>Faz teu primeiro depósito a partir de <strong>R$50</strong></li>
              <li>Tira print da tela de depósito confirmado</li>
              <li>Volta aqui e clica em "Já criei minha conta"</li>
            </ol>
          </div>

          <a
            href={affiliateLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-affiliate-big"
            onClick={handleAffiliateClick}
          >
            ABRIR {activeHouse.name.toUpperCase()} →
          </a>

          {clicked && (
            <button className="btn-confirm-created" onClick={onNext}>
              ✅ JÁ CRIEI MINHA CONTA — PRÓXIMO PASSO →
            </button>
          )}

          {!clicked && (
            <p className="validate-hint">
              👆 Depois de clicar no botão acima, volta aqui pra continuar.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
