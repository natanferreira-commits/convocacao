import { useState } from "react";
import { supabase } from "../lib/supabase";
import { AFFILIATES as VENDORS } from "../config/affiliates";
import { HOUSES } from "../config/houses";

// NOTA: AdminScreen está sendo adaptado em fases.
// Esta versão ainda usa a estrutura de dashboard do bolão antigo
// (apenas renomeada vendor → affiliate pra não quebrar build).
// Adaptação completa pra aprovação de prints vem na próxima iteração.

const ADMIN_PASSWORD = "arena2026"; // troque antes de subir

export default function AdminScreen() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // all | vendorCode

  function login(e) {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) { setAuthed(true); loadData(); }
    else { setPwdError(true); setTimeout(() => setPwdError(false), 2000); }
  }

  async function loadData() {
    setLoading(true);
    try {
      if (!supabase) { setData(MOCK_DATA); return; }
      const { data: rows } = await supabase
        .from("participants")
        .select("*")
        .order("created_at", { ascending: false });
      setData(rows || []);
    } finally {
      setLoading(false);
    }
  }

  // Stats por vendedor
  const vendorStats = Object.entries(VENDORS).map(([code, vendor]) => {
    const leads = data.filter(d => d.vendor_code === code);
    const referrals = data.filter(d => {
      // conta convites de leads desse vendedor
      const vendorLeadIds = leads.map(l => l.id);
      return d.referred_by && vendorLeadIds.includes(d.referred_by);
    });
    const houses = {};
    leads.forEach(l => { houses[l.house] = (houses[l.house] || 0) + 1; });
    const topHouse = Object.entries(houses).sort((a,b) => b[1]-a[1])[0];
    return { code, vendor, leads: leads.length, referrals: referrals.length, topHouse };
  });

  const totalLeads = data.length;
  const totalReferrals = data.filter(d => d.referred_by).length;

  const filteredData = filter === "all" ? data : data.filter(d => d.vendor_code === filter);

  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <h2>🔒 Admin</h2>
          <p>Acesso restrito</p>
          <form onSubmit={login}>
            <input
              type="password"
              placeholder="Senha"
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              className={pwdError ? "input-error" : ""}
              autoFocus
            />
            {pwdError && <span className="error">Senha incorreta</span>}
            <button type="submit" className="btn-primary" style={{marginTop: 12}}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-screen">
      <div className="admin-header">
        <h1>📊 Dashboard</h1>
        <button className="btn-ghost-sm" onClick={loadData}>↻ Atualizar</button>
      </div>

      {/* KPIs globais */}
      <div className="kpi-row">
        <div className="kpi-card">
          <span className="kpi-num">{totalLeads}</span>
          <span className="kpi-label">Total de leads</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-num yellow">{totalReferrals}</span>
          <span className="kpi-label">Via convite</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-num green">
            {totalLeads ? Math.round((totalReferrals / totalLeads) * 100) : 0}%
          </span>
          <span className="kpi-label">Taxa convite</span>
        </div>
      </div>

      {/* Cards por vendedor */}
      <h2 className="admin-section-title">Vendedores</h2>
      <div className="vendor-cards">
        {vendorStats.map(vs => (
          <div
            key={vs.code}
            className={`vendor-card ${filter === vs.code ? "selected" : ""}`}
            onClick={() => setFilter(filter === vs.code ? "all" : vs.code)}
          >
            <div className="vendor-card-top">
              <span className="vendor-name">{vs.vendor.name}</span>
              <span className="vendor-code-badge">{vs.code}</span>
            </div>
            <div className="vendor-card-stats">
              <div className="vendor-stat">
                <span className="vendor-stat-num">{vs.leads}</span>
                <span className="vendor-stat-label">leads</span>
              </div>
              <div className="vendor-stat">
                <span className="vendor-stat-num yellow">{vs.referrals}</span>
                <span className="vendor-stat-label">convites</span>
              </div>
            </div>
            {vs.topHouse && (
              <div className="vendor-top-house">
                Casa top: <strong>{HOUSES.find(h => h.id === vs.topHouse[0])?.name || vs.topHouse[0]}</strong>
                <span> ({vs.topHouse[1]}x)</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tabela de leads */}
      <div className="admin-table-header">
        <h2 className="admin-section-title" style={{marginBottom:0}}>
          Leads {filter !== "all" ? `— ${VENDORS[filter]?.name}` : ""}
          <span className="leads-count"> ({filteredData.length})</span>
        </h2>
        {filter !== "all" && (
          <button className="btn-ghost-sm" onClick={() => setFilter("all")}>Ver todos</button>
        )}
      </div>

      {loading ? (
        <div className="admin-loading">Carregando...</div>
      ) : (
        <div className="leads-table-wrap">
          <table className="leads-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>WhatsApp</th>
                <th>Casa</th>
                <th>Vendedor</th>
                <th>Convite?</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr><td colSpan={6} className="table-empty">Nenhum lead ainda</td></tr>
              ) : filteredData.map(row => (
                <tr key={row.id}>
                  <td className="td-name">{row.name}</td>
                  <td className="td-dim">{row.whatsapp}</td>
                  <td><span className="house-tag">{HOUSES.find(h => h.id === row.house)?.name || row.house}</span></td>
                  <td className="td-dim">{VENDORS[row.vendor_code]?.name || row.vendor_code}</td>
                  <td>{row.referred_by ? <span className="referral-tag">✓ convite</span> : <span className="td-dim">—</span>}</td>
                  <td className="td-dim">{row.created_at ? new Date(row.created_at).toLocaleDateString("pt-BR") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Dados mock para quando Supabase não estiver configurado
const MOCK_DATA = [
  { id: "1", name: "João Silva", whatsapp: "(11) 99999-0001", house: "betmgm", vendor_code: "A7K3X", referred_by: null, created_at: new Date().toISOString() },
  { id: "2", name: "Maria Souza", whatsapp: "(21) 98888-0002", house: "superbet", vendor_code: "B2M8P", referred_by: null, created_at: new Date().toISOString() },
  { id: "3", name: "Pedro Costa", whatsapp: "(31) 97777-0003", house: "stake", vendor_code: "A7K3X", referred_by: "1", created_at: new Date().toISOString() },
  { id: "4", name: "Ana Lima", whatsapp: "(41) 96666-0004", house: "novibet", vendor_code: "C9R1T", referred_by: null, created_at: new Date().toISOString() },
  { id: "5", name: "Lucas Ferr", whatsapp: "(51) 95555-0005", house: "betmgm", vendor_code: "A7K3X", referred_by: "3", created_at: new Date().toISOString() },
];
