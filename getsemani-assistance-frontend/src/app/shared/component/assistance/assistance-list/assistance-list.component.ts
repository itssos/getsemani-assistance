import { Component } from '@angular/core'
import { AssistanceService } from '../../../../core/service/assistance.service'
import { IAssistance } from '../../../../core/model/assistance.model'

@Component({
  selector: 'app-assistance-list',
  standalone: true,
  imports: [],
  templateUrl: './assistance-list.component.html',
  styleUrl: './assistance-list.component.css'
})
export class AssistanceListComponent {
  constructor (
    private _assistanceService: AssistanceService
  ){}

  assistanceList: IAssistance[] = []

  ngOnInit():void{
    this.loadAllAssistance()
  }

  loadAllAssistance(): void {
    this._assistanceService.getAll().subscribe({
      next: (assistances: IAssistance[]) => {
        this.assistanceList = assistances.map(assistance => {
          return {
            ...assistance,
            date: new Date(assistance.date as Date)
          }
        })
      },
      error: err => console.error('Error loading assistances', err)
    })
  }
}
