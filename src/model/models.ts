export type ServiceYear = 2020 | 2021 | 2022;

export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export type ServicePrice = {
    service: ServiceType;
    year: ServiceYear;
    price: number;
}

export type ServicePackagePrice = {
    packageServices: ServiceType[];
    year: ServiceYear;
    price: number;
}

export type ServiceDiscount = {
    requiredServices: ServiceType[];
    year: ServiceYear;
    discountValue: number;
}

export type ServiceDependency = {
    service: ServiceType;
    dependsOn: ServiceType[];
}
