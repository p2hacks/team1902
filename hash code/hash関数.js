const HASH_KEY = 'HASH_KEY';
function generateHash (text) {
    const sha256 = new jsSHA('SHA-256', 'TEXT');
    sha256.update(text + HASH_KEY);
    return sha256.getHash('HEX');
}

console.log(generateHash("ポテト"));