import { Component } from '@angular/core';
import { Education } from '../models/education/education.model';
import { EducationService } from '../services/education-service/education.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent {
  itemCount:number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  education: Education[]=[];
  myeducation: Education = new Education;

  constructor(public educationService: EducationService) {
      console.log(this.educationService);
      this.educationService.getEducation().snapshotChanges().pipe(
        map((changes: any[]) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data() as Education
          }))
        )
      ).subscribe((data: Education[]) => {
        this.education = data;
        console.log(this.education);
      });
    }
  
    AgregarJob() {
      console.log(this.education);
      this.educationService.createEducation(this.myeducation).then(() => {
        console.log('Created new item successfully!');
      });
    }
  
    deleteJob(id?: string) {
      this.educationService.deleteEducation(id).then(() => {
        console.log('delete item successfully!');
      });
      console.log(id);
    }

}
