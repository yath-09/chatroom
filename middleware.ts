export {default} from  "next-auth/middleware"
// all the routes that need to be protected
export const config={matcher:["/your-rooms","/browse"]}
