import { articles } from './articles'
import { lifestyleArticles } from './lifestyleArticles'
import { technologyArticles } from './technologyArticles'

export const allArticles = [...articles, ...technologyArticles, ...lifestyleArticles]
