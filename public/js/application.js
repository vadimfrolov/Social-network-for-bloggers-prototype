const toDelete = document.getElementsByClassName('delete')

for (let i = 0; i < toDelete.length; i++) {
  toDelete[i].addEventListener('click', async (e) => {
    e.preventDefault()
    const id = (e.target.id);
    const resp = await fetch(`/delete/${id}`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },

    });
    const data = await resp.json()
    console.log(data);
    const elem = document.getElementById(data._id)
    console.log(elem);
    elem.parentNode.parentNode.remove()
    
  })
}

