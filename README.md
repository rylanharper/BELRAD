# BELRAD

> Headless ecommerce powered by Vue, Sanity, and Shopify ⚡️

## ✨ Features

- Dynamic content powered by [Sanity.io](https://www.Sanity.io/)
- Synced products + collections via [Shopify](https://www.shopify.com/)
- A simple newsletter component using [Klaviyo](https://www.klaviyo.com/)
- Buttery-smooth animations with [GSAP](https://greensock.com/gsap/)
- Full account functionality + password reset
- Persisted account and cart storage
- A simple Vue template structure for quick prototyping

## 🏈 Sanity Setup

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

There are a couple of opinionated "gotchas" that need to be implemented in order for this project to work properly with Shopify:

- Enable product metafields by going to `Settings → Metafields → Products` and creating a color metafield type. Once you create a product, scroll to the bottom to add in a metafield color swtach. 

- Each product that has a variety of colors (more than one) must have the same name and a `productType` that matches the name of that product. Make sure you edit the URL handle (under the product's SEO section) to add in the color at the end of the url such as `your-product-name-light-blue`, etc.

- Make sure the first product tag within Shopify is always the product's color. I currently use `{{ product.tags[0] }}` to easily display the corresponding color.

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

## 👀 Some Extra Tips
<details>
<summary><strong>Why are you using extracted component classes (BEM) with Tailwind?</strong></summary>

Templates using Tailwind can be overwhelming when starting off.. I find that using Tailwind's `@apply` is an excellent way to get all the benefits of writing in utility class shorthand, but without having to sift through all your javascript logic to adjust styles.
</details>

<details>
<summary><strong>How do the color swatches/related products work?</strong></summary>

For the color swatches/related products, I am using the [Gridsome Recommender Plugin](https://github.com/mklueh/gridsome-plugin-recommender) by [Marian Klühspies](https://github.com/mklueh). Go ahead and read over that plugin's documentation. You will find the options within the `gridsome.config.js` file. I recommend setting the `field` to `productType` to get the best results within the plugin's options. If you need more or less relations, you can edit the `maxRelations` option.
</details>

<details>
<summary><strong>How does the product filter work on each collection page?</strong></summary>

[Travis Reynolds](https://github.com/thetre97) was kind enough to help me out with the filter functionality on each collection page. This is pretty cool as it looks within the collection's product options and displays an array of values for a user to select. If there are no options, the products will still display on that collection, but no filter options will be shown (although you may need to edit the collection nav styles). Thanks for the help!
</details>

<details>
<summary><strong>Why do all the collection links point to the same collection?</strong></summary>

I only have one example collection in the demo site, so clicking the links within the shop menu will bring you to the same collection every time. In order to change this, just edit the link data within your Sanity studio or within the `app-header.vue` component.
</details>

## 🦖 Limitations
This project runs on Gridsome which currently uses Vue 2. The current Vue specific packages are all using Vue 2 so please do not ugrade these to Vue 3. However, you can safely upgrade the other packages that do not use Vue at their core. 

*It is important to note that Gridsome does not support Webpack 5 which means that `sass-loader` and `node-sass` need to remain at their current version.*

## 🤨 Need Help?
Reach out on the Gridsome [Discord](https://discord.gg/daeay6n) or the `Discussions` tab
