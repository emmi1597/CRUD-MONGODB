const express = require('express')
const router = express.Router()

// obtiene el esquema
const Task = require('../models/task')

/**
 * leer todos los datos
 * renderizar pagina inicial
 */
router.get('/', async (req, res) => {
    const tasks = await Task.find()
    res.render('index', {
        tasks // tasks: tasks
    })
    // console.log(tasks)
})

/**
 * agregar nuevos datos
 * guardarlos
 * regresar a la pagina de inicio
 */
router.post('/add', async (req, res) => {
    const task = new Task(req.body)
    await task.save()
    // res.send('recivido')
    res.redirect('/')
})

/**
 * cambiar estado desde el id de la tarea
 * regresar a la pagina de inicio
 */
router.get('/turn/:id', async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id)
    task.status = !task.status
    await task.save()
    res.redirect('/')
})

/**
 * obtener el id de la trea
 * buscar la tarea
 * redireccionar a la pagina de editar
 */
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id)
    res.render('edit', {
        task
    })
})

/**
 * obtener los datos de la tarea editada
 * actualizar la tarea
 * regresar a la pagina de inicio
 */
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params
    await Task.update({ _id: id}, req.body)
    res.redirect('/')
})

/**
 * obtener el id de la tarea
 * eliminar la tarea
 * regresar a la pagina de inicio
 */
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params
    await Task.remove({ _id: id})
    // res.send('recivido')
    res.redirect('/')
})

// export routes
module.exports = router;