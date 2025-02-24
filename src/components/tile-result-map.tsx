
import { useRef } from 'react'
import { QueryResult } from '../lib/model'
import { Map } from './ui/map'

export interface TileResultMapProps {
    className?: string
    result: QueryResult
}

export function TileResultMap({ result, className }: TileResultMapProps) {
    const mapRef = useRef<mapboxgl.Map>(null)
    const mapContainerRef = useRef<HTMLDivElement>(null)

    return (
        <div className={className} key={result.tile.x + result.tile.y + result.tile.z}>
            <Map mapRef={mapRef} mapContainerRef={mapContainerRef} />
        </div>
    )
}
