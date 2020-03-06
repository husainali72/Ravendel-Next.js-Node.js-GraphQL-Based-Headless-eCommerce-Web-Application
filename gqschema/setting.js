const { gql } = require("apollo-server-express");
module.exports = gql`
  type Setting {
    id: ID
    site_name: String
    site_logo: customObject
    menu: [customObject]
    footer_copyright: String
    theme: Theme
    date: Date
    updated: Date
  }

  type Theme {
    primary_color: String
  }

  input MenuField {
    name: String
    url: String
  }

  extend type Query {
    setting: Setting
  }

  extend type Mutation {
    addSetting(
      site_name: String
      menu: [customObject]
      footer_copyright: String
      theme: customObject
    ): Setting
    updateSetting(
      id: ID!
      site_name: String
      menu: [customObject]
      footer_copyright: String
      theme: customObject
    ): Setting
  }
`;
