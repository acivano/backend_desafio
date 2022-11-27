const socket = io();

const spanName = document.getElementById('span-name');

let nombre = '';

function addMessage(){
    let data = {
        author:{
            email : document.getElementById('email').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value,
        },
        text : document.getElementById('text').value,
    }

    socket.emit('new-message', data)
    document.getElementById('text').value = ''
    document.getElementById('text').focus()

    return false
}

function render(data){
    
    document.getElementById('messages').innerHTML = ''
    console.log('Avatars en el link: https://www.iconfinder.com/search/icons?price=free&q=user')
    console.log('Array normalizado: ', JSON.stringify(data.entities), JSON.stringify(data.entities).length)
    

    const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });

    const chatSchema = new normalizr.schema.Entity('messages', {
        author: authorSchema
    }, { idAttribute: "text" })


    const arrayChat = normalizr.denormalize(data.result, [chatSchema], data.entities);;

    console.log('Array desnormalizado: ', JSON.stringify(arrayChat), JSON.stringify(arrayChat).length)

    if (arrayChat.length === 0) {
        document.getElementById('h2Mensaje').innerHTML = `Centro de Mensajes`

    } else {
        let per = ((JSON.stringify(data.entities).length * 100) / JSON.stringify(arrayChat).length).toFixed(2) || null
        document.getElementById('h2Mensaje').innerHTML = `Centro de Mensajes - %${per}`
    }

    
    let html = arrayChat.map( elem =>{
        return(
            `<div>
                <img class="" src="${elem.author.avatar}" alt="${elem.author.apellido} ${elem.author.nombre}">
                <strong class="font-weight-bold text-primary">${elem.author.alias}: </strong>
                <em class="font-italic text-success">${elem.text}</em>
            </div>`
        )
    }).join(" ")
    document.getElementById('messages').innerHTML = html

}
socket.on('mensajes', (data) => {

    render(data)
});

async function renderProductos() {

    const prod = await fetch('http://localhost:8080/api/productos-test');

    const data = await prod.json();

    if(data.status ===404) return window.location.href ='/'

    if (data.length == 0) {
        let html = `<h3 class="alert alert-danger">No se encontraron datos</h3>`
        document.getElementById('tabla').innerHTML = html

    } else {
        let html = 
        `<table class="table">
            <thead>
                <tr>
                    <th scope="col" class="text-center align-middle">Titulo</th>
                    <th scope="col" class="text-center align-middle">Precio</th>
                    <th scope="col" class="text-center align-middle">url</th>
                </tr>
            </thead>
            <tbody id="productos">
            </tbody>
        </table>`
        
        
        let productos = data.map( elem =>{
            return(
                `<tr>
                    <td class="text-center align-middle">${elem.Titulo }</td>
                    <td class="text-center align-middle">${elem.Precio}</td>
                    <td class="text-center align-middle"> <img src="${elem.url}" class="mh-25" alt="Producto ${elem.Titulo}"></td>
                </tr>
            `
            )
        }).join(" ")
        document.getElementById('tabla').innerHTML = html
        document.getElementById('productos').innerHTML = productos 
    }


}


async function getName() {
    const data = await fetch('/get-name');
    const name = await data.json();

    return name.nameAccess;
}

async function logout() {
    const hastaluego = document.getElementById('hastaluego');
    const home  = document.getElementById('home');
    let dnone = home.classList.add('d-none')
    let dblock = hastaluego.classList.remove('d-none')

    setInterval(() => {
        window.location.href = '/logout';
    }, 2000);
}


(async function start() {
    spanName.innerHTML = await getName() || '';
    nombre = await getName();
    renderProductos();
})();