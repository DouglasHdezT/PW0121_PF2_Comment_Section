let comments = [];

window.onload = () => {
  const commentForm = document.querySelector("form#comment-form");

  commentForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    /** TODO: All logit to storage and render comments */
    const formData = new FormData(commentForm);
    const fields = {
      username: formData.get("username"),
      comment: formData.get("comment")
    }

    if(fields.username === "" || fields.comment === "") {
      showWarning("Existen campos vacíos");
      return; 
    }

    addComment(fields.username, fields.comment);
    renderComments();

    commentForm.reset();
  });
}

/* LOGIC FUNCTIONS */

const addComment = (username, comment) => {
  const commentToSave = {
    id: `${username}_${new Date().getTime()}`,
    username: username,
    comment: comment,
  }
  
  comments.push(commentToSave);
}

/* VISUAL FUNCTIONS */

const showWarning = (message = "") => {
  const wariningElement = document.querySelector(".warning");
  
  wariningElement.innerHTML = `<p>${message}</p>`;
  wariningElement.style["display"] = "block";

  setTimeout(()=> {
    wariningElement.style["display"] = "none";
  }, 3000)
}

const renderComments = () => {
  const commentsSection = document.querySelector("section#comments");

  /* for(let i=0; i < comments.length; i++) {
    //Crear el nodo
    //Añadir el nodo a la seccion
  } */

  const commentsElements = comments.map((element)=> {
    return `
    <div data-id="${element.id}" class="single-comment">
      <h3>${element.username}</h3>
      <p>
        ${element.comment}
      </p>
      <button onclick="handleOnDelete('${element.id}')" > Eliminar </button>
    </div>
    `;
  });

  commentsSection.innerHTML = commentsElements.join("\n");
}

const handleCommentClick = (id) => {
  const comment = comments.find((element)=> {
    return element.id === id
  });

  console.log(comment)
}

const handleOnDelete = (id) => {
  const newComments = comments.filter((element) => {
    return element.id !== id;
  });

  comments = newComments;
  renderComments();
}