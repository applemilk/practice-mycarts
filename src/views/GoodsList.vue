<template>
  <div>
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a @click="sortGoods" href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked==all}" @click="priceChecked=all">All</a></dd>
              <dd v-for="(price,index) in priceFilter" :key="index">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList" :key="index">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" @click="addCart(item.productId)" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                <img src="./../assets/loading-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import './../assets/css/login.css'
import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
import NavBread from '../components/NavBread'
import axios from 'axios'
export default {
  components: {NavBread, NavFooter, NavHeader},
  data () {
    return {
      goodsList: [],
      sortFlag: true,
      page: 1,
      pageSize: 8,
      busy: true,
      priceLevel: 'all',
      loading: false,
      priceFilter: [
        {
          startPrice: '0.00',
          endPrice: '100.00'
        },
        {
          startPrice: '100.00',
          endPrice: '500.00'
        },
        {
          startPrice: '500.00',
          endPrice: '1000.00'
        },
        {
          startPrice: '1000.00',
          endPrice: '5000.00'
        }
      ],
      priceChecked: 'all',
      filterBy: false,
      overLayFlag: false
    }
  },
  mounted: function () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList (flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      }
      this.loading = true
      axios.get('goods', {
        params: param
      }).then((res) => {
        this.loading = false
        if (flag) {
          this.goodsList = this.goodsList.concat(res.data.result.list)
          if (res.result.count === 0) {
            this.busy = true
          } else {
            this.busy = false
          }
        } else {
          this.goodsList = res.data.result.list
          this.busy = false
        }
      })
    },
    sortGoods () {
      this.sortFlag = !this.sortFlag
      this.page = 1
      this.goodsList()
    },
    showFilterPop () {
      this.filterBy = true
      this.overLayFlag = true
    },
    setPriceFilter (index) {
      this.priceChecked = index
      this.page = 1
      this.getGoodsList()
      this.closePop()
    },
    closePop () {
      this.filterBy = false
      this.overLayFlag = false
    },
    loadMore () {
      this.busy = true
      setTimeout(() => {
        this.page++
        this.getGoodsList(true)
      }, 500)
    },
    addCart (productId) {
      axios.post('goods/addCart', {
        productId: productId
      }).then((res) => {
        if (res.status === 200) {
          alert('加入成功')
        } else {
          alert('msg:' + res.status)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
