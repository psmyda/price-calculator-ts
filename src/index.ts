import {ServiceType, ServiceYear} from "./model/models";
import {canSelectService, getServicesToDeselect} from "./services/selectionService";
import {calculateBasePrice, calculateFinalPrice} from "./services/priceCalculationService";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
    switch (action.type) {
        case "Select":
            if(previouslySelectedServices.includes(action.service)) {
                return previouslySelectedServices;
            }
            if(canSelectService(action.service, previouslySelectedServices)) {
                return [...previouslySelectedServices, action.service];
            }
            return previouslySelectedServices;
        case "Deselect":
            const allServicesToDeselect= getServicesToDeselect(action.service, previouslySelectedServices);
            return previouslySelectedServices.filter(service => !allServicesToDeselect.includes(service));
    }
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => (
    {
        basePrice: calculateBasePrice(selectedServices, selectedYear),
        finalPrice: calculateFinalPrice(selectedServices, selectedYear) });
