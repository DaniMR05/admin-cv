import { Component } from '@angular/core';
import { Languages } from '../models/languages/languages.model';
import { LanguagesService } from '../services/languages-service/languages.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
  itemCount: number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  languages: Languages[] = [];
  myLanguages: Languages = new Languages;

  constructor(public languagesService: LanguagesService) {
    console.log(this.languagesService);
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Languages
        }))
      )
    ).subscribe((data: Languages[]) => {
      this.languages = data;
      console.log(this.languages);
    });
  }

  AgregarJob() {
    if (this.myLanguages.id) {
      this.languagesService.update(this.myLanguages.id, this.myLanguages).then(() => {
        console.log("Update successfully!");
        this.resetForm();
      });
    } else {
      this.languagesService.createLanguages(this.myLanguages).then(() => {
        console.log('Created successfully');
        this.resetForm();
      });
    }
  }

  deleteJob(id?: string) {
    this.languagesService.deleteLanguages(id).then(() => {
      console.log('delete item successfully!');
    });
    console.log(id);
  }

  edit(item: Languages) {
    this.myLanguages = { ...item };
    this.btntxt = "Actualizar";
  }

  resetForm() {
    this.myLanguages = new Languages();
    this.btntxt = "Agregar";
  }

}
