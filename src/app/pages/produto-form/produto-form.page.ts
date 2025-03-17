import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.page.html',
  styleUrls: ['./produto-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule]
})
export class ProdutoFormPage implements OnInit {
  produtoForm: FormGroup;
  isEdit = false;
  selectedImage: File | null = null;
  previewImage: string | null = null;
  existingImageUrl: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private toastController: ToastController
  ) {
    this.produtoForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0)]],
      quantidade: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      descricao: ['']
    });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      const produto = await this.produtoService.getProduto(Number(id));
      if (produto) {
        this.produtoForm.patchValue(produto);
        if (produto.imagem_url) {
          this.existingImageUrl = produto.imagem_url;
        }
      } else {
        this.router.navigate(['/produtos']);
      }
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      
      
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }

  async onSubmit() {
    if (this.produtoForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const produto: Produto = this.produtoForm.value;
      
      try {
        if (this.isEdit) {
          const produtoAtualizado = await this.produtoService.updateProduto(produto, this.selectedImage || undefined);
        } else {
          
          await this.produtoService.addProduto(produto, this.selectedImage || undefined);
          await this.presentToast('Produto criado com sucesso');
        }
        
        this.router.navigate(['/produtos']);
      } catch (error) {
        console.error('Erro ao salvar produto:', error);
        await this.presentToast('Erro ao salvar o produto. Tente novamente.', 'danger');
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}