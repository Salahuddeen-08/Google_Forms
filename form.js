const scriptURL =
    "https://script.google.com/macros/s/AKfycby_OSYIpyS97NxBXa7jduQIhcgmHBJ_G3yxo2ulRoSL9m2QNWF8GBcy3Yylx2aYY6Ui/exec";
const form = document.forms["google-sheet"];

form.addEventListener("submit", (e) => {
    var crypt = {
        secret: "THESECRET",
        encrypt: function (password) {
            var encrypted = Crypto.AES.encrypt(password, crypt.secret);
            encrypted = encrypted.toString();
            return encrypted;
        },
        decrypt: function (encrypted) {
            var decrypted = Crypto.AES.decrypt(encrypted, crypt.secret);
            decrypted = decrypted.toString(cryptoJS.enc.Utf8);
            return decrypted;
        },
    };
    var encrypted = crypt.encrypt(document.getElementById("password").value);
    console.log(encrypted);

    document.getElementById(password).value = encrypted;
    var decrypted = crypt.decrypt(encrypted);
    console.log(decrypted);

    e.preventDefault();
    fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
    })
        .then(
            (response) =>
                (document.getElementById("form_alert").innerHTML = "Data has stored")
        )
        .catch(
            (error) =>
            (document.getElementById("form_alert").innerHTML =
                "Data has not stored")
        );
});