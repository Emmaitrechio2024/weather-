const API_KEY = 'd0d8259eabaf320816d2f1a7be496c01'; 

const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const resultDiv = document.getElementById('weatherResult');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    errorMsg.classList.add('hidden');
    resultDiv.classList.add('hidden');

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) throw new Error('City not found');

    const data = await res.json();

    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temp').textContent = data.main.temp;
    document.getElementById('desc').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = data.wind.speed;

    resultDiv.classList.remove('hidden');
  } catch (err) {
    errorMsg.textContent = err.message;
    errorMsg.classList.remove('hidden');
  }
});
