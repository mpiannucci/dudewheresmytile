import { Compass, Car, MapPin } from 'lucide-react'

export default function Footer() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-center mt-4">
                <Car className="text-orange-500 mr-2" size={24} />
                <MapPin className="text-blue-500 mr-2" size={24} />
                <Compass className="text-green-500" size={24} />
            </div>
            <div className="flex justify-center gap-8">
                <div>
                    <p>
                        2025{' '}
                        <a href="https://matthewiannucci.com" className="text-blue-600">
                            Matthew Iannucci
                        </a>
                    </p>
                </div>
                <div>
                    <p>•</p>
                </div>
                <div>
                    <p>
                        <a href="https://github.com/mpiannucci/dudewheresmytile" className="text-blue-600">
                            Fork me on GitHub
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
