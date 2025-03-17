import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  items: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.apiService.getAll().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (error) => {
        console.error('Erro ao carregar items:', error);
      }
    });
  }
}
