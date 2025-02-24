import { useEffect, useRef, useState } from 'react'
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
    const [mapLoaded, setMapLoaded] = useState(false)

    useEffect(() => {
        const map = mapRef.current
        if (!map) return

        if (!mapLoaded) {
            map.on('load', () => {
                setMapLoaded(true)
            })
            return
        }

        if ('lat' in result && 'lon' in result) {
            // Add marker at the specified coordinates
            new mapboxgl.Marker().setLngLat([result.lon, result.lat]).addTo(map)

            map.setCenter([result.lon, result.lat])
        } else {
            map.setCenter([
                (result.tile.bbox[2] + result.tile.bbox[0]) / 2,
                (result.tile.bbox[3] + result.tile.bbox[1]) / 2,
            ])
        }

        const mapZoom = result.tile.z - 2
        map.setZoom(Math.max(mapZoom, 1))

        // Add a rectangular shape layer for the tile bounds
        map.addSource('tile-bounds', {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [result.tile.bbox[0], result.tile.bbox[1]], // SW
                            [result.tile.bbox[2], result.tile.bbox[1]], // SE
                            [result.tile.bbox[2], result.tile.bbox[3]], // NE
                            [result.tile.bbox[0], result.tile.bbox[3]], // NW
                            [result.tile.bbox[0], result.tile.bbox[1]], // Back to SW to close polygon
                        ],
                    ],
                },
            },
        })

        map.addLayer({
            id: 'tile-bounds-fill',
            type: 'fill',
            source: 'tile-bounds',
            paint: {
                'fill-color': '#ff7700',
                'fill-opacity': 0.1,
            },
        })

        map.addLayer({
            id: 'tile-bounds-line',
            type: 'line',
            source: 'tile-bounds',
            paint: {
                'line-color': '#ff7700',
                'line-width': 2,
            },
        })

        return () => {
            // Remove marker on cleanup
            const markers = document.getElementsByClassName('mapboxgl-marker')
            Array.from(markers).forEach((marker) => marker.remove())

            // Remove tile bounds on cleanup
            map.removeLayer('tile-bounds-fill')
            map.removeLayer('tile-bounds-line')
            map.removeSource('tile-bounds')
        }
    }, [mapRef.current, result, mapLoaded])

    return (
        <div className={className}>
            <Map mapRef={mapRef} mapContainerRef={mapContainerRef} />
        </div>
    )
}
