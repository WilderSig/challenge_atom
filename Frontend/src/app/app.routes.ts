import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import("./pages/home/home.component").then((m) => m.HomeComponent)

    }, 
    {
        path: "login",
        loadComponent: () => import("./pages/login/login.component").then((m) => m.LoginComponent)

    }, 
    {
        path: "example",
        loadComponent: () => import("./modules/example-page/example-page.component").then((m) => m.ExamplePageComponent)

    }


];
