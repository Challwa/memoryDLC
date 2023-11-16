document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("motUti");
    const strengthIndicator = document.getElementById("strength-indicator");

    passwordInput.addEventListener("input", function() {
        const passwordValue = passwordInput.value;

        // Réinitialiser l'indicateur de force
        strengthIndicator.className = "";

        // Vérifier la longueur du mot de passe
        if (passwordValue.length < 6) {
            strengthIndicator.classList.add("faible");
        } else {
            // Vérifier la présence de symboles et de chiffres
            const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(passwordValue);
            const hasNumber = /\d/.test(passwordValue);

            // Vérifier le niveau de difficulté
            if (passwordValue.length > 6 && (hasSymbol || hasNumber)) {
                strengthIndicator.classList.add("moyen");
            }

            // Vérifier la présence de symboles et de chiffres pour un mot de passe fort
            if (passwordValue.length > 9 && hasSymbol && hasNumber) {
                strengthIndicator.classList.add("fort");
            }
        }
    });
});