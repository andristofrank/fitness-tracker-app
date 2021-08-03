import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})

export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  private exerciseSubscription: Subscription;
  isLoading = true;

  constructor(private trainingService: TrainingService, private uiService: UIService) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.isLoading = false;
        this.exercises = exercises;
      });
    this.fetchExercises();
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if(this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

}
