let myStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'rgba(0,0,0,0.4)',
        width: 0
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

class OlMap {
    constructor(options) {
        this.options = options;
        this.heatMapLayers = [];
        this.map = this.setupMap(options);

        this.defaultGeoJsonColor = 'rgba(0,0,0,0.0)'
    }

    addGeoJSON(data) {
        let vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(data.geoJson, {
                featureProjection: 'EPSG:3857'
            })
        });

        let vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: (feature) => {
                myStyle.getFill().setColor(feature.getProperties()['color'] ?? this.defaultGeoJsonColor);
                if (data.showText) {
                    myStyle.getText().setText(feature.get('name'));
                }
                return myStyle;
            }
        });

        this.map.addLayer(vectorLayer);
        let layerExtent = vectorLayer.getSource().getExtent();
        if (layerExtent) {
            this.map.getView().fit(layerExtent);
        }
    }

    setHeatMapLayer(data, removeOthers = true) {
        if (removeOthers) {
            while (this.heatMapLayers.length > 0) {
                this.map.removeLayer(this.heatMapLayers.pop());
            }
        }
        let heatmapLayer = this.makeHeatmapLayer(data);
        this.heatMapLayers.push(heatmapLayer);
        this.map.addLayer(heatmapLayer);
    }

    makeHeatmapLayer(data) {
        return new ol.layer.Heatmap({
            source: this.makeHeatmapVectorSource(data),
            blur: 20,
            radius: 20,
            weight: () => 10
        })
    }

    makeHeatmapVectorSource(data) {
        var vectorSource = new ol.source.Vector();
        for (let i = 0; i < data.length; i++) {
            let d = data[i];
            let coord = ol.proj.fromLonLat([d['lng'], d['lat']]);
            let lonLat = new ol.geom.Point(coord);
            let pointFeature = new ol.Feature({
                geometry: lonLat,
                weight: 6
            });
            vectorSource.addFeature(pointFeature);
        }
        return vectorSource;
    }

    setupMap(options) {
        let map = new ol.Map({
            target: 'map',
            view: new ol.View({
                center: [0, 0],
                zoom: 2
            })
        });
        if (options.showMap) {
            map.addLayer(
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            )
        }
        if (options.disableInteractions) {
            map.getControls().getArray().forEach((item) => map.removeControl(item));
            map.getInteractions().getArray().forEach((item) => map.removeInteraction(item));
        }
        return map;
    }
}