export type ZoomChangedEvent = {
    oldZoom: number,
    newZoom: number
}

export type GeoJson = {
    geoJson: object,
    showText?: boolean,
    fitMap?: boolean,
    colors?: string[]
}

export type HeatMap = {
    lat: number,
    lng: number
}[]