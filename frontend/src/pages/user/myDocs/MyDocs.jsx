import React from 'react'
import { useMyDocumentsUQuery } from '../../../store/Features/documents.feature'
import Loader from '../../../components/Loader/Loader'

function MyDocs() {
  const {data: docData, isLoading} = useMyDocumentsUQuery()

  if(isLoading){
    return <Loader/>
  }

  console.log("doc data",docData);
  
  return (
    <div>
      My dOCS
    </div>
  )
}

export default MyDocs
