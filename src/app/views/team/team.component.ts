import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GameeResponse } from 'src/app/base/models/gameeResponse';
import { Team } from 'src/app/models/team';

import { TeamService } from 'src/app/services/team.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  providers: [TeamService]
})
export class TeamComponent implements OnInit {

  @ViewChild(MatTable)
  grid!: MatTable<any>;

  displayedColumns: string[] = ['id', 'name', 'primaryColor', 'secondaryColor', 'actions'];
  dataSource!: Team[];

  constructor(public modal: MatDialog, private teamService: TeamService) {
    this.dataSource = [];
    this.updateGrid();
  }

  ngOnInit(): void {
  }



  openCreateModal(team: Team | null): void {
    const modal = this.modal.open(ModalComponent, {
      width: '550px',
      data: team === null ? {
        id: null,
        name: '',
        primaryColor: '',
        secondaryColor: ''
      } : {
        id: team.id,
        name: team.name,
        primaryColor: team.primaryColor,
        secondaryColor: team.secondaryColor
      },
    });

    modal.afterClosed().subscribe(model => {
      if (model !== undefined) {
        if (this.dataSource.map(p => p.id).includes(model.id)) {
          this.teamService.update(model).subscribe(
            (data: GameeResponse<Team>) => {
              if (!data.success) {
                // TODO: Implementar toast
                return;
              }
              this.updateGrid();
            },
            (error) => {
              console.error("Error caught in request:");
              console.error(JSON.stringify(error));
              // TODO: Implementar toast
            }
          );
        } else {
          this.teamService.create(model).subscribe(            
            (data: GameeResponse<Team>) => {
              if (!data.success) {
                // TODO: Implementar toast
                return;
              }
              this.updateGrid();
            },
            (error) => {
              console.error("Error caught in request:");
              console.error(JSON.stringify(error));
              // TODO: Implementar toast
            }
          );
        }
      }
    });
  }

  deleteItem(id: number): void {
    // this.dataSource = this.dataSource.filter(i => i.id !== id);
    // this.grid.renderRows();

    this.teamService.delete(id).subscribe(
      (data: GameeResponse<Team>) => {
        if (!data.success) {
          // TODO: Implementar toast
          return;
        }
        this.updateGrid();
      },
      (error) => {
        console.error("Error caught in request:");
        console.error(JSON.stringify(error));
        // TODO: Implementar toast
      }
    );
  }

  updateGrid(): void {
    this.teamService.get().subscribe((data: GameeResponse<Team[]>) => {
      this.dataSource = data.data;
      this.grid.renderRows();
    });
  }
}
