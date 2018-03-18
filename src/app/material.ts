import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatCommonModule, MatDialogModule, MatIconModule,
  MatInputModule, MatLineModule, MatListModule, MatProgressBarModule, MatSelectModule,
  MatSidenavModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule, MatGridListModule
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
    MatTooltipModule,
    MatGridListModule
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
    MatTooltipModule,
    MatGridListModule
  ],
})
export class MaterialModule { }
