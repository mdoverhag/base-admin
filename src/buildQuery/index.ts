import usersQuery from "./users";

const buildQuery = (introspectionResults: any, options: any) => (
  raFetchType: any,
  resourceName: any,
  params: any
) => {
  if (resourceName === "user") {
    return usersQuery(raFetchType, params);
  }
  console.error(`Unsupported op ${raFetchType} for resource ${resourceName}`);
  console.error(params);
};

export default buildQuery;
