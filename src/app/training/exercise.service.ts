import { Exercise } from "./exercise.model";

export class TrainingService {
    private availableExercise: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 48 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 128 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 228 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 88 },
    ];

    getAvailableExercises(){
        return this.availableExercise.slice();
    }
}