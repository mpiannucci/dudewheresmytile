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
                <Label htmlFor="lat">Latitude</Label>
                <Input
                    type="number"
                    step="any"
                    id="lat"
                    value={lat}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || value === '-') {
                            setLat(value);
                        } else {
                            const num = parseFloat(value);
                            if (!isNaN(num)) {
                                setLat(value);
                            }
                        }
                    }}
                    placeholder="Enter latitude (e.g. 51.5074)"
                />
            </div>
            <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                    type="number" 
                    step="any"
                    id="longitude"
                    placeholder="Enter longitude (e.g. 71.343)"
                    value={lon}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || value === '-') {
                            setLon(value);
                        } else {
                            const num = parseFloat(value);
                            if (!isNaN(num)) {
                                setLon(value);
                            }
                        }
                    }}
                />
            </div>
            <div>
                <Label htmlFor="zoom">Zoom Level</Label>
                <Input
                    id="zoom"
                    type="number"
                    min="0"
                    max="30"
                    placeholder="Enter zoom level (0-30)"
                    value={zoom}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '') {
                            setZoom(value);
                        } else {
                            const intValue = value.replace(/[^0-9-]/g, '');
                            const num = parseInt(intValue);
                            // Only allow if it's a valid integer (no decimal point)
                            if (!isNaN(num) && num >= 0 && num <= 30) {
                                setZoom(intValue);
                            }
                        }
                    }}
                />
            </div>
        </form>
    )
}
