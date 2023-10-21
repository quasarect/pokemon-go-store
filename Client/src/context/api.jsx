
//Auth
export const LoginApi = "http://localhost:5000/auth/login"
export const SignUpApi = "http://localhost:5000/auth/signup"
export const authGoogle = "http://localhost:5000/auth/google"
export const authFaceBook = "http://localhost:5000/auth/facebook"

//Assets
// export const account = "http://localhost:5000/asset/create"
// export const account = "http://localhost:5000/asset/create"
export const assetTypeApi = (assetType) => `http://localhost:5000/asset/${assetType}/all`
export const assetIdApi = (assetId) =>`http://localhost:5000/asset/${assetId}/id`



// User
export const userDetailUrl = "http://localhost:5000/user/details"


// Favourite
export const addFavApi = (favId) => `http://localhost:5000/asset/favourite/add?assetId=${favId}`
export const removeFavApi = (favId) => `http://localhost:5000/asset/favourite/remove?assetId=${favId}`
export const allFavApi =  "http://localhost:5000/asset/favourite"