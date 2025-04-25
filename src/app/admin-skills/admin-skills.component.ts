import { Component } from '@angular/core';
import { Skills } from '../models/skills/skills.model';
import { SkillsService } from '../services/skills-service/skills.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent {
  itemCount: number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  skills: Skills[] = [];
  mySkills: Skills = new Skills;

  constructor(public skillsService: SkillsService) {
    console.log(this.skillsService);
    this.skillsService.getSkills().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Skills
        }))
      )
    ).subscribe((data: Skills[]) => {
      this.skills = data;
      console.log(this.skills);
    });
  }

  AgregarJob() {
    if (this.mySkills.id) {
      this.skillsService.update(this.mySkills.id, this.mySkills).then(() => {
        console.log("Update successfully!");
        this.resetForm();
      });
    } else {
      this.skillsService.createSkills(this.mySkills).then(() => {
        console.log('Created successfully');
        this.resetForm();
      });
    }
  }

  deleteJob(id?: string) {
    this.skillsService.deleteSkills(id).then(() => {
      console.log('delete item successfully!');
    });
    console.log(id);
  }

  edit(item: Skills) {
    this.mySkills = { ...item };
    this.btntxt = "Actualizar";
  }

  resetForm() {
    this.mySkills = new Skills();
    this.btntxt = "Agregar";
  }
}
