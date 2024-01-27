let getDataBtn = document.querySelector('.btn');
let dataWeather = document.querySelector('#weather');
let search = document.querySelector('#search');
const API_KEY = `66641fcbdf8ff8e47ac0c186c0829aa7`;

// url fetch karre toh function async hona chhaiye
// units=metric kyuki naito temprature kelvin me milega naki celcius
const getweather = async (city) => {
  dataWeather.innerHTML = `Loading...`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return showWeather(data);
};

const showWeather = (data) => {
  if (data.cod == '404') {
    dataWeather.innerHTML = `City Not Found!`;
    return;
  }
  dataWeather.innerHTML = ` 

  <div class='tempData1'> 
  <label for='temparature'> Temperature in</label>
  <select name="temprature" id='temp-dropdown-id'>
      <option value="celsius"> celsius </option>
      <option value="fahrenheit">fahrenheit</option>
  </select>
 
 <p class='temparature' id = 'display-temp'> ${data.main.temp} </p>
 <p class='weatherType'>${data.weather[0].main}</p>
 <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' class='icon'/> </div>
   

   <div class='tempData2'>    
   <p>Humidity :- ${data.main.humidity}%</p>
   <p>wind speed :- ${data.wind.speed}km/h</p>
   <p>weather description :- ${data.weather[0].description}</p>
   </div>
`;

  const dropdown = document.getElementById('temp-dropdown-id');
  const displayTemp = document.getElementById('display-temp');
  dropdown.addEventListener('change', (e) => {
    let options = e.target.value;

    let result =
      options === 'celsius'
        ? data.main.temp
        : (data.main.temp * (9 / 5) + 32).toFixed(2);

    // console.log(result);
    // console.log(options);
    // console.log(data.main.temp);
    displayTemp.innerHTML = result;
  });
};

getDataBtn.addEventListener('click', function (e) {
  if (search.value.trim().length) {
    getweather(search.value.trim());
  }
});

search.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && search.value.trim().length > 0) {
    getweather(search.value.trim());
  }
});
