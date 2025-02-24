"use client";

import { useState } from "react";
import { Car, MapPin, Compass } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { pointToTile } from "tilebelt";

export default function App() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [zoom, setZoom] = useState("");
  const [tileX, setTileX] = useState("");
  const [tileY, setTileY] = useState("");
  const [tileZ, setTileZ] = useState("");
  const [result, setResult] = useState<{
    x: number;
    y: number;
    z: number;
    lat: number;
    lon: number;
  } | null>(null);

  const calculateTile = () => {
    const latFloat = Number.parseFloat(lat);
    const lonFloat = Number.parseFloat(lon);
    const zoomInt = Number.parseInt(zoom);

    if (isNaN(latFloat) || isNaN(lonFloat) || isNaN(zoomInt)) {
      alert("Please enter valid numbers for latitude, longitude, and zoom!");
      return;
    }

    const tile = pointToTile(lonFloat, latFloat, zoomInt);

    setResult({
      x: tile[0],
      y: tile[1],
      z: tile[2],
      lat: latFloat,
      lon: lonFloat,
    });
  };

  const lookupTile = () => {
    const x = Number.parseInt(tileX);
    const y = Number.parseInt(tileY);
    const z = Number.parseInt(tileZ);

    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      alert("Please enter valid numbers for tile X, Y, and Z!");
      return;
    }

    const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
    const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
    const lon = (x / Math.pow(2, z)) * 360 - 180;

    setResult({ x, y, z, lat, lon });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-blue-100">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8 text-orange-600">
          Dude, Where's My Tile?
        </h1>
        <Tabs defaultValue="coordinates" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="coordinates">Coordinates</TabsTrigger>
            <TabsTrigger value="tile">Tile Lookup</TabsTrigger>
          </TabsList>
          <TabsContent value="coordinates">
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
                onClick={calculateTile}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Find My Tile!
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="tile">
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
                onClick={lookupTile}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Look Up My Coordinates!
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        {result && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Sweet! Here's Your Info:
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Tile Coordinates</h3>
                <p>
                  <span className="font-semibold">X:</span> {result.x}
                </p>
                <p>
                  <span className="font-semibold">Y:</span> {result.y}
                </p>
                <p>
                  <span className="font-semibold">Z:</span> {result.z}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Geographic Coordinates
                </h3>
                <p>
                  <span className="font-semibold">Latitude:</span>{" "}
                  {result.lat.toFixed(6)}
                </p>
                <p>
                  <span className="font-semibold">Longitude:</span>{" "}
                  {result.lon.toFixed(6)}
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Car className="text-orange-500 mr-2" size={24} />
              <MapPin className="text-blue-500 mr-2" size={24} />
              <Compass className="text-green-500" size={24} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
