let api = axios.create({
   baseURL: `https://trabalho-final-m4-back.herokuapp.com`,
});

createAccount = () => {
   let username = document.querySelectorAll('input')[0].value;
   let password = document.querySelectorAll('input')[1].value;
   let passwordConfirm = document.querySelectorAll('input')[2].value;
   if (password == passwordConfirm) {
      api.post('/users/create', {
         name: username,
         password: password,
      })
         .then((result) => {
            alert(result.data.msg);
            window.location.assign('/');
         })
         .catch((err) => {
            alert(err.response.data.msg);
            return;
         });
   } else {
      alert('senhas nao conferem');
   }
};
