import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QuestionsPageRoutingModule } from './questions-routing.module';
import { QuestionsPage } from './questions.page';
import {StarRatingModule} from 'ionic5-star-rating';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        QuestionsPageRoutingModule,
        ReactiveFormsModule,
        StarRatingModule,
        TranslateModule
    ],
    declarations: [QuestionsPage]
})
export class QuestionsPageModule {}
