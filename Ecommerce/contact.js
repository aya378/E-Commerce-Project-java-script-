const form = document.getElementById('formContent');
const nameInput = document.getElementById('fname');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  validateForm();
});

nameInput.addEventListener('input', function() {
  validateName();
});

emailInput.addEventListener('input', function() {
  validateEmail();
});

phoneInput.addEventListener('input', function() {
  validatePhone();
});

var p=document.getElementById('thanks');
function validateForm() {
  var isValid = true;
  if (!validateName()) {
    isValid = false;
  }
  if (!validateEmail()) {
    isValid = false;
  }
  if (!validatePhone()) {
    isValid = false;
  }
  if (isValid) {
    p.textContent = `Thanks For Your FeedBack ${nameInput.value} , we will contact you back soon`;
    p.style.color = '#006400';
    form.reset();
    console.log(p);
  }
}

function validateName() {
  const nameError = document.getElementById('nameError');
  if (nameInput.value.trim() === '' || !isNaN(nameInput.value)) {
    nameError.textContent = 'Name is required';
	nameError.style.color="red";
    return false;
  }
   else {
    nameError.textContent = '';
    return true;
  }
}

function validateEmail() {
  const emailError = document.getElementById('emailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = 'Please enter a valid email address';
	emailError.style.color="red";
    return false;

} else {
    emailError.textContent = '';
    return true;
  }
}

function validatePhone() {
  const phoneError = document.getElementById('phoneError');
  const phoneRegex = /^(011|012|010)\d{8}$/;

  if (!phoneRegex.test(phoneInput.value)) {
    phoneError.textContent = 'Please enter a valid phone number starting with 011, 012, or 010';
    phoneError.style.color = 'red';
    return false;
  } else {
    phoneError.textContent = '';
    return true;
  }
}






