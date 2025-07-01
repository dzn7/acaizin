interface Product {
  id: string;
  name: string;
  price: number;
  complements: number;
  image: string;
  type: 'tigela' | 'copo' | 'barca';
}

interface Complement {
  id: string;
  name: string;
  category: 'gratis' | 'fruta' | 'cobertura' | 'adicional' | 'creme';
  price: number;
}

interface OrderItem extends Product {
  selectedComplements: string[];
}

class AcaiApp {
  private products: Product[] = [
    // Para usar suas próprias imagens, troque .svg pela extensão da sua imagem (.png, .jpg, etc)
    // Exemplo: '/tigela.svg' → '/tigela.png'
    { id: 'tigela300', name: 'Tigela de 300ml', price: 15, complements: 4, image: '/tigela.png', type: 'tigela' },
    { id: 'tigela400', name: 'Tigela de 400ml', price: 19, complements: 4, image: '/tigela.png', type: 'tigela' },
    { id: 'tigela700', name: 'Tigela de 700ml', price: 35, complements: 7, image: '/tigela.png', type: 'tigela' },
    { id: 'copo250', name: 'Copo de 250ml', price: 12, complements: 4, image: '/copo.png', type: 'copo' },
    { id: 'copo300', name: 'Copo de 300ml', price: 14, complements: 4, image: '/copo.png', type: 'copo' },
    { id: 'copo400', name: 'Copo de 400ml', price: 18, complements: 4, image: '/copo.png', type: 'copo' },
    { id: 'barcaP', name: 'Barca Pequena', price: 35, complements: 0, image: '/barca.png', type: 'barca' },
    { id: 'barcaG', name: 'Barca Grande', price: 65, complements: 0, image: '/barca.png', type: 'barca' }
  ];

  private complements: Complement[] = [
    // Complementos Grátis
    { id: 'leite_po', name: 'Leite em pó', category: 'gratis', price: 0 },
    { id: 'castanha', name: 'Castanha', category: 'gratis', price: 0 },
    { id: 'amendoim', name: 'Amendoim', category: 'gratis', price: 0 },
    { id: 'granola', name: 'Granola', category: 'gratis', price: 0 },
    { id: 'sucrilhos', name: 'Sucrilhos', category: 'gratis', price: 0 },
    { id: 'tapioca', name: 'Tapioca', category: 'gratis', price: 0 },
    { id: 'pacoca', name: 'Paçoca', category: 'gratis', price: 0 },
    { id: 'cereja', name: 'Cereja', category: 'gratis', price: 0 },
    { id: 'choco_power', name: 'Choco Power', category: 'gratis', price: 0 },
    { id: 'flocos_arroz', name: 'Flocos de arroz', category: 'gratis', price: 0 },
    { id: 'marshmallow', name: 'Marshmallow', category: 'gratis', price: 0 },
    { id: 'jujuba', name: 'Jujuba', category: 'gratis', price: 0 },
    { id: 'mm', name: 'M&M', category: 'gratis', price: 0 },
    { id: 'bolacha', name: 'Bolacha', category: 'gratis', price: 0 },
    { id: 'bolacha_trit', name: 'Bolacha (triturado)', category: 'gratis', price: 0 },
    { id: 'bolacha_triunfo', name: 'Bolacha (Triunfo)', category: 'gratis', price: 0 },
    { id: 'chocolate_trit', name: 'Chocolate (triturado)', category: 'gratis', price: 0 },
    { id: 'granulado', name: 'Granulado', category: 'gratis', price: 0 },

    // Frutas
    { id: 'banana', name: 'Banana', category: 'fruta', price: 0 },
    { id: 'uva', name: 'Uva', category: 'fruta', price: 0 },

    // Coberturas
    { id: 'cob_chocolate', name: 'Chocolate', category: 'cobertura', price: 0 },
    { id: 'cob_morango', name: 'Morango', category: 'cobertura', price: 0 },
    { id: 'cob_caramelo', name: 'Caramelo', category: 'cobertura', price: 0 },
    { id: 'cob_uva', name: 'Uva', category: 'cobertura', price: 0 },
    { id: 'cob_abacaxi', name: 'Abacaxi', category: 'cobertura', price: 0 },
    { id: 'leite_condensado', name: 'Leite condensado', category: 'cobertura', price: 0 },
    { id: 'cob_kiwi', name: 'Kiwi', category: 'cobertura', price: 0 },

    // Adicionais Pagos
    { id: 'nutella', name: 'Nutella', category: 'adicional', price: 2 },
    { id: 'doce_leite', name: 'Doce de leite', category: 'adicional', price: 2 },
    { id: 'kiwi', name: 'Kiwi', category: 'adicional', price: 2 },

    // Cremes
    { id: 'creme_ninho', name: 'Ninho', category: 'creme', price: 2 },
    { id: 'creme_bacuri', name: 'Bacuri', category: 'creme', price: 2 },
    { id: 'creme_maracuja', name: 'Maracujá', category: 'creme', price: 2 }
  ];

  private selectedProduct: Product | null = null;
  private selectedComplements: Set<string> = new Set();
  private includeDelivery = false;
  private deliveryFee = 2;

  init() {
    this.render();
    this.attachEventListeners();
  }

  private render() {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <header class="header">
        <img src="/acailogo.png" alt="Açaí Em Casa Logo">
        <h1>Açaí Em Casa</h1>
        <p>"O Melhor da Cidade – Entregamos!"</p>
      </header>

      <div class="container">
        <!-- Tigelas -->
        <section class="section">
          <h2 class="section-title">Tigelas</h2>
          <div class="products-grid">
            ${this.renderProducts('tigela')}
          </div>
        </section>

        <!-- Copos -->
        <section class="section">
          <h2 class="section-title">Copos</h2>
          <div class="products-grid">
            ${this.renderProducts('copo')}
          </div>
        </section>

        <!-- Barcas -->
        <section class="section">
          <h2 class="section-title">Barcas</h2>
          <div class="products-grid">
            ${this.renderProducts('barca')}
          </div>
        </section>

        <!-- Complementos -->
        <section class="complements-section" id="complements-section" style="display: none;">
          <h3>Escolha seus complementos</h3>
          <div id="complement-limit-info"></div>

          ${this.renderComplementCategories()}
        </section>

        <!-- Entrega -->
        <section class="delivery-section">
          <h3>Opções de Entrega</h3>
          <div class="delivery-option">
            <input type="checkbox" id="delivery-checkbox">
            <label for="delivery-checkbox">Incluir taxa de entrega (R$ ${this.deliveryFee.toFixed(2)})</label>
          </div>
        </section>

        <!-- Resumo do Pedido -->
        <section class="summary-section">
          <div class="total-price">
            Total: <span id="total-price">R$ 0,00</span>
          </div>
          <button class="confirm-btn" id="confirm-btn" disabled>
            Confirmar Pedido
          </button>
        </section>
      </div>

      <footer class="footer">
        <p>Nossa Senhora dos Remédios – PI</p>
        <p>Instagram: @ACAIEMCASA_NSR</p>
      </footer>
    `;
  }

  private renderProducts(type: 'tigela' | 'copo' | 'barca'): string {
    return this.products
      .filter(product => product.type === type)
      .map(product => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <div class="price">R$ ${product.price.toFixed(2)}</div>
          ${product.complements > 0 ? `<p class="complements-info">${product.complements} complementos</p>` : ''}
          <button class="select-btn" data-product-id="${product.id}">
            Selecionar
          </button>
        </div>
      `)
      .join('');
  }

  private renderComplementCategories(): string {
    const categories = [
      { id: 'gratis', title: 'Complementos Grátis', items: this.complements.filter(c => c.category === 'gratis') },
      { id: 'fruta', title: 'Frutas', items: this.complements.filter(c => c.category === 'fruta') },
      { id: 'cobertura', title: 'Coberturas', items: this.complements.filter(c => c.category === 'cobertura') },
      { id: 'adicional', title: 'Adicionais Pagos (R$ 2,00 cada)', items: this.complements.filter(c => c.category === 'adicional') },
      { id: 'creme', title: 'Cremes (R$ 2,00 cada)', items: this.complements.filter(c => c.category === 'creme') }
    ];

    return categories.map(category => `
      <div class="complement-category">
        <h4>${category.title}</h4>
        <div class="complements-grid">
          ${category.items.map(item => `
            <div class="complement-item">
              <input type="checkbox" id="${item.id}" data-complement-id="${item.id}" data-price="${item.price}">
              <label for="${item.id}">${item.name}</label>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  private attachEventListeners() {
    // Product selection
    document.querySelectorAll('.select-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        const productId = target.dataset.productId;
        if (productId) {
          this.selectProduct(productId);
        }
      });
    });

    // Complement selection
    document.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.type === 'checkbox' && target.dataset.complementId) {
        this.toggleComplement(target.dataset.complementId, target.checked);
      }
    });

    // Delivery checkbox
    const deliveryCheckbox = document.getElementById('delivery-checkbox') as HTMLInputElement;
    if (deliveryCheckbox) {
      deliveryCheckbox.addEventListener('change', (e) => {
        this.includeDelivery = (e.target as HTMLInputElement).checked;
        this.updateTotal();
      });
    }

    // Confirm button
    const confirmBtn = document.getElementById('confirm-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => this.confirmOrder());
    }
  }

  private selectProduct(productId: string) {
    // Reset previous selection
    document.querySelectorAll('.select-btn').forEach(btn => btn.classList.remove('selected'));
    this.selectedComplements.clear();
    document.querySelectorAll('input[data-complement-id]').forEach((input: Element) => {
      (input as HTMLInputElement).checked = false;
    });

    // Select new product
    const product = this.products.find(p => p.id === productId);
    if (product) {
      this.selectedProduct = product;
      const btn = document.querySelector(`[data-product-id="${productId}"]`);
      if (btn) btn.classList.add('selected');

      // Show complements section if product has complements
      const complementsSection = document.getElementById('complements-section');
      if (complementsSection) {
        if (product.complements > 0) {
          complementsSection.style.display = 'block';
          const limitInfo = document.getElementById('complement-limit-info');
          if (limitInfo) {
            limitInfo.innerHTML = `<p style="color: #51125e; font-weight: bold;">Escolha até ${product.complements} complementos grátis</p>`;
          }
        } else {
          complementsSection.style.display = 'none';
        }
      }

      this.updateTotal();
    }
  }

  private toggleComplement(complementId: string, isChecked: boolean) {
    if (!this.selectedProduct) return;

    const complement = this.complements.find(c => c.id === complementId);
    if (!complement) return;

    if (isChecked) {
      // Check if we can add more free complements
      if (complement.price === 0) {
        const freeComplements = Array.from(this.selectedComplements)
          .filter(id => this.complements.find(c => c.id === id)?.price === 0);

        if (freeComplements.length >= this.selectedProduct.complements) {
          // Uncheck the checkbox
          const checkbox = document.getElementById(complementId) as HTMLInputElement;
          if (checkbox) checkbox.checked = false;
          alert(`Você pode escolher apenas ${this.selectedProduct.complements} complementos grátis.`);
          return;
        }
      }
      this.selectedComplements.add(complementId);
    } else {
      this.selectedComplements.delete(complementId);
    }

    this.updateTotal();
  }

  private updateTotal() {
    let total = 0;

    if (this.selectedProduct) {
      total += this.selectedProduct.price;

      // Add paid complements
      this.selectedComplements.forEach(id => {
        const complement = this.complements.find(c => c.id === id);
        if (complement) {
          total += complement.price;
        }
      });
    }

    if (this.includeDelivery) {
      total += this.deliveryFee;
    }

    const totalElement = document.getElementById('total-price');
    if (totalElement) {
      totalElement.textContent = `R$ ${total.toFixed(2)}`;
    }

    const confirmBtn = document.getElementById('confirm-btn') as HTMLButtonElement;
    if (confirmBtn) {
      confirmBtn.disabled = !this.selectedProduct;
    }
  }

  private confirmOrder() {
    if (!this.selectedProduct) return;

    let message = `Olá! Gostaria de fazer um pedido:\n\n`;
    message += `*Produto:* ${this.selectedProduct.name} - R$ ${this.selectedProduct.price.toFixed(2)}\n\n`;

    if (this.selectedComplements.size > 0) {
      message += `*Complementos:*\n`;
      this.selectedComplements.forEach(id => {
        const complement = this.complements.find(c => c.id === id);
        if (complement) {
          message += `- ${complement.name}`;
          if (complement.price > 0) {
            message += ` (+R$ ${complement.price.toFixed(2)})`;
          }
          message += '\n';
        }
      });
      message += '\n';
    }

    let total = this.selectedProduct.price;
    this.selectedComplements.forEach(id => {
      const complement = this.complements.find(c => c.id === id);
      if (complement) {
        total += complement.price;
      }
    });

    if (this.includeDelivery) {
      message += `*Taxa de Entrega:* R$ ${this.deliveryFee.toFixed(2)}\n`;
      total += this.deliveryFee;
    }

    message += `\n*Total:* R$ ${total.toFixed(2)}`;

    const whatsappNumber = '5586981182122';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  const app = new AcaiApp();
  app.init();
});
