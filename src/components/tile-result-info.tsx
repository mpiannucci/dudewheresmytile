import { QueryResult } from '@/lib/model'
import { twMerge } from 'tailwind-merge'

interface TileResultInfoProps {
    result: QueryResult
    className?: string
}

export default function TileResultInfo({ result, className }: TileResultInfoProps) {
    return (
        <div className={twMerge('grid grid-cols-3 gap-4', className)}>
            <div>
                <h3 className="text-lg font-semibold mb-2">Tile Coordinates</h3>
                <p>
                    <span className="font-semibold">X:</span> {result.tile.x}
                </p>
                <p>
                    <span className="font-semibold">Y:</span> {result.tile.y}
                </p>
                <p>
                    <span className="font-semibold">Z:</span> {result.tile.z}
                </p>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Bounding Box</h3>
                <p>
                    <span className="font-semibold">West:</span> {result.tile.bbox[0].toFixed(6)}
                </p>
                <p>
                    <span className="font-semibold">South:</span> {result.tile.bbox[1].toFixed(6)}
                </p>
                <p>
                    <span className="font-semibold">East:</span> {result.tile.bbox[2].toFixed(6)}
                </p>
                <p>
                    <span className="font-semibold">North:</span> {result.tile.bbox[3].toFixed(6)}
                </p>
            </div>
            {result && 'lat' in result && 'lon' in result && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Target Coordinates</h3>
                    <p>
                        <span className="font-semibold">Latitude:</span> {result.lat.toFixed(6)}
                    </p>
                    <p>
                        <span className="font-semibold">Longitude:</span> {result.lon.toFixed(6)}
                    </p>
                </div>
            )}
        </div>
    )
}
