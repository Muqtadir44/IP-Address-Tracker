
// ? -- Initializeing Leaflet Map -- Start --
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();


// const marker = L.marker([0, 0], { icon: locationIcon }).addTo(map);
// ? -- Initializeing Leaflet Map -- End --


$(document).ready(function () {
    // ? -- Submiting Form --Start--
    $(document).on('submit', '#form', function (event) {
        event.preventDefault();

        var flag;
        flag = true;


        var ip_value = $('#ip-input').val();
        if (ip_value == "") {
            flag = false;
            iziToast.error({
                theme: 'light',
                position: 'topRight',
                title: 'Error',
                message: 'Please enter an IP address or domain!',
            });
        }



        if (flag) {
            const apiKey = 'at_cN9sbigpoMYpA6dMC8QeqMzeMnJ2e';

            // ? -- Sending location Requset --
            // fetch(`https://ipapi.co/${ip_value}/json/`)
            // fetch(`https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ip_value}`)
            // .then(res => res.json())
            // .then(data => renderResults(data))
            // .catch(error => displayError(error));

            $.ajax({
                url :  `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ip_value}`,
                type : 'GET',
                dataType: 'json',
                error : (error) => {
                    displayError(error);
                },
                success : (data) => {
                    renderResults(data);
                },
            })

        } else {
            return false;
        }
    })
    // ? -- Submiting Form --End--

    function renderResults(data) {

        console.log(data)
        // if (data.error) {
        //     throw(`${data.reason}`);
        // }
        // ipEl.textContent = data.ip;
        // locationEl.textContent = `${data.city}, ${data.region}, ${data.country_name}`;
        // if (data.utc_offset !== null) {
        //     timezoneEl.textContent = 'UTC: ' + data.utc_offset.slice(0, 3) + ':' + data.utc_offset.slice(3);
        // }
        // else {
        //     timezoneEl.textContent = data.timezone;
        // }
        // ispEl.textContent = data.org;
        // map.setView([data.latitude, data.longitude], 13);
        // marker.setLatLng([data.latitude, data.longitude]);
        // marker.bindPopup(`<b>${data.ip}</b>`).openPopup();
    }

    function displayError(error){
        var msg = error.responseJSON.messages;
        iziToast.error({
            theme: 'light',
            position: 'topRight',
            title: 'Error',
            message: msg,
        });
    }
})
