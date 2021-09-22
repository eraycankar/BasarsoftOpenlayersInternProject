var add_neigh;
function addDaireInteraction() {
    add_neigh = new ol.interaction.Draw({
        source: source,
        type: 'Polygon'
    });

    map.addInteraction(add_neigh);
    add_neigh.setActive(false);

}

function ActiveNeigh() {
    add_neigh.setActive(true);
}

addDaireInteraction();



add_neigh.on('drawend', function (e) {

    var currentFeature = e.feature;

    var _coords = currentFeature.getGeometry().getCoordinates();
    var centerOperation = currentFeature.getGeometry().getExtent();
    var center = ol.extent.getCenter(centerOperation);

    add_neigh.setActive(false);
      

    jsPanel.create({
        id: "neigh_add_panel",
        theme: 'success',
        headerTitle: 'Add Neighbourhood',
        position: 'center-top 0 58',
        contentSize: '300 120',
        content: '<input class="form-control" id="neigh_name" style="height:30px" type="text" placeholder="Neighbourhood Name"/><br><div class="col text-center"><button class="btn btn-success" style="height:30px;width:60px" id="neigh_add" >Add</button>',
        callback: function () {
            this.content.style.padding = '15px';
        }
    });
    $("#neigh_x").text(center[0]);
    $("#neigh_y").text(center[1]);
    document.getElementById('neigh_add').onclick = function () {

        var neighName = $('#neigh_name').val();

        if (neighName.length < 1) {

            alert("Please enter neighbourhood name");

            return;
        }
        var i = 0;
        var result = "";
        while (i < 1) {
            for (j = 0; j < _coords[0].length; j++) {
                if (j == _coords[0].length - 1) {
                    result = result + _coords[i][j];

                } else {
                    result = result + _coords[i][j] + "*";
                }

            }
            i = 1;
        }

        var _data = {
            coordinates: result,
            neighborhoodName: neighName
        };
        $.ajax({
            type: "POST",
            url: "/Neighborhood/SaveNeighborhood",
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
                alert("Something went wrong");
            },
            onbeforeclose: function () {

                return onbeforeclose();
            },
        });
       
    }
});

function ListAllPolygons() {
    $.ajax({
        type: "GET",
        url: "/Neighborhood/GetAll",
        dataType: 'json',
        success: function (response) {

            var features = [];
            var coordList = [];
            var idList = [];

            for (var j = 0; j < response.length; j++) {
                var coords = [];
                var data = response[j];
                var code = data.neighborhoodId;
                var splittedCoords = data.coordinates.split('*');
                var neigh_name = data.neighborhoodName;


                for (var i = 0; i < splittedCoords.length; i++) {

                    var neighborhood = splittedCoords[i];
                    var sp = neighborhood.split(',');
                    coords.push([sp[0], sp[1]]);
                }

                coordList.push(coords);

                idList.push(code);


                var polygon = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'rgba(255, 56, 56,1.0)',
                        width: 1,

                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 107, 129,0.4)',
                    }),
                    points: 3,

                });

                for (var i = 0; i < coordList.length; i++) {

                    var feature = new ol.Feature({
                        code: code,
                        name: neigh_name,
                        type: 'Neighborhood',
                        geometry: new ol.geom.Polygon([coordList[i]])
                    });
                    let centerOperation = feature.getGeometry().getExtent();
                    let center = ol.extent.getCenter(centerOperation);
                    var featureID = idList[i];

                    feature.set("center", center);
                    feature.setId(featureID);
                    feature.set("adi", "123");


                    feature.setStyle(polygon);
                    features.push(feature);
                }
            }
            var neighSource = neighbourhood_layer.getSource();

            neighSource.addFeatures(features);

        },

        error: function () {
            alert("Something went wrong");
        },

    });
}

function EditNeighborhood() {

    var select = new ol.interaction.Select({
        layers: [neighbourhood_layer],
        multi: true,
        condition: ol.events.condition.click,
        toggleCondition: ol.events.condition.shiftKeyOnly,
    });

    var modify = new ol.interaction.Modify({
        features: select.getFeatures()
    });
    map.addInteraction(select);
    map.addInteraction(modify);


    modify.on('modifyend', function (e) {
        var newCoordinates = e.features.getArray()[0].getGeometry().getCoordinates();
        var leng = e.features.getArray()[0].getGeometry().getCoordinates().length;
        var neighId = e.features.getArray()[0].getId();
        var result = "";
        var i = 0;

        
        while (i < 1) {
            for (j = 0; j < newCoordinates[0].length; j++) {
                if (j == newCoordinates[0].length - 1) {
                    result = result + newCoordinates[i][j];

                } else {
                    result = result + newCoordinates[i][j] + "*";
                }

            }
            i = 1;
        }

        var _data = {
            result: result,
            id: neighId
        }

        var panel1 = jsPanel.create({
            id: "neigh_edit_panel",
            theme: 'success',
            headerTitle: 'Neighborhood Edit',
            position: 'center-top 0 58',
            contentSize: '370 150',

            content: '<div class="text-center"><h5>Do you want to save changes?</h5><button style="height:40px;width:60px;" id="neigh_edit" class="btn btn-success">Yes</button><button style="height:40px;width:60px;margin-left:10px;" id="neigh_edit_cancel" class="btn btn-danger">No</button></div>',
            callback: function () {
                this.content.style.padding = '20px';
            }
        });

        document.getElementById("neigh_edit").onclick = function () {
            panel1.close();
            $.ajax({
                type: "PUT",
                url: "/Neighborhood/Update",
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

    });

}


