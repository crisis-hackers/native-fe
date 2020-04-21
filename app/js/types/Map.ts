export type ZoomChangedEvent = {
    oldZoom: number,
    newZoom: number
}

export type GeoJson = {
    geoJson: object,
    showText?: boolean,
    fitMap?: boolean,
    colors?: GeoJsonColors
}

export type GeoJsonColors = { [key: string]: string }

export type HeatMap = {
    lat: number,
    lng: number
}[]