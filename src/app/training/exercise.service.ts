import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();

    private availableExercises: Exercise[] = [];

    private activeExercise: Exercise;
    private exercises: Exercise[] = [];

    constructor(private db: AngularFirestore) {}

    fetchAvailableExercises(){
        this.db
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(map(docArrayData => {
                return docArrayData.map(doc => {
                    return <Exercise> {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data() as Exercise
                    };
                });
            }))
            .subscribe((exercises: Exercise[]) => {
                this.availableExercises = exercises;
                this.exercisesChanged.next([...this.availableExercises]);
            });
    }

    startExercise(selectedId: string) {
        this.activeExercise = this.availableExercises.find(
            ex => ex.id === selectedId
        );
        this.exerciseChanged.next({ ...this.activeExercise });
    }

    completeExercise() {
        this.exercises.push({ 
            ...this.activeExercise, 
            date: new Date(), 
            state: 'completed' 
        });
        this.activeExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({ 
            ...this.activeExercise,
            duration: this.activeExercise.duration * (progress / 100),
            calories: this.activeExercise.calories * (progress / 100),
            date: new Date(), 
            state: 'cancelled' 
        });
        this.activeExercise = null;
        this.exerciseChanged.next(null);
    }

    getActiveExercise() {
        return {...this.activeExercise};
    }

    getCompletedOrCancelledExercises() {
        return this.exercises.slice();
    }
}