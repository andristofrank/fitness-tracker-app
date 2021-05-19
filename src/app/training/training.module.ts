import { NgModule } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../material.module";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { TrainingComponent } from "./training.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
      TrainingComponent,
      CurrentTrainingComponent,
      NewTrainingComponent,
      PastTrainingsComponent,
      StopTrainingComponent
    ],
    imports: [
      CommonModule,
      MaterialModule,
      FlexLayoutModule,
      AngularFirestoreModule,
      FormsModule
    ],
    entryComponents: [StopTrainingComponent]
  })
  export class TrainingModule { }