import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface TileExistingQueryFormProps {
    tileX: string
    tileY: string
    tileZ: string
    setTileX: (tileX: string) => void
    setTileY: (tileY: string) => void
    setTileZ: (tileZ: string) => void
    onLookup: (tileX: number, tileY: number, tileZ: number) => void
}
export default function TileExistingQueryForm({
    tileX,
    tileY,
    tileZ,
    setTileX,
    setTileY,
    setTileZ,
    onLookup,
}: TileExistingQueryFormProps) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                    <Label htmlFor="tileX">Tile X</Label>
                    <Input
                        id="tileX"
                        type="text"
                        placeholder="Enter tile X"
                        value={tileX}
                        onChange={(e) => setTileX(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="tileY">Tile Y</Label>
                    <Input
                        id="tileY"
                        type="text"
                        placeholder="Enter tile Y"
                        value={tileY}
                        onChange={(e) => setTileY(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="tileZ">Tile Z (Zoom)</Label>
                    <Input
                        id="tileZ"
                        type="text"
                        placeholder="Enter tile Z (zoom)"
                        value={tileZ}
                        onChange={(e) => setTileZ(e.target.value)}
                    />
                </div>
            </div>
            <Button
                onClick={() => onLookup(Number(tileX), Number(tileY), Number(tileZ))}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
                Find My Tile!
            </Button>
        </div>
    )
}
