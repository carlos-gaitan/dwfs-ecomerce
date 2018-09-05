var VistaCart = function(modelo, controlador) {
  this.modelo = modelo;
  this.controlador = controlador;
  var contexto = this;

  this.modelo.itemAddedToCart.suscribir(function(modelo, listaCart){
    contexto.actualizarContador(listaCart);
    contexto.actualizarDropDown(listaCart);
  });

  this.modelo.cartListLoaded.suscribir(function(modelo, listaCart) {
    contexto.actualizarContador(listaCart);
    contexto.actualizarDropDown(listaCart);
  });

};

VistaCart.prototype = {
  inicializar: function() {
    this.controlador.obtenerCartList()
    this.configuracionDeBotones();
  },

  actualizarContador: function(listaCart) {
    var cartDiv = $(".dropdown-toggle")

    var totalAmount = function(){
      var total = 0;
      var subtotal = 0;
      var elemento = document.getElementById("subtotal");
      for (var i = 0; i < listaCart.length; i++) {
             total += listaCart[i].cantidad;
             subtotal += listaCart[i].precio;
             elemento.innerHTML = subtotal;
           }
      return total;
    };


    cartDiv.find("div.qty").html(totalAmount());
  },

  actualizarDropDown: function(listaCart) {
    var cartList = $(".cart-list");
    // limpiamos el html dentro de cart-list
    // el template tiene que estar fuera del mismo, de caso contrario
    // borraria el mismo y no podria encontrar los datos correspondientes
    cartList.html("");
    listaCart.forEach(function(product) {
      //desde aca llamamos al Template
      var $template = $('#productTemplate');
      // clonamos el Template
      var $clone = $template.clone();
      // sacamos la clase hide
      $clone.removeClass('hide');
      // le insertamos el texto del producto al template clonado
      $clone.find("h3.product-name a").text(product.name);
      // agregamos el template a cart-list
      cartList.append($clone);
    })
  },

  configuracionDeBotones: function(){
  var contexto = this;

  $("button.add-to-cart-btn").click(function() {
    var id = $(this).closest("div.product").attr("id");
    contexto.controlador.addToCart(id);
  });
  },
}
