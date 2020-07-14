import AWS from 'aws-sdk'

export const getParameters = async (ssm: AWS.SSM, params: string[]): Promise<{ [key: string]: string }> => {
  const data = await ssm
    .getParameters({
      Names: params,
      WithDecryption: true
    })
    .promise()
  const result: { [key: string]: string } = {}
  return data.Parameters?.reduce((acc, p) => {
    const name = p.Name as string
    const value = p.Value as string
    acc[name] = value
    return acc
  }, result)
}
