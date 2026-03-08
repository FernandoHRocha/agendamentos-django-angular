import { Routes } from '@angular/router';
import { Home } from './views/home/home';

export const routes: Routes = [
	{
		path: '',
		component: Home,
		title: 'Agendamentos'
	},
	{
		path: 'agendamento',
		loadComponent: () => import('./views/agendamento/list/list').then(m => m.List),
		title: 'Listagem de Agendamentos',
	},
	{
		path: 'agendamento/criar',
		loadComponent: () => import('./views/agendamento/form/form').then(m => m.Form),
		title: 'Novo Agendamento',
	},
	{
		path: 'agendamento/editar/:id',
		loadComponent: () => import('./views/agendamento/form/form').then(m => m.Form),
		title: 'Editar Agendamento',
	},
	{
		path: '**',
		redirectTo: '',
	}
];