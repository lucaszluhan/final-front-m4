let api = axios.create({
   baseURL: `https://trabalho-final-m4-back.herokuapp.com`,
});

loginValidation = () => {
   let username = document.querySelectorAll('input')[0].value;
   let password = document.querySelectorAll('input')[1].value;
   if (!username || !password) {
      alert('Preencha login e senha ou crie sua conta.');
   } else {
      api.post('/users/login', {
         name: username,
         password: password,
      })
         .then((result) => {
            alert(result.data.msg);
            console.log(result);
            localStorage.setItem('loggedID', result.data.data.uid);
            window.location.assign('recados.html');
         })
         .catch((err) => {
            alert(err.response.data.msg);
            console.log(err);
         });
   }
};
