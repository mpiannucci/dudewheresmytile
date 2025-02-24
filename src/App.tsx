'use client'

import { useSearchParams, BrowserRouter, Routes, Route } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { QueryResult, CoordinateQuery, TileQuery, tileQuery } from './lib/model'
import { TileResultMap } from './components/tile-result-map'
import TileResultInfo from './components/tile-result-info'
import TileResultFooter from './components/tile-result-footer'
import TileCoordinateQueryForm from './components/tile-coordinate-query-form'
import TileExistingQueryForm from './components/tile-existing-query-form'
import { useEffect } from 'react'

function TileApp() {
    const [searchParams, setSearchParams] = useSearchParams()

    // Get values from URL query parameters
    const lat = searchParams.get('lat') || ''
    const lon = searchParams.get('lon') || ''
    const zoom = searchParams.get('zoom') || ''
    const tileX = searchParams.get('x') || ''
    const tileY = searchParams.get('y') || ''
    const tileZ = searchParams.get('z') || ''

    // Calculate result based on URL parameters
    const result = calculateResultFromParams(searchParams)

    // Helper function to calculate result from URL parameters
    function calculateResultFromParams(params: URLSearchParams): QueryResult | null {
        if (params.has('lat') && params.has('lon') && params.has('zoom')) {
            const latFloat = Number.parseFloat(params.get('lat') || '')
            const lonFloat = Number.parseFloat(params.get('lon') || '')
            const zoomInt = Number.parseInt(params.get('zoom') || '')

            if (!isNaN(latFloat) && !isNaN(lonFloat) && !isNaN(zoomInt)) {
                const query: CoordinateQuery = { lat: latFloat, lon: lonFloat, zoom: zoomInt }
                return tileQuery(query)
            }
        }

        if (params.has('x') && params.has('y') && params.has('z')) {
            const x = Number.parseInt(params.get('x') || '')
            const y = Number.parseInt(params.get('y') || '')
            const z = Number.parseInt(params.get('z') || '')

            if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
                const query: TileQuery = { x, y, z }
                return tileQuery(query)
            }
        }

        return null
    }

    // Determine which tab should be active based on URL parameters
    const activeTab = searchParams.get('tab') ?? (searchParams.get('x') ? 'tile' : 'coordinates')

    const handleTabChange = (value: string) => {
        // Clear parameters and set tab
        if (value === 'coordinates') {
            setSearchParams({ tab: 'coordinates' })
        } else {
            setSearchParams({ tab: 'tile' })
        }
    }

    const updateCoordinates = (lat: string, lon: string, zoom: string) => {
        const params: Record<string, string> = { tab: 'coordinates' }
        if (lat) params.lat = lat
        if (lon) params.lon = lon
        if (zoom) params.zoom = zoom
        setSearchParams(params)
    }

    const updateTile = (x: string, y: string, z: string) => {
        const params: Record<string, string> = { tab: 'tile' }
        if (x) params.x = x
        if (y) params.y = y
        if (z) params.z = z
        setSearchParams(params)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-blue-100">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
                <h1 className="text-4xl font-bold text-center mb-8 text-orange-600">Dude, Where's My Tile?</h1>
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4 bg-white">
                        <TabsTrigger
                            value="coordinates"
                            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                        >
                            Coordinates
                        </TabsTrigger>
                        <TabsTrigger
                            value="tile"
                            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                        >
                            Tile Lookup
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="coordinates">
                        <TileCoordinateQueryForm
                            lat={lat}
                            lon={lon}
                            zoom={zoom}
                            setLat={(lat) => updateCoordinates(lat, lon, zoom)}
                            setLon={(lon) => updateCoordinates(lat, lon, zoom)}
                            setZoom={(zoom) => updateCoordinates(lat, lon, zoom)}
                            onCalculate={() => {}} // No longer needed as calculation happens automatically
                        />
                    </TabsContent>
                    <TabsContent value="tile">
                        <TileExistingQueryForm
                            tileX={tileX}
                            tileY={tileY}
                            tileZ={tileZ}
                            setTileX={(x) => updateTile(x, tileY, tileZ)}
                            setTileY={(y) => updateTile(tileX, y, tileZ)}
                            setTileZ={(z) => updateTile(tileX, tileY, z)}
                            onLookup={() => {}} // No longer needed as calculation happens automatically
                        />
                    </TabsContent>
                </Tabs>
                {result && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600">Sweet! Here's Your Info:</h2>
                        <TileResultInfo result={result} />
                        <TileResultMap className="h-96 w-full p-4" result={result} />
                        <TileResultFooter />
                    </div>
                )}
            </div>
        </main>
    )
}

// Wrap the app with BrowserRouter
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TileApp />} />
            </Routes>
        </BrowserRouter>
    )
}
