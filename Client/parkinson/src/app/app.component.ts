import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "angularfirebase-authentication";
}
