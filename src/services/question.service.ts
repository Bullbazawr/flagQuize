import axios from 'axios'
import { IQuestion } from '../interfaces/app.interface'

class QuestionService {
    private URL = 'http://localhost:3000'

    async getEasyQuestions() {
        return await axios.get<IQuestion[]>(`${this.URL}/easyQuestions`)
    }
    async getAllHardQuestions() {
        return axios.get<IQuestion[]>(`${this.URL}/hardQuestions`)
    }
}

export default new QuestionService()