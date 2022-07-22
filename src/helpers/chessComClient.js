export async function getRandomGMGame() {
  const username = randomFromArray(await getTitledPlayers("GM"));
  const archiveUrl = randomFromArray(await getAvailableArchives(username));
  const games = (await (await fetch(archiveUrl)).json()).games;
  if (games.length === 0) return getRandomGMGame();
  return randomFromArray(games);
}

export async function getTitledPlayers(title) {
  const response = await fetch(`https://api.chess.com/pub/titled/${title}`);
  return (await response.json()).players;
}

export async function getAvailableArchives(username) {
  const response = await fetch(`https://api.chess.com/pub/player/${username}/games/archives`);
  return (await response.json()).archives;
}

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
