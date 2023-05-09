<template>
  <v-container :fluid="!$vuetify.breakpoint.lgAndUp">
    <v-col cols="12" class="px-1">
      <v-row>
        <v-col cols="12" sm="8">
          <v-row>
            <v-col cols="10" sm="11" md="11" lg="11">
              <v-text-field
                outlined
                clearable
                hide-details
                label="Digite o que você precisa"
                :color="themeColor"
                dense
                rounded
              ></v-text-field>
            </v-col>
            <v-col cols="2" sm="1" md="1" lg="1" class="d-flex justify-end">
              <v-btn right fab small :color="themeColor" dark>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <template v-if="products.length == 0">
                <v-skeleton-loader
                  width="100%"
                  height="30px"
                  type="text"
                  v-for="s in 27"
                  :key="s"
                ></v-skeleton-loader>
              </template>
              <v-expansion-panels style="background-color: white" v-else>
                <v-expansion-panel v-for="(category, i) in products" :key="i">
                  <v-expansion-panel-header>
                    <h3>{{ category.nome_categoria }}</h3>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="pa-0">
                    <v-divider></v-divider>
                    <template v-if="category.subcategorias">
                      <v-col
                        cols="12"
                        v-for="subcategory in category.subcategorias"
                        :key="subcategory.id_subcategoria"
                      >
                        <v-row class="py-2">
                          <h5>{{ subcategory.nome_subcategoria }}</h5>
                        </v-row>
                        <v-row>
                          <v-col
                            cols="6"
                            sm="4"
                            md="4"
                            lg="3"
                            v-for="product in subcategory.produtos"
                            :key="product.id_produto"
                          >
                            <v-card>
                              <v-img
                                height="130"
                                :src="
                                  product.img_produto == ''
                                    ? 'https://puducherry-dt.gov.in/wp-content/themes/district-theme-2/images/blank.jpg'
                                    : 'https://gestao.2dmedia.com.br/views/img/produtos/' +
                                      product.img_produto
                                "
                              ></v-img>
                              <v-card-title class="px-2">
                                <span style="height: 80px">{{
                                  product.nome_produto
                                }}</span>
                              </v-card-title>
                              <v-card-text> </v-card-text>
                              <v-card-actions>
                                <v-btn
                                  block
                                  dark
                                  :color="themeColor"
                                  @click="
                                    addToCart(category.nome_categoria, product)
                                  "
                                >
                                  {{ product.preco | formatValue }}
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-col>
                        </v-row>
                        <v-row class="py-2">
                          <v-divider></v-divider>
                        </v-row>
                      </v-col>
                    </template>
                    <template v-else>
                      <v-col cols="12" class="px-0">
                        <v-row>
                          <v-col
                            cols="6"
                            sm="4"
                            md="4"
                            lg="3"
                            v-for="product in category.produtos"
                            :key="product.id_produto"
                          >
                            <v-card>
                              <v-img
                                height="130"
                                :src="
                                  product.img_produto == ''
                                    ? 'https://puducherry-dt.gov.in/wp-content/themes/district-theme-2/images/blank.jpg'
                                    : 'https://gestao.2dmedia.com.br/views/img/produtos/' +
                                      product.img_produto
                                "
                              ></v-img>
                              <v-card-title class="px-2">
                                <span style="height: 80px">{{
                                  product.nome_produto
                                }}</span>
                              </v-card-title>
                              <v-card-text> </v-card-text>
                              <v-card-actions>
                                <v-btn
                                  block
                                  dark
                                  :color="themeColor"
                                  @click="
                                    addToCart(category.nome_categoria, product)
                                  "
                                >
                                  {{ product.preco | formatValue }}
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-col>
                    </template>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4" v-if="$vuetify.breakpoint.smAndUp">
          <v-card>
            <v-card-title class="pa-5">
              <v-row>
                <h4>
                  <v-icon :color="themeColor" class="mr-1"
                    >mdi-sticker-check</v-icon
                  >
                  Orçamento
                </h4>
                <v-spacer></v-spacer>
                <v-btn text small :color="themeColor" @click="clear()"> Limpar </v-btn>
              </v-row>
            </v-card-title>
            <v-card-text class="px-0">
              <v-col cols="12" class="px-5" v-if="cart.length > 0">
                <v-row>
                  <v-text-field
                    outlined
                    clearable
                    hide-details
                    label="Cliente"
                    :color="themeColor"
                    prepend-inner-icon="mdi-account"
                    dense
                    rounded
                    class="mt-1"
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="12" class="px-0" v-if="cart.length > 0">
                <v-list two-line>
                  <v-list-item
                    class="my-0"
                    v-for="item in cart"
                    :key="item.product_id"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.category }} - {{ item.product }}
                      </v-list-item-title>

                      <v-list-item-subtitle class="font-weight-bold">
                        {{ item.price | formatValue }}
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-col cols="12">
                        <v-row>
                          <v-btn
                            outlined
                            x-small
                            icon
                            :color="themeColor"
                            @click="minus(item.product_id)"
                          >
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                          <span class="mx-3">{{ item.qtd }}</span>
                          <v-btn
                            outlined
                            x-small
                            icon
                            :color="themeColor"
                            @click="plus(item.product_id)"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </v-row>
                      </v-col>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" class="py-8" v-else>
                <v-row align="center" justify="center">
                  <v-icon size="100" :color="themeColor">mdi-package-variant</v-icon>
                </v-row>
                <v-row align="center" justify="center">
                  <h4>Sem itens no orçamento</h4>
                </v-row>
              </v-col>
              <v-col cols="12" v-if="cart.length > 0">
                <v-sheet width="100%" color="deep-purple lighten-5" rounded="">
                  <v-col cols="12" class="px-5 py-6">
                    <v-row align="center">
                      <h2>Subtotal:</h2>
                      <v-spacer></v-spacer>
                      <strong class="text-h5">{{ subtotal | formatValue }}</strong>
                    </v-row>
                  </v-col>
                </v-sheet>
              </v-col>
            </v-card-text>
            <v-card-actions>
              <v-btn block dark :color="themeColor"> Finalizar </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  components: {
    //
  },
  data: () => ({
    products: [],
    cart: [],
    subtotal: 0,
  }),
  created() {
    this.getProducts();
  },
  filters: {
    // formatDate(value) {
    //   if (value) {
    //     return format(parseISO(value), "dd/MM/yyyy 'às' hh:mm");
    //   }
    // },
    formatValue(value) {
      if (value) {
        return parseFloat(value).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        });
      }
    },
  },
  methods: {
    getProducts() {
      this.axios
        .get("?consultar_categoria_produtos&id_proprietario=1")
        .then((response) => {
          this.products = response.data;
        })
        .catch(() => {});
    },
    addToCart(category, product) {
      var check_product = this.cart.find(
        (item) => item.product_id == product.id_produto
      );

      if (check_product) {
        var index_product = this.cart.findIndex(
          (item) => item.product_id == product.id_produto
        );

        this.cart[index_product].qtd++;
      } else {
        this.cart.push({
          category: category,
          product_id: product.id_produto,
          product: product.nome_produto,
          price: product.preco,
          qtd: 1,
        });
      }

      this.checkSubtotal();
    },
    minus(item_id) {
      var index_product = this.cart.findIndex(
        (item) => item.product_id == item_id
      );

      if (this.cart[index_product].qtd == 1) {
        var temp_cart = this.cart.filter((item) => item.product_id != item_id);

        this.cart = temp_cart;
      } else {
        this.cart[index_product].qtd--;
      }

      this.checkSubtotal();
    },
    plus(item_id) {
      var index_product = this.cart.findIndex(
        (item) => item.product_id == item_id
      );

      this.cart[index_product].qtd++;

      this.checkSubtotal();
    },
    checkSubtotal() {
      this.subtotal = 0;

      this.cart.map((item) => {
        this.subtotal += (item.qtd * parseFloat(item.price));
      });
    },
    clear(){
      this.cart = [];
      this.subtotal = 0;
    }
  },
};
</script>
