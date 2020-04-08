let myStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'rgba(0,0,0,0.4)',
        width: 1
    }),
    fill: new ol.style.Fill({
        color: '#000'
    }),
    text: new ol.style.Text({
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({
            color: '#000'
        })
    })
});

function setupMap(mapData) {
    let vectorSource = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(mapData, {
            featureProjection: 'EPSG:3857'
        })
    });

    let vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: (feature) => {
            myStyle.getFill().setColor(Math.random() > 0.5 ? 'rgba(17,34,51,0.2)' : 'rgba(17,255,170,0.2)');
            myStyle.getText().setText(feature.get('name'));
            return myStyle;
        }
    });

    let map = new ol.Map({
        layers: [
            // new ol.layer.Tile({
            //     source: new ol.source.OSM()
            // }),
            vectorLayer
        ],
        target: 'map',
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        })
    });
}