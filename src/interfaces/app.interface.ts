export interface IQuestion {
    id: string,
    country: string,
    src: string,
    optionOne: string,
    optionTwo: string,
    optionThree: string,
    optionFour: string
}

export type DifficultyType = 'Easy' | 'Hard'