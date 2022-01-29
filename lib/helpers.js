export function formatLongString(string, maxCharacters = 35) {
    if (string.length + 3 > maxCharacters)
        string = string.substr(0, maxCharacters * 2 / 3) + "..." +
            string.substr(string.length - maxCharacters / 3)
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