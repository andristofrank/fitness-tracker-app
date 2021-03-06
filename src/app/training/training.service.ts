import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    private availableExercises: Exercise[] = [];

    private activeExercise: Exercise;

    private firebaseSubscriptions: Subscription[] = [];

    constructor(private db: AngularFirestore, private uiService: UIService) {}

  // tslint:disable-next-line:typedef
    fetchAvailableExercises(){
        this.firebaseSubscriptions.push(this.db
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(map(docArrayData => {
                return docArrayData.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data() as Exercise
                    } as Exercise;
                });
            }))
            .subscribe((exercises: Exercise[]) => {
                console.log(exercises);
                this.availableExercises = exercises;
                this.exercisesChanged.next([...this.availableExercises]);
            }, error => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackbar('Fetching exercises failed, try again later!', null, 3000);
                this.exercisesChanged.next(null);
            }));
    }

  // tslint:disable-next-line:typedef
    startExercise(selectedId: string) {
        this.activeExercise = this.availableExercises.find(
            ex => ex.id === selectedId
        );
        this.exerciseChanged.next({ ...this.activeExercise });
    }

  // tslint:disable-next-line:typedef
    completeExercise() {
        this.addDataToDatabase({
            ...this.activeExercise,
            date: new Date(),
            state: 'completed'
        });
        this.activeExercise = null;
        this.exerciseChanged.next(null);
    }

  // tslint:disable-next-line:typedef
    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.activeExercise,
            duration: this.activeExercise.duration * (progress / 100),
            calories: this.activeExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.activeExercise = null;
        this.exerciseChanged.next(null);
    }

    getActiveExercise(): Exercise {
        return {...this.activeExercise};
    }

  // tslint:disable-next-line:typedef
    fetchCompletedOrCancelledExercises() {
        this.firebaseSubscriptions.push(this.db
            .collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.finishedExercisesChanged.next(exercises);
        })
    ); }

    cancelSubscriptions(): void {
        this.firebaseSubscriptions.forEach(sub => sub.unsubscribe());
    }

  // tslint:disable-next-line:typedef
    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}
