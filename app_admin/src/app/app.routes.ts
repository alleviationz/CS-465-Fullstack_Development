import { Routes } from '@angular/router';
import { AddTrip } from './add-trip/add-trip';
import { TripListing } from './trip-listing/trip-listing';
import { EditTrip } from './edit-trip/edit-trip';
import { DeleteTrip } from './delete-trip/delete-trip'
import { Login } from './login/login';
import { Register } from './register/register';

// all admin SPA routes to be used by Angular
export const routes: Routes = [
    { path: 'add-trip', component: AddTrip },
    { path: 'edit-trip', component: EditTrip },
    { path: 'delete-trip', component: DeleteTrip },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '', component: TripListing, pathMatch: 'full'}
];