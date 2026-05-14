// Pré-lista oficial de 52 nomes divulgada pela CBF pra Copa do Mundo 2026
// Usuário vai escolher 23 desses 52 (com mínimos por posição)
//
// Foto: /players/{id}.png — coletar do Wikimedia / Sofascore / Transfermarkt
// Fallback de foto: inicial + bg colorido (tratado no componente)

export const PLAYERS = {
  goalkeepers: [
    { id: "alisson",      name: "Alisson",      club: "Liverpool",          photo: "/players/alisson.png" },
    { id: "bento",        name: "Bento",        club: "Al-Nassr",           photo: "/players/bento.png" },
    { id: "ederson",      name: "Ederson",      club: "Fenerbahçe",         photo: "/players/ederson.png" },
    { id: "hugo-souza",   name: "Hugo Souza",   club: "Corinthians",        photo: "/players/hugo-souza.png" },
    { id: "john",         name: "John",         club: "Nottingham Forest",  photo: "/players/john.png" },
    { id: "weverton",     name: "Weverton",     club: "Grêmio",             photo: "/players/weverton.png" },
  ],

  defenders: [
    { id: "alex-sandro",         name: "Alex Sandro",         club: "Flamengo",         photo: "/players/alex-sandro.png" },
    { id: "alexsandro-ribeiro",  name: "Alexsandro Ribeiro",  club: "Lille",            photo: "/players/alexsandro-ribeiro.png" },
    { id: "bremer",              name: "Bremer",              club: "Juventus",         photo: "/players/bremer.png" },
    { id: "carlos-augusto",      name: "Carlos Augusto",      club: "Inter de Milão",   photo: "/players/carlos-augusto.png" },
    { id: "danilo",              name: "Danilo",              club: "Flamengo",         photo: "/players/danilo.png" },
    { id: "douglas-santos",      name: "Douglas Santos",      club: "Zenit",            photo: "/players/douglas-santos.png" },
    { id: "fabricio-bruno",      name: "Fabricio Bruno",      club: "Cruzeiro",         photo: "/players/fabricio-bruno.png" },
    { id: "gabriel-magalhaes",   name: "Gabriel Magalhães",   club: "Arsenal",          photo: "/players/gabriel-magalhaes.png" },
    { id: "ibanez",              name: "Ibañez",              club: "Al-Ahli",          photo: "/players/ibanez.png" },
    { id: "kaiki-bruno",         name: "Kaiki Bruno",         club: "Cruzeiro",         photo: "/players/kaiki-bruno.png" },
    { id: "leo-ortiz",           name: "Leo Ortiz",           club: "Flamengo",         photo: "/players/leo-ortiz.png" },
    { id: "leo-pereira",         name: "Leo Pereira",         club: "Flamengo",         photo: "/players/leo-pereira.png" },
    { id: "luciano-juba",        name: "Luciano Juba",        club: "Bahia",            photo: "/players/luciano-juba.png" },
    { id: "marquinhos",          name: "Marquinhos",          club: "PSG",              photo: "/players/marquinhos.png" },
    { id: "natan",               name: "Natan",               club: "Betis",            photo: "/players/natan.png" },
    { id: "paulo-henrique",      name: "Paulo Henrique",      club: "Vasco",            photo: "/players/paulo-henrique.png" },
    { id: "thiago-silva",        name: "Thiago Silva",        club: "Porto",            photo: "/players/thiago-silva.png" },
    { id: "vitinho",             name: "Vitinho",             club: "Botafogo",         photo: "/players/vitinho.png" },
    { id: "vitor-reis",          name: "Vitor Reis",          club: "Girona",           photo: "/players/vitor-reis.png" },
    { id: "wesley",              name: "Wesley",              club: "Roma",             photo: "/players/wesley.png" },
  ],

  midfielders: [
    { id: "andreas-pereira",  name: "Andreas Pereira",  club: "Palmeiras",         photo: "/players/andreas-pereira.png" },
    { id: "andrey-santos",    name: "Andrey Santos",    club: "Chelsea",           photo: "/players/andrey-santos.png" },
    { id: "bruno-guimaraes",  name: "Bruno Guimarães",  club: "Newcastle",         photo: "/players/bruno-guimaraes.png" },
    { id: "casemiro",         name: "Casemiro",         club: "Manchester United", photo: "/players/casemiro.png" },
    { id: "danilo-bota",      name: "Danilo",           club: "Botafogo",          photo: "/players/danilo-bota.png" },
    { id: "ederson-atalanta", name: "Ederson",          club: "Atalanta",          photo: "/players/ederson-atalanta.png" },
    { id: "fabinho",          name: "Fabinho",          club: "Al-Ittihad",        photo: "/players/fabinho.png" },
    { id: "gabriel-sara",     name: "Gabriel Sara",     club: "Galatasaray",       photo: "/players/gabriel-sara.png" },
    { id: "gerson",           name: "Gerson",           club: "Cruzeiro",          photo: "/players/gerson.png" },
    { id: "joao-gomes",       name: "João Gomes",       club: "Wolverhampton",     photo: "/players/joao-gomes.png" },
    { id: "lucas-paqueta",    name: "Lucas Paquetá",    club: "Flamengo",          photo: "/players/lucas-paqueta.png" },
    { id: "matheus-pereira",  name: "Matheus Pereira",  club: "Cruzeiro",          photo: "/players/matheus-pereira.png" },
  ],

  forwards: [
    { id: "antony",            name: "Antony",            club: "Betis",             photo: "/players/antony.png" },
    { id: "endrick",           name: "Endrick",           club: "Lyon",              photo: "/players/endrick.png" },
    { id: "gabriel-martinelli", name: "Gabriel Martinelli", club: "Arsenal",          photo: "/players/gabriel-martinelli.png" },
    { id: "gabriel-jesus",     name: "Gabriel Jesus",     club: "Arsenal",           photo: "/players/gabriel-jesus.png" },
    { id: "igor-jesus",        name: "Igor Jesus",        club: "Nottingham Forest", photo: "/players/igor-jesus.png" },
    { id: "igor-thiago",       name: "Igor Thiago",       club: "Brentford",         photo: "/players/igor-thiago.png" },
    { id: "joao-pedro",        name: "João Pedro",        club: "Chelsea",           photo: "/players/joao-pedro.png" },
    { id: "kaio-jorge",        name: "Kaio Jorge",        club: "Cruzeiro",          photo: "/players/kaio-jorge.png" },
    { id: "luiz-henrique",     name: "Luiz Henrique",     club: "Zenit",             photo: "/players/luiz-henrique.png" },
    { id: "matheus-cunha",     name: "Matheus Cunha",     club: "Manchester United", photo: "/players/matheus-cunha.png" },
    { id: "neymar",            name: "Neymar",            club: "Santos",            photo: "/players/neymar.png" },
    { id: "pedro",             name: "Pedro",             club: "Flamengo",          photo: "/players/pedro.png" },
    { id: "raphinha",          name: "Raphinha",          club: "Barcelona",         photo: "/players/raphinha.png" },
    { id: "rayan",             name: "Rayan",             club: "Bournemouth",       photo: "/players/rayan.png" },
    { id: "richarlison",       name: "Richarlison",       club: "Tottenham",         photo: "/players/richarlison.png" },
    { id: "samuel-lino",       name: "Samuel Lino",       club: "Flamengo",          photo: "/players/samuel-lino.png" },
    { id: "vini-jr",           name: "Vini Jr",           club: "Real Madrid",       photo: "/players/vini-jr.png" },
  ],
};

// Regras de seleção do bolão
export const SELECTION_RULES = {
  total: 23,
  minByPosition: {
    goalkeepers: 2,
    defenders:   6,
    midfielders: 4,
    forwards:    3,
  },
};

// Labels em PT-BR pras posições
export const POSITION_LABELS = {
  goalkeepers: "Goleiros",
  defenders:   "Defensores",
  midfielders: "Meio-campo",
  forwards:    "Atacantes",
};

// Lista plana de todos os 52 jogadores (útil pra busca por id e pontuação)
export const ALL_PLAYERS = [
  ...PLAYERS.goalkeepers,
  ...PLAYERS.defenders,
  ...PLAYERS.midfielders,
  ...PLAYERS.forwards,
];

export function getPlayer(id) {
  return ALL_PLAYERS.find(p => p.id === id) || null;
}

// Valida se uma seleção respeita o total e os mínimos por posição
export function validateLineup(selectedIds) {
  if (selectedIds.length !== SELECTION_RULES.total) {
    return { valid: false, reason: `Selecione exatamente ${SELECTION_RULES.total} jogadores` };
  }
  for (const [pos, min] of Object.entries(SELECTION_RULES.minByPosition)) {
    const count = PLAYERS[pos].filter(p => selectedIds.includes(p.id)).length;
    if (count < min) {
      return { valid: false, reason: `Selecione pelo menos ${min} ${POSITION_LABELS[pos].toLowerCase()}` };
    }
  }
  return { valid: true };
}
