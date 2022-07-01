# BELRAD

> Headless ecommerce powered by Vue, Sanity, and Shopify ⚡️

## ✨ Features

- Dynamic content powered by [Sanity.io](https://www.Sanity.io/)
- Synced products + collections via [Shopify](https://www.shopify.com/)
- A simple newsletter component using [Klaviyo](https://www.klaviyo.com/)
- Buttery-smooth animations with [GSAP](https://greensock.com/gsap/)
- Full account functionality + password reset
- Persisted account + cart data
- A simple Vue template structure for quick prototyping

## 🏈 Sanity Kickoff

1. First setup the Sanity studio:
```bash
cd /studio

npm install # or yarn

Sanity init

# Select project to use: Create new project
# Your project name: Storefront (Or whatever you want)
# Use the default dataset configuration? Y
```

2. Deploy your GraphQL schema:
```bash
Sanity graphql-deploy
```

3. Now you need to populate all the fields within the studio and create at least one page document type. If you want to create a new document type, just create a new template within your `gridsome.config.js` and make sure to add in the `path` and corresponding `component` (the `component` should be a template type).

## 🛒 Shopify Setup

1. Create a private app within your Shopify storefront and make sure all permissions are selected. This starter needs these permissions in order to enable account functionality.

2. Next, navigate to your storefront theme code and replace your `theme.liquid` with the provided `theme.liquid` file located in `shopify/src/theme.liquid`. This serves to redirect the headless site when a user may unintentionally land on your .myshopify domain.

3. In order to handle password reset correctly go to `Settings → Notifications → Customer account password reset` and replace the `<a>` tag with:
```html
{% assign url_parts = customer.reset_password_url  | split: '/' %}
<a href="https://your-site-domain.com/account/reset?id={{url_parts[5]}}&token={{url_parts[6]}}" class="button__text">Reset your password</a>
```

4. Lastly, make sure to populate your storefront with products and collections and fill out all necessary fields - titles, descriptions, images, prices, tags, etc.

## ✅ Gotchas

*(Note that these are completely optional, but will require you to edit project files)*

There are a couple of opinionated "gotchas" that need to be implemented in order for this project to work properly with Shopify:

- Enable product metafields by going to `Settings → Metafields → Products` and `Settings → Metafields → Variants`. You will want to create a `color` metafield type for both products and variants. Once you create a product, scroll to the bottom to add in a metafield color-swtach. You will also have to include a metafield color-swtach for each variant as well (this can be time consuming, but is necessary for product color-swatches to work properly). If you do not wish to have color-swatches then you must remove any references to product metafields within this project.

- Make sure you edit the URL handle (under the product's SEO section) to add in the color at the end of the url such as `your-product-name-light-blue`, etc. In this demo I have my product url routes set to `product-brand-name-product-name-product-color`. To change swatch url paths, go to `product-content.vue` and edit the `<g-link>` within the `swatch-grid__swatches`

- All products in this demo have a size and color variant. If I have a product with a standard size or one-size-fits all I add in the size value as `One Size`. If you wish to not have this then just edit the size type to whatever is best within Shopify. However you will also have to change some select variant options and filter options within this project.

- Make sure the first product tag within Shopify is always the product's category or brand. I currently use `{{ product.tags[0] }}` to easily display the corresponding category/brand (though this is completely optional and can be replaced with `productType` which may suite your needs better).

- In order to have multiple product descriptions, I have set up the following computed property `productDescription` within `product-content.vue`. This allows you simply write `---` within Shopify's description editor to split up your product's description into various parts such as details, shipping, care, etc.

## 📫 Klaviyo

Create a Klaviyo account and select the option to connect to your Shopify storefront. Once this is done, navigate to `List & Segments → Newsletter → Settings` and place the List ID code in the `Newsletter Settings` (located in `Footer Settings`) within the Sanity studio.

## ⚡️ Installation

1. Create a `.env` with your Storefront name and token. Note that the `.env` variables are prefixed with `GRIDSOME_` in order to make them available to apollo client (this is required): 
```bash
GRIDSOME_SHOPIFY_STOREFRONT='your-shop-name'
GRIDSOME_SHOPIFY_STOREFRONT_TOKEN='your-storefront-token'
```
2. Install the dependencies:
```bash
cd /web

npm install # or yarn
```
3. Start up the project:
```bash
npm run dev
```

## 🚀 Deployment
To deploy a Gridsome site you need a static web host. It is best practice to have your project hosted on a Git-service like GitHub and connect a deploy service that builds your site from a selected repository.

*If you are using Netlify or Vercel I would reccommend eithor one of the following studio plugins:*
- [Netlify Deployment Widget](https://www.sanity.io/plugins/sanity-plugin-dashboard-widget-netlify)
- [Vercel Deployment Widget](https://www.sanity.io/plugins/vercel-dashboard-widget)

## 🔥 Limitations
This project runs on Gridsome which currently uses Vue 2. The current Vue specific packages are all using Vue 2 so please do not ugrade these to Vue 3. However, you can safely upgrade the other packages that do not use Vue at their core. 

*It is important to note that Gridsome does not support Webpack 5 which means that `sass-loader` and `node-sass` need to remain at their current versions.*
