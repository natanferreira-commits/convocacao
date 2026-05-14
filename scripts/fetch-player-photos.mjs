// Baixa fotos dos 52 jogadores da pré-lista CBF
// Fonte: Sofascore (cutout PNG transparente)
// Usa curl via child_process porque o fetch nativo do Node leva 403 no Cloudflare
//
// Uso: node scripts/fetch-player-photos.mjs

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFile } from 'child_process';
import { promisify } from 'util';

const exec = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'players');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

const PLAYERS = {
  goalkeepers: [
    { id: "alisson",      name: "Alisson",      club: "Liverpool" },
    { id: "bento",        name: "Bento",        club: "Al-Nassr" },
    { id: "ederson",      name: "Ederson",      club: "Fenerbahce" },
    { id: "hugo-souza",   name: "Hugo Souza",   club: "Corinthians" },
    { id: "john",         name: "John",         club: "Nottingham" },
    { id: "weverton",     name: "Weverton",     club: "Gremio" },
  ],
  defenders: [
    { id: "alex-sandro",         name: "Alex Sandro",         club: "Flamengo" },
    { id: "alexsandro-ribeiro",  name: "Alexsandro",          club: "Lille" },
    { id: "bremer",              name: "Bremer",              club: "Juventus" },
    { id: "carlos-augusto",      name: "Carlos Augusto",      club: "Inter" },
    { id: "danilo",              name: "Danilo",              club: "Flamengo" },
    { id: "douglas-santos",      name: "Douglas Santos",      club: "Zenit" },
    { id: "fabricio-bruno",      name: "Fabricio Bruno",      club: "Cruzeiro" },
    { id: "gabriel-magalhaes",   name: "Gabriel Magalhaes",   club: "Arsenal" },
    { id: "ibanez",              name: "Ibanez",              club: "Al-Ahli" },
    { id: "kaiki-bruno",         name: "Kaiki",               club: "Cruzeiro" },
    { id: "leo-ortiz",           name: "Leo Ortiz",           club: "Flamengo" },
    { id: "leo-pereira",         name: "Leo Pereira",         club: "Flamengo" },
    { id: "luciano-juba",        name: "Luciano Juba",        club: "Bahia" },
    { id: "marquinhos",          name: "Marquinhos",          club: "PSG" },
    { id: "natan",               name: "Natan",               club: "Betis" },
    { id: "paulo-henrique",      name: "Paulo Henrique",      club: "Vasco" },
    { id: "thiago-silva",        name: "Thiago Silva",        club: "Porto" },
    { id: "vitinho",             name: "Vitinho",             club: "Botafogo" },
    { id: "vitor-reis",          name: "Vitor Reis",          club: "Girona" },
    { id: "wesley",              name: "Wesley",              club: "Roma" },
  ],
  midfielders: [
    { id: "andreas-pereira",  name: "Andreas Pereira",  club: "Palmeiras" },
    { id: "andrey-santos",    name: "Andrey Santos",    club: "Chelsea" },
    { id: "bruno-guimaraes",  name: "Bruno Guimaraes",  club: "Newcastle" },
    { id: "casemiro",         name: "Casemiro",         club: "Manchester United" },
    { id: "danilo-bota",      name: "Danilo",           club: "Botafogo" },
    { id: "ederson-atalanta", name: "Ederson",          club: "Atalanta" },
    { id: "fabinho",          name: "Fabinho",          club: "Al-Ittihad" },
    { id: "gabriel-sara",     name: "Gabriel Sara",     club: "Galatasaray" },
    { id: "gerson",           name: "Gerson",           club: "Cruzeiro" },
    { id: "joao-gomes",       name: "Joao Gomes",       club: "Wolverhampton" },
    { id: "lucas-paqueta",    name: "Lucas Paqueta",    club: "Flamengo" },
    { id: "matheus-pereira",  name: "Matheus Pereira",  club: "Cruzeiro" },
  ],
  forwards: [
    { id: "antony",             name: "Antony",             club: "Betis" },
    { id: "endrick",            name: "Endrick",            club: "Lyon" },
    { id: "gabriel-martinelli", name: "Gabriel Martinelli", club: "Arsenal" },
    { id: "gabriel-jesus",      name: "Gabriel Jesus",      club: "Arsenal" },
    { id: "igor-jesus",         name: "Igor Jesus",         club: "Nottingham" },
    { id: "igor-thiago",        name: "Igor Thiago",        club: "Brentford" },
    { id: "joao-pedro",         name: "Joao Pedro",         club: "Chelsea" },
    { id: "kaio-jorge",         name: "Kaio Jorge",         club: "Cruzeiro" },
    { id: "luiz-henrique",      name: "Luiz Henrique",      club: "Zenit" },
    { id: "matheus-cunha",      name: "Matheus Cunha",      club: "Manchester United" },
    { id: "neymar",             name: "Neymar",             club: "Santos" },
    { id: "pedro",              name: "Pedro",              club: "Flamengo" },
    { id: "raphinha",           name: "Raphinha",           club: "Barcelona" },
    { id: "rayan",              name: "Rayan",              club: "Bournemouth" },
    { id: "richarlison",        name: "Richarlison",        club: "Tottenham" },
    { id: "samuel-lino",        name: "Samuel Lino",        club: "Flamengo" },
    { id: "vini-jr",            name: "Vinicius Junior",    club: "Real Madrid" },
  ],
};

const ALL_PLAYERS = [
  ...PLAYERS.goalkeepers,
  ...PLAYERS.defenders,
  ...PLAYERS.midfielders,
  ...PLAYERS.forwards,
];

function norm(s) {
  return (s || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Curl get → JSON
async function curlJson(url) {
  const { stdout } = await exec('curl', [
    '-s', '--max-time', '15',
    '-A', UA,
    '-H', 'Accept: application/json',
    '-H', 'Referer: https://www.sofascore.com/',
    url,
  ], { maxBuffer: 5 * 1024 * 1024 });
  try {
    return JSON.parse(stdout);
  } catch {
    return null;
  }
}

// Curl get → binário (salvo direto em arquivo)
async function curlBin(url, dest) {
  await exec('curl', [
    '-s', '-f', '--max-time', '20',
    '-A', UA,
    '-H', 'Referer: https://www.sofascore.com/',
    '-o', dest,
    url,
  ]);
  const stat = await fs.stat(dest);
  return stat.size;
}

async function searchPlayers(query) {
  const url = `https://api.sofascore.com/api/v1/search/players/${encodeURIComponent(query)}`;
  const data = await curlJson(url);
  return data?.players || [];
}

function pickBestMatch(players, target) {
  if (!players?.length) return null;

  const brazilians = players.filter(p => p?.country?.name === 'Brazil');
  const pool = brazilians.length ? brazilians : players;
  if (pool.length === 1) return pool[0];

  const targetClub = norm(target.club);
  if (targetClub) {
    const byClub = pool.find(p => {
      const teamName = norm(p?.team?.name);
      const teamSlug = norm(p?.team?.slug);
      return teamName.includes(targetClub) || teamSlug.includes(targetClub) || targetClub.includes(teamSlug);
    });
    if (byClub) return byClub;
  }

  return pool[0];
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  console.log(`\n📥 Baixando fotos de ${ALL_PLAYERS.length} jogadores via Sofascore...\n`);

  const ok = [];
  const failed = [];

  for (const player of ALL_PLAYERS) {
    process.stdout.write(`  ${player.name.padEnd(22)} (${player.club.padEnd(20)}) `);

    try {
      const players = await searchPlayers(player.name);
      const match = pickBestMatch(players, player);
      if (!match?.id) {
        console.log(`✗ sem match`);
        failed.push(player);
        await sleep(300);
        continue;
      }

      const dest = path.join(OUTPUT_DIR, `${player.id}.png`);
      const url = `https://api.sofascore.app/api/v1/player/${match.id}/image`;
      const size = await curlBin(url, dest);

      if (size < 1000) {
        await fs.unlink(dest).catch(() => {});
        console.log(`✗ imagem vazia`);
        failed.push(player);
      } else {
        console.log(`✓ ${(size / 1024).toFixed(1)} KB → ${match.name} (${match.team?.name})`);
        ok.push(player);
      }
    } catch (err) {
      console.log(`✗ ${err.message}`);
      failed.push(player);
    }

    await sleep(400);
  }

  console.log(`\n📊 Resultado: ${ok.length}/${ALL_PLAYERS.length} OK\n`);
  if (failed.length) {
    console.log(`⚠️  Falharam:`);
    failed.forEach(p => console.log(`   - ${p.name} (${p.club}) [${p.id}]`));
  }
}

main().catch(err => {
  console.error('💥 Erro fatal:', err);
  process.exit(1);
});
