import { getChildren, pointToTile, tileToBBOX } from 'tilebelt'

export interface Tile {
    x: number
    y: number
    z: number
    bbox: [number, number, number, number]
    mercatorBbox: [number, number, number, number]
}

export interface CoordinateQueryResult {
    lat: number
    lon: number
    tile: Tile
    children: Tile[]
}

export type TileQueryResult = {
    tile: Tile
    children: Tile[]
}

export type QueryResult = CoordinateQueryResult | TileQueryResult

export interface CoordinateQuery {
    lat: number
    lon: number
    zoom: number
}

export interface TileQuery {
    x: number
    y: number
    z: number
}

export type Query = CoordinateQuery | TileQuery

function extractTileInfo(tile: number[]): {
    tile: Tile
    children: Tile[]
} {
    const bbox = tileToBBOX(tile) as [number, number, number, number]
    const mercatorBbox = latlngBboxToMercator(bbox)
    const children = getChildren(tile).map((child) => {
        const bbox = tileToBBOX(child) as [number, number, number, number]
        const mercatorBbox = latlngBboxToMercator(bbox)
        return {
            x: child[0],
            y: child[1],
            z: child[2],
            bbox: bbox,
            mercatorBbox: mercatorBbox,
        }
    })
    return {
        tile: { x: tile[0], y: tile[1], z: tile[2], bbox: bbox, mercatorBbox: mercatorBbox },
        children: children,
    }
}

function lngLatToMeters(lng: number, lat: number): [number, number] {
    const radius = 6378137; // Earth's radius in meters
    const maxLatitude = 85.0511287798; // Limit latitude to avoid infinite values

    let lat_ = Math.max(Math.min(lat, maxLatitude), -maxLatitude);
    let x = radius * Math.PI * lng / 180;
    let y = radius * Math.log(Math.tan((Math.PI / 4) + (lat_ * Math.PI / 360)));

    return [x, y];
}

function latlngBboxToMercator(bbox: [number, number, number, number]): [number, number, number, number] {
    const [minX, minY] = lngLatToMeters(bbox[0], bbox[1])
    const [maxX, maxY] = lngLatToMeters(bbox[2], bbox[3])
    return [minX, minY, maxX, maxY]
}

export function tileQuery(query: Query): QueryResult {
    if ('lat' in query) {
        const tile = pointToTile(query.lon, query.lat, query.zoom)
        return {
            ...extractTileInfo(tile),
            lat: query.lat,
            lon: query.lon,
        }
    } else {
        const tile = [query.x, query.y, query.z]
        return {
            ...extractTileInfo(tile),
        }
    }
}
