import { Component } from '@angular/core';
import { Interests } from '../models/interests/interests.model';
import { InterestsService } from '../services/interests-service/interests.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrl: './admin-interests.component.css'
})
export class AdminInterestsComponent {
  itemCount:number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  interests: Interests[]=[];
  myInterests: Interests = new Interests;

  constructor(public interestsService: InterestsService) {
        console.log(this.interestsService);
        this.interestsService.getInterests().snapshotChanges().pipe(
          map((changes: any[]) =>
            changes.map((c: any) => ({
              id: c.payload.doc.id,
              ...c.payload.doc.data() as Interests
            }))
          )
        ).subscribe((data: Interests[]) => {
          this.interests = data;
          console.log(this.interests);
        });
      }
    
      AgregarJob() {
        console.log(this.interests);
        this.interestsService.createInterests(this.myInterests).then(() => {
          console.log('Created new item successfully!');
        });
      }
    
      deleteJob(id?: string) {
        this.interestsService.deleteInterests(id).then(() => {
          console.log('delete item successfully!');
        });
        console.log(id);
      }
}
