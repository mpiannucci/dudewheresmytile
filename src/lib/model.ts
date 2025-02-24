import { getChildren, pointToTile, tileToBBOX } from 'tilebelt'

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
    const bbox = tileToBBOX(tile)
    const children = getChildren(tile).map((child) => ({
        x: child[0],
        y: child[1],
        z: child[2],
        bbox: tileToBBOX(child) as [number, number, number, number],
    }))
    return {
        tile: { x: tile[0], y: tile[1], z: tile[2], bbox: bbox as [number, number, number, number] },
        children: children,
    }
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
