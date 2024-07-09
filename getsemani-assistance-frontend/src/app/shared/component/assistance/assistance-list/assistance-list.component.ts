import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssistanceService } from '../../../../core/service/assistance.service';
import { IAssistance } from '../../../../core/model/assistance.model';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-assistance-list',
  templateUrl: './assistance-list.component.html',
  styleUrls: ['./assistance-list.component.css'],
  standalone: true
})
export class AssistanceListComponent implements OnInit, OnDestroy {
  private refreshIntervalSubscription: Subscription = new Subscription();
  assistanceList: IAssistance[] = [];

  constructor(private _assistanceService: AssistanceService) {}

  selectedDay: number = 0;
  selectedMonth: number = 0;
  selectedGrade: string = '';
  selectedSection: string  = '';

  ngOnInit(): void {
    // this.loadAllAssistance();
    // this.subscribeToAssistanceUpdates();
  }

  ngOnDestroy(): void {
    if (this.refreshIntervalSubscription) {
      this.refreshIntervalSubscription.unsubscribe();
    }
  }

  loadAllAssistance(): void {
    this._assistanceService.getAll().subscribe({
      next: (assistances: IAssistance[]) => {
        this.assistanceList = assistances.map(assistance => ({
          ...assistance,
          date: new Date(assistance.date as Date)
        }));
      },
      error: err => console.error('Error loading assistances', err)
    });
  }

  loadFilteredAssistance(): void {
    this._assistanceService.getFilteredAssistance(
      this.selectedDay,
      this.selectedMonth,
      this.selectedGrade,
      this.selectedSection
    ).subscribe({
      next: (assistances: IAssistance[]) => {
        this.assistanceList = assistances.map(assistance => ({
          ...assistance,
          date: new Date(assistance.date as Date)
        }));
      },
      error: err => console.error('Error loading filtered assistances', err)
    });
  }

  subscribeToAssistanceUpdates(): void {
    if(this.selectedGrade != '' && this.selectedSection != '' && this.selectedDay != 0 && this.selectedMonth != 0){
      this.refreshIntervalSubscription = interval(1000).subscribe(() => {
        if (!this.selectedDay && !this.selectedMonth && !this.selectedGrade && !this.selectedSection) {
          this.loadAllAssistance();
        } else {
          this.loadFilteredAssistance();
        }
      });
    }
  }

  onFiltersChanged(): void {
    console.log(this.selectedDay);

    this.loadFilteredAssistance();
  }

}
