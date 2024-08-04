import fs from 'fs';
import path from 'path';
import { ObjectId } from 'mongodb';

const TAB = '  ';
const TAB2 = TAB + TAB;

export default function createGraphqlResolver(objectToCreate, options) {
  let objName = objectToCreate.__name;
  let table = objectToCreate.table;

  let imports = [
    `import { ObjectId } from 'mongodb';`,
    `import DataLoader from 'dataloader';`,
    `import flatMap from 'lodash.flatmap';`
  ];

  let relationships = createRelationshipResolvers(objectToCreate);
  let queries = createQueryResolvers(objectToCreate);
  let mutations = createMutationResolvers(objectToCreate);
  let searchResolver = createSearchResolver(objectToCreate);

  let template = `
${imports.join('\n')}

async function load${objName}s(db, aggregationPipeline, root, args, context, ast) {
  let ${objName}s = await db.collection("${table}").aggregate(aggregationPipeline).toArray();
  return ${objName}s.map(cleanUpResult);
}

function cleanUpResult(obj) {
  if (obj._id) obj._id = obj._id.toString();
  return obj;
}

export const ${objName} = {
${relationships}
};

export default {
  Query: {
${queries}
${searchResolver}
  },
  Mutation: {
${mutations}
  }
};
`;

  return template.trim();
}

function createRelationshipResolvers(objectToCreate) {
  let relationships = objectToCreate.relationships || {};
  return Object.entries(relationships)
    .map(([relationshipName, relationship]) => {
      if (relationship.__isArray) {
        return createOneToManyResolver(relationshipName, relationship, objectToCreate);
      } else {
        return createOneToOneResolver(relationshipName, relationship, objectToCreate);
      }
    })
    .join(',\n\n');
}

function createOneToManyResolver(relationshipName, relationship, objectToCreate) {
  let template = `
  async ${relationshipName}(obj, args, context, ast) {
    let db = await context.__mongodb;
    let pipeline = [
      {
        $match: {
          ${relationship.fkField}: obj._id
        }
      },
      {
        $lookup: {
          from: "${relationship.type.table}",
          localField: "${relationship.fkField}",
          foreignField: "${relationship.keyField}",
          as: "${relationshipName}"
        }
      },
      {
        $unwind: "$${relationshipName}"
      },
      {
        $replaceRoot: { newRoot: "$${relationshipName}" }
      }
    ];
    
    if (args.SORT) {
      pipeline.push({ $sort: args.SORT });
    }
    
    if (args.LIMIT) {
      pipeline.push({ $limit: args.LIMIT });
    }
    
    if (args.SKIP) {
      pipeline.push({ $skip: args.SKIP });
    }
    
    let results = await db.collection("${objectToCreate.table}").aggregate(pipeline).toArray();
    return results.map(cleanUpResult);
  }`;
  
  return template;
}

function createOneToOneResolver(relationshipName, relationship, objectToCreate) {
  let template = `
  async ${relationshipName}(obj, args, context, ast) {
    let db = await context.__mongodb;
    let result = await db.collection("${relationship.type.table}").findOne({ ${relationship.keyField}: obj.${relationship.fkField} });
    return result ? cleanUpResult(result) : null;
  }`;
  
  return template;
}

function createQueryResolvers(objectToCreate) {
  let singleQuery = createSingleQueryResolver(objectToCreate);
  let multiQuery = createMultiQueryResolver(objectToCreate);
  
  return `${singleQuery},\n\n${multiQuery}`;
}

function createSingleQueryResolver(objectToCreate) {
  let template = `
    async get${objectToCreate.__name}(root, { _id }, context, ast) {
      let db = await context.__mongodb;
      let result = await db.collection("${objectToCreate.table}").findOne({ _id: ObjectId(_id) });
      return result ? cleanUpResult(result) : null;
    }`;
  
  return template;
}

function createMultiQueryResolver(objectToCreate) {
  let template = `
    async all${objectToCreate.__name}s(root, args, context, ast) {
      let db = await context.__mongodb;
      let filter = {};
      
      if (args.FILTER) {
        filter = createMongoFilter(args.FILTER);
      }
      
      let pipeline = [{ $match: filter }];
      
      if (args.SORT) {
        pipeline.push({ $sort: args.SORT });
      }
      
      if (args.LIMIT) {
        pipeline.push({ $limit: args.LIMIT });
      }
      
      if (args.SKIP) {
        pipeline.push({ $skip: args.SKIP });
      }
      
      return await load${objectToCreate.__name}s(db, pipeline, root, args, context, ast);
    }`;
  
  return template;
}

function createMutationResolvers(objectToCreate) {
  if (objectToCreate.readonly) return '';
  
  let create = createCreateMutationResolver(objectToCreate);
  let update = createUpdateMutationResolver(objectToCreate);
  let remove = createDeleteMutationResolver(objectToCreate);
  
  return `${create},\n\n${update},\n\n${remove}`;
}

function createCreateMutationResolver(objectToCreate) {
  let template = `
    async create${objectToCreate.__name}(root, { ${objectToCreate.__name} }, context, ast) {
      let db = await context.__mongodb;
      let newObject = await db.collection("${objectToCreate.table}").insertOne(${objectToCreate.__name});
      return cleanUpResult(newObject.ops[0]);
    }`;
  
  return template;
}

function createUpdateMutationResolver(objectToCreate) {
  let template = `
    async update${objectToCreate.__name}(root, { _id, Updates }, context, ast) {
      let db = await context.__mongodb;
      let result = await db.collection("${objectToCreate.table}").findOneAndUpdate(
        { _id: ObjectId(_id) },
        { $set: Updates },
        { returnOriginal: false }
      );
      return result.value ? cleanUpResult(result.value) : null;
    }`;
  
  return template;
}

function createDeleteMutationResolver(objectToCreate) {
  let template = `
    async delete${objectToCreate.__name}(root, { _id }, context, ast) {
      let db = await context.__mongodb;
      let result = await db.collection("${objectToCreate.table}").findOneAndDelete({ _id: ObjectId(_id) });
      return result.value ? cleanUpResult(result.value) : null;
    }`;
  
  return template;
}

function createSearchResolver(objectToCreate) {
  if (!objectToCreate.searchIndex) return '';

  let template = `
    async search${objectToCreate.__name}s(root, { searchText, ...args }, context, ast) {
      let db = await context.__mongodb;
      let pipeline = [
        {
          $search: {
            index: "${objectToCreate.searchIndex.name}",
            text: {
              query: searchText,
              path: ${JSON.stringify(objectToCreate.searchIndex.fields)}
            }
          }
        }
      ];
      
      if (args.SORT) {
        pipeline.push({ $sort: args.SORT });
      }
      
      if (args.LIMIT) {
        pipeline.push({ $limit: args.LIMIT });
      }
      
      if (args.SKIP) {
        pipeline.push({ $skip: args.SKIP });
      }
      
      return await load${objectToCreate.__name}s(db, pipeline, root, args, context, ast);
    }`;

  return template;
}

function createMongoFilter(filter) {
  // This function would need to be implemented to convert GraphQL filter syntax to MongoDB query syntax
  // It's a complex topic and would require careful implementation based on your specific filter needs
  return filter;
}