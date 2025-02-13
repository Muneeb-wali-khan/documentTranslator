import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { baseUrl, endpoints } from "../urls";



export const DocumentApi = createApi({
    reducerPath: "documentApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ["DocumentU", "DocumentT"],
    endpoints: (builder) => ({
        
        // user
        myDocumentsU: builder.query({
            query: () => ({
                url: endpoints.document_points.user_point.get,
                method: "GET",
                credentials: 'include',
            }),
            providesTags: ["DocumentU"]
        }), 
        uploadDocumentU: builder.mutation({
            query: (data) => ({
                url: endpoints.document_points.user_point.upload,
                method: "POST",
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ["DocumentU"]
        }),

        // translator
        allDocumentsT: builder.query({
            query: () => ({
                url: endpoints.document_points.translator_point.get,
                method: "GET",
                credentials: 'include',
            }),
            providesTags: ["DocumentT"]
        }),
        translateDocumentT: builder.mutation({
            query: (data) => ({
                url: endpoints.document_points.translator_point.translate + data.id,
                method: "POST",
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ["DocumentT"]
        }),
        certifyDocumentT: builder.mutation({
            query: (data) => ({
                url: endpoints.document_points.translator_point.certify + data.id,
                method: "POST",
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ["DocumentT"]
        })

    })
})

export const { useMyDocumentsUQuery , useUploadDocumentUMutation}  = DocumentApi