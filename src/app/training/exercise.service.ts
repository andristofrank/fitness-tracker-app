import { Subject } from 'rxjs';

import { Exercise } from './exercise.model';

export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    
    private availableExercise: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 48 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 128 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 228 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 88 },
    ];
    private activeExercise: Exercise;

    getAvailableExercises(){
        return this.availableExercise.slice();
    }

    startExercise(selectedId: string) {
        this.activeExercise = this.availableExercise.find(
            ex => ex.id === selectedId
        );
        this.exerciseChanged.next({ ...this.activeExercise });
    }

    getActiveExercise() {
        return {...this.activeExercise};
    }
}