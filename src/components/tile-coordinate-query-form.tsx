import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface TileCoordinateQueryFormProps {
    lat: string
    lon: string
    zoom: string
    setLat: (lat: string) => void
    setLon: (lon: string) => void
    setZoom: (zoom: string) => void
    onCalculate: (lat: number, lon: number, zoom: number) => void
}

export default function TileCoordinateQueryForm({
    lat,
    lon,
    zoom,
    setLat,
    setLon,
    setZoom,
    onCalculate,
}: TileCoordinateQueryFormProps) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                        id="latitude"
                        type="text"
                        placeholder="Enter latitude"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                        id="longitude"
                        type="text"
                        placeholder="Enter longitude"
                        value={lon}
                        onChange={(e) => setLon(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="zoom">Zoom Level</Label>
                    <Input
                        id="zoom"
                        type="text"
                        placeholder="Enter zoom level"
                        value={zoom}
                        onChange={(e) => setZoom(e.target.value)}
                    />
                </div>
            </div>
            <Button
                onClick={() => onCalculate(Number(lat), Number(lon), Number(zoom))}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
                Find My Tile!
            </Button>
        </div>
    )
}
