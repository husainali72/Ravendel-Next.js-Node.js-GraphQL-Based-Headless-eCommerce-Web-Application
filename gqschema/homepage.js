module.exports = `

type homePageSection {
    name : String
    section_img : String
    display_type : String
    url: String
    products: [Product]
}

type homePageResponse {
    parantCategories: [productCategory]
    sections: [homePageSection]
}

extend type Query {
    getHomePage (deviceType: ID!) : homePageResponse
}
`;
