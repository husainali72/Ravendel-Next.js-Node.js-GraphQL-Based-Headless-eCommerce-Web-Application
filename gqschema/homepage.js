module.exports = `

type homePageSection {
    name : String
    imageurl : String
    products: [Product]
}

type homePageResponse {
    homepageBrands: [Brand]
    sections: [homePageSection]
}

extend type Query {
    getMobileHomePage : homePageResponse
}
`;
