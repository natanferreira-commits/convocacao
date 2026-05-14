import { useState, useMemo } from "react";
import { PLAYERS, SELECTION_RULES, POSITION_LABELS, validateLineup } from "../config/players";

const POSITIONS = ["goalkeepers", "defenders", "midfielders", "forwards"];

export default function LineupScreen({ onSubmit, onBack }) {
  const [selected, setSelected] = useState(new Set());
  const [activeTab, setActiveTab] = useState("goalkeepers");
  const [error, setError] = useState("");

  function togglePlayer(id) {
    setError("");
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= SELECTION_RULES.total) {
          setError(`Você já tem ${SELECTION_RULES.total} selecionados. Remove alguém antes.`);
          return prev;
        }
        next.add(id);
      }
      return next;
    });
  }

  const countByPos = useMemo(() => {
    const r = {};
    for (const pos of POSITIONS) {
      r[pos] = PLAYERS[pos].filter(p => selected.has(p.id)).length;
    }
    return r;
  }, [selected]);

  const total = selected.size;
  const canSubmit = validateLineup([...selected]).valid;
  const remaining = SELECTION_RULES.total - total;

  function handleSubmit() {
    const v = validateLineup([...selected]);
    if (!v.valid) {
      setError(v.reason);
      return;
    }
    window.gtag?.('event', 'lineup_confirmada', { total });
    onSubmit([...selected]);
  }

  return (
    <div className="screen lineup-screen">
      <div className="lineup-intro">
        <h2 className="lineup-title">Monta tua escalação</h2>
        <p className="lineup-desc">
          Escolhe <strong>23 jogadores</strong> dos 52 que a CBF divulgou na pré-lista.
          Você decide a distribuição entre as posições, respeitando os <strong>mínimos</strong>.
        </p>
      </div>

      {/* Counter sticky no topo */}
      <div className="lineup-counter">
        <div className="lineup-counter-bar">
          <div className="lineup-counter-fill" style={{ width: `${(total / 23) * 100}%` }} />
        </div>
        <div className="lineup-counter-info">
          <div className="lineup-counter-main">
            <span className="lineup-counter-num">{total}</span>
            <span className="lineup-counter-total">/ {SELECTION_RULES.total}</span>
          </div>
          <div className="lineup-counter-status">
            {canSubmit ? "✓ Pronto pra confirmar" : `Faltam ${remaining}`}
          </div>
        </div>
        <div className="lineup-counter-pos">
          {POSITIONS.map(pos => {
            const min = SELECTION_RULES.minByPosition[pos];
            const count = countByPos[pos];
            const ok = count >= min;
            return (
              <span key={pos} className={`lineup-pos-pill ${ok ? "ok" : ""}`}>
                {POSITION_LABELS[pos].slice(0, 3).toUpperCase()} {count}/{min}
              </span>
            );
          })}
        </div>
      </div>

      {/* Abas de posição */}
      <div className="lineup-tabs">
        {POSITIONS.map(pos => (
          <button
            key={pos}
            className={`lineup-tab ${activeTab === pos ? "active" : ""}`}
            onClick={() => setActiveTab(pos)}
          >
            <span className="lineup-tab-label">{POSITION_LABELS[pos]}</span>
            <span className="lineup-tab-count">
              {countByPos[pos]}/{SELECTION_RULES.minByPosition[pos]}+
            </span>
          </button>
        ))}
      </div>

      {/* Lista de cards horizontais da posição ativa */}
      <div className="lineup-list">
        {PLAYERS[activeTab].map(player => {
          const isSelected = selected.has(player.id);
          return (
            <button
              key={player.id}
              className={`player-row ${isSelected ? "selected" : ""}`}
              onClick={() => togglePlayer(player.id)}
              type="button"
            >
              <div className="player-photo-wrap">
                <img
                  src={player.photo}
                  alt={player.name}
                  className="player-photo"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="player-photo-fallback" style={{ display: 'none' }}>
                  {player.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
              </div>

              <div className="player-info">
                <span className="player-name">{player.name}</span>
                <span className="player-club">{player.club}</span>
              </div>

              <div className={`player-toggle ${isSelected ? "on" : ""}`}>
                {isSelected ? "✓" : "+"}
              </div>
            </button>
          );
        })}
      </div>

      {error && <p className="error center">{error}</p>}

      <div className="lineup-actions">
        <button className="btn-ghost" onClick={onBack}>← Voltar</button>
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          {canSubmit ? "CONFIRMAR ESCALAÇÃO →" : `FALTAM ${remaining}`}
        </button>
      </div>
    </div>
  );
}
