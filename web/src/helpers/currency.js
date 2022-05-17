// Global currency filter
export default function filters(Vue) {
  Vue.filter('currency', function(value) {
    const amount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value).replace('.00', '')
    return amount
  })
}
