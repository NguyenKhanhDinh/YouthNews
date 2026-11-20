export class ApiError extends Error {
    constructor(message, status = 500) {
        super(message)
        this.name = 'ApiError'
        this.status = status
    }
}

export const API_CONFIG = {
    minDelay: 250,
    maxDelay: 700,
    failRate: 0,
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function request(handler) {
    const { minDelay, maxDelay, failRate } = API_CONFIG
    await sleep(minDelay + Math.random() * (maxDelay - minDelay))

    if (Math.random() < failRate) {
        throw new ApiError('Không thể kết nối đến máy chủ. Vui lòng thử lại.', 503)
    }

    const result = handler()
    return structuredClone(result)
}