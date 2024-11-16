import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, NgFor, FormsModule],
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  newTask: string = '';

  board: Board = new Board('TestBoard', [
    new Column('Noción', [
      'Aprender nuevos lenguajes',
      'Apps nativas celulares',
      'Hospedaje',
      'Servidores',
    ]),
    new Column('Buscar', [
      'Tutoriales',
      'Documentación',
      'Talleres',
      'Cursos',
      'Redes',
    ]),
    new Column('Hacer', [
      'Seguir proyectos',
      'Restablecer proyecto',
      'Agregar i18n',
      'Agregar modo oscuro',
    ]),
    new Column('Hecho', [
      'Publicar proyecto',
      'Aprender i18n',
      'Actualizar portafolio',
      'Actualizar HDV',
      'Postulaciones',
    ]),
  ]);

  ngOnInit() {
    this.loadBoard();
  }

  // Method to handle drag and drop functionality
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.saveBoard();
  }

  // Method to add a new task to the first column
  addTask() {
    if (this.newTask.trim()) {
      this.board.columns[0].tasks.push(this.newTask);
      this.newTask = '';
      this.saveBoard(); // Save changes to localStorage
    }
  }

  // Method to save the board to localStorage
  saveBoard() {
    localStorage.setItem('kanbanBoard', JSON.stringify(this.board));
  }

  // Method to load the board from localStorage
  loadBoard() {
    const savedBoard = localStorage.getItem('kanbanBoard');
    if (savedBoard) {
      this.board = JSON.parse(savedBoard);
    }
  }

  // TrackBy function for ngFor to improve performance
  trackByIndex(index: number, item: any): number {
    return index;
  }
}
