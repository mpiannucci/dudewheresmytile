import { QueryResult, Tile } from '@/lib/model'
import { twMerge } from 'tailwind-merge'

interface TileResultInfoProps {
    result: QueryResult
    className?: string
}

const TileLink = ({ tile }: { tile: Tile }) => {
    return (
        <a className="text-blue-600 hover:text-blue-700" href={`/?x=${tile.x}&y=${tile.y}&z=${tile.z}`}>
            <span>[{[tile.x, tile.y, tile.z].join('/')}]</span>
        </a>
    )
}

const LatLonLink = ({ lat, lon }: { lat: number; lon: number }) => {
    return (
        <a className="text-blue-600 hover:text-blue-700" href={`/?lat=${lat}&lon=${lon}`}>
            <span>
                ({lat}, {lon})
            </span>
        </a>
    )
}

export default function TileResultInfo({ result, className }: TileResultInfoProps) {
    return (
        <div className={twMerge('grid grid-cols-3', className)}>
            <div>
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">Tile Coordinates</h3>
                    <p>
                        <TileLink tile={result.tile} />
                    </p>
                </div>
                {result && 'lat' in result && 'lon' in result && (
                    <div>
                        <h3 className="text-lg font-semibold pt-2">Target Coordinates</h3>
                        <p>
                            <LatLonLink lat={result.lat} lon={result.lon} />
                        </p>
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-lg font-semibold">Bounding Box</h3>
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
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold">Tile Children</h3>
                <ul>
                    {result.children.map((child) => (
                        <li key={child.x + child.y + child.z}>
                            <TileLink tile={child} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
