$(document).ready(function () {
    $("form").submit(function (event) { //evento del elemento
        event.preventDefault();

        let valueInput = $("#pokemonInput").val();




        // Uso de consulta AJAX  - declaracion de metodo AJAX 
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + valueInput,   // se define como argumento este objeto de configuracion la url de la API concatenado con el valor INPUT
            success: function (data) {

                let nombre = data.name;
                let imagen = data.sprites.front_default;
                let peso = data.weight;


                $("#pokeInfo").html(`

                    <div class="text-center">
                        <h3>${nombre}</h3>
                        <img src="${imagen}"/>
                        <h6>Peso: ${peso} </h6>

                    </div>

                    `);

                    //CANVAJS

                let estadisticas = [];

                data.stats.forEach(function(s) {

                    estadisticas.push({
                        label: s.stat.name,
                        y: s.base_stat,
                    });
                });


                let config = {
                    animationEnabled: true,
                    title: {
                        text: "Estadísticas",
                    },
                    axisY: {
                        title: "Valor", //eje vertical
                    },
                    axisX: {
                        title: "Estadistica",
                    },
                    data: [ //DATA es un arreglo de objetos 
                        {
                            type: "column",
                            dataPoints: estadisticas,
                        },
                    ],
                };

                //renderizar

                let chart = new CanvasJS.Chart("pokeStats", config); //crear instancia de la clase que nos entrega el CDN de canvajs
                
                chart.render();

            },
        });
    });
});

//utilizar el valor del input que se acaba de confirmar y almacenado en una variable para concatenarlo a la consulta AJAX que se emitirá a la API
//lo que hace esto es generar un sting de una concatenación de la API con el valor de la variable
//el succes es un atributo del objeto de configuracion del ajax que recibirá como parametro en su funci+on, la DATA correspondiente a la API

//GRAFICA CON CANVA.JS

//el DATAPOINTS es un arreglo de objetos que contempla los valores de cada columna
//STATS nos da el arreglo con las estadisticas de cada pokemon, necesitamos darle a los datapoints las estadísticas personalizadas 
/*creamos una variable estadisticas con un arreglo vacio que iremos llenando por cada una de las estadisticas correspondientes a cada pokemon, es decir
utilizamos data.stats (para ingresar al arreglo de objetos), siendo un arreglo ocupamos el metodo forEchach, aquí lo que haremos será declarar que le haremos un push
de un objeto personalizado.
 con el FOREACH estamos creando nuestro propio arreglo de objetos, a paertir de otro arreglo de objetos, esto para poder personalizar el modelo de datos 
 
*/

/* PARA RENDERIZAR CANVAJS, necesitamos copiar el script correspondiente, este puede ser cualquier script de cualquier gráfico de canva.js, pegamos en nuestro HTML, antes de los 
scripts locales (arriba del index.js)
lo sieguiente será creaer la instancia como tal de la clase que nos estrega el CDN de canvasJS. Para eso, creamos lavariable CHART y copiamos el CanvasJS.Chart()
la cual recibe como primer argumento EL ID correspondiente al DIV donde se va a renderizar la gráfica, que en este caso es el pokeStats y en el segundo parametro sería el objeto de configuración
en este caso es CONFIG. luego renderizamos con el método RENDER() (tal como lo muestra el código de canva.js)


*/