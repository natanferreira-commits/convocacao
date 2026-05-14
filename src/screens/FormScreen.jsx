import { useState } from "react";

export default function FormScreen({ onSubmit, onBack }) {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Informa teu nome";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "E-mail inválido";
    if (!form.whatsapp.trim() || form.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "WhatsApp inválido";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    window.gtag?.('event', 'form_submitted');
    onSubmit(form);
  }

  function formatWhatsapp(val) {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits.length ? `(${digits}` : "";
    if (digits.length <= 7) return `(${digits.slice(0,2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
  }

  return (
    <div className="screen form-screen">
      <div className="form-header">
        <h2 className="form-title">Quase lá!</h2>
        <p className="form-desc">
          Antes de finalizar, precisamos dos teus dados pra <strong>te avisar quando a participação for validada</strong>.
          A gente vai te chamar no WhatsApp assim que aprovar teu print.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="card">
          <div className="field">
            <label>Nome completo</label>
            <input
              type="text"
              placeholder="Como te chamamos"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="field">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="field">
            <label>WhatsApp <span className="field-required">*</span></label>
            <input
              type="tel"
              placeholder="(00) 00000-0000"
              value={form.whatsapp}
              onChange={e => setForm({ ...form, whatsapp: formatWhatsapp(e.target.value) })}
            />
            {errors.whatsapp && <span className="error">{errors.whatsapp}</span>}
            <span className="hint">
              ⚠️ Tem que ser um WhatsApp ativo — é por aí que a gente libera o acesso à Comunidade do Mateus.
            </span>
          </div>
        </div>

        <div className="form-privacy">
          🔒 Teus dados só são usados pra validar a participação e te liberar na comunidade.
          Sem spam, sem venda de cadastro.
        </div>

        <div className="form-actions">
          <button type="button" className="btn-ghost" onClick={onBack}>← Voltar</button>
          <button type="submit" className="btn-primary">CONTINUAR →</button>
        </div>
      </form>
    </div>
  );
}
