// Afiliados do Arena que divulgam o Bolão da Convocação
// URL com código: bolaoconvocacao.duplaaposta.com/?ref=CODIGO
// URL sem código: usa DEFAULT (institucional Dupla)
// Links das casas são por afiliado → ver src/config/houses.js (matriz affiliateLinks)

export const AFFILIATES = {
  MATEUS: {
    name: "Mateus",
    nicho: "Futebol",
    whatsappUrl: "", // TODO: preencher
    instagram: "",   // TODO: preencher
  },
  BARBA: {
    name: "El Barba",
    nicho: "NBA",
    whatsappUrl: "",
    instagram: "",
  },
  ZZ: {
    name: "ZZ",
    nicho: "FIFA",
    whatsappUrl: "",
    instagram: "",
  },
  RAYO: {
    name: "Rayo",
    nicho: "Ao vivo",
    whatsappUrl: "",
    instagram: "",
  },
  RENNAN: {
    name: "Rennan",
    nicho: "RACE 3",
    whatsappUrl: "",
    instagram: "",
  },
  // TODO: definir 6º afiliado
  SEXTO: {
    name: "TBD",
    nicho: "",
    whatsappUrl: "",
    instagram: "",
  },
};

const AFFILIATE_CODES = Object.keys(AFFILIATES);
const LS_KEY = "bolao_affiliate";
export const DEFAULT_AFFILIATE = "DEFAULT"; // institucional Dupla — fallback

export function getAffiliateCode() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("ref")?.toUpperCase();

  // 1. Veio com ?ref= válido → usa e salva
  if (fromUrl && AFFILIATES[fromUrl]) {
    localStorage.setItem(LS_KEY, fromUrl);
    return fromUrl;
  }

  // 2. Já tem sessão salva → mantém
  const saved = localStorage.getItem(LS_KEY);
  if (saved && AFFILIATES[saved]) return saved;

  // 3. Tráfego sem atribuição → DEFAULT (Dupla institucional)
  //    NÃO sorteia aleatório porque mata atribuição limpa por afiliado
  return DEFAULT_AFFILIATE;
}

export function getAffiliate(code) {
  return AFFILIATES[code] || null;
}
