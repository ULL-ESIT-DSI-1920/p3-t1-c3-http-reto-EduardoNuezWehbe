# p3-t1-c3-http-EduardoNuezWehbe




## En esta practica trabajaremos con el protocolo http donde estudiaremos el GET el DELETE y el PUT ademas de una pequeña modificacion donde añadiremos el MKCOL para generar directorios



Seguiremos el guión del libro eloquentjs second chapter donde inicialmente se nos hará un repaso de los conocimientos previos antes de realizar el servidor HTTP

Comienza explicando el concepto de sincronía y asincronía donde se nos expone un pequeño diagrama con el cuál se nos muestra el por qué usar la asyncronia. Usar funciones asincronas hace más eficiente el códgio que realizarlo con funciones sincronas.

Despues de esta explicación comienza con un pequeño recordatorio de los comandos de node y del funcionamiento de los modulos.

Tras esto, nos explica como realizar la intalación de NPM y el file system module donde se nos expone un pequeño ejemplo de código de un redfile y un writefile

Ejemplo del readfile: 

`var fs = require("fs");
fs.readFile("file.txt", function(error, buffer) {
  if (error)
    throw error;
  console.log("The file contained", buffer.length, "bytes.",
              "The first byte is:", buffer[0]);
});`


A partir de este punto, el escritor nos introduce finalmente al HTTP module.

Primero generamos un servirdor muy simple donde se nos muestra el funcionamiento de createServer ademas de sus parametros.

createServer se encarga de generar el servidor que esperará a que el cliente realize alguna request para así darle un response.

request y response son objetos representando el **incomming and outgoing** data. El primero contiene la petición, como una url, la cual como se hizo la request.

Para mandar algo de vuelta, una respuesta es con el objecto response.

Despues el escritor nos habla del uso de los **STREAMS** donde se nos expone el metodo fs.createWriteStream function. Esto lo que hace es apuntar a un fichero y escribir el contenido que queramos en el.

Los streams de lectura son diferentes. Ambas request variables que son pasadas al HTTP callback and la respone variable pasada al HTTP client son streams de lectura. La lectura de streams se hace con los even handlers en vez de con los metodos.

Ahora que tenemos ya todo los conocimientos básicos, comenzaremos con la creación de nuestro servidor que gestionará los metodos get, put y delete. 


Analicemos primero el methods.

methods es una variables que se genera de la siguiente forma:

        methods {
            get:
            put:
            del:
        }

si nosotros realizamos una solicitud al servidor, esta será almacenada en la variable request, de forma que, cuando utilicemos dentro del http.createServer:

        methods[request.method]

si hemos seleccionado el get, se nos pondra, en la variable methods el get:get implicando asi, que cuando nosotros declaremos: 

        methods.get = .....

se nos llamará y entrará a realizar este código. Por eso mismo si nosotros tenemos otros como methods.put este no se nos ejecutará puesto que su campo esta vacío.

A continuación se mostrará el código del get y tambien de su ejecución con el gulp --tasks.


![Screenshot from 2020-03-06 19-08-21](https://user-images.githubusercontent.com/56004081/76114948-1c939080-5fdf-11ea-973d-a6d4019daab3.png)

En esta screen se nos muestra como el servidor ha recibido la petición del get definida en el gulpfile buscando el fichero file.txt el cuál no lo encuentra y manda un error.


Aquí hay varias cosas que comentar. Priemro es el fs.stat. Indica que si no existe un fichero, fs.stat devuelve un error con el código "ENOENT" a la callback.

Los errores que no esperamos se enviaran con el código 500 lo cual indica que el error existe en el servidor mientras que el 404 será al contrario ha habido un error en la request.

Usamos fs.readdir para leer una lista de ficheros en un directorio y otra callback, y la devolvemos al usuario.  Para fihero nosmarles creamos un fs.createReadStream y le pasamos el respond, conteniendo una variable de tipo mime module que nos da el nombre del fichero.




Ahora vamos a comentar el methos.DELETE del fichero file.txt el cual si existe se eliminara. Si no simplemente no hará nada


![Screenshot from 2020-03-06 19-08-31](https://user-images.githubusercontent.com/56004081/76114940-1ac9cd00-5fdf-11ea-935f-5d68c0dac9aa.png)


En este código nos damos cuenta de algo nuevo, el estado 204 que no es un error. Cuando el fichero no es borrado implica que no esta por lo que podriamos decir que la tarea ya ha sido completada.

Por ello creamos una funcion respondErrorOrNothing que evalua si existe el fichero entonces no hacemos nada pero si existe y hay algun error lo retornamos.



Por ultimo estudiaremos el methods.PUT el cual si existe el fichero file.txt lo sobreescribira con el mensaje bye world! y si no existe generara un nuevo fichero con este mismo mensaje



![Screenshot from 2020-03-06 19-16-27](https://user-images.githubusercontent.com/56004081/76114914-0ab1ed80-5fdf-11ea-9084-7f8a1bafdeb8.png)




No necesitamos comprobar si el fichero existe puesto que si lo hace, lo reescribiremos. Usamos pipe para mover data de un stream de lectura a uno escribible. Si a la hora de crear un stream falla, un error saltara.

Cuando termine la escritura en el fichero se devolvera un finish por pantalla y devolveremos un 204 response al cliente.




Ahora vamos a comentar el fichero gulp y el funcionamiento de insomnia: 


![Screenshot from 2020-03-06 19-18-31](https://user-images.githubusercontent.com/56004081/76115035-4d73c580-5fdf-11ea-92e3-78a94d4a7160.png)


dentro del gulpfile.js vamos a declarar una varible gulp donde la añadiremos el modulo gulp y tambien shell al que se le añadira el modulo gulp-shell.

Ahora a la variable gulp le podremos indicar los tasks, es decir que tareas queremos que nuestro fichero ejecute por  nosotros, de manera que nos simplificará el trabajo. Igual queremos ejecutar un comando de mas de 50 caracteres y todos esos caracteres les podemos poner un alias para asi ejecutarlo de forma más rápida. 

En este caso, vamos a añadir como tareas a nuestro fichero gulp los pre intalación para que nuestro comandos funcionen, y despues añadiremos unas características para que ejecute los metodos get put del... que hemos generado en el código anteriormente.

Para poder generar un task tendremos que:

Primero indicar como se va a llamar el task, en este caso supongamos el "get". Y despues de este paso, le vamos a decir que comando queremos que se ejecute. En este caso "curl -v http://localhost:8000/file.txt".

Ya con esto podriamos ejecutar gulp get (logicamente con el servidor activado) y ya podríamos ejecutar el get en nuestro servidor.

Lomismo pasa con los otros comandos, podremos ejecutar el Doc, put, del... todos los que queramos.


Si no nos acordamos de las tasks que hemos puesto, y no queremos abrir el fichero podremos ejecutar el gulp tasks, el cual nos mostrará una lista con todos los comandos.



Tras esta explicación del gulp, pasaremos a mostrar el funcionamiento de la herramiento insomnia:


![Screenshot from 2020-03-06 19-37-48](https://user-images.githubusercontent.com/56004081/76116724-70ec3f80-5fe2-11ea-8442-6d1bfef8a169.png)
![Screenshot from 2020-03-06 19-38-17](https://user-images.githubusercontent.com/56004081/76116728-721d6c80-5fe2-11ea-92e0-72ab269f7038.png)
![Screenshot from 2020-03-06 19-38-20](https://user-images.githubusercontent.com/56004081/76116733-734e9980-5fe2-11ea-9e48-7216e60f5f87.png)
![Screenshot from 2020-03-06 19-38-25](https://user-images.githubusercontent.com/56004081/76116738-747fc680-5fe2-11ea-9b03-b48858979866.png)
![Screenshot from 2020-03-06 19-38-30](https://user-images.githubusercontent.com/56004081/76116753-75b0f380-5fe2-11ea-87af-0ef95531b44e.png)
![Screenshot from 2020-03-06 19-38-34](https://user-images.githubusercontent.com/56004081/76116759-76e22080-5fe2-11ea-99a5-658ed14cb36c.png)
![Screenshot from 2020-03-06 19-38-55](https://user-images.githubusercontent.com/56004081/76116765-79447a80-5fe2-11ea-85cb-65ea38152161.png)

Aqui se muestra el funcionamiento de insomnia con nuestras llamadas get del y put. 

Seleccionamos la direccion de nuestro servidor y el fichero al que queremos realizar estas acciones.

Es muy fácil de usar y podemos simular como sería la interacción de una cliente haciendo request frente a nuestro servidor de una manera muy sencilla y rápida.



Por último se nos pide en la practica realizar una tarea donde generemos la opción de realizar directorios a la que llamaremos mkcol. El código que corresponde a esta tarea es el siguiente: 


![Screenshot from 2020-03-06 19-47-00](https://user-images.githubusercontent.com/56004081/76117186-45b62000-5fe3-11ea-801a-54a5169f1b36.png)


cabe destacar el uso del fs.mkdir que simplemente genera el directorio con el nombre uqe le hayamos querido dar en la ruta determinada. Añadimos el control de excepciones. Lanzamos la 400 puesto que ha habido algun error con la ruta prediseñada y si no terminamos la ejecución con el estatus 204





