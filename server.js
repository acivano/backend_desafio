const express = require('express');

const ContenedorProductos = require('./src/class/Products')
const ContenedorMensajes = require('./src/class/Messages')

const routerProductos = require('./src/routes/productos')
const routerSesions = require('./src/routes/sesion')

const permissionValidate = require('./src/middlewares/permissionValidate')

const { sessionConfig } = require('./src/config/config');

const passport = require('./src/utils/passport');

const manejadorProductos = new ContenedorProductos()
const manejadorMensajes = new ContenedorMensajes()

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)


io.on('connection', async socket => {

    console.log('Nuevo cliente');
    socket.emit('productos', await manejadorProductos.getRandom());
    socket.emit('mensajes', await manejadorMensajes.getAll());
    socket.on('new-message', async mensaje => {

        await manejadorMensajes.save(mensaje)
        io.sockets.emit('mensajes', await manejadorMensajes.getAll());
    })
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const session = require('express-session')
app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/productos-test', permissionValidate, routerProductos)
app.use('/', routerSesions)


const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => console.log(`Servidor http escuchando en el puerto ${server.address().port}`));
server.on('error', error => console.log(`Error en servidor ${error}`));