export interface BookingSpaPackage {
    title: string;
    price: number;
    maxAtendees: number;
    basePrice: number;
}

export interface SpaPackageOption extends BookingSpaPackage {
    imageSrc: string;
    imageAlt: string;
    description: string;
    cardClassName?: string;
}

export type TimeSlot = "Förmiddag" | "Eftermiddag" | "Kväll";

export interface BookingPageState {
    selectedPackage: BookingSpaPackage;
    selectedTime: TimeSlot;
}