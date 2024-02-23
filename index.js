function weaver() {
  // Coletando os dados do input
  let cep = document.querySelector('#cep').value;
  let latitude = document.querySelector('#latitude').value;
  let longitude = document.querySelector('#longitude').value;

 
  apiSearchCep();
  apiSearchTemp();

  // consumo da api viacep
  function apiSearchCep() {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`http error: status ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        alert(error.message);
      })
      .then(response => {
        displayCepResult(response);
        clearInputFields();
      });
  }

   // consumo da api open-meteo
  function apiSearchTemp() {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`http error: status ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        alert(error.message);
      })
      .then(response => {
        displayTempResult(response);
      });
  }

  function displayCepResult(cepInfo) {
    document.querySelector('#cepNum').textContent = `${cepInfo.cep || 'N/A'}`;
    document.querySelector('#localidade').textContent = `${cepInfo.localidade || 'N/A'}`;
    document.querySelector('#bairro').textContent = `${cepInfo.bairro === '' ? 'N/A' : cepInfo.bairro}`;
    document.querySelector('#uf').textContent = `${cepInfo.uf || 'N/A'}`;
    document.querySelector('#regiao').textContent = `${cepInfo.localidade || 'N/A'}`;
  }

  function displayTempResult(temperatureInfo) {
    const currentTemperature = temperatureInfo.current_weather ? temperatureInfo.current_weather.temperature : 'N/A';
    document.querySelector('#temperatura').textContent = `${currentTemperature} ºC`;
  }

  function clearInputFields() {
    document.querySelector('#primeiroNome').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#cep').value = '';
    document.querySelector('#latitude').value = '';
    document.querySelector('#longitude').value = '';
  }
}
