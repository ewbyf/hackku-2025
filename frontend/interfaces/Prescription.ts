export interface Prescription {
    id: string;
    userId: string;
    medication: string;
    dosage: number;
    vector?: string;
    freq: number;
    period: number;
    periodUnit: string;
    lastTaken: Date;
}