import usersModel from './usersModel';
import pagesModel from './pagesModel';
import configModel from './configModel';
import pageCategoriesModel from './pageCategoriesModel';
import pageSubCategoriesModel from './pageSubCategoriesModel';
import productImagesModel from './productImagesModel';
import productCategoriesModel from './productCategoriesModel';
import productSubCategoriesModel from './productSubCategoriesModel';
import productOptionsModel from './productOptionsModel';
import productFeaturesModel from './productFeaturesModel';
import productsModel from './productsModel';

export default ({ config, db }) => {
  const Models = {
    users: usersModel({ config, db }),
    pages: pagesModel({ config, db }),
    config: configModel({ config, db }),
    pageCategories: pageCategoriesModel({ config, db }),
    pageSubCategories: pageSubCategoriesModel({ config, db }),
    productCategories: productCategoriesModel({ config, db }),
    productImages: productImagesModel({ config, db }),
    productSubCategories: productSubCategoriesModel({ config, db }),
    productOptions: productOptionsModel({ config, db }),
    productFeatures: productFeaturesModel({ config, db }),
    products: productsModel({ config, db }),
  };

  Object.keys(Models).forEach((key) => {
    if (Models[key].Associations) {
      Models[key].Associations(Models);
    }

    if (Models[key].Queries) {
      Models[key].queries = Models[key].Queries(Models);
    }
  });

  return Models;
};
