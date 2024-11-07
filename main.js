const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const submitBtn = document.getElementById('submitBtn');

let validations = {
    username: false,
    email: false,
    password: false,
    confirmPassword: false
};

// Validasi Username
username.addEventListener('keyup', () => {
    const value = username.value;
    const feedback = document.getElementById('usernameFeedback');
    const usernameRegex = /^[a-zA-Z0-9]{5,20}$/;

    if (value.length < 5) {
        feedback.textContent = 'Username minimal 5 karakter';
        feedback.className = 'feedback error';
        validations.username = false;
    } else if (value.length > 20) {
        feedback.textContent = 'Username maksimal 20 karakter';
        feedback.className = 'feedback error';
        validations.username = false;
    } else if (!usernameRegex.test(value)) {
        feedback.textContent = 'Username hanya boleh mengandung huruf dan angka';
        feedback.className = 'feedback error';
        validations.username = false;
    } else {
        feedback.textContent = 'Username valid';
        feedback.className = 'feedback success';
        validations.username = true;
    }
    updateSubmitButton();
});

// Validasi Email
email.addEventListener('change', () => {
    const value = email.value;
    const feedback = document.getElementById('emailFeedback');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
        feedback.textContent = 'Format email tidak valid';
        feedback.className = 'feedback error';
        validations.email = false;
    } else {
        feedback.textContent = 'Email valid';
        feedback.className = 'feedback success';
        validations.email = true;
    }
    updateSubmitButton();
});

// Validasi Password
password.addEventListener('keyup', () => {
    const value = password.value;
    const feedback = document.getElementById('passwordFeedback');
    const strengthBar = document.getElementById('passwordStrengthBar');
    const hasNumber = /\d/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);
    let strength = 0;

    if (value.length >= 8) strength += 33;
    if (hasNumber) strength += 33;
    if (hasLetter) strength += 34;

    strengthBar.style.width = strength + '%';
    
    if (strength <= 33) {
        strengthBar.style.background = '#d93025';
    } else if (strength <= 66) {
        strengthBar.style.background = '#ffa000';
    } else {
        strengthBar.style.background = '#188038';
    }

    if (value.length < 8) {
        feedback.textContent = 'Password minimal 8 karakter';
        feedback.className = 'feedback error';
        validations.password = false;
    } else if (!hasNumber || !hasLetter) {
        feedback.textContent = 'Password harus mencakup angka dan huruf';
        feedback.className = 'feedback error';
        validations.password = false;
    } else {
        feedback.textContent = 'Password kuat';
        feedback.className = 'feedback success';
        validations.password = true;
    }
    
    // Periksa ulang konfirmasi password
    validateConfirmPassword();
    updateSubmitButton();
});

// Validasi Konfirmasi Password
confirmPassword.addEventListener('input', validateConfirmPassword);

function validateConfirmPassword() {
    const feedback = document.getElementById('confirmPasswordFeedback');
    
    if (!confirmPassword.value) {
        feedback.textContent = 'Konfirmasi password diperlukan';
        feedback.className = 'feedback error';
        validations.confirmPassword = false;
    } else if (confirmPassword.value !== password.value) {
        feedback.textContent = 'Password tidak cocok';
        feedback.className = 'feedback error';
        validations.confirmPassword = false;
    } else {
        feedback.textContent = 'Password cocok';
        feedback.className = 'feedback success';
        validations.confirmPassword = true;
    }
    updateSubmitButton();
}

// Update status tombol submit
function updateSubmitButton() {
    submitBtn.disabled = !Object.values(validations).every(Boolean);
}

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (Object.values(validations).every(Boolean)) {
        // Di sini Anda bisa menambahkan kode untuk mengirim data ke server
        alert('Pendaftaran berhasil! Data siap dikirim ke server.');
        
        // Reset form
        form.reset();
        validations = {
            username: false,
            email: false,
            password: false,
            confirmPassword: false
        };
        updateSubmitButton();
        
        // Reset feedback
        document.querySelectorAll('.feedback').forEach(el => {
            el.textContent = '';
            el.className = 'feedback';
        });
        
        // Reset password strength bar
        document.getElementById('passwordStrengthBar').style.width = '0';
    }
});