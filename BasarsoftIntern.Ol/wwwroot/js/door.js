﻿var door;
function addDoorInteraction() {
    door = new ol.interaction.Draw({

        source: source,
        type: 'Point'
    });

    map.addInteraction(door);
    door.setActive(false);

}

function ActiveDoor() {
    door.setActive(true);
}

addDoorInteraction();


door.on('drawend', async function (e) {
    if (map.getView().getZoom() < 3) {
        jsPanel.create({
            id: "door_add_error",
            theme: 'danger',
            headerTitle: 'Door Add Error',
            position: 'center-top 0 58',
            contentSize: '300 100',
            content: 'You can\'t add door in this zoom',
            callback: function () {
                this.content.style.padding = '20px';
            }
        });
    } else {

        var neighResult;
        var neighId;
        var neighCode;

        var sonuc;
        var intersects = false;
        
        await map.on("click", function (event) {
           
            neighbourhood_layer.getSource().getFeatures().forEach(function (obje) {

                var objeExtend = obje.getGeometry().getExtent();

                sonuc = ol.extent.intersects(objeExtend, e.feature.getGeometry().getExtent());

                if (sonuc) {
                    intersects = true;
                }

                console.log(sonuc);
            }
            );
            map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {

                neighResult = feature.get('name');
                neighCode = feature.get('code');
                neighId = feature.getId();

              });
        });
        var currentFeature = e.feature;

        

        

        var coords = currentFeature.getGeometry().getCoordinates();
        door.setActive(false);

       

        if (intersects && sonuc != null) {

            var panel12 = jsPanel.create({
                id: "door_add_panel",
                theme: 'success',
                headerTitle: 'Add door',
                position: 'center-top 0 58',
                contentSize: '280 280',
                content: '<div class="container"><span id="neigh"></span><br/>Id: <span id="neigh_code"></span><br/><br/>X: <span id="xcord"></span><br/> Y: <span id="ycord"></span><br/><br/><input id="door_no" type="text" placeholder="Door Number"/><br/> <br/><div class="col text-center"><button class="btn btn-success" style="height:35px;width:60px" id="door_add">Add</button></div></div>',
                callback: function () {
                    this.content.style.padding = '20px';
                }
            });
            

            document.getElementById("xcord").innerHTML = coords[0].toString().replace('.', ',');
            document.getElementById("ycord").innerHTML = coords[1].toString().replace('.', ',');
            document.getElementById("neigh").innerHTML = neighResult;
            document.getElementById("neigh_code").innerHTML = neighId;

            document.getElementById('door_add').onclick = function () {

                var no = $('#door_no').val();

                if (no.length < 1) {

                    alert("Please enter a door number");

                    return;
                }

                var _data = {
                    x: coords[0].toString().replace('.', ','),
                    y: coords[1].toString().replace('.', ','),
                    doorNumber: no,
                    neighborhoodNumber: neighId
                };

                $.ajax({
                    type: "POST",
                    url: "/Door/SavePoint",
                    dataType: 'json',
                    data: _data,
                    success: function (message) {
                        alert('Successfully added');
                        door.setActive(false);
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    },

                    error: function () {
                        alert('Something went wrong');
                    },
                    onbeforeclose: function () {
                        return onbeforeclose();
                    },
                });
                intersects = false;
            }
        }
        else {
            alert('you cannot add door outside of neighbourhood');
        }
    }
});

function ListAllPoints() {

    $.ajax({
        type: "GET",
        url: "/Door/GetAll",
        dataType: 'json',
        success: function (response) {

            var features = [];

            for (var i = 0; i < response.length; i++) {
                var point = response[i];
                var id = point.id;
                var geo = new ol.geom.Point([point.x, point.y]);
                var name = point.doorNumber;
                $('#door_list').append($('<option>',
                    {
                        value: id,
                        text: name
                    }));

                var feature = new ol.Feature({
                    name: "Door",
                    geometry: geo,
                    isDoor: true

                });


                feature.setId(id);

                var style = new ol.style.Style({
                    image: new ol.style.Circle({
                        fill: new ol.style.Fill({
                            color: 'black',
                        }),
                        stroke: new ol.style.Stroke({
                            color: 'red',
                            width: 2
                        }),
                        points: 8,
                        radius: 10
                    }),
                });


                feature.setStyle(style);

                features.push(feature);
            }


            var pointSource = door_layer.getSource();

            pointSource.addFeatures(features);
        },

        error: function () {
            alert("Something went wrong");
        },

    });
};

var filteredDoor;
function GetDoorDto() {

    $.ajax({
        type: "GET",
        url: "/Door/GetAllDoorDto",
        dataType: 'json',
        success: async function (response) {
            if (response == null) {
                 alert("Not found");
            } else {

                for (var i = 0; i < response.info.length; i++) {

                    $("#doorInfo tbody").append("<tr><td>" + response.info[i].neighborhoodName + "</td><td>" + response.info[i].doorNumber + "</td><td><button onclick='filter(this.value)' value=" + response.info[i].id + " class='btn btn-success fkir'>Show</button></td></tr>");

                }

            }
        }

    });
}
function togglePanel() {
    if ($("#searchPanel").css("display") == "none") {
        $("#searchPanel").css("display", "block");
    } else if ($("#searchPanel").css("display") == "block") {
        $("#searchPanel").css("display", "none");
    }
}

function filter(val) {
    var _data = {
        id: val
    }
    $.ajax({
        type: 'GET',
        url: '/Door/Filter',
        data: _data,
        success: function (response) {
            if (response == null) {
                alert("Door not found");
            } else {
                map.setView(new ol.View({
                    projection: 'EPSG:3857',
                    center: [response.x, response.y],
                    zoom: 18
                }));
            }


        }

    });
}

function filteredResult() {

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("doorInfo");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }


}

function EditDoor() {

    var select = new ol.interaction.Select({
        layers: [door_layer],

    });
   

    var modify = new ol.interaction.Modify({
        features: select.getFeatures()
    });
    map.addInteraction(select);
    map.addInteraction(modify);
   
    var sonuc;
    var intersects = false;

    modify.on('modifyend', function (e) {


        neighbourhood_layer.getSource().getFeatures().forEach(function (obje) {

            var objeExtend = obje.getGeometry().getExtent();

            sonuc = ol.extent.intersects(objeExtend, e.features.getArray()[0].getGeometry().getExtent());

            console.log(sonuc);

            if (sonuc) {
                intersects = true;
            } 
            
            
        });
        

        if (intersects && sonuc != null) {

            var newCoordinates = e.features.getArray()[0].getGeometry().getCoordinates();


            var doorId = e.features.getArray()[0].getId();

            var _data = {
                x: newCoordinates[0].toString().replace('.', ','),
                y: newCoordinates[1].toString().replace('.', ','),
                id: doorId
            }

            var panel1 = jsPanel.create({
                id: "door_edit_panel",
                theme: 'success',
                headerTitle: 'Door Edit',
                position: 'center-top 0 58',
                contentSize: '370 150',

                content: '<div class="text-center"><h5>Do you want to save changes?</h5><button style="height:40px;width:60px;" id="door_edit" class="btn btn-success">Yes</button><button style="height:40px;width:60px;margin-left:10px;" id="neigh_edit_cancel" class="btn btn-danger">No</button></div>',
                callback: function () {
                    this.content.style.padding = '20px';
                }
            });

            document.getElementById("door_edit").onclick = function () {
                panel1.close();
                $.ajax({
                    type: "PUT",
                    url: "/Door/UpdateCoord",
                    dataType: 'json',
                    data: _data,
                    success: function (response) {
                        alert('Successfully updated');
                    },
                    error: function () {
                        alert('Something went wrong while updating');
                    }
                });
            }
        } else {
            alert("Door can not be outside of Neighbourhood");
            intersects = false;
        }
        
    });

}




