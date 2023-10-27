const IP='localhost:5000'
//Auth
export const LoginApi = `http://${IP}/auth/login`
export const SignUpApi = `http://${IP}/auth/signup`
////google Auth
export const CLIENTID = '949132968973-5t814qo0o17il2v10shj0m5rvrgirv23.apps.googleusercontent.com';
export const REDIRECTURI = 'http://localhost:5173/callback/google';

// export const authGoogle = `http://${IP}/auth/google`
export const authFaceBook = `http://${IP}/auth/facebook`




//Assets
// export const account = "http://${IP}/asset/create"
// export const account = "http://${IP}/asset/create"
export const assetTypeApi = (assetType) => `http://${IP}/asset/${assetType}/all`
export const assetIdApi = (assetId) =>`http://${IP}/asset/${assetId}/id`



// User
export const userDetailUrl = `http://${IP}/user/details`


// Favourite
export const addFavApi = (favId) => `http://${IP}/asset/favourite/add?assetId=${favId}`
export const removeFavApi = (favId) => `http://${IP}/asset/favourite/remove?assetId=${favId}`
export const allFavApi =  `http://${IP}/asset/favourite`