import AWS from 'aws-sdk'

const getParameters = async (ssm: AWS.SSM, params: string[]) : Promise<{ [key: string]: string }> => {
    const data = await ssm.getParameters({
        Names: params,
        WithDecryption: true
    }).promise()
    const result: { [key: string]: string } = {} 
    return data.Parameters?.reduce( (acc, p) => {
        const name = p.Name as string
        const value = p.Value as string
        acc[name] = value
        return acc
    }, result)
}

const getParametersByPath = (ssm: AWS.SSM, path: string) => {
    ssm.getParametersByPath({
        Path: path,
        Recursive: true,
        WithDecryption: true
    })
}

/**
 * Retrieve information about one or more parameters in a specific hierarchy.
 * 
 * Request results are returned on a best-effort basis. 
 * If you specify MaxResults in the request, the response includes information up to the limit specified. 
 * The number of items returned, however, can be between zero and the value of MaxResults. 
 * If the service reaches an internal limit while processing the results, it stops the operation 
 * and returns the matching values up to that point and a NextToken. You can specify the NextToken 
 * in a subsequent call to get the next set of results.
 * 
 * @param ssm 
 * @param params 
 */
const getParametersByPathRecursively = async (ssm: AWS.SSM, params) => {
    const data = await ssm.getParametersByPath(params).promise();
    let parameters = data.Parameters;
  
    if (data.NextToken) {
      parameters = [
        ...parameters,
        ...(await getParametersByPathRecursively(ssm, { ...params, NextToken: data.NextToken }))
      ];
    }
    return parameters;
}

export default {
    getParameters,
    getParametersByPath,
    getParametersByPathRecursively
}