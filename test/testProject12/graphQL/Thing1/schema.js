export const type = `
  
  type Thing1 {
    _id: String
    q__id: String
    q_str: String
    q_strArr: [String]
    q_bool: Boolean
    q_int: Int
    q_intArr: [Int]
    q_float: Float
    q_floatArr: [Float]
    q_date: String
    q_json: JSON
    nq__id: String
    nq_str: String
    nq_strArr: [String]
    nq_bool: Boolean
    nq_int: Int
    nq_intArr: [Int]
    nq_float: Float
    nq_floatArr: [Float]
    nq_date: String
    nq_json: JSON
  }

  type Thing1QueryResults {
    Thing1s: [Thing1!]!
    Meta: QueryResultsMetadata!
  }

  type Thing1SingleQueryResult {
    Thing1: Thing1
  }

  type Thing1MutationResult {
    Thing1: Thing1
    success: Boolean!
    Meta: MutationResultInfo!
  }

  type Thing1MutationResultMulti {
    Thing1s: [Thing1]
    success: Boolean!
    Meta: MutationResultInfo!
  }

  type Thing1BulkMutationResult {
    success: Boolean!
    Meta: MutationResultInfo!
  }

  input Thing1Input {
    _id: String
    q__id: String
    q_str: String
    q_strArr: [String]
    q_bool: Boolean
    q_int: Int
    q_intArr: [Int]
    q_float: Float
    q_floatArr: [Float]
    q_date: String
    q_json: JSON
    nq__id: String
    nq_str: String
    nq_strArr: [String]
    nq_bool: Boolean
    nq_int: Int
    nq_intArr: [Int]
    nq_float: Float
    nq_floatArr: [Float]
    nq_date: String
    nq_json: JSON
  }

  input Thing1MutationInput {
    q__id: String
    q_str: String
    q_strArr: [String]
    q_strArr_PUSH: String
    q_strArr_CONCAT: [String]
    q_strArr_UPDATE: StringArrayUpdate
    q_strArr_UPDATES: [StringArrayUpdate]
    q_strArr_PULL: [String]
    q_strArr_ADDTOSET: [String]
    q_bool: Boolean
    q_int: Int
    q_int_INC: Int
    q_int_DEC: Int
    q_intArr: [Int]
    q_intArr_PUSH: Int
    q_intArr_CONCAT: [Int]
    q_intArr_UPDATE: IntArrayUpdate
    q_intArr_UPDATES: [IntArrayUpdate]
    q_intArr_PULL: [Int]
    q_intArr_ADDTOSET: [Int]
    q_float: Float
    q_float_INC: Int
    q_float_DEC: Int
    q_floatArr: [Float]
    q_floatArr_PUSH: Float
    q_floatArr_CONCAT: [Float]
    q_floatArr_UPDATE: FloatArrayUpdate
    q_floatArr_UPDATES: [FloatArrayUpdate]
    q_floatArr_PULL: [Float]
    q_floatArr_ADDTOSET: [Float]
    q_date: String
    q_json: JSON
    nq__id: String
    nq_str: String
    nq_strArr: [String]
    nq_strArr_PUSH: String
    nq_strArr_CONCAT: [String]
    nq_strArr_UPDATE: StringArrayUpdate
    nq_strArr_UPDATES: [StringArrayUpdate]
    nq_strArr_PULL: [String]
    nq_strArr_ADDTOSET: [String]
    nq_bool: Boolean
    nq_int: Int
    nq_int_INC: Int
    nq_int_DEC: Int
    nq_intArr: [Int]
    nq_intArr_PUSH: Int
    nq_intArr_CONCAT: [Int]
    nq_intArr_UPDATE: IntArrayUpdate
    nq_intArr_UPDATES: [IntArrayUpdate]
    nq_intArr_PULL: [Int]
    nq_intArr_ADDTOSET: [Int]
    nq_float: Float
    nq_float_INC: Int
    nq_float_DEC: Int
    nq_floatArr: [Float]
    nq_floatArr_PUSH: Float
    nq_floatArr_CONCAT: [Float]
    nq_floatArr_UPDATE: FloatArrayUpdate
    nq_floatArr_UPDATES: [FloatArrayUpdate]
    nq_floatArr_PULL: [Float]
    nq_floatArr_ADDTOSET: [Float]
    nq_date: String
    nq_json: JSON
  }

  input Thing1Sort {
    _id: Int
    q__id: Int
    q_str: Int
    q_strArr: Int
    q_bool: Int
    q_int: Int
    q_intArr: Int
    q_float: Int
    q_floatArr: Int
    q_date: Int
    nq__id: Int
    nq_str: Int
    nq_strArr: Int
    nq_bool: Int
    nq_int: Int
    nq_intArr: Int
    nq_float: Int
    nq_floatArr: Int
    nq_date: Int
  }

  input Thing1Filters {
    _id: String
    _id_ne: String
    _id_in: [String]
    _id_nin: [String]
    q__id: String
    q__id_ne: String
    q__id_in: [String]
    q__id_nin: [String]
    q_str_contains: String
    q_str_startsWith: String
    q_str_endsWith: String
    q_str_regex: String
    q_str: String
    q_str_ne: String
    q_str_in: [String]
    q_str_nin: [String]
    q_strArr_count: Int
    q_strArr_textContains: String
    q_strArr_startsWith: String
    q_strArr_endsWith: String
    q_strArr_regex: String
    q_strArr: [String]
    q_strArr_in: [[String]]
    q_strArr_nin: [[String]]
    q_strArr_contains: String
    q_strArr_containsAny: [String]
    q_strArr_containsAll: [String]
    q_strArr_ne: [String]
    q_bool: Boolean
    q_bool_ne: Boolean
    q_bool_in: [Boolean]
    q_bool_nin: [Boolean]
    q_int_lt: Int
    q_int_lte: Int
    q_int_gt: Int
    q_int_gte: Int
    q_int: Int
    q_int_ne: Int
    q_int_in: [Int]
    q_int_nin: [Int]
    q_intArr_count: Int
    q_intArr_lt: Int
    q_intArr_lte: Int
    q_intArr_gt: Int
    q_intArr_gte: Int
    q_intArr_emlt: Int
    q_intArr_emlte: Int
    q_intArr_emgt: Int
    q_intArr_emgte: Int
    q_intArr: [Int]
    q_intArr_in: [[Int]]
    q_intArr_nin: [[Int]]
    q_intArr_contains: Int
    q_intArr_containsAny: [Int]
    q_intArr_containsAll: [Int]
    q_intArr_ne: [Int]
    q_float_lt: Float
    q_float_lte: Float
    q_float_gt: Float
    q_float_gte: Float
    q_float: Float
    q_float_ne: Float
    q_float_in: [Float]
    q_float_nin: [Float]
    q_floatArr_count: Int
    q_floatArr_lt: Float
    q_floatArr_lte: Float
    q_floatArr_gt: Float
    q_floatArr_gte: Float
    q_floatArr_emlt: Float
    q_floatArr_emlte: Float
    q_floatArr_emgt: Float
    q_floatArr_emgte: Float
    q_floatArr: [Float]
    q_floatArr_in: [[Float]]
    q_floatArr_nin: [[Float]]
    q_floatArr_contains: Float
    q_floatArr_containsAny: [Float]
    q_floatArr_containsAll: [Float]
    q_floatArr_ne: [Float]
    q_date_lt: String
    q_date_lte: String
    q_date_gt: String
    q_date_gte: String
    q_date: String
    q_date_ne: String
    q_date_in: [String]
    q_date_nin: [String]
    q_json: JSON
    q_json_ne: JSON
    q_json_in: [JSON]
    q_json_nin: [JSON]
    OR: [Thing1Filters]
  }
  
`;

export const mutation = `

  createThing1 (
    Thing1: Thing1Input
  ): Thing1MutationResult

  updateThing1 (
    _id: String,
    Updates: Thing1MutationInput
  ): Thing1MutationResult

  updateThing1s (
    _ids: [String],
    Updates: Thing1MutationInput
  ): Thing1MutationResultMulti

  updateThing1sBulk (
    Match: Thing1Filters,
    Updates: Thing1MutationInput
  ): Thing1BulkMutationResult

  deleteThing1 (
    _id: String
  ): DeletionResultInfo

`;

export const query = `

  allThing1s (
    _id: String,
    _id_ne: String,
    _id_in: [String],
    _id_nin: [String],
    q__id: String,
    q__id_ne: String,
    q__id_in: [String],
    q__id_nin: [String],
    q_str_contains: String,
    q_str_startsWith: String,
    q_str_endsWith: String,
    q_str_regex: String,
    q_str: String,
    q_str_ne: String,
    q_str_in: [String],
    q_str_nin: [String],
    q_strArr_count: Int,
    q_strArr_textContains: String,
    q_strArr_startsWith: String,
    q_strArr_endsWith: String,
    q_strArr_regex: String,
    q_strArr: [String],
    q_strArr_in: [[String]],
    q_strArr_nin: [[String]],
    q_strArr_contains: String,
    q_strArr_containsAny: [String],
    q_strArr_containsAll: [String],
    q_strArr_ne: [String],
    q_bool: Boolean,
    q_bool_ne: Boolean,
    q_bool_in: [Boolean],
    q_bool_nin: [Boolean],
    q_int_lt: Int,
    q_int_lte: Int,
    q_int_gt: Int,
    q_int_gte: Int,
    q_int: Int,
    q_int_ne: Int,
    q_int_in: [Int],
    q_int_nin: [Int],
    q_intArr_count: Int,
    q_intArr_lt: Int,
    q_intArr_lte: Int,
    q_intArr_gt: Int,
    q_intArr_gte: Int,
    q_intArr_emlt: Int,
    q_intArr_emlte: Int,
    q_intArr_emgt: Int,
    q_intArr_emgte: Int,
    q_intArr: [Int],
    q_intArr_in: [[Int]],
    q_intArr_nin: [[Int]],
    q_intArr_contains: Int,
    q_intArr_containsAny: [Int],
    q_intArr_containsAll: [Int],
    q_intArr_ne: [Int],
    q_float_lt: Float,
    q_float_lte: Float,
    q_float_gt: Float,
    q_float_gte: Float,
    q_float: Float,
    q_float_ne: Float,
    q_float_in: [Float],
    q_float_nin: [Float],
    q_floatArr_count: Int,
    q_floatArr_lt: Float,
    q_floatArr_lte: Float,
    q_floatArr_gt: Float,
    q_floatArr_gte: Float,
    q_floatArr_emlt: Float,
    q_floatArr_emlte: Float,
    q_floatArr_emgt: Float,
    q_floatArr_emgte: Float,
    q_floatArr: [Float],
    q_floatArr_in: [[Float]],
    q_floatArr_nin: [[Float]],
    q_floatArr_contains: Float,
    q_floatArr_containsAny: [Float],
    q_floatArr_containsAll: [Float],
    q_floatArr_ne: [Float],
    q_date_lt: String,
    q_date_lte: String,
    q_date_gt: String,
    q_date_gte: String,
    q_date: String,
    q_date_ne: String,
    q_date_in: [String],
    q_date_nin: [String],
    q_json: JSON,
    q_json_ne: JSON,
    q_json_in: [JSON],
    q_json_nin: [JSON],
    OR: [Thing1Filters],
    SORT: Thing1Sort,
    SORTS: [Thing1Sort],
    LIMIT: Int,
    SKIP: Int,
    PAGE: Int,
    PAGE_SIZE: Int,
    q_date_format: String,
    nq_date_format: String
  ): Thing1QueryResults!

  getThing1 (
    _id: String,
    q_date_format: String,
    nq_date_format: String
  ): Thing1SingleQueryResult!

`;
