import {ServiceDependency, ServiceDiscount, ServicePackagePrice, ServicePrice} from "../model/models";

export const servicePrices: ServicePrice[] = [
    { service: "Photography", year: 2020, price: 1700 },
    { service: "Photography", year: 2021, price: 1800 },
    { service: "Photography", year: 2022, price: 1900 },
    { service: "VideoRecording", year: 2020, price: 1700 },
    { service: "VideoRecording", year: 2021, price: 1800 },
    { service: "VideoRecording", year: 2022, price: 1900 },
    { service: "BlurayPackage", year: 2020, price: 300 },
    { service: "BlurayPackage", year: 2021, price: 300 },
    { service: "BlurayPackage", year: 2022, price: 300 },
    { service: "TwoDayEvent", year: 2020, price: 400 },
    { service: "TwoDayEvent", year: 2021, price: 400 },
    { service: "TwoDayEvent", year: 2022, price: 400 },
    { service: "WeddingSession", year: 2020, price: 600 },
    { service: "WeddingSession", year: 2021, price: 600 },
    { service: "WeddingSession", year: 2022, price: 600 },
];

export const servicePackages: ServicePackagePrice[] = [
    { packageServices: ["Photography", "VideoRecording"], year: 2020, price: 2200 },
    { packageServices: ["Photography", "VideoRecording"], year: 2021, price: 2300 },
    { packageServices: ["Photography", "VideoRecording"], year: 2022, price: 2500 },
];
export const serviceDiscount: ServiceDiscount[] = [
    { requiredServices: ["Photography", "WeddingSession"], year: 2020, discountValue: 300},
    { requiredServices: ["Photography", "WeddingSession"], year: 2021, discountValue: 300},
    { requiredServices: ["Photography", "WeddingSession"], year: 2022, discountValue: 600},
    { requiredServices: ["VideoRecording", "WeddingSession"], year: 2020, discountValue: 300},
    { requiredServices: ["VideoRecording", "WeddingSession"], year: 2021, discountValue: 300},
    { requiredServices: ["VideoRecording", "WeddingSession"], year: 2022, discountValue: 300},
]

export const serviceDependencies: ServiceDependency[] = [
    { service: "BlurayPackage", dependsOn: ["VideoRecording"] },
    { service: "TwoDayEvent", dependsOn: ["VideoRecording", "Photography"] }
];
