import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import { IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonInput,IonSelect,
  IonSelectOption,IonDatetime,IonToggle,IonTextarea,IonCheckbox,IonButton,IonText } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';


import { StorageArticleService } from 'src/app/services/storageArticle.service';


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
  imports: [IonHeader,CommonModule,ReactiveFormsModule,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonInput,IonSelect,
    IonSelectOption,IonDatetime,IonToggle,IonTextarea,IonCheckbox,IonButton,IonText,RouterLink
  ]
})
export class AddArticleComponent {
  addArticleForm: FormGroup;
  sentOk = false;
  savedOk = false;

  constructor(private fb: FormBuilder, private storageSvc: StorageArticleService) { 
    this.addArticleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(1)]],
      category: [null, [Validators.required]],
      dateOfAdmission: [null, [Validators.required]],
      isActive: [null],
      description: ['', [Validators.maxLength(200)]],
      sure: [false, [Validators.requiredTrue]]
    });
  }

  get f(){
    return this.addArticleForm.controls;
  }

  async onSubmit() {
    console.log('Esto se ejecuto chamo')
    this.sentOk = true;
    this.savedOk = false;

    if(this.addArticleForm.invalid){
      this.addArticleForm.markAllAsTouched();
      return;
    }
    
    await this.storageSvc.addArticles(this.addArticleForm.value);
    this.savedOk = true;
    console.log('Ey esto guardo chamo')
  }
}
