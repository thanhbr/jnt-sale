import {useEffect} from 'react'
import useFacebookLiveStreamScript from '../../hooks/useFacecbookLivestreamScript'
import {FacebookLivestreamScriptFilter} from '../filter'
import {FacebookLivestreamScriptTable} from '../table'

export const FacebookLivestreamScriptWrapper = () => {
  const {data, methods} = useFacebookLiveStreamScript()
  const {script} = data

  useEffect(() => {
    methods.getOriginData()
  }, [])

  return (
    <>
      <FacebookLivestreamScriptFilter />
      <FacebookLivestreamScriptTable
        list={script.list}
        loading={script.loading}
      />
    </>
  )
}
