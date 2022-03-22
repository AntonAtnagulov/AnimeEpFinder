const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const regName = event.target.name;
    const regPassword = event.target.password;
    const regMail = event.target.email;

    const response = await fetch('/register/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: regName.value,
          password: regPassword.value,
          email: regMail.value,
        }),
      });

      const registrationResponse = await response.json();

      if (registrationResponse.hasOwnProperty('errors')) {
        regName.placeholder = 'ОБЯЗАТЕЛЬНОЕ ПОЛЕ ДЛЯ ЗАПОЛНЕНИЯ';
        regPassword.placeholder = 'ОБЯЗАТЕЛЬНОЕ ПОЛЕ ДЛЯ ЗАПОЛНЕНИЯ';
        regMail.placeholder = 'ОБЯЗАТЕЛЬНОЕ ПОЛЕ ДЛЯ ЗАПОЛНЕНИЯ';
      } else {
        window.location.assign('/');
      }
})