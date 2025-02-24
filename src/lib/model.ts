import { pointToTile, tileToBBOX } from 'tilebelt'

export interface Tile {
    x: number
    y: number
    z: number
    bbox: [number, number, number, number]
}

export interface CoordinateQueryResult {
    lat: number
    lon: number
    tile: Tile
}

export type TileQueryResult = {
    tile: Tile
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

export function tileQuery(query: Query): QueryResult {
    if ('lat' in query) {
        const tile = pointToTile(query.lon, query.lat, query.zoom)
        const bbox = tileToBBOX(tile)
        return {
            tile: {
                x: tile[0],
                y: tile[1],
                z: tile[2],
                bbox: bbox as [number, number, number, number],
            },
            lat: query.lat,
            lon: query.lon,
        }
    } else {
        const tile = [query.x, query.y, query.z]
        const bbox = tileToBBOX(tile)
        return {
            tile: {
                x: tile[0],
                y: tile[1],
                z: tile[2],
                bbox: bbox as [number, number, number, number],
            },
        }
    }
}
