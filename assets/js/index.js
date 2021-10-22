$(document).ready(function () {
    $("form").submit(function (event) {

        event.preventDefault();
        let valueInput = $("#pokemonInput").val();

        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + valueInput,
            success: function (data) {
                let nombre = data.name
                let imagen = data.sprites.front_default
                let peso = data.weight

                $("#pokeinfo").html(`
        <div class="text-center">
            <h3>${nombre}</h3>
            <img src="${imagen}" />
            <h6>Peso: ${peso}</h6>
        </div>

        `)

                let estadisticas = []

                data.stats.forEach(function(s){
                    estadisticas.push({
                        label: s.stat.name,
                        y : s.base_stat,
                    })
                })

                let config = {
                    animationEnabled : true,
                    title: {
                        text: "Estadisticas"
                    },
                    axisY: {
                        title: "Valor",
                    },
                    axisX: {
                        title: "Estadistica",
                    },
                    data: [
                    {
                        type: "column",
                        dataPoints: estadisticas,
                    },
                ],
            };
            let chart = new CanvasJS.Chart("pokestats",config);

            chart.render()
            },
        });


    });

});