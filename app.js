const express = require('express');
const app = express();
const puerto = process.env.PORT || 3000;
app.use(express.json())
//Arreglo de objetos de categorias
let categorias=[{id:1, nombre:"Cocina", descripcion:"Elementos para cocinar"},
                {id:2, nombre:"Limpieza", descripcion:"Elementos para cocinar"},
                {id:3, nombre:"Electrónica", descripcion:"Elementos para cocinar"},
                {id:4, nombre:"Ropa bebe", descripcion:"Elementos para cocinar"},
                {id:5, nombre:"Linea blanca", descripcion:"Elementos para cocinar"},
                {id:6, nombre:"Jardinería", descripcion:"Elementos para cocinar"},
                {id:7, nombre:"Salud", descripcion:"Elementos para cocinar"},
                {id:8, nombre:"Muebles", descripcion:"Elementos para cocinar"},
                {id:9, nombre:"Lacteos", descripcion:"Elementos para cocinar"},
                {id:10, nombre:"Licores", descripcion:"Elementos para cocinar"}];
app.get('/socios/v1/categorias',(req,res)=>{
    //Todas las categorías
    //1.- Verificar si existen categorías
    if(categorias){
        res.status(200).json({
            estado:1,
            mensaje:"Existen categorias",
            categorias: categorias
    })
    }else{res.status(404).json({
        estado:0,
        mensaje:"No se encontraron categorias",
        categorias: categorias
    })

    }
    //2..- mostrar con un estado y mensaje
    //3.- no existe, mostrar estado y msj
    //en formato json
    //Mostrar mensajes de estado de servidor

    res.send('Mostrar todass las categorias');
})

app.get('/socios/v1/categorias/:id',(req,res)=>{
    //res.send('Mostrar una categoria');
    //solo unacategoria
    const id= req.params.id;

    //programacion funcional
    const categoria= categorias.find(categoria=>categoria.id==id);//se ahorra el for
    //Sí encntró una categoría
    if(categoria){
        res.status(200).json({
            estado:1,
            mensaje:"Sí se encontró la categoría",
            categoria: categoria
        })
    }else{res.status(404).json({
        estado:0,
        mensaje:"Categorpia no encontrada",
        categoria: {}
    })
    }
})
app.post('/socios/v1/categorias',(req,res)=>{
    //res.send('Crear una categoria');
    //crear una categoría
    const{ nombre, descripcion}= req.body;
    console.log(nombre);
    console.log(descripcion);
    console.log("-----------------------------------");
    const id = Math.round(Math.random()*1000);
    if(nombre==undefined || descripcion== undefined){
        res.status(400).json({
            estado: 0,
            menssaje:"Faltan parametros a la solicitud"
        })

    }else{
        const categoria={id:id, nombre:nombre, descripcion:descripcion};
        const longitudInicial = categorias.length;
        console.log(categorias.length);
        console.log(longitudInicial);
        categorias.push(categoria)
        if(categorias.length>longitudInicial){
            //Todo Ok de parte del cliente y el servidor
            res.status(201).json({
                estado:1,
                mensaje: "Cartegoria creada",
                categoria: categoria
            })
        }else{
            //Error del creador de la API o de la base de datos, de la base de datos o de quien lo configura
            res.status(500).json({
                estado: 0,
                mensaje: "Ocurrio un error desconocido"

            })
        }
        
    } 
    
})
app.put('/socios/v1/categorias/:id',(req,res)=>{
    //res.send('Actualizar una categoría por su id');
    //actualizar un recurso o  una categoría
    //Id viene ? = params
    //nombre i descripcion= body
    const{ id}=req.params;
    const{ nombre, descripcion}= req.body;
    if(nombre==undefined||descripcion==undefined){
        res.status(400).json({
            estado:0,
            mensaje: "Bad request, Faltan parametros en la solicitud"
        })
    }else{
        const posActualizar =categorias.findIndex(categoria=>categoria.id==id)
        if(posActualizar!= -1){
            //Si encontró el registro
            categorias[posActualizar].nombre=nombre;
            categorias[posActualizar].descripcion=descripcion;
            res.status(200).json({
                estado:1,
                mensaje:"Categoría actualizada",
                categorias:categorias[posActualizar]
            })
        }else{
            //No encontró el registro
            res.status(404).json({
                estado:0,
                mensaje:"No se encontró el registro"
            })
        }
    }

})
app.delete('/socios/v1/categorias',(req,res)=>{
    //res.send('Eliminar una categoria');
    //eliminar recurso o categoria
    const{ id }= req.params;
    const indiceEliminar= categorias.findIndex(categoria=>categoria.id==id)
    if(indiceEliminar!=-1){
        categoria.splidice(indiceEliminar,1);
        res.status(201).json({
            estado:1,
            mensaje:"Categoria eliminada coon exito"
        })

    }
    else{
        res.status(404).json({
            estado:0,
            mensaje:"registro no encontrado"
        })
    }
})

app.listen(puerto,()=>{
console.log(('servidor corriendo en el puerto', puerto));
})

