import { Compass, Car, MapPin } from 'lucide-react'

export default function TileResultFooter() {
    return (
        <div className="flex justify-center mt-4">
            <Car className="text-orange-500 mr-2" size={24} />
            <MapPin className="text-blue-500 mr-2" size={24} />
            <Compass className="text-green-500" size={24} />
        </div>
    )
}
