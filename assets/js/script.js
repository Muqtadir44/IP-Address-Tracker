
// ? -- Initializeing Leaflet Map -- Start --
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
.bindPopup('A pretty CSS popup.<br> Easily customizable.')
.openPopup();

// ? -- Initializeing Leaflet Map -- End --


// ? -- Submiting Form --
$(document).ready(function(){
    $(document).on('submit','#form',function(event){
        event.preventDefault();
        
        var flag;
        flag = true;
        
        
        var ip_value = $('#ip-input').val();
        if (ip_value == "") {
            flag = false;
            // Swal.fire({
            //     icon: "error",
            //     text: "Please enter an IP address or domain!",
            //   });
        }

        if (flag) {
            
        } else {
            return false;
        }
    })
})