import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusquedaMascotasComponent } from './childs/busqueda-mascotas/busqueda-mascotas.component';
import { RegistroUsuarioComponent } from './childs/registro-usuario/registro-usuario/registro-usuario.component';
import { GuardsGuard } from './guards/guards.guard';

const routes: Route[] = [
    {
        path: '',
        component: MenuComponent,
        children: [
            {path: '',
            loadChildren: () => import(`./childs/busqueda-mascota.module`).then(m => m.BusquedaMascotasModule), canActivate: [GuardsGuard]},
            {path: '', redirectTo: 'mascotas', pathMatch: 'full', canActivate: [GuardsGuard]},
        ]

    },
    {path: 'login', component: LoginComponent},
];

@NgModule({
   imports: [
       RouterModule.forRoot(routes)
   ],
   exports: [RouterModule],
   declarations: [
    ]
})
export class RoutesModule{ }
