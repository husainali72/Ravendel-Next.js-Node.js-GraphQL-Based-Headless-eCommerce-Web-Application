import gql from "graphql-tag";
const GET_DATES = gql`
  {
    getDateformat {
      id
      value
    }
  }
`;

const GET_SETTINGS = gql`
  {
    getSettings {
      settings
    }
  }
`;

const SETTING_TILE_DATA = gql`
  fragment SettingTile on Setting {
    id
    site_name
    site_logo
    menu
    footer_copyright
    theme {
      primary_color
    }
    general {
      date_format
      time_zone
    }
    createdAt
    updatedAt
  }
`;

const UPDATE_GENERAL = gql`
  mutation($date_format: String, $time_zone: String) {
    updateGeneral(date_format: $date_format, time_zone: $time_zone) {
      ...SettingTile
    }
  }
  ${SETTING_TILE_DATA}
`;

//https://www.apollographql.com/docs/tutorial/introduction/

export { GET_DATES, UPDATE_GENERAL, GET_SETTINGS };
