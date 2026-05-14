// Casas parceiras do Bolão da Convocação
// Cada casa tem links de afiliado por afiliado Arena (matriz affiliate × casa)
// Se um afiliado não tiver link específico, cai no DEFAULT (institucional Dupla)
//
// MVP: começamos com 3 casas pra reduzir complexidade de coleta de links
// (6 afiliados × 3 casas = 18 links pra coletar até quinta)

export const HOUSES = [
  {
    id: "stake",
    name: "Stake",
    logo: "/logos/stake.png",
    comprovante: "/comprovantes/stake.png",
    affiliateLinks: {
      // TODO: coletar links específicos de cada afiliado até quinta
      MATEUS:  "", // TODO
      BARBA:   "", // TODO
      ZZ:      "", // TODO
      RAYO:    "", // TODO
      RENNAN:  "", // TODO
      SEXTO:   "", // TODO
      DEFAULT: "https://media1.stakeaffiliates-br.com/redirect.aspx?pid=17663&bid=1484",
    },
  },
  {
    id: "betmgm",
    name: "BetMGM",
    logo: "/logos/betmgm.png",
    comprovante: "/comprovantes/betmgm.jpeg",
    affiliateLinks: {
      MATEUS:  "",
      BARBA:   "",
      ZZ:      "",
      RAYO:    "",
      RENNAN:  "",
      SEXTO:   "",
      DEFAULT: "https://ntrfr.betmgm.bet.br/redirect.aspx?pid=12401&bid=1480&lpid=15",
    },
  },
  {
    id: "superbet",
    name: "Superbet",
    logo: "/logos/superbet.png",
    comprovante: "/comprovantes/superbet.jpeg",
    affiliateLinks: {
      MATEUS:  "",
      BARBA:   "",
      ZZ:      "",
      RAYO:    "",
      RENNAN:  "",
      SEXTO:   "",
      DEFAULT: "https://wlsuperbet.adsrv.eacdn.com/C.ashx?btag=a_37967b_431c_&affid=869&siteid=37967&adid=431&c=",
    },
  },
  // Casas extras — adicionar se sobrar tempo na coleta de links
  // {
  //   id: "esportivabet", name: "EsportivaBet", logo: "/logos/esportivabet.png",
  //   comprovante: "/comprovantes/esportivabet.png",
  //   affiliateLinks: { ..., DEFAULT: "https://go.aff.esportiva.bet/0u9rqmt2?utm_campaign=Bolaodupla" },
  // },
  // {
  //   id: "novibet", name: "Novibet", logo: "/logos/novibet.webp",
  //   comprovante: "/comprovantes/novibet.jpeg",
  //   affiliateLinks: { ..., DEFAULT: "https://rt.novibet.partners/o/ioeGKO?site_id=1024419" },
  // },
  // {
  //   id: "sportingbet", name: "Sportingbet", logo: "/logos/sportingbet.png",
  //   comprovante: "/comprovantes/sportingbet.jpeg",
  //   affiliateLinks: { ..., DEFAULT: "https://brsportingbet.net/registro1960" },
  // },
];

// Retorna o link de afiliado da casa pra um afiliado específico
// Se não tiver link específico (string vazia ou ausente), cai no DEFAULT
export function getHouseLink(houseId, affiliateCode) {
  const house = HOUSES.find(h => h.id === houseId);
  if (!house) return null;
  const link = house.affiliateLinks?.[affiliateCode];
  return link && link.length > 0 ? link : house.affiliateLinks?.DEFAULT;
}

export function getHouse(houseId) {
  return HOUSES.find(h => h.id === houseId) || null;
}
