function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      document.getElementById('location').innerText = "Geolocation is not supported by this browser.";
    }
  }
  
  function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    const apiKey = "a3859f4386a0428c9f02299dac68bd18";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const components = data.results[0].components;
        const city = components.city || components.town || components.village || "Unknown city";
        const country = components.country || "Unknown country";
        document.getElementById('location').innerText = `You are in: ${city}, ${country}`;
      })
      .catch(error => {
        document.getElementById('location').innerText = "Error fetching location details.";
        console.error('Reverse geocoding failed:', error);
      });
  }
  
  function errorCallback(error) {
    document.getElementById('location').innerText = "Location access denied or unavailable.";
  }
  