const Faq = require("../models/Faq");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken,
  stringTourl,
  validateUrl,
  updateUrl,
} = require("../config/helpers");
const validate = require("../validations/faq");
const sanitizeHtml = require("sanitize-html");

module.exports = {
  Query: {
    
    faqs: async (root, args) => {
      // destrcture search, page, limit, and set default values
      
      try {
      const { search = null, page = 1, limit = 20 } = args;

      let searchQuery = {};

      // run if search is provided
      if (search) {
        // update the search query
        searchQuery = {
          $or: [
            { title: { $regex: search, $options: 'i' } }
            
            
          ]
        };
      }

      // execute query to search orders
      const faqs = await Faq.find(searchQuery)


        .limit(limit)
        .skip((page - 1) * limit)
        .lean();

      // get total documents
      const count = await Faq.countDocuments(searchQuery);

      //console.log(faqs);

      return {
        faqs,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalCount:count
        }
      } catch (error) {
        //console.log(error);
         throw new Error("Something went wrong.");
       }
    },
    faq: async (root, args) => {
      try {
        const faq = await Faq.findById(args.id);
        if (!faq) {
          throw putError("Faq not found");
        }
        return faq;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
  Mutation: {
    addFaq: async (root, args, user) => {
      checkToken(user.id);
      try {
        // Check Validation
        const errors = validate("addFaq", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        

        const newFaq = new Faq({
          title: args.title,
          content: args.content || "",
          status: args.status,
        });

        await newFaq.save();
        return await Faq.find({});
      } catch (error) {
        error = checkError(error);
       // console.log(error);
        throw new Error(error.custom_message);
      }
    },
    updateFaq: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("updateFaq", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const faq = await Faq.findById({ _id: args.id });
        if (faq) {
          

          faq.title = args.title;
          faq.content = args.content;
          faq.status = args.status;
          faq.updated = Date.now();
          await faq.save();
          return await Faq.find({});
        } else {
          throw putError("Faq not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteFaq: async (root, args, { id }) => {
      checkToken(id);
      try {
        const faq = await Faq.findByIdAndRemove(args.id);
        if (faq) {
          
          const faqs = await Faq.find({});
          return faqs || [];
        }
        throw putError("Faq not exist");
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
};
