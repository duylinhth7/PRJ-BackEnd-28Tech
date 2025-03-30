module.exports.genarateToken = (length) =>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
};

module.exports.genarateNumber = (length) =>{
    const characters = '0123456789';
    let number = '';
    for (let i = 0; i < length; i++) {
        number += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return number;
}