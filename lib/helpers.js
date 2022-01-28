export function formatLongString(string, maxCharacters = 30) {
    if (string.length > maxCharacters)
        string = string.substr(0, maxCharacters * 2 / 3) + "..." +
            string.substr(string.length - maxCharacters / 3, maxCharacters / 3)
    return string
}

export function getKaliumImportFile(game) {
    let contacts = game.players.map(
        value => ({...value, name: "@" + value.name})
    );
    contacts.push({name: "@Bank", address: game.bankAccount});
    contacts.push({name: "@Mitte", address: game.centerAccount});
    return JSON.stringify(contacts);
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}