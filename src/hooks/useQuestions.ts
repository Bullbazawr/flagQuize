import { useQuery } from '@tanstack/react-query'
import questionService from '../services/question.service'
import { DifficultyType } from '../interfaces/app.interface'

export const useQuestions = (difficult: DifficultyType) => {
    return useQuery({
        queryKey: ['questions'],
        queryFn: () => {
            if (difficult === 'Easy') {
                return questionService.getEasyQuestions()
            } else {
                return questionService.getAllHardQuestions()
            }
        },
        select: ({ data }) => data
    })
}