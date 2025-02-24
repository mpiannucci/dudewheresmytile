import { Input } from './ui/input'
import { Label } from './ui/label'

interface TileCoordinateQueryFormProps {
    lat: string
    lon: string
    zoom: string
    setLat: (lat: string) => void
    setLon: (lon: string) => void
    setZoom: (zoom: string) => void
    onCalculate: () => void
}

export default function TileCoordinateQueryForm({
    lat,
    lon,
    zoom,
    setLat,
    setLon,
    setZoom,
}: TileCoordinateQueryFormProps) {
    return (
        <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <div>
                <label htmlFor="lat" className="block text-sm font-medium text-gray-700">
                    Latitude
                </label>
                <input
                    type="text"
                    id="lat"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Enter latitude (e.g. 51.5074)"
                />
            </div>
            <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                    id="longitude"
                    type="text"
                    placeholder="Enter longitude (e.g. 71.343)"
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                />
            </div>
            <div>
                <Label htmlFor="zoom">Zoom Level</Label>
                <Input
                    id="zoom"
                    type="text"
                    placeholder="Enter zoom level (0-24)"
                    value={zoom}
                    onChange={(e) => setZoom(e.target.value)}
                />
            </div>
        </form>
    )
}
