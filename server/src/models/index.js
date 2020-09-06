import createCategorySchema from './category-schema';
import createEntitySchema from './entity-schema';
import createProfileSchema from './profile-schema';

const createSchemas = () => {
  createProfileSchema();
  createCategorySchema();
  createEntitySchema();
};

export default createSchemas;
