// Persistência via Google Apps Script (mesma infra do repo original)
// IMPORTANTE: trocar SHEETS_URL pelo endpoint do Apps Script do Bolão da Convocação
//   (não pode reusar o do bolão antigo — schema é diferente)
//
// Status do funil (em ordem):
//   lineup_iniciada      → cara começou a montar a escalação
//   lineup_completa      → escolheu os 23 e confirmou
//   form_completo        → mandou nome+email+WA (cria entry no Sheets)
//   casa_escolhida       → selecionou casa parceira na tela de validate
//   casa_clicada         → clicou no link de afiliado da casa
//   print_enviado        → mandou print de depósito → aguardando_validacao
//   aprovado             → admin aprovou o print (libera grupo VIP)
//   rejeitado            → admin rejeitou (com motivo)

const SHEETS_URL = "https://script.google.com/macros/s/REPLACE_ME/exec";

async function postToSheets(payload) {
  // no-cors porque o Apps Script não devolve CORS headers — o dado chega mesmo assim
  await fetch(SHEETS_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// Cria a entrada inicial quando o cara passa do form
export async function saveEntry({ entryId, participant, lineup, affiliateCode, referredBy }) {
  return postToSheets({
    action: "create_entry",
    entry_id: entryId,
    created_at: new Date().toISOString(),
    affiliate_code: affiliateCode,
    referred_by: referredBy || "",
    name: participant.name,
    email: participant.email,
    whatsapp: participant.whatsapp,
    lineup: lineup, // array de player ids
    status: "form_completo",
  });
}

// Atualiza o status do participante (cada step do funil)
export async function updateEntryStatus({ entryId, status, extra = {} }) {
  return postToSheets({
    action: "update_status",
    entry_id: entryId,
    status,
    status_at: new Date().toISOString(),
    ...extra,
  });
}

// Marca que o cara enviou print (extra: casa escolhida + url do print)
export async function updateEntryProof({ entryId, proofUrl, houseChosen }) {
  return postToSheets({
    action: "update_proof",
    entry_id: entryId,
    proof_url: proofUrl,
    house_chosen: houseChosen,
    status: "print_enviado",
    status_at: new Date().toISOString(),
  });
}
