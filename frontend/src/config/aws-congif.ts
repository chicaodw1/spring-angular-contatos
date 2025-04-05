import { ResourcesConfig } from 'aws-amplify';
import { environment } from '../environments/environment.example';

const awsconfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: environment.userPoolId,
      userPoolClientId: environment.userPoolClientId,
      identityPoolId: environment.identityPoolId,
      allowGuestAccess: true,
    },
  },
};

export default awsconfig;
