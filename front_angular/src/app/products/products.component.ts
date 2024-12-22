import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  user: any;
  products: any[] = [];
  newProduct: any = {
    code: '',
    name: '',
    description: '',
    image: '',
    category: '',
    price: 0,
    quantity: 0,
    internalReference: '',
    shellId: 0,
    inventoryStatus: 'INSTOCK',
    rating: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe({
      next: (data) => {
        this.user = data;
        console.log('User data:', data);
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });

    this.userService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Products:', data);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  isAdminOrSuperAdmin(): boolean {
    return (
      this.user &&
      (this.user.role === 'admin' || this.user.role === 'superadmin')
    );
  }

  viewProduct(product: any): void {
    console.log('Viewing product:', product);
  }

  editProduct(product: any): void {
    console.log('Editing product:', product);
  }

  deleteProduct(product: any): void {
    console.log('Deleting product:', product);
  }

  openAddProductModal(): void {
    const modalRef = this.modalService.open('addProductModal');
  }

  onAddProduct(): void {
    this.userService.addProduct(this.newProduct).subscribe({
      next: (response) => {
        console.log('Product added:', response);
        this.products.push(response);
        this.modalService.dismissAll();
      },
      error: (err) => {
        console.error('Error adding product:', err);
      },
    });
  }
}
