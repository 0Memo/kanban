import { Component, inject, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { Database, ref, onValue, set, remove } from '@angular/fire/database';
import { Column } from '../../models/column.model';
import { Board } from '../../models/board.model';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultilangService } from '@app/multilang.service';
import { TranslateModule } from '@ngx-translate/core';
import { CdkMenuModule, CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
@Component({
    standalone: true,
    selector: 'app-main-view',
    imports: [CdkDropList, CdkDrag, CdkDropListGroup, NgFor, FormsModule, TranslateModule, CommonModule, CdkMenuModule],
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  newTask: string = '';

  // Define the languages array with a specific type
  languages: Array<'fr' | 'en' | 'es' | 'pt' | 'am'> = ['fr', 'en', 'es', 'pt', 'am'];

  // Kanban board initialized as an empty board
  board: Board = new Board('FirebaseBoard', []);
  columnTranslations: { [key: string]: string } = {};

  constructor(private db: Database) {}

  ngOnInit(): void {
    this.loadBoardFromDatabase();
    this.loadColumnTranslations();
  }

  ngOnChanges(): void {
    this.loadColumnTranslations();
  }

  multiLangService = inject(MultilangService);
   // Type currentLanguage as one of the valid languages ('fr' | 'en' | 'es' | 'pt')
  currentLanguage: 'fr' | 'en' | 'es' | 'pt' | 'am' = this.multiLangService.languageSignal() as 'fr' | 'en' | 'es' | 'pt' | 'am';

  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleLanguage(language: 'fr' | 'en' | 'es' | 'pt' | 'am'): void {
    if (this.currentLanguage !== language) {
      this.multiLangService.updateLanguage(language);
      this.currentLanguage = language;
      this.loadColumnTranslations(); // Reload translations after language change
    }
  }

  getLanguageName(language: string) : string {
    switch(language) {
      case "fr":
        return "français";
      case "en":
        return "english";
      case "es":
        return "español";
      case "pt":
        return "português";
      case "am":
        return "հայերեն";
      default:
        return "français";
    }
  }

  /**
   * Loads the Kanban board data from Firebase Realtime Database.
   */
  loadBoardFromDatabase(): void {
    const boardRef = ref(this.db, 'kanbanBoard');
    onValue(boardRef, (snapshot: any) => {
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
   * Loads the column translations based on the current language and updates the column names.
   */
  loadColumnTranslations(): void {
    this.multiLangService.translateService
      .stream('columns')
      .subscribe((translations) => {
        this.columnTranslations = translations || {};
        console.log('Column translations updated:', this.columnTranslations);
      });
  }

  /**
 * Gets the translated column name or falls back to the original name if not translated.
 * @param columnName The original column name
 */
  getTranslatedColumnName(columnName: string): string {
    // Use the translate service to get the column translation
    const translationKey = `columns.${columnName}`;
    return this.multiLangService.translateService.instant(translationKey) || columnName;
  }

  /**
   * Saves the Kanban board data to Firebase Realtime Database.
   */
  saveBoardToDatabase(): void {
    const boardRef = ref(this.db, 'kanbanBoard');
    set(boardRef, { columns: this.board.columns }).then(() => {
      console.log('Board saved to Firebase:', this.board);
    }).catch((error: any) => {
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
      // const notionColumn = this.board.columns.find((col) => col.name === 'Noción');
      const firstColumn = this.board.columns[0];

      if (firstColumn) {
        // Add the new task to the "Noción" column
        firstColumn.tasks.push(this.newTask);
        this.newTask = '';
        this.saveBoardToDatabase(); // Save changes to Firebase
        console.log('Task added to "Noción" column:', firstColumn.tasks);
      } else {
        console.error('The "Noción" column was not found.');
      }
    } else {
      console.warn('Task cannot be empty.');
    }
  }

  /**
 * Deletes a task from a specific column in Firebase Realtime Database.
 * @param columnName The name of the column
 * @param task The task to delete
 */
  deleteTask(columnName: string, task: string): void {
    // Find the column by name
    const column = this.board.columns.find((col) => col.name === columnName);

    if (column) {
      // Find the index of the task to delete
      const taskIndex = column.tasks.indexOf(task);

      // If the task is found, remove it
      if (taskIndex > -1) {
        column.tasks.splice(taskIndex, 1);  // Remove the task from the array
        this.saveBoardToDatabase();          // Save the updated board to Firebase
        console.log(`Task "${task}" deleted from column "${columnName}".`);
      }
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
