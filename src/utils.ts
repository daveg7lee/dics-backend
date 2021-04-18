import * as jwt from 'jsonwebtoken';
import AWS from 'aws-sdk';
import client from './client';

const region = 'ap-northeast-2';
const Bucket = 'dics-bucket';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
  },
  region,
});

const S3 = new AWS.S3();

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

export const protectedResolver = (ourResolver) => (
  root,
  args,
  context,
  info
) => {
  const { loggedInUser } = context;
  if (!loggedInUser) {
    const query = info.operation.operation === 'query';
    if (query) {
      return null;
    } else {
      return {
        success: false,
        error: 'Please log in',
      };
    }
  }
  return ourResolver(root, args, context, info);
};

export const getUser = async (token) => {
  try {
    // return null when token is undefined
    if (!token) {
      return null;
    }
    // get id from token
    const verifiedToken: any = await jwt.verify(token, process.env.JWT_SECRET);
    if ('id' in verifiedToken) {
      // get user by id
      const user = await client.user.findUnique({
        where: { id: verifiedToken['id'] },
      });
      // return user
      if (user) {
        return user;
      }
    }
    return null;
    // return null when error occur
  } catch {
    return null;
  }
};

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await S3.upload({
    Bucket,
    Key: objectName,
    ACL: 'public-read',
    Body: readStream,
  }).promise();
  return Location;
};

export const deleteInS3 = async (fileUrl) => {
  const Key = unescape(
    fileUrl.replace(`https://${Bucket}.s3.${region}.amazonaws.com/`, '')
  );
  await S3.deleteObject({
    Bucket,
    Key,
  }).promise();
};
