window.addEventListener('load', function () {
    let apiKey = '9637845d';
    let botao = document.getElementById('pesquisar');
    botao.addEventListener('click', function () {
        let cidade = document.getElementById('cidade').value;
        let url = `https://api.hgbrasil.com/weather?format=json-cors&key=${apiKey}&city_name=${cidade}`;

        let xhr = new XMLHttpRequest();

        xhr.open("GET", url, false); //true assincrona e false sincrona
        xhr.onreadystatechange = function () {//Função a ser chamada quando a requisição retornar do servidor
            if (xhr.readyState == 4 && xhr.status == 200) {//Verifica se o retorno do servidor deu certo
                let data = JSON.parse(this.responseText);
                getInfo(data);
                getWeek(data);

            }
        }
        xhr.send();

        function getInfo(data) {
            let temperatura = data.results.temp;
            let date = data.results.date;
            let time = data.results.time;
            let description = data.results.description;
            let img = data.results.img_id;
            document.getElementById('imagem').innerHTML += `<img src='https://assets.hgbrasil.com/weather/images/${img}.png'><br>`;
            document.getElementById('temperatura').innerText = `Temperatura °C ${temperatura}`;
            document.getElementById('date').innerText = `Data ${date}`;
            document.getElementById('time').innerText = `Hora ${time}`;
            document.getElementById('description').innerText = description;

        }

        function getWeek(data) {
            let teste = data.results.forecast;
            console.log(teste);
            
            for (let i = 0; i < teste.length; i++) {
                const result = teste[i];

                let date = result.date;
                let weekday = result.weekday;
                let max = result.max;
                let min = result.min;
                let description = result.description;
                let resultWeek = document.getElementById('week');

                resultWeek.innerHTML += "<div class='weekresult'>";
                resultWeek.innerHTML += `<p>Data ${date}</p>`;
                resultWeek.innerHTML += `<p>Dia da Semana ${weekday}</p>`;
                resultWeek.innerHTML += `<p>Máxima de ${max} °C</p>`;
                resultWeek.innerHTML += `<p>Mínima de ${min} °C</p>`;
                resultWeek.innerHTML += `<p>Descrição ${description}</p>`;
                resultWeek.innerHTML += "</div>";
                
            }
            
        }

    });

});
