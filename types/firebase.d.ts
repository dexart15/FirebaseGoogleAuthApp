// Source - https://stackoverflow.com/a
// Posted by Edison Nkemande, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-12, License - CC BY-SA 4.0

import { Persistence, ReactNativeAsyncStorage } from "firebase/auth";

declare module "firebase/auth" {
  export declare function getReactNativePersistence(
    storage: ReactNativeAsyncStorage,
  ): Persistence;
}
