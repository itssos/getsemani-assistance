import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeService } from '../../../core/service/grade.service';
import { Grade } from '../../../core/model/grade.model';
@Component({
  selector: 'app-crudgrade',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crudgrade.component.html',
  styleUrl: './crudgrade.component.css'
})
export class CrudgradeComponent implements OnInit {
  grades: Grade[];
  editedGradeName: string = '';
  editedGradeId: number | undefined;


  constructor(private gradeService: GradeService){
    this.grades = [];
  }

  ngOnInit(): void {
    this.getGrades();
  }

  getGrades(): void {
    this.gradeService.getAllGrades()
    .subscribe(grades => this.grades = grades);
  }

  createGrade(name: string): void {
    const id = this.editedGradeId || 0; // Si editedGradeId es undefined, asigna 0
    if (id) {
        const updatedGrade: Grade = { id: id, name: name };
        this.gradeService.updateGrade(id, updatedGrade)
            .subscribe(updatedGrade => {
                console.log('Grado actualizado:', updatedGrade);
                this.editedGradeId = undefined; // Reinicia el ID después de actualizar
                this.getGrades(); // Actualiza la lista de grados después de editar uno
            });
    } else {
        const newGrade: Grade = { name: name }; // Omitiendo id ya que se generará automáticamente
        this.gradeService.createGrade(newGrade)
            .subscribe(createdGrade => {
                console.log('Nuevo grado creado:', createdGrade);
                this.getGrades(); // Actualiza la lista de grados después de crear uno nuevo
            });
    }
}
  
  deleteGrade(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este grado?')) {
      this.gradeService.deleteGrade(id)
        .subscribe(() => {
          console.log('Grado eliminado:', id);
          this.getGrades(); 
        });
    }
  }
  
  openEditModal(id: number,name: string): void {
    this.editedGradeId = id;
    this.editedGradeName = name;
    
    const modal = document.getElementById('static-modal');
    modal?.classList.remove('hidden');
    modal?.setAttribute('aria-hidden', 'false');
}
cancelEdit(): void{
  this.editedGradeId = undefined;
  this.editedGradeName = '';
}

}