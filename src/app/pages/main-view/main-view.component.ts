import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, NgFor],
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
item: any;
  constructor() {}
  board: Board = new Board('TestBoard', [
    new Column('Noción', ['Aprender nuevos lenguajes', 'Apps nativas celulares', 'Hospedaje', 'Servidores']),
    new Column('Buscar', ['Tutoriales', 'Documentación', 'Talleres', 'Cursos', 'Redes']),
    new Column('Hacer', ['Seguir proyectos', 'Restablecer proyecto', 'Agregar i18n', 'Agregar modo oscuro']),
    new Column('Hecho', ['Publicar proyecto', 'Aprender i18n', 'Actualizar portafolio', 'Actualizar HDV', 'Postulaciones']),
  ])

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
