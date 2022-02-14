import { gql } from 'graphql-request'

export const checkoutCreateMutation = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

export const customerLoginMutation = gql`
  mutation($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`

export const customerAccessTokenRenew = gql`
  mutation($customerAccessToken: String!) {
    customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const customerActivate = gql`
  mutation($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const customerRegisterMutation = gql`
  mutation($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const customerDetails = gql`
  query customerOrders($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      firstName
      lastName
      email
      tags
      displayName
      defaultAddress {
        formatted(withName: true)
      }
      addresses(first: 10) {
        edges {
          node {
            zip
            phone
            country
            province
            city
            address1
            address2
            firstName
            lastName
            formatted(withName: true)
            name
            id
            phone
          }
        }
      }
      orders(first: 10) {
        edges {
          node {
            id
            name
            statusUrl
            processedAt
            fulfillmentStatus
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                }
              }
            }
            totalPrice: totalPriceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

export const customerRecoverMutation = gql`
  mutation($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const customerResetMutation = gql`
  mutation($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`
