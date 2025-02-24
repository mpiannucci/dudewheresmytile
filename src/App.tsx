'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { QueryResult, CoordinateQuery, TileQuery, tileQuery } from './lib/model'
import { TileResultMap } from './components/tile-result-map'
import TileResultInfo from './components/tile-result-info'
import TileResultFooter from './components/tile-result-footer'
import TileCoordinateQueryForm from './components/tile-coordinate-query-form'
import TileExistingQueryForm from './components/tile-existing-query-form'

export default function App() {
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [zoom, setZoom] = useState('')
    const [tileX, setTileX] = useState('')
    const [tileY, setTileY] = useState('')
    const [tileZ, setTileZ] = useState('')
    const [result, setResult] = useState<QueryResult | null>(null)

    const calculateTile = () => {
        const latFloat = Number.parseFloat(lat)
        const lonFloat = Number.parseFloat(lon)
        const zoomInt = Number.parseInt(zoom)

        if (isNaN(latFloat) || isNaN(lonFloat) || isNaN(zoomInt)) {
            alert('Please enter valid numbers for latitude, longitude, and zoom!')
            return
        }

        const query: CoordinateQuery = {
            lat: latFloat,
            lon: lonFloat,
            zoom: zoomInt,
        }

        setResult(tileQuery(query))
    }

    const lookupTile = () => {
        const x = Number.parseInt(tileX)
        const y = Number.parseInt(tileY)
        const z = Number.parseInt(tileZ)

        if (isNaN(x) || isNaN(y) || isNaN(z)) {
            alert('Please enter valid numbers for tile X, Y, and Z!')
            return
        }

        const query: TileQuery = {
            x,
            y,
            z,
        }

        setResult(tileQuery(query))
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-blue-100">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
                <h1 className="text-4xl font-bold text-center mb-8 text-orange-600">Dude, Where's My Tile?</h1>
                <Tabs defaultValue="coordinates" className="w-full">
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
                            setLat={setLat}
                            setLon={setLon}
                            setZoom={setZoom}
                            onCalculate={calculateTile}
                        />
                    </TabsContent>
                    <TabsContent value="tile">
                        <TileExistingQueryForm
                            tileX={tileX}
                            tileY={tileY}
                            tileZ={tileZ}
                            setTileX={setTileX}
                            setTileY={setTileY}
                            setTileZ={setTileZ}
                            onLookup={lookupTile}
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
