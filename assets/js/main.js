//Variables
let comments = [];

//Ejecutar main
window.onload = () => {
  main();
}

//Definir un main
const main = () => {
  const commentForm = document.querySelector("#comment-form");
  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(commentForm);
    const fields = {
      username: formData.get("username"),
      comment: formData.get("comment")
    }

    if(!fields.username || !fields.comment) {
      showWarning("Existen campos vacíos en el formulario")
      return;
    }

    //Logica de agregar
    addComment(fields.username, fields.comment);
    renderComments();

    commentForm.reset();
  });
}

//Funciones logicas

const addComment = (username, comment) => {
  const commentToPush = {
    username: username,
    comment: comment,
    id: `${username}_${new Date().getTime()}`
  }

  comments.push(commentToPush);
}

//Funciones gráficas

const showWarning = (message="") => {
  const warningElement = document.querySelector(".warning");

  warningElement.innerHTML = `<p>${message}</p>`;
  warningElement.style["display"] = "block";

  setTimeout(()=> {
    warningElement.style["display"] = "none";
  }, 3000);
}

const renderComments = () => {
  const commentsSection = document.querySelector("#comments");

  /* for(let i=0; i < comments.length; i++){
    //Crear nodo
    //Añadir el nodo a la seccion
  } */

  const commentElements = comments.map((comment) => {
    return `
    <div data-id="${comment.id}" class="single-comment">
      <h3 onclick="handleOnClick('${comment.id}')" >${comment.username}</h3>
      <p>
        ${comment.comment}
      </p>  
    </div>
    `;
  });

  commentsSection.innerHTML = commentElements.join("\n");
}

const handleOnClick = (id) => {
  //Logica de click
  console.log(id)
}