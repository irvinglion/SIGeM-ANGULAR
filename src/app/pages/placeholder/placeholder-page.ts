import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  templateUrl: './placeholder-page.html',
  styleUrls: ['./placeholder-page.css']
})
export class PlaceholderPageComponent {
  pageTitle = 'Pagina em construcao';

  constructor(private route: ActivatedRoute) {
    this.pageTitle = this.route.snapshot.data['title'] ?? this.pageTitle;
  }
}
