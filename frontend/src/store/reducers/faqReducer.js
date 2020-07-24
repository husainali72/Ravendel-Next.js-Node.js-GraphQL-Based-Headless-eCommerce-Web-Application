const initialState = {
  faqs: [
    {
      id: 1,
      title: "Faq First",
      description:
        "Faq First Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
    },
    {
      id: 2,
      title: "Faq Second",
      description:
        "Faq Second Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
    },
    {
      id: 3,
      title: "Faq Third",
      description:
        "Faq Third Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
    },
    {
      id: 4,
      title: "Faq Fourth",
      description:
        "Faq Fourth Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
    },
    {
      id: 5,
      title: "Faq Fifth",
      description:
        "Faq Fifth Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
    },
    {
      id: 6,
      title: "Faq Six",
      description:
        "Faq Six Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
    },
    {
      id: 7,
      title: "Faq Seven",
      description:
        "Faq Seven Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
    },
    {
      id: 8,
      title: "Faq Eight",
      description:
        "Faq Eight Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
    },
    {
      id: 9,
      title: "Faq Nine",
      description:
        "Faq Nine Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
    },
    {
      id: 10,
      title: "Faq Ten",
      description:
        "Faq Ten Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
    },
    {
      id: 11,
      title: "Faq Eleven",
      description:
        "Faq Eleven Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ALL_FAQ":
      return {
        ...state,
      };
    default: {
      return state;
    }
  }
};
