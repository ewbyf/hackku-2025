import { Prescription } from "./context";

export const sortPrescriptions = (prescriptions: Prescription[]) => {
	const notDueToday: Prescription[] = [];
	const notInProgress: { prescription: Prescription; priority: number }[] = [];
	const inProgress: { prescription: Prescription; initialSeconds: number }[] = [];

	for (const prescription of prescriptions) {
		const { lastTaken, period, periodUnit, freq, takenToday } = prescription;

		if (freq - takenToday <= 0) {
			notDueToday.push(prescription);
			continue;
		}

		if (!lastTaken) {
			notInProgress.push({ prescription, priority: freq - takenToday });
			continue;
		}

		const lastTakenMs = new Date(lastTaken).valueOf();
		const now = Date.now();
		const msPerUnit = periodUnit === 'h' ? 3600 * 1000 : (24 * 3600 * 1000) / freq;
		const totalDurationMs = period * msPerUnit;

		const isReady = now - lastTakenMs >= totalDurationMs;

		if (isReady) {
			notInProgress.push({ prescription, priority: freq - takenToday });
		} else {
			const timeElapsed = now - lastTakenMs;
			const initialSeconds = Math.ceil((totalDurationMs - timeElapsed) / 1000);
			inProgress.push({ prescription, initialSeconds });
		}
	}

	notInProgress.sort((a, b) => b.priority - a.priority);

	inProgress.sort((a, b) => a.initialSeconds - b.initialSeconds);

	const sorted = [
		notInProgress.map((p) => p.prescription),
		inProgress.map((p) => p.prescription),
		notDueToday,
	];

	return sorted;
};