import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatCommonModule, MatDialogModule, MatIconModule,
  MatInputModule, MatLineModule, MatListModule, MatProgressBarModule, MatSelectModule,
  MatSidenavModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatCommonModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatTableModule,
    MatListModule,
    MatLineModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatCommonModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatTableModule,
    MatListModule,
    MatLineModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule
  ],
})
export class MaterialModule { }
