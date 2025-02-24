
import { useEffect, useRef } from 'react'
import { QueryResult } from '../lib/model'
import { Map } from './ui/map'
import mapboxgl from 'mapbox-gl'
export interface TileResultMapProps {
    className?: string
    result: QueryResult
}

export function TileResultMap({ result, className }: TileResultMapProps) {
    const mapRef = useRef<mapboxgl.Map>(null)
    const mapContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const map = mapRef.current
        if (!map || !('lat' in result && 'lon' in result)) return

        // Add marker at the specified coordinates
        new mapboxgl.Marker()
            .setLngLat([result.lon, result.lat])
            .addTo(map)

        return () => {
            // Remove marker on cleanup
            const markers = document.getElementsByClassName('mapboxgl-marker')
            Array.from(markers).forEach(marker => marker.remove())
        }
    }, [result])

    return (
        <div className={className}>
            <Map mapRef={mapRef} mapContainerRef={mapContainerRef} />
        </div>
    )
}
