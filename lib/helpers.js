export function formatLongString(string, maxCharacters = 30) {
    if (string.length > maxCharacters)
        string = string.substr(0, maxCharacters*2/3) + "..." +
            string.substr(string.length-maxCharacters/3, maxCharacters/3)
    return string
}