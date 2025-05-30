import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent {
itemCount:number = 0;
btntxt: string = "Agregar";
goalText: string = "";
certificates: Certificates[] = [];
myCertificates: Certificates = new Certificates;

constructor(public certificatesService: CertificatesService) {
    console.log(this.certificatesService);
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Certificates
        }))
      )
    ).subscribe((data: Certificates[]) => {
      this.certificates = data;
      console.log(this.certificates);
    });
  }



  AgregarJob(){
    if(this.myCertificates.id){
      this.certificatesService.update(this.myCertificates.id, this.myCertificates). then(() =>
      {
        console.log("Update successfully!");
        this.resetForm();
      });
    }else{
      this.certificatesService.createCertificates(this.myCertificates).then(() => {
        console.log('Created successfully');
        this.resetForm();
      });
    }
  }

  deleteJob(id?: string) {
    this.certificatesService.deleteCertificates(id).then(() => {
      console.log('delete item successfully!');
    });
    console.log(id);
  }

  edit(item: Certificates) {
    this.myCertificates = { ...item };
    this.btntxt = "Actualizar";
  }

  resetForm() {
    this.myCertificates = new Certificates();
    this.btntxt = "Agregar";
  }

  


}
