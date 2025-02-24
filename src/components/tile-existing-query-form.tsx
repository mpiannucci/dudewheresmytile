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
    const handleIntegerInput = (value: string, setter: (value: string) => void) => {
        // Only allow integer values (no decimals)
        const intValue = value.replace(/[^0-9-]/g, '');
        setter(intValue);
    };

    return (
        <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <div>
                <Label htmlFor="tileX">Tile X</Label>
                <Input
                    type="number"
                    id="tileX"
                    value={tileX}
                    onChange={(e) => handleIntegerInput(e.target.value, setTileX)}
                    placeholder="Enter tile X coordinate (e.g. 3)"
                    step="1"
                    min="0"
                />  
            </div>
            <div>
                <Label htmlFor="tileY">Tile Y</Label>
                <Input
                    id="tileY"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="Enter tile Y coordinate (e.g. 4)"
                    value={tileY}
                    onChange={(e) => handleIntegerInput(e.target.value, setTileY)}
                />
            </div>
            <div>
                <Label htmlFor="tileZ">Tile Z (Zoom)</Label>
                <Input
                    id="tileZ"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="Enter tile Z (zoom) (e.g. 15)"
                    value={tileZ}
                    onChange={(e) => handleIntegerInput(e.target.value, setTileZ)}
                />
            </div>
        </form>
    )
}
