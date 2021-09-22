$(window).on('load', function () {
    GetDoorDto();
    ListAllPoints();
    ListAllPolygons(); 
});
var raster = new ol.layer.Tile({
    source: new ol.source.BingMaps({
        key: "ArLvUP2 - JKBzj_P_5_IqnLzKiy9b0UZypwnX2X - lFrTiDva6D9QP7AIDMF4PyK5u",
        imagerySet: 'AerialWithLabels',
        projection: 'EPSG:3857'
    })
});

var source = new ol.source.Vector({ wrapX: false });

var vector = new ol.layer.Vector({
    source: source
});

var door_layer = new ol.layer.Vector({
    source: new ol.source.Vector()
});


var neighbourhood_layer = new ol.layer.Vector({
    source: new ol.source.Vector()
});

var map = new ol.Map({
    layers: [raster, vector, door_layer, neighbourhood_layer],
    target: 'map',
    view: new ol.View({
        center: ol.proj.fromLonLat([35.0123, 38.9921]),
        zoom: 5.7,
        projection: "EPSG:3857",
        
    })
});


   


function GetEditItem() {
    var selectedItem = $("#neigh_list  option:selected").html();
    if (selectedItem == "Edit Neighborhood") {
        EditNeighborhood();
    } else if (selectedItem == "Edit Door") {
        EditDoor();
    }
}