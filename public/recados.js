let api = axios.create({
   baseURL: `https://trabalho-final-m4-back.herokuapp.com`,
});

getLoggedUserID = () => {
   if (!localStorage.getItem('loggedID')) {
      alert('Faça login ou crie uma conta!');
      window.location.assign('/');
   } else return localStorage.getItem('loggedID');
};

let logUserID = getLoggedUserID();

let objUserNotes;

loggedUserBaseCreation = async (logUser) => {
   let notes = await api.get(`/notes/${logUser}`);
   objUserNotes = notes.data.data;
   createNotesList();
};

loggedUserBaseCreation(logUserID);

createNewNote = () => {
   if (!!document.querySelectorAll('input')[0].value && !!document.querySelectorAll('input')[1].value) {
      api.post(`/notes/${logUserID}`, {
         description: document.querySelectorAll('input')[0].value,
         detail: document.querySelectorAll('input')[1].value,
      })
         .then((result) => {
            document.querySelectorAll('input')[0].value = '';
            document.querySelectorAll('input')[1].value = '';

            document.querySelector('#modalNewNoteTitle').innerHTML = `Novo recado salvo!`;
            document.querySelector('#modalNewNoteBody').innerHTML = `Seu novo recado foi salvo com sucesso.`;

            let listBody = document.querySelector('#listBody');
            listBody.innerHTML = '';

            loggedUserBaseCreation(logUserID);
         })
         .catch((err) => {
            console.log(err);
         });
   } else {
      document.querySelector('#modalNewNoteTitle').innerHTML = `Deu ruim!`;
      document.querySelector('#modalNewNoteBody').innerHTML = `Precisa adicionar descrição E detalhamento!`;
   }
};

setNewNoteButton = () => {
   let newNoteButton = document.querySelector('#newNoteButton');
   newNoteButton.setAttribute('onclick', 'createNewNote();');
};
setNewNoteButton();

createNotesList = () => {
   for (let note of objUserNotes) {
      let listBody = document.querySelector('#listBody');
      let row = document.createElement('tr');
      let th = document.createElement('th');
      th.setAttribute('scope', 'row');
      th.innerHTML = objUserNotes.indexOf(note) + 1;
      let td1 = document.createElement('td');
      td1.innerHTML = note.description;
      let td2 = document.createElement('td');
      td2.innerHTML = note.detail;
      let td3 = document.createElement('td');
      let deleteButton = document.createElement('button');
      deleteButton.innerHTML = `APAGAR`;
      deleteButton.setAttribute('class', 'btn btn-danger mx-2');
      deleteButton.setAttribute('data-bs-toggle', 'modal');
      deleteButton.setAttribute('data-bs-target', '#modalDeleteNote');
      deleteButton.setAttribute('onclick', `changeModalDeleteButton('${note.uid}');`);
      let editButton = document.createElement('button');
      editButton.innerHTML = `EDITAR`;
      editButton.setAttribute('class', 'btn btn-success');
      editButton.setAttribute('onclick', `changeModalEditButton('${note.uid}')`);
      editButton.setAttribute('data-bs-toggle', 'modal');
      editButton.setAttribute('data-bs-target', '#modalEditNote');

      td3.appendChild(deleteButton);
      td3.appendChild(editButton);
      row.appendChild(th);
      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      listBody.appendChild(row);
   }
};

changeModalDeleteButton = (number) => {
   let deleteButtonModal = document.querySelector('#deleteButtonModal');
   deleteButtonModal.setAttribute('onclick', `deleteNote('${number}');`);
};

deleteNote = (number) => {
   api.delete(`/notes/${number}`)
      .then((result) => {
         let listBody = document.querySelector('#listBody');
         listBody.innerHTML = '';
         loggedUserBaseCreation(logUserID);
      })
      .catch((err) => {
         console.log(err);
      });
};

editNote = (numb) => {
   if (!!document.querySelectorAll('input')[2].value && document.querySelectorAll('input')[3].value) {
      api.put(`/notes/${numb}`, {
         detail: document.querySelectorAll('input')[3].value,
         description: document.querySelectorAll('input')[2].value,
      })
         .then((result) => {
            document.querySelectorAll('input')[2].value = '';
            document.querySelectorAll('input')[3].value = '';
            let listBody = document.querySelector('#listBody');
            listBody.innerHTML = '';
            loggedUserBaseCreation(logUserID);
         })
         .catch((err) => {
            console.log(err);
         });
   } else {
      alert('Preencha todos os campos!');
      document.querySelectorAll('input')[2].value = '';
      document.querySelectorAll('input')[3].value = '';
   }
};

changeModalEditButton = (numb) => {
   let editButtonModal = document.querySelector('#editButtonModal');
   editButtonModal.setAttribute('onclick', `editNote('${numb}');`);
};

window.onbeforeunload = () => localStorage.removeItem('loggedID');
