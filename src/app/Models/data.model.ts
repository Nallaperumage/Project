export interface location{
    latitudes? : String,
    longitudes? : String
}

export interface Test {
    name: string;
    duration: string;
    dataPrice: Number,
    carryOutPrice: Number,
    image: any[];
    description: string;
}

export interface marker {
	lat: number;
	lng: number;
}