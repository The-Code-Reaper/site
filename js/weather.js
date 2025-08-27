document.addEventListener('DOMContentLoaded', () => {
    const apiKey = "6af65a3b1359d75986af6d7f536d61c4"; 
    let city = localStorage.getItem('userCity') || "";

    const timeElement = document.getElementById('time');
    const weatherBox = document.getElementById('weatherBox');

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function updateWeatherBox() {
        if (!city) return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(res => res.json())
            .then(data => {
                let emoji = '';
                const weather = data.weather[0].main;

                switch(weather) {
                    case 'Clear': emoji = '☀️'; break;
                    case 'Clouds': emoji = '☁️'; break;
                    case 'Rain': emoji = '🌧️'; break;
                    case 'Snow': emoji = '❄️'; break;
                    case 'Thunderstorm': emoji = '⛈️'; break;
                    default: emoji = '🌈'; break;
                }

                weatherBox.innerHTML = `${emoji}<br>${Math.round(data.main.temp)}°C<br>${data.name}`;
            })
            .catch(err => {
                weatherBox.innerHTML = `❌<br>Error`;
                console.error(err);
            });
    }

    // Initial placeholders
    updateTime();
    setInterval(updateTime, 1000);

    if (!city) {
        weatherBox.innerHTML = "🌤️<br>Click to set city";
    } else {
        updateWeatherBox();
        setInterval(updateWeatherBox, 600000); // refresh every 10 mins
    }

    // Click to set city
    weatherBox.addEventListener('click', () => {
        const userCity = prompt("Enter your city:");
        if (userCity && userCity.trim() !== "") {
            city = userCity.trim();
            localStorage.setItem('userCity', city);
            updateWeatherBox();
            setInterval(updateWeatherBox, 600000);
        }
    });
});
