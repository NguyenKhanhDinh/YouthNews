import { useEffect } from 'react'

const SITE_NAME = 'YouthNews'

export default function useDocumentTitle(title) {
    useEffect(() => {
        const previousTitle = document.title
        document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME
        return () => {
            document.title = previousTitle
        }
    }, [title])
}