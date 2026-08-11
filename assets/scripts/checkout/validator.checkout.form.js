
const validators = [
    function() {
        const input = document.getElementById("phone_input");
        const isValid = /^[+]?[0-9]{13}$/.test(input.value);

        // if (!isValid) {
        //     window.alert("malformed phone number; (Optional +) 13 Characters form a phone number.");
        // }
        document.getElementById("phone_invalid").classList.toggle("hidden", isValid);

        return isValid;
    },
    function validateEmail() {
        const email = document.getElementById("email_input");
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = emailRegex.test(email.value);
        
        // if (!isValid) {
        //     window.alert("malformed email address.");
        // }
        document.getElementById("email_invalid").classList.toggle("hidden", isValid);
        
        return isValid;
    }
];

const validate = function() {
    let allValid = true;

    for(let i = 0; i < validators.length; i++) {
        allValid &&= validators[i]();
    }

    return allValid;
}

export default validate;