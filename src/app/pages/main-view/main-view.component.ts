import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { Database, ref, onValue, set } from '@angular/fire/database';
import { Column } from '../../models/column.model';
import { Board } from '../../models/board.model';
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

  // Kanban board initialized as an empty board
  board: Board = new Board('FirebaseBoard', []);

  constructor(private db: Database) {}

  ngOnInit(): void {
    this.loadBoardFromDatabase();
  }

  /**
   * Loads the Kanban board data from Firebase Realtime Database.
   */
  loadBoardFromDatabase(): void {
    const boardRef = ref(this.db, 'kanbanBoard');
    onValue(boardRef, (snapshot) => {
      const data = snapshot.val();
      if (data && Array.isArray(data.columns)) {
        this.board.columns = data.columns.map(
          (col: any) => new Column(col.name, col.tasks || [])
        );
        console.log('Board loaded from Firebase:', this.board);
      } else {
        console.warn('No board data found in Firebase. Initializing empty board.');
        this.board = new Board('FirebaseBoard', []);
      }
    });
  }

  /**
   * Saves the Kanban board data to Firebase Realtime Database.
   */
  saveBoardToDatabase(): void {
    const boardRef = ref(this.db, 'kanbanBoard');
    set(boardRef, { columns: this.board.columns }).then(() => {
      console.log('Board saved to Firebase:', this.board);
    }).catch((error) => {
      console.error('Error saving board to Firebase:', error);
    });
  }

  /**
   * Handles the drag-and-drop functionality for tasks between columns.
   * @param event The drag-and-drop event
   */
  drop(event: CdkDragDrop<string[]>): void {
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
    this.saveBoardToDatabase();
  }

  /**
   * Adds a new task to the first column of the Kanban board.
   */
  addTask(): void {
    if (this.newTask.trim()) {
      // Find the "Noción" column
      const notionColumn = this.board.columns.find((col) => col.name === 'Noción');

      if (notionColumn) {
        // Add the new task to the "Noción" column
        notionColumn.tasks.push(this.newTask);
        this.newTask = '';
        this.saveBoardToDatabase(); // Save changes to Firebase
        console.log('Task added to "Noción" column:', notionColumn.tasks);
      } else {
        console.error('The "Noción" column was not found.');
      }
    } else {
      console.warn('Task cannot be empty.');
    }
  }

  /**
   * TrackBy function for ngFor to improve rendering performance.
   * @param index The index of the item
   * @param item The item in the list
   */
  trackByIndex(index: number, item: any): number {
    return index;
  }
}
