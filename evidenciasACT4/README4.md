ACTIVIDAD 4 

Para solucionar lo de la consulta , utilice grafo de GraphQL que me permite 
obtener datos relacionados en una peticion HTTP para asi evitar el problema 
de over-fetching o multiples llamadas al servidor 
se implemento tambien un servicio nativo con htttpClient que envia las queries
como objetos JSON en vez de usar librerias externas.

Estructura de la query: diseñe una query que recibe el id del episodio como 
variable $id: ID! dentro del nodo episode, solicite tambien: 

1.Datos del episodio: name,episode y air_date para el encabezado del modal
2.Relacion anidada: Accedí al nodo characters dentro del mismo episodio.
3.Datos de los personajes: Filtré los campos que eran utiles para la interfaz como la Imagen, status, species, name. Descartando la informacion no necesaria y optimizando la carga.
