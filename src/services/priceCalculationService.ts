import {ServicePackagePrice, ServiceType, ServiceYear} from "../model/models";
import {serviceDiscount, servicePrices, servicePackages} from "../data/dataMock";

export const calculateBasePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) :number => {
    const packagePriceModifier = getPackagesPriceModifier(selectedServices, selectedYear);

    const regularBasePrice = selectedServices.reduce((total, service) => {
        const servicePrice = getServicePrice(service, selectedYear);
        return total + servicePrice;
    }, 0);

    return regularBasePrice - packagePriceModifier;
}

export const calculateFinalPrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) :number => {
    const basePrice = calculateBasePrice(selectedServices, selectedYear);
    const discountValue = getDiscount(selectedServices, selectedYear);

    return basePrice - discountValue;
}

const getServicePrice = (service: ServiceType, selectedYear: ServiceYear) :number => {
    const servicePrice = servicePrices.find((servicePrice) => servicePrice.service === service && servicePrice.year === selectedYear);

    if (servicePrice) {
        return servicePrice.price;
    }

    return 0;
}

const getServicePackages = (selectedServices: ServiceType[], selectedYear: ServiceYear) :ServicePackagePrice[] => {
   return servicePackages.filter((packagePrice) => packagePrice.packageServices.every((packageService) => selectedServices.includes(packageService)) && packagePrice.year === selectedYear);
}

const getPackagesPriceModifier = (selectedServices: ServiceType[], selectedYear: ServiceYear) :number => {
    // using filter instead of find because is it possible to have multiple packages with the same services in the future
    const servicePackagesPrices = getServicePackages(selectedServices, selectedYear);

    if (servicePackagesPrices.length > 0) {
        let totalPackagePriceModifier = 0;

        servicePackagesPrices.forEach((packagePrice) => {
            let packageServicesRegularPrice = 0;
            packagePrice.packageServices.forEach((packageService) => {
                packageServicesRegularPrice += getServicePrice(packageService, selectedYear);
            })
            totalPackagePriceModifier += packageServicesRegularPrice - packagePrice.price ;
        })

        return totalPackagePriceModifier;
    }

    return 0;
}

const getDiscount = (selectedServices: ServiceType[], selectedYear: ServiceYear) :number => {
    let discountValue = 0;
    const discountsForYear = serviceDiscount.filter((discount) => discount.year === selectedYear);

    if (discountsForYear.length > 0) {
        discountsForYear.forEach((discount) => {
            if (discount.requiredServices.every((discountService) => selectedServices.includes(discountService))) {
                discountValue = discount.discountValue > discountValue ? discount.discountValue : discountValue;
            }
        })
    }

    return discountValue;
};
