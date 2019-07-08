import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cate-detail', loadChildren: './cate-detail/cate-detail.module#CateDetailPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'register2', loadChildren: './register2/register2.module#Register2PageModule' },
  { path: 'register3', loadChildren: './register3/register3.module#Register3PageModule' },
  { path: 'search-page', loadChildren: './search-page/search-page.module#SearchPagePageModule' },
  { path: 'product-lists', loadChildren: './product-lists/product-lists.module#ProductListsPageModule' },
  { path: 'product-detail', loadChildren: './product-detail/product-detail.module#ProductDetailPageModule' },
  { path: 'user-info', loadChildren: './user-info/user-info.module#UserInfoPageModule' },
  { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
  { path: 'my-order', loadChildren: './my-order/my-order.module#MyOrderPageModule' },
  { path: 'my-address', loadChildren: './my-address/my-address.module#MyAddressPageModule' },
  { path: 'add-address', loadChildren: './add-address/add-address.module#AddAddressPageModule' },
  { path: 'edit-address', loadChildren: './edit-address/edit-address.module#EditAddressPageModule' },
  { path: 'payorder', loadChildren: './payorder/payorder.module#PayorderPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
