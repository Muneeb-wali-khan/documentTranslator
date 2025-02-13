export const baseUrl = "http://localhost:4000/api/v1";
export const documents = `${baseUrl}/document`
export const users = `${baseUrl}/user`
export const auth = `${baseUrl}/auth`

export const endpoints = {
    auth_points:{
        login: `${auth}/login-user`,
        register: `${auth}/register-user`,
        logout: `${auth}/logout-user`,
    },
    document_points:{
        create: `${documents}/create-document`,
        get: `${documents}/get-document`,
    },
    user_points:{
        get: `${users}/user-me`,
        update: `${users}/update-user`,
        delete: `${users}/delete-user`,
    }
}