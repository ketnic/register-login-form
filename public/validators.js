function validate_auth_form(e) {
    e.preventDefault();

    const email = document.getElementById('auth-form-email');
    const name = document.getElementById('auth-form-name');
    const password = document.getElementById('auth-form-password');

    if(email) {
        if(!validate_email(email.value)) 
            add_invalid_message(email, 'must be an email');
        else
            console.log(email.value);
    }

    if(!validate_name(name.value)) 
        add_invalid_message(name, 'must be 2 characters or longer');
    else
        console.log(name.value);

    if(!validate_password(password.value)) 
        add_invalid_message(password, 'must be 8-20 characters long');
    else
        console.log(password.value);
}

function add_invalid_message(input, message){
    if(!input.classList.contains('auth-form__input--invalid')) {
        input.classList.add('auth-form__input--invalid');
        let container = input.parentElement;
        if (!container.parentElement.classList.contains('auth-form__input-invalid-message-container')) {
            var wrapper = document.createElement('div');
            wrapper.classList.add('auth-form__input-invalid-message-container');
            container.parentNode.insertBefore(wrapper, container);
            wrapper.appendChild(container);
        }
        container.insertAdjacentHTML('afterend', '<div class="auth-form__invalid-message-container"> <label class="auth-form__invalid-message">'+message+'</label> </div>');
        container.classList.add('auth-form-input-container--invalid-message')
    } 
}

function delete_invalid_message(e){
    const input = e.target;
    if(input.classList.contains('auth-form__input--invalid')) {
        input.classList.remove('auth-form__input--invalid');
        let container = input.parentElement;
        let wrapper = container.parentElement;
        container.classList.remove('auth-form-input-container--invalid-message');
        wrapper.querySelector('.auth-form__invalid-message-container').remove();
    }
}

function validate_email(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate_name(name) {
    let re = /^\S{2,}$/;
    return re.test(name);
}

function validate_password(password) {
    let re =  /^(?=.*[a-z]).{8,20}$/;
    return re.test(password);
}

document.getElementById('auth-form').addEventListener(
    'submit', validate_auth_form, false
);

const inputs = document.querySelectorAll('.auth-form__input');
inputs.forEach(input => input.addEventListener(
    'input', delete_invalid_message, false)
);
