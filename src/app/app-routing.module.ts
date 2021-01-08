import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatechecklistComponent } from './createchecklist/createchecklist.component';
import { AssetTableComponent} from './asset-table/asset-table.component';
import { ChecklistpoolComponent } from './checklistpool/checklistpool.component';
import { AssetTableIndexComponent } from './asset-table-index/asset-table-index.component';
import { DialogAssetTableComponent } from './dialog-asset-table/dialog-asset-table.component';

const routes: Routes = [
  {path: 'createchecklist', component:CreatechecklistComponent },
  {path: 'asset-table' , component: AssetTableComponent},
  {path: 'asset-table/:id', component: AssetTableIndexComponent},
  {path: 'checklistpool', component: ChecklistpoolComponent},
  {path: 'asset-table/:id', component: DialogAssetTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [CreatechecklistComponent, AssetTableComponent, ChecklistpoolComponent, AssetTableIndexComponent]
