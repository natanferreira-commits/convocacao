import { getAffiliate } from "../config/affiliates";

export default function PendingScreen({ participant, affiliateCode, entryId }) {
  const affiliate = getAffiliate(affiliateCode);

  return (
    <div className="screen">
      <div className="pending-wrap">
        <div className="pending-icon">⏳</div>
        <h2>Tua participação tá em análise</h2>
        <p className="pending-sub">
          Em até <strong>6 horas</strong> a gente valida e libera teu acesso à Comunidade do Mateus no WhatsApp.
        </p>

        <div className="pending-card">
          <div className="pending-row">
            <span>ID da inscrição</span>
            <strong>{entryId}</strong>
          </div>
          <div className="pending-row">
            <span>Nome</span>
            <strong>{participant?.name}</strong>
          </div>
          <div className="pending-row">
            <span>WhatsApp</span>
            <strong>{participant?.whatsapp}</strong>
          </div>
        </div>

        <div className="pending-meanwhile">
          <h3>Enquanto isso...</h3>
          {affiliate && (
            <p>
              Segue o <strong>@{affiliate.name}</strong> no Instagram pra saber tudo sobre a convocação de segunda.
            </p>
          )}
          <p className="hint">
            Assim que o admin aprovar teu print, você recebe a chamada no WhatsApp com o link da comunidade.
          </p>
        </div>

        <p className="hero-compliance" style={{ marginTop: 32 }}>
          +18 · Jogo responsável · Apoio: 0800 026 1818
        </p>
      </div>
    </div>
  );
}
