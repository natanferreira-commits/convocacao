import { useState, useRef } from "react";
import { supabase } from "../lib/supabase";

const MAX_SIZE_MB = 5;
const ACCEPTED = ["image/jpeg", "image/jpg", "image/png"];

export default function UploadProofScreen({ entryId, affiliateCode, onUploaded }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  function handleFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) {
      setError("Manda só JPG ou PNG");
      return;
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Imagem maior que ${MAX_SIZE_MB}MB — comprime e tenta de novo`);
      return;
    }
    setError("");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      if (!supabase) {
        // sem supabase configurado: simula sucesso pra dev
        console.warn("[UploadProof] Supabase não configurado — modo dev, simulando upload");
        await new Promise(r => setTimeout(r, 800));
        onUploaded({ url: "mock://" + file.name });
        return;
      }

      const ext = file.name.split('.').pop();
      const path = `${entryId}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('bolao-convocacao-proofs')
        .upload(path, file, { contentType: file.type, upsert: false });

      if (upErr) throw upErr;

      const { data: pub } = supabase.storage
        .from('bolao-convocacao-proofs')
        .getPublicUrl(path);

      window.gtag?.('event', 'print_enviado', { entry_id: entryId, affiliate: affiliateCode });
      onUploaded({ url: pub?.publicUrl, path });
    } catch (err) {
      console.error(err);
      setError("Falha no envio — tenta de novo ou nos chama no WhatsApp");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="screen">
      <div className="upload-header">
        <h2>Envia o print do depósito</h2>
        <p>PASSO 2 DE 2 — Última etapa pra validar tua participação</p>
      </div>

      <div className="upload-card">
        <div className="upload-rules">
          <h3>📸 O que precisa estar no print:</h3>
          <ul>
            <li>Valor de depósito <strong>a partir de R$50</strong></li>
            <li>Nome da casa parceira visível</li>
            <li>Data e horário do depósito</li>
            <li>Tela inteira sem cortes (sem photoshop, a gente confere)</li>
          </ul>
        </div>

        {!preview ? (
          <button
            type="button"
            className="upload-dropzone"
            onClick={() => inputRef.current?.click()}
          >
            <div className="upload-icon">📎</div>
            <div className="upload-cta">Toque aqui pra escolher o print</div>
            <div className="upload-hint">JPG ou PNG · máx {MAX_SIZE_MB}MB</div>
          </button>
        ) : (
          <div className="upload-preview">
            <img src={preview} alt="Preview do print" />
            <button
              type="button"
              className="btn-ghost-sm"
              onClick={() => { setFile(null); setPreview(null); }}
              disabled={uploading}
            >
              Trocar imagem
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {error && <p className="error center">{error}</p>}

        <button
          className="btn-primary"
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? "Enviando..." : "Enviar print pra análise →"}
        </button>

        <p className="upload-sla">
          ⏱️ Validação em até <strong>6 horas</strong>. A gente te avisa no WhatsApp.
        </p>
      </div>
    </div>
  );
}
