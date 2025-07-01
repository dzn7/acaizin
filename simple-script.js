// Dados dos produtos
const products = {
  tigela300: { name: 'Tigela de 300ml', price: 15, complements: 4 },
  tigela400: { name: 'Tigela de 400ml', price: 19, complements: 4 },
  tigela700: { name: 'Tigela de 700ml', price: 35, complements: 7 },
  copo250: { name: 'Copo de 250ml', price: 12, complements: 4 },
  copo300: { name: 'Copo de 300ml', price: 14, complements: 4 },
  copo400: { name: 'Copo de 400ml', price: 18, complements: 4 },
  barcaP: { name: 'Barca Pequena', price: 35, complements: 0 },
  barcaG: { name: 'Barca Grande', price: 65, complements: 0 }
};

// Dados dos complementos
const complements = {
  // Grátis - Estes contam para o limite
  leite_po: { name: 'Leite em pó', price: 0, category: 'gratis' },
  castanha: { name: 'Castanha', price: 0, category: 'gratis' },
  amendoim: { name: 'Amendoim', price: 0, category: 'gratis' },
  granola: { name: 'Granola', price: 0, category: 'gratis' },
  sucrilhos: { name: 'Sucrilhos', price: 0, category: 'gratis' },
  tapioca: { name: 'Tapioca', price: 0, category: 'gratis' },
  pacoca: { name: 'Paçoca', price: 0, category: 'gratis' },
  cereja: { name: 'Cereja', price: 0, category: 'gratis' },
  choco_power: { name: 'Choco Power', price: 0, category: 'gratis' },
  flocos_arroz: { name: 'Flocos de arroz', price: 0, category: 'gratis' },
  marshmallow: { name: 'Marshmallow', price: 0, category: 'gratis' },
  jujuba: { name: 'Jujuba', price: 0, category: 'gratis' },
  mm: { name: 'M&M', price: 0, category: 'gratis' },
  bolacha: { name: 'Bolacha', price: 0, category: 'gratis' },
  bolacha_trit: { name: 'Bolacha (triturado)', price: 0, category: 'gratis' },
  bolacha_triunfo: { name: 'Bolacha (Triunfo)', price: 0, category: 'gratis' },
  chocolate_trit: { name: 'Chocolate (triturado)', price: 0, category: 'gratis' },
  granulado: { name: 'Granulado', price: 0, category: 'gratis' },
  // Frutas - Não contam para o limite
  banana: { name: 'Banana', price: 0, category: 'fruta' },
  uva: { name: 'Uva', price: 0, category: 'fruta' },
  // Coberturas - Não contam para o limite
  cob_chocolate: { name: 'Chocolate', price: 0, category: 'cobertura' },
  cob_morango: { name: 'Morango', price: 0, category: 'cobertura' },
  cob_caramelo: { name: 'Caramelo', price: 0, category: 'cobertura' },
  cob_uva: { name: 'Uva', price: 0, category: 'cobertura' },
  cob_abacaxi: { name: 'Abacaxi', price: 0, category: 'cobertura' },
  leite_condensado: { name: 'Leite condensado', price: 0, category: 'cobertura' },
  cob_kiwi: { name: 'Kiwi', price: 0, category: 'cobertura' },
  // Adicionais pagos
  nutella: { name: 'Nutella', price: 2, category: 'adicional' },
  doce_leite: { name: 'Doce de leite', price: 2, category: 'adicional' },
  kiwi: { name: 'Kiwi', price: 2, category: 'adicional' },
  // Cremes
  creme_ninho: { name: 'Ninho', price: 2, category: 'creme' },
  creme_bacuri: { name: 'Bacuri', price: 2, category: 'creme' },
  creme_maracuja: { name: 'Maracujá', price: 2, category: 'creme' }
};

// Variáveis globais
let selectedProduct = null;
let selectedComplements = new Set();
let freeComplementsCount = 0;

// Função para selecionar produto
function selectProduct(productId) {
  // Resetar seleção anterior
  document.querySelectorAll('.select-btn').forEach(btn => {
    btn.classList.remove('selected');
  });

  // Limpar complementos
  selectedComplements.clear();
  document.querySelectorAll('input[data-complement-id]').forEach(input => {
    input.checked = false;
  });

  // Selecionar novo produto
  selectedProduct = productId;
  const btn = document.querySelector(`[data-product-id="${productId}"]`);
  if (btn) {
    btn.classList.add('selected');
  }

  // Mostrar/esconder seção de complementos
  const product = products[productId];
  const complementsSection = document.getElementById('complements-section');
  const limitInfo = document.getElementById('complement-limit-info');

  if (product.complements > 0) {
    complementsSection.style.display = 'block';
    limitInfo.innerHTML = `<p style="color: #51125e; font-weight: bold;">Escolha até ${product.complements} complementos grátis (frutas e coberturas são ilimitadas)</p>`;
  } else {
    complementsSection.style.display = 'none';
  }

  updateTotal();
}

// Função para alternar complemento
function toggleComplement(complementId, isChecked) {
  if (!selectedProduct) return;

  const product = products[selectedProduct];
  const complement = complements[complementId];

  if (isChecked) {
    // Verificar limite apenas para categoria 'gratis'
    if (complement.category === 'gratis') {
      const gratisCount = Array.from(selectedComplements)
        .filter(id => complements[id].category === 'gratis').length;

      if (gratisCount >= product.complements) {
        document.getElementById(complementId).checked = false;
        alert(`Você pode escolher apenas ${product.complements} complementos grátis. Frutas e coberturas são ilimitadas!`);
        return;
      }
    }
    selectedComplements.add(complementId);
  } else {
    selectedComplements.delete(complementId);
  }

  updateTotal();
}

// Função para atualizar total
function updateTotal() {
  let total = 0;

  if (selectedProduct) {
    const product = products[selectedProduct];
    total += product.price;

    // Adicionar complementos pagos
    selectedComplements.forEach(id => {
      const complement = complements[id];
      total += complement.price;
    });
  }

  // Adicionar taxa de entrega se selecionada
  const deliveryCheckbox = document.getElementById('delivery-checkbox');
  if (deliveryCheckbox && deliveryCheckbox.checked) {
    total += 2;
  }

  // Atualizar display
  document.getElementById('total-price').textContent = `R$ ${total.toFixed(2)}`;

  // Habilitar/desabilitar botão de confirmar
  const confirmBtn = document.getElementById('confirm-btn');
  confirmBtn.disabled = !selectedProduct;
}

// Função para confirmar pedido
function confirmOrder() {
  if (!selectedProduct) return;

  const product = products[selectedProduct];
  let message = `Olá! Gostaria de fazer um pedido:\n\n`;
  message += `*Produto:* ${product.name} - R$ ${product.price.toFixed(2)}\n\n`;

  if (selectedComplements.size > 0) {
    message += `*Complementos:*\n`;
    selectedComplements.forEach(id => {
      const complement = complements[id];
      message += `- ${complement.name}`;
      if (complement.price > 0) {
        message += ` (+R$ ${complement.price.toFixed(2)})`;
      }
      message += '\n';
    });
    message += '\n';
  }

  let total = product.price;
  selectedComplements.forEach(id => {
    total += complements[id].price;
  });

  const deliveryCheckbox = document.getElementById('delivery-checkbox');
  if (deliveryCheckbox && deliveryCheckbox.checked) {
    message += `*Taxa de Entrega:* R$ 2,00\n`;
    total += 2;
  }

  message += `\n*Total:* R$ ${total.toFixed(2)}`;

  const whatsappNumber = '5586981182122';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}
