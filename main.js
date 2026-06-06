// Today's date
const showDateTime = (data) => {
  var timestampOffset=data.timezone;
  const timestamp = Math.floor(Date.now() / 1000) + timestampOffset ;
  const date = new Date(timestamp * 1000);

  const localTime = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC'
  });

  const localDate = date.toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  });

  
  document.querySelector('#dateContainer').innerHTML = localDate;
  document.querySelector('#timeContainer').innerHTML = localTime;
}


//search bar
const readInput = () => {
  return document.querySelector('.find').value;
}

document.querySelector('.find').addEventListener('keydown', (e) => {
  if (e.keyCode == 13){
    document.querySelector('.search').click();
  }
});

document.querySelector('.search').addEventListener('click', (e) => {
  callApi(readInput());
});


// Error Handling
const error = document.querySelector('.wrapper');

const homecoming = (() => {
  callApi('Kathmandu');
  error.style.display = 'none';
  document.querySelector('.find').value="";
})

// display fethced data in our web app
const displayTemperature = (data => {
  document.querySelector('.city').innerHTML = data.name;
  document.querySelector('.country').innerHTML = data.sys.country;
  document.querySelector('.cloud').src =  `https://openweathermap.org/img/w/${data.weather[0].icon}.png` ;
  document.querySelector('.celcius').innerHTML = Math.round(data.main.temp);
  document.querySelector('.description').innerHTML = data.weather[0].description.substring(0,1).toUpperCase() + data.weather[0].description.substring(1,);
  document.querySelector('.pascal').innerHTML = data.main.pressure;
  document.querySelector('.humid').innerHTML = data.main.humidity;
  document.querySelector('.speed').innerHTML = data.wind.speed;

  // passing description to change background accordingly
  changeBackground(data.weather[0].description);
                
})


// API calling
const callApi =  async (city) => {
  try{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)  
    const data = await res.json();
    showDateTime(data);
    displayTemperature(data);
  }
  catch(err) {
        error.style.display = 'grid';
  }
};
callApi('Kathmandu');

// change background according to weather
const backgrounds = {
  snow: `
  background: linear-gradient(rgba(12,12,12,0.8),rgba(12,12,12,0.8)),url(https://forsythwoman.com/wp-content/uploads/2019/12/SnowSafety.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
  `,

  wind: `
  background: linear-gradient(rgba(12,12,12,0.8),rgba(12,12,12,0.8)),url(https://caymancompass.s3.amazonaws.com/wp-content/uploads/2021/01/24164056/palms.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  `,

  thunder: `
  background: linear-gradient(rgba(12,12,12,0.8),rgba(12,12,12,0.8)),url(https://s7d2.scene7.com/is/image/TWCNews/lightning_jpg-8);
  background-repeat: no-repeat;
  background-size: cover;
  `,

  overcast:`
  background: linear-gradient(rgba(12,12,12,0.8),rgba(12,12,12,0.8)),url(https://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/editorial/d/f8/df8e368c-4521-11e9-8b2b-9fcb141d7381/5c884633ceb74.image.jpg?resize=1200%2C648);
  background-repeat: no-repeat;
  background-size: cover;
  `,

  cloud: `
    background: linear-gradient(rgba(12,12,12,0.8),rgba(12,12,12,0.8)),url(https://static.vecteezy.com/system/resources/thumbnails/027/223/563/small_2x/fluffy-soft-clouds-beautiful-cloudy-sky-dream-cloud-of-heaven-nature-background-or-backdrop-photo.jpg);
    background-repeat: no-repeat;
    background-size: cover;
  `,

  mist: `
    background: linear-gradient(rgba(12,12,12,0.8),rgba(12,12,12,0.8)),url(https://assets.telegraphindia.com/telegraph/2022/Dec/1671682647_fog.jpg);
    background-repeat: no-repeat;
    background-size: cover;
  `,

  rain: `
    background: linear-gradient(rgba(12,12,12,0.8),rgba(12,12,12,0.8)),url(https://img.freepik.com/free-photo/weather-effects-composition_23-2149853295.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703894400&semt=ais);
    background-repeat: no-repeat;
    background-size: cover;
  `,

  clear: `
    background: linear-gradient(rgba(12,12,12,0.8),rgba(12,12,12,0.8)),url(https://wallpapers.com/images/hd/clear-sky-with-wispy-clouds-zycncm0xf02v4a8i.jpg);
    background-repeat: no-repeat;
    background-size: cover;
  `,

  default: `
    background: linear-gradient(rgba(12,12,12,0.8),rgba(12,12,12,0.8)),url(https://static.vecteezy.com/system/resources/thumbnails/027/223/563/small_2x/fluffy-soft-clouds-beautiful-cloudy-sky-dream-cloud-of-heaven-nature-background-or-backdrop-photo.jpg);
    background-repeat: no-repeat;
    background-size: cover;
  `
};

const changeBackground = (weather) => {
  if(weather.indexOf('overcast') != -1)
  {
    // overcast background
    document.body.setAttribute('style', backgrounds.overcast);
  }
  
  else if((weather.indexOf('snow') != -1) || (weather.indexOf('blizzard') != -1))
  {
    // snowy background
    document.body.setAttribute('style', backgrounds.snow);
  }

  else if((weather.indexOf('thunder') != -1) || (weather.indexOf('lightning') != -1))
  {
    // thunderstorm background
    document.body.setAttribute('style', backgrounds.thunder);
  }

  else if(weather.indexOf('wind') != -1)
  {
    // windy background
    document.body.setAttribute('style', backgrounds.wind);
  }
  
  else if(weather.indexOf('cloud') != -1)
  {
    // cloudy background
    document.body.setAttribute('style', backgrounds.cloud);
  }

  else if ((weather.indexOf('rain') != -1) || (weather.indexOf('drizzle') != -1))
  {
    // rainy background
    document.body.setAttribute('style', backgrounds.rain);
  }

  else if ((weather.indexOf('mist') != -1) || (weather.indexOf('fog') != -1) || (weather.indexOf('smoke') != -1))
  {
    // misty background
    document.body.setAttribute('style', backgrounds.mist);
  }

  else if (weather.indexOf('clear') != -1)
  {
    // clear background
    document.body.setAttribute('style', backgrounds.clear);
  }

  else
  {
    // default background
    document.body.setAttribute('style', backgrounds.default);
  }

}