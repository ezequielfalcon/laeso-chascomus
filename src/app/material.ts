import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdCommonModule, MdCoreModule, MdDialogModule, MdIconModule,
  MdInputModule, MdLineModule, MdListModule, MdProgressBarModule, MdSelectModule,
  MdSidenavModule, MdTableModule, MdTabsModule,
  MdToolbarModule, MdTooltipModule
} from '@angular/material';
import {CdkColumnDef, DataSource} from '@angular/cdk';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdIconModule,
    MdCommonModule,
    MdCoreModule,
    MdCardModule,
    MdSidenavModule,
    MdDialogModule,
    MdToolbarModule,
    MdProgressBarModule,
    MdTableModule,
    MdListModule,
    MdLineModule,
    MdSelectModule,
    MdTabsModule,
    MdTooltipModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdIconModule,
    MdCommonModule,
    MdCoreModule,
    MdCardModule,
    MdSidenavModule,
    MdDialogModule,
    MdToolbarModule,
    MdProgressBarModule,
    MdTableModule,
    MdListModule,
    MdLineModule,
    MdSelectModule,
    MdTabsModule,
    MdTooltipModule
  ],
})
export class MaterialModule { }
