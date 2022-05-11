const key = 'd61009a601fa46786ad8bc076c1cd143'

// Verifica se é possível obter a geolocalizção
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    getData(position.coords.latitude, position.coords.longitude);
  });
} else {
  getData(-23.5489, -46.6388)
  alert("Sinto muito, mas os serviços de geolocalização não são suportados pelo seu navegador. Por padrão, usaremos a geolocalização de São Paulo.");
}

// Função para pegar os dados da API
async function getData(lat, lon){
   try {
          const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=pt_br&units=metric`).then((res) => res.json()).then((d) => d)
          handleData(data)
      } catch (error) {
     console.error(error)
   }
}

// Função para tratar os dados
function handleData(data){
  const {id, main, description, icon} = data.weather[0]
  const cityName = data.name
  const temp = Math.round(data.main.temp)
  const humidity = data.main.humidity
  const showIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`
  template(showIcon, description, cityName, humidity, temp)
}

// Função para renderizar o template html
function template(showIcon, description, cityName, humidity, temp) {
  document.querySelector('main').innerHTML = `
    <h1>${cityName}</h1>
    <div class="container">
      <div class="temp">
        <h2>${temp}<span>°C</span></h2>
      </div>
      <div class="content">
        <img src="${showIcon}"/>
        <p>${description}</p>
        <p>umidade: <strong>${humidity}%</strong></p>
      </div>  
    </div>
  `
}
