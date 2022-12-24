const express = require('express');

const ContenedorProductos = require('./src/class/Products')
const ContenedorMensajes = require('./src/class/Messages')

const routerProductos = require('./src/routes/productos')
const routerSesions = require('./src/routes/sesion')
const routerInfo = require('./src/routes/info')
const routerChildProcess = require('./src/routes/childProcess')


const permissionValidate = require('./src/middlewares/permissionValidate')

const { sessionConfig } = require('./src/config/config');

const passport = require('./src/utils/passport');

const cluster = require('cluster')
const numCPUs = require('os').cpus().length


const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.default({port: 8080, mode: 'fork'}).alias({port: 'p', mode: 'm'}).argv

const PORT = args.port
const MODE = args.mode

const manejadorProductos = new ContenedorProductos()
const manejadorMensajes = new ContenedorMensajes()

if (cluster.isMaster && MODE.toUpperCase() === 'CLUSTER') {
    console.log(`Cantidad de CPUs: ${numCPUs}`)
    console.log(`Modo de ejecución: ${MODE.toUpperCase()}`)
    console.log(`Nodo master en: ${process.pid} en ejecución`)

    for (let index = 0; index < numCPUs; index++) {
        cluster.fork()        
    }

    cluster.on('exit', worker => {
        console.log(`worker ${worker.process.pid} died, ${new Date().toLocaleString()}`);
        cluster.fork();
    })

} else {
    console.log(`Worker ${process.pid} started`);
    
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
    app.use('/', routerInfo)
    app.use('/api', routerChildProcess)
    

    const server = httpServer.listen(PORT, () => console.log(`Servidor http escuchando en el puerto ${server.address().port}`));
    server.on('error', error => console.log(`Error en servidor ${error}`));
}
