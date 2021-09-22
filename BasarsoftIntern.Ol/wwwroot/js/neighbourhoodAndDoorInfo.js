﻿var info;

function addInfoInteraction() {

    info = new ol.interaction.Draw({
        source: source,
        type: 'Point'
    });

    map.addInteraction(info);

    info.setActive(false);

}

function ActiveInfo() {
    info.setActive(true);
}


addInfoInteraction();

info.on('drawend', function (e) {

    map.on("click", function (event) {

        info.setActive(false);

        map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
            var code = feature.get('code');
            var _type = feature.get('name');
            var _id = feature.getId();
            var type = feature.get('type');
            var center = feature.get("center");


            if (_type == 'Door') {

                $.ajax({
                    url: '/Door/GetInfo',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        type: _type,
                        id: _id,
                    },
                    success: function (resp) {
                       
                        var content;

                        if (_type == 'Door') {

                            content = 'Door Number: <input id="new_no" type="text"  value=" ' + resp.info.doorNumber + ' "/></br>Neighborhood Name: <input id="info_neigh" type="text"  value=" ' + resp.info.neighborhoodName + ' "/><br></br>Neighborhood Code: <span id="neigh_num"></span><br><br>X: <span id="door_x"></span><br>Y: <span id="door_y"></span></br><button class="btn btn-info" id="update_door" style="margin-right:5px;margin-top:10px;">Save Changes</button><button class="btn btn-danger" id="delete_door" style="margin-top:10px;">Delete</button>';


                        }

                        jsPanel.create({
                            id: "show_info",
                            theme: 'success',
                            headerTitle: 'Door Information',
                            position: 'center-top 0 58',
                            contentSize: '300 330',
                            content: content,
                            callback: function () {

                                _type = "";
                                // _id = 0;
                                this.content.style.padding = '20px';
                            },
                        });

                        $("#neigh_num").text(resp.info.neighborhoodNumber);
                        $("#door_x").text(resp.info.x);
                        $("#door_y").text(resp.info.y);

                        var newNo;
                        $("#new_no").change(function () {
                            newNo = $("#new_no").val();
                        });


                        $("#delete_door").click(function () {
                            $.ajax({
                                type: "DELETE",
                                url: "/Door/Delete",
                                dataType: 'json',
                                data: {
                                    id: _id
                                },
                                success: function (response) {

                                    alert('Successfully deleted');
                                },
                                error: function () {
                                    alert('Something went wrong while deleting');
                                }
                            });
                        });

                        $("#update_door").click(function () {
                            $.ajax({
                                type: "PUT",
                                url: "/Door/Update",
                                dataType: 'json',
                                data: {
                                    id: _id,
                                    newNo: newNo
                                },
                                success: function (response) {

                                    alert('Successfully updated');
                                    

                                },
                                error: function () {
                                    alert('Something went wrong while deleting');
                                }
                            });
                        });
                    }


                })

            }

            else
                if (type == 'Neighborhood') {
                    var panel2 = jsPanel.create({
                        id: "show_n_info",
                        theme: 'success',
                        headerTitle: 'Neighborhood information',
                        position: 'center-top 0 58',
                        contentSize: '300 230',
                        content: 'Neighborhood Name : <input id="neigh_name" class="mb-2" type="text"   value=" ' + _type + '"/></br>Neighborhood Code : <span id="neigh_code"></span></br>Center X: <span id="neigh_center_x"></span><br>Center Y: <span id="neigh_center_y"></span><br><button class="btn btn-info" id="update_neigh" style="margin-right:5px;margin-top:10px;">Save Changes</button><button class="btn btn-danger" id="delete_neigh" style="margin-top:10px;">Delete</button>',
                        callback: function () {
                            this.content.style.padding = '20px';
                        },
                    });
                    var inputValue;
                    $("#neigh_name").change(function () {
                        inputValue = $("#neigh_name").val();
                    });
                    $("#neigh_code").text(code);
                    $("#neigh_center_x").text(center[0]);
                    $("#neigh_center_y").text(center[1]);
                    $("#delete_neigh").click(function () {
                        $.ajax({
                            type: "DELETE",
                            url: "/Neighborhood/Delete",
                            dataType: 'json',
                            data: {
                                code: code
                            },
                            success: function (response) {

                                alert('Successfully deleted');
                                setTimeout(function () {
                                    location.reload();
                                }, 2000);

                            },
                            error: function () {
                                 alert('Something went wrong while deleting');
                            }
                        });
                    });
                    $("#update_neigh").click(function () {
                        $.ajax({
                            type: "PUT",
                            url: "/Neighborhood/UpdateName",
                            dataType: 'json',
                            data: {
                                code: code,
                                newName: inputValue
                            },
                            success: function (response) {

                                alert('Successfully updated');
                                setTimeout(function () {
                                    location.reload();
                                }, 2000);

                            },
                            error: function () {
                                toastr.error('Something went wrong while deleting');
                            }
                        });
                    });

                }




        });
    });
})
