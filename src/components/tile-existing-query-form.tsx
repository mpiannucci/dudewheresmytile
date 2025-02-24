import { Input } from './ui/input'
import { Label } from './ui/label'

interface TileExistingQueryFormProps {
    tileX: string
    tileY: string
    tileZ: string
    setTileX: (x: string) => void
    setTileY: (y: string) => void
    setTileZ: (z: string) => void
    onLookup: () => void
}

export default function TileExistingQueryForm({
    tileX,
    tileY,
    tileZ,
    setTileX,
    setTileY,
    setTileZ,
}: TileExistingQueryFormProps) {
    return (
        <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <div>
                <label htmlFor="tileX" className="block text-sm font-medium text-gray-700">
                    Tile X
                </label>
                <input
                    type="text"
                    id="tileX"
                    value={tileX}
                    onChange={(e) => setTileX(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Enter tile X coordinate (e.g. 3)"
                />  
            </div>
            <div>
                <Label htmlFor="tileY">Tile Y</Label>
                <Input
                    id="tileY"
                    type="text"
                    placeholder="Enter tile Y coordinate (e.g. 4)"
                    value={tileY}
                    onChange={(e) => setTileY(e.target.value)}
                />
            </div>
            <div>
                <Label htmlFor="tileZ">Tile Z (Zoom)</Label>
                <Input
                    id="tileZ"
                    type="text"
                    placeholder="Enter tile Z (zoom) (e.g. 15)"
                    value={tileZ}
                    onChange={(e) => setTileZ(e.target.value)}
                />
            </div>
        </form>
    )
}
