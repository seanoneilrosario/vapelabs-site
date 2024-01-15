function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

const trapFocusHandlers = {};

function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = (event) => {
    if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
      return;

    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function() {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function(event) {
    if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if (
      (event.target === container || event.target === first) &&
      event.shiftKey
    ) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);

  elementToFocus.focus();
}

// Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.
try {
  document.querySelector(":focus-visible");
} catch {
  focusVisiblePolyfill();
}

function focusVisiblePolyfill() {
  const navKeys = ['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'TAB', 'ENTER', 'SPACE', 'ESCAPE', 'HOME', 'END', 'PAGEUP', 'PAGEDOWN']
  let currentFocusedElement = null;
  let mouseClick = null;

  window.addEventListener('keydown', (event) => {
    if(navKeys.includes(event.code.toUpperCase())) {
      mouseClick = false;
    }
  });

  window.addEventListener('mousedown', (event) => {
    mouseClick = true;
  });

  window.addEventListener('focus', () => {
                          if (currentFocusedElement) currentFocusedElement.classList.remove('focused');

  if (mouseClick) return;

  currentFocusedElement = document.activeElement;
  currentFocusedElement.classList.add('focused');

}, true);
}

function pauseAllMedia() {
  document.querySelectorAll('.js-youtube').forEach((video) => {
    video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  });
  document.querySelectorAll('.js-vimeo').forEach((video) => {
    video.contentWindow.postMessage('{"method":"pause"}', '*');
  });
  document.querySelectorAll('video').forEach((video) => video.pause());
  document.querySelectorAll('product-model').forEach((model) => {
    if (model.modelViewerUI) model.modelViewerUI.pause();
  });
}

function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
}

function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== 'ESCAPE') return;

  const openDetailsElement = event.target.closest('details[open]');
  if (!openDetailsElement) return;

  const summaryElement = openDetailsElement.querySelector('summary');
  openDetailsElement.removeAttribute('open');
  summaryElement.focus();
}

class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input');
    this.changeEvent = new Event('change', { bubbles: true })

    this.querySelectorAll('button').forEach(
      (button) => button.addEventListener('click', this.onButtonClick.bind(this))
    );
  }

  onButtonClick(event) {
    event.preventDefault();
    const previousValue = this.input.value;

    event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
    if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
  }
}

customElements.define('quantity-input', QuantityInput);

class CartNote extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('change', debounce((event) => {
      const body = JSON.stringify({ note: event.target.value });
      fetch(`${routes.cart_update_url}`, {...fetchConfig(), ...{ body }});
    }, 300))
  }
}

customElements.define('cart-note', CartNote);

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

const serializeForm = form => {
  const obj = {};
  const formData = new FormData(form);

  for (const key of formData.keys()) {
    const regex = /(?:^(properties\[))(.*?)(?:\]$)/;

    if (regex.test(key)) {
      obj.properties = obj.properties || {};
      obj.properties[regex.exec(key)[2]] = formData.get(key);
    } else {
      obj[key] = formData.get(key);
    }
  }

  return JSON.stringify(obj);
};

function fetchConfig(type = 'json') {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
  };
}

/*
 * Shopify Common JS
 *
 */
if ((typeof window.Shopify) == 'undefined') {
  window.Shopify = {};
}

Shopify.bind = function(fn, scope) {
  return function() {
    return fn.apply(scope, arguments);
  }
};

Shopify.setSelectorByValue = function(selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};

Shopify.addListener = function(target, eventName, callback) {
  target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent('on'+eventName, callback);
};

Shopify.postLink = function(path, options) {
  options = options || {};
  var method = options['method'] || 'post';
  var params = options['parameters'] || {};

  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for(var key in params) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

Shopify.CountryProvinceSelector = function(country_domid, province_domid, options) {
  this.countryEl         = document.getElementById(country_domid);
  this.provinceEl        = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);

  Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler,this));

  this.initCountry();
  this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function() {
    var value = this.countryEl.getAttribute('data-default');
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },

  initProvince: function() {
    var value = this.provinceEl.getAttribute('data-default');
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },

  countryHandler: function(e) {
    var opt       = this.countryEl.options[this.countryEl.selectedIndex];
    var raw       = opt.getAttribute('data-provinces');
    var provinces = JSON.parse(raw);

    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = 'none';
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement('option');
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }

      this.provinceContainer.style.display = "";
    }
  },

  clearOptions: function(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },

  setOptions: function(selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement('option');
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  }
};

class MenuDrawer extends HTMLElement {
  constructor() {
    super();

    this.mainDetailsToggle = this.querySelector('details');
    const summaryElements = this.querySelectorAll('summary');
    this.addAccessibilityAttributes(summaryElements);

    if (navigator.platform === 'iPhone') document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);

    this.addEventListener('keyup', this.onKeyUp.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.bindEvents();
  }

  bindEvents() {
    this.querySelectorAll('summary').forEach(summary => summary.addEventListener('click', this.onSummaryClick.bind(this)));
    this.querySelectorAll('button').forEach(button => button.addEventListener('click', this.onCloseButtonClick.bind(this)));
  }

  addAccessibilityAttributes(summaryElements) {
    summaryElements.forEach(element => {
      element.setAttribute('role', 'button');
      element.setAttribute('aria-expanded', false);
      element.setAttribute('aria-controls', element.nextElementSibling.id);
    });
  }

  onKeyUp(event) {
    if(event.code.toUpperCase() !== 'ESCAPE') return;

    const openDetailsElement = event.target.closest('details[open]');
    if(!openDetailsElement) return;

    openDetailsElement === this.mainDetailsToggle ? this.closeMenuDrawer(this.mainDetailsToggle.querySelector('summary')) : this.closeSubmenu(openDetailsElement);
  }

  onSummaryClick(event) {
    const summaryElement = event.currentTarget;
    const detailsElement = summaryElement.parentNode;
    const isOpen = detailsElement.hasAttribute('open');

    if (detailsElement === this.mainDetailsToggle) {
      if(isOpen) event.preventDefault();
      isOpen ? this.closeMenuDrawer(summaryElement) : this.openMenuDrawer(summaryElement);
    } else {
      trapFocus(summaryElement.nextElementSibling, detailsElement.querySelector('button'));

      setTimeout(() => {
                 detailsElement.classList.add('menu-opening');
    });
  }
}

openMenuDrawer(summaryElement) {
  setTimeout(() => {
             this.mainDetailsToggle.classList.add('menu-opening');
});   
	this.mainDetailsToggle.querySelectorAll('details').forEach(details =>  {
      details.setAttribute('open','');
    });
summaryElement.setAttribute('aria-expanded', true);
trapFocus(this.mainDetailsToggle, summaryElement);
document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
}

closeMenuDrawer(event, elementToFocus = false) {
  if (event !== undefined) {
    this.mainDetailsToggle.classList.remove('menu-opening');
    this.mainDetailsToggle.querySelectorAll('details').forEach(details =>  {
      details.classList.remove('menu-opening');
    });
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
    document.body.classList.remove(`overflow-hidden-${this.dataset.breakpoint}`);
    removeTrapFocus(elementToFocus);
    this.closeAnimation(this.mainDetailsToggle);
  }
}

onFocusOut(event) {
  setTimeout(() => {
             if (this.mainDetailsToggle.hasAttribute('open') && !this.mainDetailsToggle.contains(document.activeElement)) this.closeMenuDrawer();
});
}

onCloseButtonClick(event) {
  const detailsElement = event.currentTarget.closest('details');
  this.closeSubmenu(detailsElement);
}

closeSubmenu(detailsElement) {
  detailsElement.classList.remove('menu-opening');
  removeTrapFocus();
  this.closeAnimation(detailsElement);
}

closeAnimation(detailsElement) {
  let animationStart;

  const handleAnimation = (time) => {
    if (animationStart === undefined) {
      animationStart = time;
    }

    const elapsedTime = time - animationStart;

    if (elapsedTime < 400) {
      window.requestAnimationFrame(handleAnimation);
    } else {
      detailsElement.removeAttribute('open');
      if (detailsElement.closest('details[open]')) {
        trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
      }
    }
  }

  window.requestAnimationFrame(handleAnimation);
}
}

customElements.define('menu-drawer', MenuDrawer);

class HeaderDrawer extends MenuDrawer {
  constructor() {
    super();
  }

  openMenuDrawer(summaryElement) {
    this.header = this.header || document.getElementById('shopify-section-header');
    this.borderOffset = this.borderOffset || this.closest('.header-wrapper').classList.contains('header-wrapper--border-bottom') ? 1 : 0;
    document.documentElement.style.setProperty('--header-bottom-position', `${parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset)}px`);

    setTimeout(() => {
               this.mainDetailsToggle.classList.add('menu-opening');
  });

summaryElement.setAttribute('aria-expanded', true);
trapFocus(this.mainDetailsToggle, summaryElement);
document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
}
}

customElements.define('header-drawer', HeaderDrawer);

class ModalDialog extends HTMLElement {
  constructor() {
    super();
    this.querySelector('[id^="ModalClose-"]').addEventListener(
      'click',
      this.hide.bind(this)
    );
    this.addEventListener('keyup', (event) => {
      if (event.code.toUpperCase() === 'ESCAPE') this.hide();
    });
    if (this.classList.contains('media-modal')) {
      this.addEventListener('pointerup', (event) => {
        if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) this.hide();
      });
    } else {
      this.addEventListener('click', (event) => {
        if (event.target.nodeName === 'MODAL-DIALOG') this.hide();
      });
    }
  }

  show(opener) {
    this.openedBy = opener;
    const popup = this.querySelector('.template-popup');
    document.body.classList.add('overflow-hidden');
    this.setAttribute('open', '');
    if (popup) popup.loadContent();
    trapFocus(this, this.querySelector('[role="dialog"]'));
    window.pauseAllMedia();
  }

  hide() {
    document.body.classList.remove('overflow-hidden');
    this.removeAttribute('open');
    removeTrapFocus(this.openedBy);
    window.pauseAllMedia();
  }
}
customElements.define('modal-dialog', ModalDialog);

class ModalOpener extends HTMLElement {
  constructor() {
    super();

    const button = this.querySelector('button');

    if (!button) return;
    button.addEventListener('click', () => {
                            const modal = document.querySelector(this.getAttribute('data-modal'));
    if (modal) modal.show(button);
  });
}
}
customElements.define('modal-opener', ModalOpener);

class DeferredMedia extends HTMLElement {
  constructor() {
    super();
    const poster = this.querySelector('[id^="Deferred-Poster-"]');
    if (!poster) return;
    poster.addEventListener('click', this.loadContent.bind(this));
  }

  loadContent() {
    window.pauseAllMedia();
    if (!this.getAttribute('loaded')) {
      const content = document.createElement('div');
      content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));

      this.setAttribute('loaded', true);
      this.appendChild(content.querySelector('video, model-viewer, iframe')).focus();
    }
  }
}

customElements.define('deferred-media', DeferredMedia);

// class SliderComponent extends HTMLElement {
//   constructor() {
//     super();
//     this.slider = this.querySelector('ul');
//     this.sliderItems = this.querySelectorAll('li');
//     this.pageCount = this.querySelector('.slider-counter--current');
//     this.pageTotal = this.querySelector('.slider-counter--total');
//     this.prevButton = this.querySelector('button[name="previous"]');
//     this.nextButton = this.querySelector('button[name="next"]');

//     if (!this.slider || !this.nextButton) return;

//     const resizeObserver = new ResizeObserver(entries => this.initPages());
//     resizeObserver.observe(this.slider);

//     this.slider.addEventListener('scroll', this.update.bind(this));
//     this.prevButton.addEventListener('click', this.onButtonClick.bind(this));
//     this.nextButton.addEventListener('click', this.onButtonClick.bind(this));
//   }

//   initPages() {
//     const sliderItemsToShow = Array.from(this.sliderItems).filter(element => element.clientWidth > 0);
//     this.sliderLastItem = sliderItemsToShow[sliderItemsToShow.length - 1];
//     if (sliderItemsToShow.length === 0) return;
//     this.slidesPerPage = Math.floor(this.slider.clientWidth / sliderItemsToShow[0].clientWidth);
//     this.totalPages = sliderItemsToShow.length - this.slidesPerPage + 1;
//     this.update();
//   }

//   update() {
//     if (!this.pageCount || !this.pageTotal) return;
//     this.currentPage = Math.round(this.slider.scrollLeft / this.sliderLastItem.clientWidth) + 1;

//     if (this.currentPage === 1) {
//       this.prevButton.setAttribute('disabled', true);
//     } else {
//       this.prevButton.removeAttribute('disabled');
//     }

//     if (this.currentPage === this.totalPages) {
//       this.nextButton.setAttribute('disabled', true);
//     } else {
//       this.nextButton.removeAttribute('disabled');
//     }

//     this.pageCount.textContent = this.currentPage;
//     this.pageTotal.textContent = this.totalPages;
//   }

//   onButtonClick(event) {
//     event.preventDefault();
//     const slideScrollPosition = event.currentTarget.name === 'next' ? this.slider.scrollLeft + this.sliderLastItem.clientWidth : this.slider.scrollLeft - this.sliderLastItem.clientWidth;
//     this.slider.scrollTo({
//       left: slideScrollPosition
//     });
//   }
// }

// customElements.define('slider-component', SliderComponent);

class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
    this.productState = {
      outofstock: false,
      instock: false
    };
  }

  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();

    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
      this.updateStock();
      this.setProductState();
    }
  }

  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  updateMedia() {
    if (!this.currentVariant) return;
    if (!this.currentVariant.featured_media) return;
    const newMedia = document.querySelector(
      `[data-media-id="${this.dataset.section}-${this.currentVariant.featured_media.id}"]`
    );

    if (!newMedia) return;
    const parent = newMedia.parentElement;
    if(document.querySelector('body').classList.contains('product_sticky')) {
      $('.product-single__media-wrapper').addClass('hide');
    }
    if (parent.firstChild == newMedia) return;
    parent.prepend(newMedia);
    if(document.querySelector('body').classList.contains('product_sticky')) {
      newMedia.classList.remove('hide');
    }
    
    const newMedia1 = document.querySelector(
      `[data-thumbnail-id="${this.dataset.section}-${this.currentVariant.featured_media.id}"]`
    );
    if (!newMedia1) return;
    const parent1 = newMedia1.parentElement;
      var aa = parent1.getAttribute('data-slick-index');
    $('.product-single__thumbs').slick('slickGoTo', aa);
    
    
    this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
    if(this.stickyHeader) {
      this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
    }
    window.setTimeout(() => { parent.querySelector('.product-single__media-wrapper').scrollIntoView({behavior: "smooth"}); });
}

updateURL() {
  if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
  window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
}

updateVariantInput() {
  const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment`);
  productForms.forEach((productForm) => {
    const input = productForm.querySelector('input[name="id"]');
    input.value = this.currentVariant.id;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

updatePickupAvailability() {
  const pickUpAvailability = document.querySelector('pickup-availability');
  if (!pickUpAvailability) return;

  if (this.currentVariant && this.currentVariant.available) {
    pickUpAvailability.fetchAvailability(this.currentVariant.id);
  } else {
    pickUpAvailability.removeAttribute('available');
    pickUpAvailability.innerHTML = '';
  }
}

removeErrorMessage() {
  const section = this.closest('section');
  if (!section) return;

  const productForm = section.querySelector('product-form');
  if (productForm) productForm.handleErrorMessage();
}

renderProductInfo() {
  fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`)
  .then((response) => response.text())
  .then((responseText) => {
    const id = `price-${this.dataset.section}`;
    const html = new DOMParser().parseFromString(responseText, 'text/html')
    const destination = document.getElementById(id);
    const source = html.getElementById(id);

    if (source && destination) destination.innerHTML = source.innerHTML;

    const price = document.getElementById(`price-${this.dataset.section}`);

    if (price) price.classList.remove('visibility-hidden');
    this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
  });
}

toggleAddButton(disable = true, text, modifyClass = true) {
  const productForm = document.getElementById(`product-form-${this.dataset.section}`);
  if (!productForm) return;
  const addButton = productForm.querySelector('[name="add"]');
  const addButtonText = productForm.querySelector('[name="add"] > span');
  const productQty = document.getElementById('product-qty');
  const notifyMe = document.getElementById('notify');

  if (!addButton) return;

  if (disable) {
    addButton.setAttribute('disabled', true);
    if (text) addButtonText.textContent = text;
    notifyMe.classList.remove('hide');
    productQty.classList.add('hide');
  } else {
    addButton.removeAttribute('disabled');
    addButtonText.textContent = window.variantStrings.addToCart;
    notifyMe.classList.add('hide');
    productQty.classList.remove('hide');
  }

  if (!modifyClass) return;
}

setUnavailable() {
  const button = document.getElementById(`product-form-${this.dataset.section}`);
  const addButton = button.querySelector('[name="add"]');
  const addButtonText = button.querySelector('[name="add"] > span');
  const price = document.getElementById(`price-${this.dataset.section}`);
  const productQty = document.getElementById('product-qty');
  const notifyMe = document.getElementById('notify');
  if (!addButton) return;
  addButtonText.textContent = window.variantStrings.unavailable;
  notifyMe.classList.remove('hide');
  productQty.classList.add('hide');
  if (price) price.classList.add('visibility-hidden');
}

setProductState() {
  this.productState.instock = this.currentVariant.available;
  this.productState.outofstock = !this.currentVariant.available;
}

updateStock() {
  const stockId = this.currentVariant.id;
  const c = document.querySelector('#pvr-' + stockId);
  const c1 = c.getAttribute('data-id');
  const quantity = document.querySelector('.items');
  const quantityNotice = document.querySelector('.product-inventory .inv');
  if (!quantity) return;
  quantity.textContent = c1;
  if (this.currentVariant.available) {
    quantityNotice.classList.add('instock');
    quantityNotice.classList.remove('outstock');
  }
  if (!this.currentVariant.available) {
    quantityNotice.classList.remove('instock');
    quantityNotice.classList.add('outstock');
  }
}

getVariantData() {
  this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
  return this.variantData;
}
}

customElements.define('variant-selects', VariantSelects);

class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }

  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
  }
}

customElements.define('variant-radios', VariantRadios);
  // function buildSearchQuery() {
  //   var form = document.querySelector('#custom-results')
  //   form.addEventListener('submit', function(e){
  //     var collection = form.querySelector('[name="collection"]')
  //     collection.addEventListener('change', function(e){
  //       var value = collection.selectedOptions[0].value
  //       if(value === 'all') return null
  //       var input = form.querySelector('[type="search"][name="q"]').value
  //     })
  //     var value = collection.selectedOptions[0].value
  //     var attr = collection.selectedOptions[0].getAttribute('data-product-types').trim().replaceAll(/\s/g,'').split('OR').join(' OR ').trim()
  //     if(value === 'all') return
  //      e.preventDefault()
  //     var input = form.querySelector('[type="search"][name="q"]').value
  //     var isInputEmpty = input === ''
  //     if (isInputEmpty) {
  //       var collectionHandle = value.split('/')[2]
  //       var query = `/search?collection=${collectionHandle}&type=product&q=${attr}`
  //       location.assign(query)
  //     }
  //     if (!isInputEmpty) {
  //       var collectionHandle = value.split('/')[2]
  //       var query = `/search?collection=${collectionHandle}&type=product&q=${input}`
  //       location.assign(query)
  //     }
  //   })
  // }
  // buildSearchQuery()
  
  
  function filterCollection () {
    var isSearchPage = location.href.includes('/search')
    var pagination = document.querySelector('.search-result-product .pagination-wrap');
    if(pagination !== null) pagination.style.display = 'none'
    if(!isSearchPage) return null
    var collectionHandle = location.search.split('?collection=')[1].split('&')[0]
    if (collectionHandle === 'all') return null
    var form = document.querySelector('#custom-results')
    var input = form.querySelector('[type="search"][name="q"]').value
    if (input.includes('OR')) form.querySelector('[type="search"][name="q"]').value = collectionHandle
    var collections = document.querySelectorAll('[data-collection]')
    collections.forEach(function(collection){
      collection.style.display = 'none'
      var raw = collection.getAttribute('data-collection')
      if (raw.includes(`"handle":"${collectionHandle}"`)) {
        collection.style.display = 'block'
      }
    })
    var totalShown = document.querySelectorAll('[data-collection][style="display: block;"]')
    if (totalShown.length >= 20) {
      if(pagination !== null) pagination.style.display = 'block'
    }
  }
filterCollection()

$(document).ready(function() {
    const header_height = $('.header_logo_wrap');
    document.documentElement.style.setProperty('--header-height', `${header_height.height() + 20}px`);
});

const parallax_start = document.querySelector('.cta-parallax-banner_wrap');
const image = document.querySelector('.parallax_wrapper img');
if (parallax_start) {
  window.addEventListener("scroll", function () {
    scrollObject = {
      x: window.pageXOffset,
      y: window.scrollY
    }
    const el_from_top = window.scrollY + parallax_start.getBoundingClientRect().top - parallax_start.offsetHeight - 40;
    const scroll = scrollY - el_from_top;
    if (scrollY >= el_from_top && scroll < 380) {
      const es = scrollY - el_from_top;
      image.style.transform = `translateY(-${es / 3}px)`;
    }
  })
}


// toggle dashboard
$('.toggle_open').on( "click", function() {
  $('.account-dash').toggleClass('width-hide');
  $(this).toggleClass('active');
  $('.main-content').toggleClass('active');
} );



// let logger = Logger.getInstance(Levels.ALL);
// let environment = DataCenter.US.PRODUCTION();

// let token = new OAuthBuilder()
// 	.clientId("1000.AZLLKU5UVSUC4KSLTPI9MOJD94GUQU")
// 	.scope("ZohoInventory.invoices.ALL")
// 	.redirectURL("https://vapelabsau.myshopify.com/")
// 	.build();

// const boom = async () => {
//   let contactRolesOperations = new ZCRM.ContactRole.Operations();
//   let response = await contactRolesOperations.getContactRoles();
//     if(response != null) {
//     //Get the status code from response
//     console.log("Status Code: " + response.getStatusCode());
//   }
// }
// boom()

// const options = {
//   method: 'GET',
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Credentials": "true",
//     "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
//     "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
//     Authorization: 'Zoho-oauthtoken 1000.c5357a4e8f4bf181d4733e489e56feb2.76d0ded08df7cbf22d8bdd0d1a1c3b27'
//   }
// };


// fetch('https://www.zohoapis.com/inventory/v1/invoices/100109000000894467?organization_id=7003173052', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

// const options = {
//   method: 'GET',
//   headers: {
//     'X-com-zoho-subscriptions-organizationid': '7003173052',
//     Authorization: 'Zoho-oauthtoken 1000.c5357a4e8f4bf181d4733e489e56feb2.76d0ded08df7cbf22d8bdd0d1a1c3b27'
//   }
// };

// fetch('https://www.zohoapis.com.au/subscriptions/v1/invoices', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));




// Redirect page if not logged in
$(document).ready(function() {
   if (!$('body').hasClass("customer-logged-in")) {
     if (window.location.pathname == "/pages/education-centre") {
        window.location.replace("https://vapelabs.com.au/account");
      }
   }
});

$(document).ready(function() {
  console.log(window.location.pathname)
   if (!$('body').hasClass("customer-logged-in")) {
     if (window.location.pathname.includes('/collections')) {
        window.location.replace("https://vapelabs.com.au/account");
      }
   }
});


// slider
$('.logo-slider_slider').slick({
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    }
  ]
});

$('.feat-blog-post_slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  mobileFirst: true,
  centerMode: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
      }
    },
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
      }
    }
  ]
});

$('.testimonials_slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    }
  ]
});

$('.img_slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    }
  ]
});

const fil_ul = $('.str-filters');
const fil_items = $('.str-filters li');
const my_array = [];
fil_items.map((i, item) => {
  const new_items = $(item).children('span').attr('id')
  const test1 = new_items.replace('str-', '')
  const test2 = test1.replace('mg/ml', '')
  const to_num = Number(test2)
  my_array.push(to_num)
})
const uniq = [...new Set(my_array)];
uniq.sort(function(a, b) {
  return a - b;
});
uniq.forEach((item) => {
  const list_item = document.createElement("li");
  list_item.className = 'list-menu__item facets__item str_item';
  list_item.innerHTML = `<span id="str-${item}mg/ml">
                        ${item}mg/ml
                        <svg class="icon icon-checkmark" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </span>`;
  fil_ul[0].appendChild(list_item);
})
uniq.forEach((item) => {
  const list_item = document.createElement("li");
  list_item.className = 'list-menu__item facets__item str_item';
  list_item.innerHTML = `<span id="str-${item}mg/ml">
                       ${item}
                        <svg class="icon icon-checkmark" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </span>`;
  fil_ul[1].appendChild(list_item);
})


const prod_ul = $('.prod-filters');
const prod_items = $('.prod-filters li');
const my_prod_array = [];
prod_items.map((i, item) => {
  const new_items = $(item).children('span').attr('id')
  my_prod_array.push(new_items)
})
const prod_uniq = [...new Set(my_prod_array)];
prod_uniq.sort();
prod_uniq.forEach((item) => {
  const list_item = document.createElement("li");
  const item_name = item.replace('prod-','');
  const final_item_name = item_name.replaceAll('-',' ');
  list_item.className = 'list-menu__item facets__item prod_item';
  list_item.innerHTML = `<span id="${item}">
                       ${final_item_name}
                        <svg class="icon icon-checkmark" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </span>`;
  prod_ul[0].appendChild(list_item);
})
prod_uniq.forEach((item) => {
  const list_item = document.createElement("li");
  const item_name = item.replace('prod-','');
  const final_item_name = item_name.replaceAll('-',' ');
  list_item.className = 'list-menu__item facets__item prod_item';
  list_item.innerHTML = `<span id="${item}">
                       ${final_item_name}
                        <svg class="icon icon-checkmark" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </span>`;
  prod_ul[1].appendChild(list_item);
})

$('.prod_item').click(function(){
  $('.prod_item').removeClass('active');
  $(this).addClass('active');
  const prod = $(this).children('span').attr('id').replace(' ','');
  $('.grid-item').addClass('nodis');
  $(`.grid-item.${prod}`).removeClass('nodis');
});
$('.prod_item.all').click(function(){
  $('.grid-item').removeClass('nodis');
});


$('.str_item').click(function(){
  $('.str_item').removeClass('active');
  $(this).addClass('active');
  const str = $(this).children('span').attr('id').replace('.','');
  const str_final = str.replace('/','');
  $('.grid-item').addClass('hide');
  $(`.grid-item.${str_final}`).removeClass('hide');
});
$('.str_item.all').click(function(){
  $('.grid-item').removeClass('hide');
});


$('.ven_item').click(function(){
  $('.ven_item').removeClass('active');
  $(this).addClass('active');
  const str = $(this).children('span').attr('id');
  $('.grid-item').addClass('none');
  $(`.grid-item.${str}`).removeClass('none');
});
$('.ven_item.all').click(function(){
  $('.grid-item').removeClass('none');
});




// Open new tab resources
const my_url = $('.product-single__desc a');
$(my_url).click(function(e){
  $this = $(this);
  e.preventDefault();
  function openInNewTab(url) {
    window.open(url, '_blank').focus();
  }
  openInNewTab($this.attr('href'))
});




// Search Filter for products
console.log($('.products-grid-view .grid-item'))