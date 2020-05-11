const { gql } = require("apollo-server-express");
module.exports = gql`
  type Setting {
    id: ID
    site_name: String
    site_logo: customObject
    menu: [customObject]
    footer_copyright: String
    theme: Theme
    general: General
    createdAt: Date
    updatedAt: Date
  }

  type dateformat {
    id: String
    value: String
  }

  type Theme {
    primary_color: String
  }

  type General {
    date_format: String
    time_zone: String
  }

  input MenuField {
    name: String
    url: String
  }

  extend type Query {
    setting: Setting
    getDateformat: [dateformat]
    getSettings: customObject
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
    updateGeneral(date_format: String, time_zone: String): Setting
  }
`;
