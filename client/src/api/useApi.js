import { useCallback, useEffect, useState } from 'react'

export function useApi(fetcher, params) {
    const paramsKey = JSON.stringify(params ?? null)
    const [attempt, setAttempt] = useState(0)
    const requestKey = `${paramsKey}|${attempt}`
    const [result, setResult] = useState({ key: null, data: null, error: null })

    useEffect(() => {
        let active = true
        fetcher(params).then(
            (data) => active && setResult({ key: requestKey, data, error: null }),
            (error) => active && setResult({ key: requestKey, data: null, error }),
        )
        return () => {
            active = false
        }
    }, [fetcher, requestKey])

    const refetch = useCallback(() => setAttempt((n) => n + 1), [])
    const loading = result.key !== requestKey
    return {
        data: loading ? null : result.data,
        error: loading ? null : result.error,
        loading,
        refetch,
    }
}
