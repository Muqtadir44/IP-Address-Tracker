
// ? -- Initializeing Leaflet Map -- Start --
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// ? -- Initializeing Leaflet Map -- End --


$(document).ready(function () {
    // ? -- Submiting Form --Start--
    $(document).on('submit', '#form', function (event) {
        event.preventDefault();
        $('#cover-spin').show(0)

        $('#ip-info').text("");
        $('#location-info').text("");
        $('#isp-info').text("");
        $('#timezone-info').text("");

        var flag;
        flag = true;


        var ip_value = $('#ip-input').val();
        if (ip_value == "") {
            $('#cover-spin').hide(0)

            flag = false;
            iziToast.error({
                theme: 'light',
                position: 'topRight',
                title: 'Error',
                message: 'Please enter an IP address!',
            });
        }


        if (flag) {
            $('#cover-spin').show(0)
            const apiKey = 'at_cN9sbigpoMYpA6dMC8QeqMzeMnJ2e';

            // ? -- Sending location Requset --
            $.ajax({
                url: `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip_value}`,
                type: 'GET',
                dataType: 'json',
                error: (error) => {
                    $('#cover-spin').hide(0)
                    responseError(error);
                },
                success: (data) => {

                    $('#cover-spin').hide(0)
                    $('#info').css('display','flex')
                    $('#info').prop('data-aos-delay')
                    responseSuccess(data);
                },
            })

        } else {
            return false;
        }
    })
    // ? -- Submiting Form --End--

    function responseSuccess(data) {
        $('#ip-info').text(data.ip);
        $('#location-info').text(`${data.location.city}, ${data.location.country}, ${data.location.region}`);
        $('#isp-info').text(data.isp);

        $('#timezone-info').text(data.location.timezone);

        map.setView([data.location.lat, data.location.lng], 13);
        L.marker([data.location.lat, data.location.lng]).addTo(map)
            .bindPopup(`<b>${data.location.city}, ${data.location.country}</b>`)
            .openPopup();
    }

    function responseError(error) {
        var msg = error.responseJSON.messages;
        iziToast.error({
            theme: 'light',
            position: 'topRight',
            title: 'Error',
            message: msg,
        });
    }
})
