export const baseUrl = "http://localhost:4000/api/v1";
export const documents = `${baseUrl}/document`
export const users = `${baseUrl}/user`
export const auth = `${baseUrl}/auth`
export const logs = `${baseUrl}/logs`

export const endpoints = {
    auth_points:{
        login: `${auth}/login-user`,
        register: `${auth}/register-user`,
        logout: `${auth}/logout-user`,
    },
    document_points:{
        user_point:{
            get: `${documents}/my-documents`,
            upload: `${documents}/upload-document`,
        },
        translator_point:{
            get: `${documents}/all-documents`,
            translate: `${documents}/translate-document/`,
            certify: `${documents}/certify-document`,
        },
        logs_point:{
            get: `${logs}/translation-logs`,
        },
        admin_point:{
            get: `${documents}/all-docs`,
        },

    },
    user_points:{
        get: `${users}/user-me`,
        update: `${users}/update-profile`,
        updatepassword: `${users}/update-password`,

        admin_points:{
            get: `${users}/all-users`,
            update: `${users}/update-user-role/`,
            delete: `${users}/remove-user/`,
        }
    }
}