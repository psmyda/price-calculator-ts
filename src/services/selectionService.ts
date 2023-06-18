import {ServiceType} from '../model/models'
import {serviceDependencies} from "../data/dataMock";

export function canSelectService(service: ServiceType, previouslySelectedServices: ServiceType[]): boolean {
    const serviceDependencies = getServiceDependencies(service);

    if (serviceDependencies.length > 0) {
        return serviceDependencies.filter((serviceDependency) => previouslySelectedServices.includes(serviceDependency)).length > 0;
    }

    return true;
}

export function getServicesToDeselect(service: ServiceType, previouslySelectedServices: ServiceType[]): ServiceType[] {
    let servicesToDeselect :ServiceType[] = [service, ...getDependentServices(service)];

    const otherMainServiceSelected : ServiceType[] = previouslySelectedServices.filter((previouslySelectedService) => !servicesToDeselect.includes(previouslySelectedService))

    if (otherMainServiceSelected.length > 0) {
        otherMainServiceSelected.forEach((service) => {
            const dependentServices = getDependentServices(service);
            if (dependentServices.length > 0) {
                servicesToDeselect = servicesToDeselect.filter((serviceToDeselect) => !dependentServices.includes(serviceToDeselect))
            }
        })
    }

    return servicesToDeselect
}

export function getDependentServices(service: ServiceType): ServiceType[] {
    const serviceDependence = serviceDependencies.filter((serviceDependence) => serviceDependence.dependsOn.includes(service))
    if (serviceDependence.length > 0) {
        return serviceDependence.map((serviceDependence) => serviceDependence.service)
    }
    return []
}

export function getServiceDependencies(service: ServiceType): ServiceType[] {
    return serviceDependencies.find((serviceDependence) => serviceDependence.service === service)?.dependsOn || []
}
