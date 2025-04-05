import React from 'react';

export interface Prescription {
	id: string;
	userId: string;
	medication: string;
	dosage: number;
	vector?: string;
	timing?: string;
	freq: number;
	period: number;
	periodUnit: string;
	takenToday: number;
	lastTaken: string | null;
}

export interface ExplainedProcedure {
	technical: string;
	explanation: string;
}

export interface PatientProcedure {
	order: number;
	userId: string;
	explanation: ExplainedProcedure;
}

export interface User {
	id: string;
	email: string;
	fihrId: string;
	token: string;
	prescriptions: Prescription[];
	procedures: PatientProcedure[];
}

export const global = React.createContext<{ user: User | null; updateUser: () => void }>({ user: null, updateUser: () => {} });

