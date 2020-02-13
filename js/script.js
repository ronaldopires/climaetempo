window.addEventListener('load', function() {
    let apiKey = '291edb0a';
    let botao = document.getElementById('pesquisar');
    botao.addEventListener('click', function() {
        let cidade = document.getElementById('cidade').value;
        let url = `https://api.hgbrasil.com/weather?locale=pt&format=json-cors&key=${apiKey}&city_name=${cidade}`;

        let xhr = new XMLHttpRequest();

        xhr.open("GET", url, false); //true assincrona e false sincrona
        xhr.onreadystatechange = function() { //Função a ser chamada quando a requisição retornar do servidor
            if (xhr.readyState == 4 && xhr.status == 200) { //Verifica se o retorno do servidor deu certo
                let data = JSON.parse(this.responseText);
                getInfo(data);
                getWeek(data);
                console.log(data);
            }
        }
        xhr.send();

        function getInfo(data) {
            let temperatura = data.results.temp;
            let date = data.results.date;
            let time = data.results.time;
            let description = data.results.description;
            let img = data.results.img_id;
            let humidity = data.results.humidity;



            document.getElementById('imagem').innerHTML += `<img src='https://assets.hgbrasil.com/weather/images/${img}.png'><br>`;
            document.getElementById('temperatura').innerText = `Temperatura ${temperatura} °C`;
            document.getElementById('date').innerText = `Data ${date}`;
            document.getElementById('time').innerText = `Hora ${time}`;
            document.getElementById('description').innerText = `Descrição ${description}`;
            document.getElementById('humidade').innerText = `Humidade ${humidity}`;


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

                resultWeek.innerHTML += "<tr>";
                resultWeek.innerHTML += "<th>Data</th>";
                resultWeek.innerHTML += "<th>dia da Semana</th>";
                resultWeek.innerHTML += "<th>Máxima</th>";
                resultWeek.innerHTML += "<th>Mínima</th>";
                resultWeek.innerHTML += "<th>Descrição</th>";
                resultWeek.innerHTML += "</tr>";
                resultWeek.innerHTML += "<tr>";
                resultWeek.innerHTML += `<td>${date}</td>`;
                resultWeek.innerHTML += `<td>${weekday}</td>`;
                resultWeek.innerHTML += `<td>${max} °C </td>`;
                resultWeek.innerHTML += `<td>${min} °C</td>`;
                resultWeek.innerHTML += `<td>${description}</td>`;
                resultWeek.innerHTML += "<tr>";

            }

        }

    });

});